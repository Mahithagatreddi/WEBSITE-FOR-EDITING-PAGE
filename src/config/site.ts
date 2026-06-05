export const siteConfig = {
  name: "RJ Editzzz",
  legalName: "Rj the editor",
  tagline: "Video Editor",
  city: "Visakhapatnam",
  region: "Vizag, Andhra Pradesh",
  instagram: "https://www.instagram.com/rjeditzzz_/",
  instagramHandle: "@rjeditzzz_",

  // Main action: WhatsApp enquiry
  whatsappNumber: "918897934421",
  whatsappMessage:
    "Hi RJ Editzzz! I saw your website and want to book a reel. My event is on [date] and I need [wedding / birthday / brand / event].",

  email: "rjeditzzz@gmail.com", // guessed placeholder, owner should confirm
  emailGuessed: true,

  turnaround: "24 hour rush available",
  colors: {
    background: "#0a0a0b",
    surface: "#141416",
    accent: "#e8c547",
    accentMuted: "#b8942e",
    text: "#f5f2eb",
    textMuted: "#9a9590",
  },
} as const;

export function getWhatsAppUrl(message?: string) {
  const text = encodeURIComponent(message ?? siteConfig.whatsappMessage);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${text}`;
}
