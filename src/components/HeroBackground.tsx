"use client";

import { registerAutoplayVideo, useMediaUnlocked } from "@/components/MediaUnlock";
import { resolveVideoSrc } from "@/lib/resolve-video";
import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  localVideo: string;
  proxyVideo: string;
  posterSrc: string;
};

export function HeroBackground({ localVideo, proxyVideo, posterSrc }: Props) {
  const [src, setSrc] = useState(localVideo);
  const videoRef = useRef<HTMLVideoElement>(null);
  const unlocked = useMediaUnlocked();
  const [videoPlaying, setVideoPlaying] = useState(false);

  useEffect(() => {
    let cancelled = false;
    resolveVideoSrc(localVideo, proxyVideo).then((resolved) => {
      if (!cancelled) setSrc(resolved);
    });
    return () => {
      cancelled = true;
    };
  }, [localVideo, proxyVideo]);

  const attemptPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.setAttribute("muted", "");
    video.playsInline = true;
    const p = video.play();
    if (p) {
      p.then(() => setVideoPlaying(true)).catch(() => setVideoPlaying(false));
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    registerAutoplayVideo(video);

    const onPlaying = () => setVideoPlaying(true);
    const onError = () => {
      if (src !== proxyVideo) {
        setSrc(proxyVideo);
        setVideoPlaying(false);
        return;
      }
      setVideoPlaying(false);
    };

    video.addEventListener("playing", onPlaying);
    video.addEventListener("canplay", attemptPlay);
    video.addEventListener("error", onError);
    video.load();
    attemptPlay();

    return () => {
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("canplay", attemptPlay);
      video.removeEventListener("error", onError);
    };
  }, [src, proxyVideo, attemptPlay]);

  useEffect(() => {
    if (unlocked) attemptPlay();
  }, [unlocked, attemptPlay]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <img
        src={posterSrc}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full object-cover hero-ken-burns ${
          videoPlaying ? "opacity-30" : "opacity-50"
        }`}
      />
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        playsInline
        loop
        preload="auto"
        poster={posterSrc}
        disablePictureInPicture
        className={`absolute inset-0 h-full w-full object-cover ${
          videoPlaying ? "opacity-55" : "opacity-0"
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0b]/30 via-[#0a0a0b]/60 to-[#0a0a0b]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0b]/80 via-transparent to-transparent" />
    </div>
  );
}
