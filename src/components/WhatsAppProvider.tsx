"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { getWhatsAppUrl } from "@/config/site";

interface WhatsAppContextType {
  openModal: (defaultMessage?: string) => void;
  closeModal: () => void;
}

const WhatsAppContext = createContext<WhatsAppContextType | undefined>(undefined);

export function useWhatsApp() {
  const context = useContext(WhatsAppContext);
  if (!context) {
    throw new Error("useWhatsApp must be used within a WhatsAppProvider");
  }
  return context;
}

export function WhatsAppProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialMsg, setInitialMsg] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    category: "Wedding",
    plan: "",
  });

  const openModal = (msg?: string) => {
    setInitialMsg(msg || "");
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In the future, this will be saved to MongoDB via an API call
    try {
      await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.error("Failed to save enquiry:", error);
    }

    // Construct message
    const msg = `Hi RJ Editzzz! My name is ${formData.name}. 
Phone: ${formData.phone}
Category: ${formData.category}
Plan: ${formData.plan}
${initialMsg}`;
    
    // Redirect to WhatsApp
    window.open(getWhatsAppUrl(msg), "_blank");
    closeModal();
  };

  return (
    <WhatsAppContext.Provider value={{ openModal, closeModal }}>
      {children}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-[#e8c547]/20 bg-[#141416] p-6 shadow-2xl">
            <h2 className="mb-4 text-xl font-bold text-[#f5f2eb]">Enter Details</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="mb-1 block text-sm text-[#9a9590]">Name</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-2 text-white placeholder-white/30 focus:border-[#e8c547] focus:outline-none"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-[#9a9590]">Phone Number</label>
                <input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-2 text-white placeholder-white/30 focus:border-[#e8c547] focus:outline-none"
                  placeholder="Your Phone Number"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-[#9a9590]">Category of Event</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-2 text-white focus:border-[#e8c547] focus:outline-none"
                >
                  <option value="Wedding">Wedding</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Brand">Brand</option>
                  <option value="Event">Event</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm text-[#9a9590]">Plan of the Event</label>
                <textarea
                  required
                  rows={3}
                  value={formData.plan}
                  onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-2 text-white placeholder-white/30 focus:border-[#e8c547] focus:outline-none"
                  placeholder="Describe your event plan..."
                />
              </div>
              <div className="mt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-lg px-4 py-2 text-sm text-[#9a9590] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#e8c547] px-5 py-2 text-sm font-semibold text-black transition hover:bg-[#d6b53e]"
                >
                  Continue to WhatsApp
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </WhatsAppContext.Provider>
  );
}
