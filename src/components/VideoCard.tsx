"use client";

import { useRef, useState } from "react";
import { Play, Eye } from "lucide-react";

export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  video: string;
  views: number;
};

function formatViews(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export function VideoCard({ item }: { item: PortfolioItem }) {
  const [playing, setPlaying] = useState(false);
  const [thumbError, setThumbError] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startPlay = () => {
    setPlaying(true);
    requestAnimationFrame(() => {
      videoRef.current?.play().catch(() => {});
    });
  };

  return (
    <article className="video-card group relative aspect-[9/16] overflow-hidden rounded-2xl bg-[#141416]">
      {playing && !videoError ? (
        <video
          ref={videoRef}
          src={item.video}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={() => setVideoError(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <>
          {!thumbError ? (
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
            onClick={startPlay}
            className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/35"
            aria-label={`Play ${item.title}`}
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e8c547] text-[#0a0a0b] shadow-lg transition-transform group-hover:scale-110">
              <Play className="ml-0.5 h-5 w-5 fill-current" />
            </span>
          </button>
        </>
      )}

      {videoError && (
        <div className="absolute inset-0 flex items-center justify-center p-4 text-center text-xs text-[#9a9590]">
          Video loading.{" "}
          <a
            href={`https://www.instagram.com/p/${item.id}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 text-[#e8c547] underline"
          >
            Watch on Instagram
          </a>
        </div>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 pt-12">
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
