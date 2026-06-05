"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";
import { getWhatsAppUrl, siteConfig } from "@/config/site";
import content from "@/data/content.json";

const heroVideo = content.portfolio[0]?.video ?? "/videos/DZKN2XrAxkU.mp4";
const heroPoster = content.portfolio[0]?.thumbnail ?? "/photos/DZKN2XrAxkU.jpg";

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden">
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={heroPoster}
          className="h-full w-full object-cover opacity-50"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0b]/30 via-[#0a0a0b]/60 to-[#0a0a0b]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0b]/80 via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[100dvh] max-w-6xl flex-col justify-end px-5 pb-24 pt-32 md:justify-center md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <div className="mb-5 flex items-center gap-3">
            <Image
              src="/photos/profile.jpg"
              alt={siteConfig.legalName}
              width={48}
              height={48}
              className="rounded-full ring-2 ring-[#e8c547]/40"
            />
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#e8c547]">
                {siteConfig.region}
              </p>
              <p className="text-sm text-[#9a9590]">{siteConfig.instagramHandle}</p>
            </div>
          </div>

          <h1 className="font-[family-name:var(--font-syne)] text-[2.5rem] font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            Reels that feel
            <span className="block text-[#e8c547]">like cinema.</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-[#9a9590] md:text-lg">
            {content.hero.subline}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#e8c547] px-7 py-4 text-sm font-semibold text-[#0a0a0b] transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Book your slot on WhatsApp
            </a>
            <a
              href="#work"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-4 text-sm font-medium text-[#f5f2eb] transition-colors hover:border-white/30"
            >
              <Play className="h-4 w-4" />
              Watch the work
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-12 grid grid-cols-2 gap-4 border-t border-white/10 pt-8 md:mt-16 md:grid-cols-4"
        >
          {content.stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-[family-name:var(--font-syne)] text-2xl font-bold md:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wider text-[#9a9590]">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
