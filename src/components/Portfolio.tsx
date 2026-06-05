"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Eye } from "lucide-react";
import Image from "next/image";
import content from "@/data/content.json";

type PortfolioItem = (typeof content.portfolio)[0];

function formatViews(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

function VideoCard({ item }: { item: PortfolioItem }) {
  const [playing, setPlaying] = useState(false);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="video-card group relative aspect-[9/16] overflow-hidden rounded-2xl bg-[#141416]"
    >
      {playing ? (
        <video
          src={item.video}
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        />
      ) : (
        <>
          <Image
            src={item.thumbnail}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/35"
            aria-label={`Play ${item.title}`}
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e8c547] text-[#0a0a0b] shadow-lg transition-transform group-hover:scale-110">
              <Play className="ml-0.5 h-5 w-5 fill-current" />
            </span>
          </button>
        </>
      )}

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 pt-12">
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
    </motion.article>
  );
}

export function Portfolio() {
  const [active, setActive] = useState("All");
  const filters = ["All", ...content.categories];
  const filtered =
    active === "All"
      ? content.portfolio
      : content.portfolio.filter((p) => p.category === active);

  return (
    <section id="work" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-10 md:mb-14">
          <p className="text-xs uppercase tracking-[0.25em] text-[#e8c547]">Portfolio</p>
          <h2 className="mt-3 font-[family-name:var(--font-syne)] text-3xl font-bold tracking-tight md:text-5xl">
            Real edits. Real clients.
          </h2>
          <p className="mt-4 max-w-xl text-[#9a9590]">
            Every reel below is from Instagram. Tap to play. These are the moments
            Vizag trusts me to cut.
          </p>
        </div>

        <div className="mb-8 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm transition-colors ${
                active === f
                  ? "bg-[#e8c547] text-[#0a0a0b] font-semibold"
                  : "bg-[#141416] text-[#9a9590] hover:text-[#f5f2eb]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.slice(0, 12).map((item) => (
              <VideoCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length > 12 && (
          <p className="mt-8 text-center text-sm text-[#9a9590]">
            Showing 12 of {filtered.length} reels. More on{" "}
            <a
              href="https://www.instagram.com/rjeditzzz_/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#e8c547] underline-offset-2 hover:underline"
            >
              Instagram
            </a>
            .
          </p>
        )}
      </div>
    </section>
  );
}
