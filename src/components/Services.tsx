"use client";

import { motion } from "framer-motion";
import content from "@/data/content.json";
import { useWhatsApp } from "@/components/WhatsAppProvider";

export function Services() {
  const { openModal } = useWhatsApp();
  return (
    <section id="services" className="border-y border-white/5 bg-[#141416]/50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-12 md:mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-[#e8c547]">RJ Editzzz Budget Plans</p>
          <h2 className="mt-3 font-[family-name:var(--font-syne)] text-3xl font-bold tracking-tight md:text-5xl">
            Premium quality. Affordable prices.
          </h2>
          <p className="mt-4 max-w-xl text-sm text-[#9a9590]">
            Choose a plan that fits your event. Message me on WhatsApp with your date and selected plan to get started.
          </p>

          <div className="mt-8 inline-flex items-center gap-4 rounded-xl border border-red-500/50 bg-red-500/10 px-5 py-4 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.15)] backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/10 to-red-500/0 translate-x-[-100%] animate-[shimmer_2s_infinite]"></div>
            <span className="text-3xl animate-bounce">🔥</span>
            <div>
              <p className="font-[family-name:var(--font-syne)] font-bold uppercase tracking-widest text-sm text-red-400">
                Every Friday Offer
              </p>
              <p className="text-sm text-white mt-1">
                Get <span className="font-bold text-red-400 text-base">50% OFF</span> on ANY plan you choose if your event is on a Friday! 💥
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-16">
          {content.budgetPlans.map((category, catIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <div className="mb-6">
                <h3 className="font-[family-name:var(--font-syne)] text-2xl font-bold text-[#f5f2eb] flex items-center gap-3">
                  {category.category}
                  {category.subtitle && (
                    <span className="text-sm font-normal text-[#9a9590]">{category.subtitle}</span>
                  )}
                </h3>
                <div className="mt-2 h-px w-full bg-gradient-to-r from-[#e8c547]/30 to-transparent"></div>
              </div>

              <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
                {category.plans.map((plan, planIndex) => (
                  <div
                    key={plan.name}
                    className="group flex flex-col rounded-2xl border border-white/8 bg-[#0a0a0b] p-6 transition-colors hover:border-[#e8c547]/30 md:p-8"
                  >
                    <div className="mb-6">
                      <h4 className="font-[family-name:var(--font-syne)] text-xl font-bold text-[#f5f2eb]">
                        {plan.name}
                      </h4>
                      <p className="mt-2 font-[family-name:var(--font-syne)] text-2xl font-bold text-[#e8c547]">
                        {plan.price}
                      </p>
                    </div>

                    <ul className="mb-8 flex-1 space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-[#9a9590]">
                          <svg
                            className="mt-0.5 h-4 w-4 shrink-0 text-[#e8c547]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => openModal(`Hi! I'd like to book the ${plan.name} from the ${category.category}.`)}
                      className="mt-auto w-full rounded-xl bg-white/5 py-3 text-sm font-medium text-[#f5f2eb] transition-colors group-hover:bg-[#e8c547] group-hover:text-[#0a0a0b]"
                    >
                      Book this plan
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
