"use client";

import { pauseOtherReels } from "@/lib/reel-audio";
import { resolveVideoSrc } from "@/lib/resolve-video";
import { useEffect, useRef, useState } from "react";
import { Play, Eye, ExternalLink, Volume2, VolumeX } from "lucide-react";

export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  video: string;
  proxyVideo: string;
  views: number;
};

function formatViews(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export function VideoCard({ item }: { item: PortfolioItem }) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [thumbError, setThumbError] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [videoSrc, setVideoSrc] = useState(item.video);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let cancelled = false;
    resolveVideoSrc(item.video, item.proxyVideo).then((src) => {
      if (!cancelled) setVideoSrc(src);
    });
    return () => {
      cancelled = true;
    };
  }, [item.video, item.proxyVideo]);

  const playWithSound = () => {
    const video = videoRef.current;
    if (!video) return;

    pauseOtherReels(video);
    video.muted = false;
    video.volume = 1;
    setMuted(false);

    video
      .play()
      .then(() => setPlaying(true))
      .catch(() => {
        video.muted = true;
        setMuted(true);
        video.play().then(() => setPlaying(true)).catch(() => setVideoError(true));
      });
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    const next = !video.muted;
    video.muted = next;
    setMuted(next);
    if (!next) {
      video.volume = 1;
      video.play().catch(() => {});
    }
  };

  const onVideoError = () => {
    if (videoSrc !== item.proxyVideo) {
      setVideoSrc(item.proxyVideo);
      setVideoError(false);
      return;
    }
    setVideoError(true);
    setPlaying(false);
  };

  return (
    <article className="video-card group relative aspect-[9/16] overflow-hidden rounded-2xl bg-[#141416]">
      <video
        ref={videoRef}
        data-portfolio-reel
        src={videoSrc}
        loop
        playsInline
        preload="metadata"
        onError={onVideoError}
        className={`absolute inset-0 h-full w-full object-cover ${
          playing && !videoError ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {!playing && !videoError && (
        <>
          {!thumbError && item.thumbnail ? (
            <img
              src={item.thumbnail}
              alt={item.title}
              loading="lazy"
              onError={() => setThumbError(true)}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#1c1c1f] to-[#0a0a0b]" />
          )}
          <button
            type="button"
            onClick={playWithSound}
            className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/35"
            aria-label={`Play ${item.title} with sound`}
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e8c547] text-[#0a0a0b] shadow-lg transition-transform group-hover:scale-110">
              <Play className="ml-0.5 h-5 w-5 fill-current" />
            </span>
          </button>
        </>
      )}

      {playing && !videoError && (
        <button
          type="button"
          onClick={toggleMute}
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
          aria-label={muted ? "Unmute reel" : "Mute reel"}
        >
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
      )}

      {videoError && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 p-4">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#1c1c1f] to-[#0a0a0b]" />
          <a
            href={item.video.includes("instagram.com") ? item.video : "https://www.instagram.com/rjeditzzz_/"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-[#e8c547] px-4 py-2 text-xs font-semibold text-[#0a0a0b] hover:bg-[#d6b53e] transition"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Watch on Instagram
          </a>
        </div>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 pt-12">
        <span className="mb-1 inline-block rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-[#e8c547] backdrop-blur-sm">
          {item.category}
        </span>
        <p className="line-clamp-2 text-sm font-medium leading-snug">{item.title}</p>
        {item.views > 0 && (
          <p className="mt-1 flex items-center gap-1 text-xs text-[#9a9590]">
            <Eye className="h-3 w-3" />
            {formatViews(item.views)} views
          </p>
        )}
      </div>
    </article>
  );
}
