"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { useWhatsApp } from "@/components/WhatsAppProvider";

export function Contact() {
  const { openModal } = useWhatsApp();
  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-[#e8c547]/20 bg-gradient-to-br from-[#141416] to-[#0a0a0b] p-8 md:p-14"
        >
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#e8c547]/5 blur-3xl" />

          <div className="relative max-w-xl">
            <p className="text-xs uppercase tracking-[0.25em] text-[#e8c547]">Ready?</p>
            <h2 className="mt-3 font-[family-name:var(--font-syne)] text-3xl font-bold tracking-tight md:text-5xl">
              Book your slot today
            </h2>
            <p className="mt-4 text-[#9a9590]">
              Send your event date and the kind of reel you want. I reply on WhatsApp
              with availability and a clear price.
            </p>

            <button
              onClick={() => openModal()}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-[#e8c547] px-8 py-4 text-sm font-semibold text-[#0a0a0b] transition-transform hover:scale-[1.02]"
            >
              Message on WhatsApp
            </button>

            <div className="mt-8 flex flex-wrap gap-6 text-sm text-[#9a9590]">
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-[#f5f2eb]"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
                {siteConfig.instagramHandle}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2 transition-colors hover:text-[#f5f2eb]"
              >
                <Mail className="h-4 w-4" />
                {siteConfig.email}
                {siteConfig.emailGuessed && (
                  <span className="text-[10px] uppercase text-[#e8c547]">confirm</span>
                )}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
