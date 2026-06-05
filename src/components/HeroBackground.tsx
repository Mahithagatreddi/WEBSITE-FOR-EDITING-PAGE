"use client";

import { registerVideo, useMediaUnlocked } from "@/components/MediaUnlock";
import { preferProxyVideo, resolveVideoSrc } from "@/lib/resolve-video";
import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  localVideo: string;
  proxyVideo: string;
  posterSrc: string;
};

export function HeroBackground({ localVideo, proxyVideo, posterSrc }: Props) {
  const [src, setSrc] = useState(
    preferProxyVideo() ? proxyVideo : localVideo
  );
  const videoRef = useRef<HTMLVideoElement>(null);
  const unlocked = useMediaUnlocked();
  const [status, setStatus] = useState<"loading" | "playing" | "failed">("loading");

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
    video
      .play()
      .then(() => setStatus("playing"))
      .catch(() => setStatus("failed"));
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    registerVideo(video);

    const onCanPlay = () => attemptPlay();
    const onError = () => {
      if (src !== proxyVideo) {
        setSrc(proxyVideo);
        setStatus("loading");
        return;
      }
      setStatus("failed");
    };

    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("error", onError);
    video.load();
    attemptPlay();

    return () => {
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("error", onError);
    };
  }, [src, proxyVideo, attemptPlay]);

  useEffect(() => {
    if (unlocked) attemptPlay();
  }, [unlocked, attemptPlay]);

  const showMotion = status === "playing";

  return (
    <div className="absolute inset-0 overflow-hidden">
      <img
        src={posterSrc}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full object-cover hero-ken-burns ${
          showMotion ? "opacity-35" : "opacity-55"
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
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          showMotion ? "opacity-55" : "opacity-0"
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0b]/30 via-[#0a0a0b]/60 to-[#0a0a0b]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0b]/80 via-transparent to-transparent" />
    </div>
  );
}
