"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VideoCard, PortfolioItem } from "@/components/VideoCard";
import content from "@/data/content.json";

export function Portfolio() {
  const [active, setActive] = useState("All");
  const [dbReels, setDbReels] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/reels")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          // Format them to match PortfolioItem
          const formatted = data.map((r: any) => ({
            id: r._id,
            title: r.title,
            category: r.category,
            remoteVideo: r.videoUrl,
            video: r.videoUrl, // Use remote video as fallback
            views: r.views,
            likes: r.reach, // map reach to likes or omit
            location: r.location
          }));
          setDbReels(formatted);
        }
      })
      .catch((err) => console.error("Reels fetch error:", err));
  }, []);

  const sourceReels = dbReels.length > 0 ? dbReels : content.portfolio;
  const filters = ["All", ...content.categories];

  const filtered = useMemo(() => {
    return active === "All"
      ? sourceReels
      : sourceReels.filter((p: any) => p.category === active);
  }, [active, sourceReels]);

  return (
    <section id="work" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-10 md:mb-14">
          <h2 className="mt-3 font-[family-name:var(--font-syne)] text-3xl font-bold tracking-tight md:text-5xl">
            Real edits. Real clients.
          </h2>
          <p className="mt-4 max-w-xl text-[#9a9590]">
            Every reel below is from Instagram. Tap to play. These are the moments
            South part of India trusts me to cut.
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
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5 }}
              >
                <VideoCard item={item} />
              </motion.div>
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
