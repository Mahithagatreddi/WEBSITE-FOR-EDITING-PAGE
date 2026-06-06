"use client";

import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useWhatsApp } from "@/components/WhatsAppProvider";

export function FloatingCTA() {
  const { openModal } = useWhatsApp();

  return (
    <button
      onClick={() => openModal()}
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#e8c547] px-5 py-3.5 text-sm font-semibold text-[#0a0a0b] shadow-[0_8px_32px_rgba(232,197,71,0.35)] transition-transform hover:scale-[1.03] active:scale-[0.98] md:bottom-8 md:right-8"
      aria-label="Book on WhatsApp"
    >
      <MessageCircle className="h-4 w-4" strokeWidth={2.5} />
      <span className="hidden sm:inline">Book on WhatsApp</span>
      <span className="sm:hidden">Book now</span>
    </button>
  );
}
