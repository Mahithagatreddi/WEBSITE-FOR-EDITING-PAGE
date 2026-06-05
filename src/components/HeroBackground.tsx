"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  videoSrc: string;
  posterSrc: string;
};

export function HeroBackground({ videoSrc, posterSrc }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      video.play().catch(() => {
        // Autoplay blocked on some browsers until interaction
      });
    };

    video.addEventListener("loadeddata", () => setVideoReady(true));
    video.addEventListener("canplay", tryPlay);
    tryPlay();

    return () => {
      video.removeEventListener("canplay", tryPlay);
    };
  }, [videoSrc]);

  return (
    <div className="absolute inset-0">
      {/* Poster always visible so hero never looks blank */}
      <img
        src={posterSrc}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          videoReady ? "opacity-30" : "opacity-50"
        }`}
      />
      <video
        ref={videoRef}
        key={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={posterSrc}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          videoReady ? "opacity-50" : "opacity-0"
        }`}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0b]/30 via-[#0a0a0b]/60 to-[#0a0a0b]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0b]/80 via-transparent to-transparent" />
    </div>
  );
}
