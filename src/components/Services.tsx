"use client";

import { motion } from "framer-motion";
import content from "@/data/content.json";
import { useWhatsApp } from "@/components/WhatsAppProvider";

export function Services() {
  const { openModal } = useWhatsApp();
  return (
    <section id="services" className="border-y border-white/5 bg-[#141416]/50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-12 md:mb-16 md:flex md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#e8c547]">Services</p>
            <h2 className="mt-3 font-[family-name:var(--font-syne)] text-3xl font-bold tracking-tight md:text-5xl">
              What I shoot and edit
            </h2>
          </div>
          <p className="mt-4 max-w-sm text-sm text-[#9a9590] md:mt-0">
            Prices below are starting points. Message me with your date and I will
            confirm the exact quote.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {content.services.map((service, i) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group rounded-2xl border border-white/8 bg-[#0a0a0b] p-6 transition-colors hover:border-[#e8c547]/30 md:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-[family-name:var(--font-syne)] text-xl font-bold">
                  {service.name}
                </h3>
                <div className="text-right">
                  <p className="font-[family-name:var(--font-syne)] text-lg font-bold text-[#e8c547]">
                    from {service.fromPrice}
                  </p>
                  {service.guessed && (
                    <p className="text-[10px] uppercase tracking-wider text-[#9a9590]">
                      estimated
                    </p>
                  )}
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#9a9590]">
                {service.description}
              </p>
              <button
                onClick={() => openModal(`Hi! I need a ${service.name} reel. My date is `)}
                className="mt-5 inline-block text-sm font-medium text-[#e8c547] transition-opacity group-hover:opacity-80"
              >
                Enquire for this service →
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
