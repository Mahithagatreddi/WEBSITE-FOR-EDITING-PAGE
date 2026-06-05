"use client";

import { registerVideo } from "@/components/MediaUnlock";
import { preferProxyVideo, resolveVideoSrc } from "@/lib/resolve-video";
import { useEffect, useRef, useState } from "react";
import { Play, Eye, ExternalLink } from "lucide-react";

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
  const [mode, setMode] = useState<"thumb" | "native" | "embed">("thumb");
  const [thumbError, setThumbError] = useState(false);
  const [nativeFailed, setNativeFailed] = useState(false);
  const [videoSrc, setVideoSrc] = useState(
    preferProxyVideo() ? item.proxyVideo : item.video
  );
  const videoRef = useRef<HTMLVideoElement>(null);
  const embedUrl = `https://www.instagram.com/p/${item.id}/embed`;

  useEffect(() => {
    let cancelled = false;
    resolveVideoSrc(item.video, item.proxyVideo).then((src) => {
      if (!cancelled) setVideoSrc(src);
    });
    return () => {
      cancelled = true;
    };
  }, [item.video, item.proxyVideo]);

  useEffect(() => {
    if (mode !== "native" || nativeFailed) return;
    const video = videoRef.current;
    if (!video) return;

    registerVideo(video);
    video.muted = true;
    video.load();

    const play = () => {
      video.play().catch(() => setNativeFailed(true));
    };

    if (video.readyState >= 2) play();
    else video.addEventListener("canplay", play, { once: true });

    return () => video.removeEventListener("canplay", play);
  }, [mode, nativeFailed, videoSrc]);

  const startPlay = () => {
    if (preferProxyVideo()) {
      setMode("embed");
      return;
    }
    setMode("native");
  };

  const onNativeError = () => {
    if (videoSrc !== item.proxyVideo) {
      setVideoSrc(item.proxyVideo);
      setNativeFailed(false);
      return;
    }
    setNativeFailed(true);
    setMode("embed");
  };

  return (
    <article className="video-card group relative aspect-[9/16] overflow-hidden rounded-2xl bg-[#141416]">
      {mode === "embed" && (
        <iframe
          src={embedUrl}
          title={item.title}
          className="absolute inset-0 h-full w-full border-0 bg-black"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      )}

      {mode === "native" && !nativeFailed && (
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={onNativeError}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {mode === "thumb" && (
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
            className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/35"
            aria-label={`Play ${item.title}`}
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e8c547] text-[#0a0a0b] shadow-lg transition-transform group-hover:scale-110">
              <Play className="ml-0.5 h-5 w-5 fill-current" />
            </span>
          </button>
        </>
      )}

      {mode === "native" && nativeFailed && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 p-4">
          <a
            href={`https://www.instagram.com/p/${item.id}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-[#e8c547] px-4 py-2 text-xs font-semibold text-[#0a0a0b]"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Open on Instagram
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
