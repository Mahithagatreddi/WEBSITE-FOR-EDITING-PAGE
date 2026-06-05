import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteConfig.name} | Video Editor in Vizag`,
  description:
    "Cinematic reels for weddings, birthdays, brands, and events in Visakhapatnam. Shot on iPhone. 24 hour turnaround available.",
  openGraph: {
    title: siteConfig.name,
    description: "Cinematic video edits in Vizag",
    images: ["/photos/profile.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="antialiased">
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
