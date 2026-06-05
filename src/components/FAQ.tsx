"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import content from "@/data/content.json";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="border-t border-white/5 bg-[#141416]/30 py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5">
        <p className="text-center text-xs uppercase tracking-[0.25em] text-[#e8c547]">FAQ</p>
        <h2 className="mt-3 text-center font-[family-name:var(--font-syne)] text-3xl font-bold tracking-tight md:text-4xl">
          Common questions
        </h2>

        <div className="mt-10 space-y-2">
          {content.faq.map((item, i) => (
            <div
              key={item.q}
              className="overflow-hidden rounded-xl border border-white/8 bg-[#0a0a0b]"
            >
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-sm font-medium md:text-base">{item.q}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-[#9a9590] transition-transform ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p className="border-t border-white/5 px-5 py-4 text-sm leading-relaxed text-[#9a9590]">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
