"use client";

import { motion } from "framer-motion";
import content from "@/data/content.json";

export function Process() {
  return (
    <section id="process" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <p className="text-xs uppercase tracking-[0.25em] text-[#e8c547]">How it works</p>
        <h2 className="mt-3 font-[family-name:var(--font-syne)] text-3xl font-bold tracking-tight md:text-5xl">
          From slot to final reel
        </h2>

        <div className="mt-12 space-y-0 md:mt-16">
          {content.process.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="grid gap-4 border-t border-white/8 py-8 md:grid-cols-[80px_1fr] md:gap-8"
            >
              <span className="font-[family-name:var(--font-syne)] text-4xl font-bold text-[#e8c547]/40">
                {step.step}
              </span>
              <div>
                <h3 className="font-[family-name:var(--font-syne)] text-xl font-bold">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-[#9a9590]">
                  {step.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
