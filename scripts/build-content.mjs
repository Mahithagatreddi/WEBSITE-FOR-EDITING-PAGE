import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const posts = JSON.parse(
  readFileSync(join(root, "data", "raw", "posts.json"), "utf8")
);
const profile = JSON.parse(
  readFileSync(join(root, "data", "raw", "profile.json"), "utf8")
)[0];

function categorize(caption = "") {
  const c = caption.toLowerCase();
  if (/wedding|sangeet|haldi|kalyanam|engagement|pre-wedding|godum|mandap|couple|bride|groom/.test(c))
    return "Weddings";
  if (/birthday|beach birthday|surprise/.test(c)) return "Birthdays";
  if (/delivery|royal enfield|creta|bmw|bike|car/.test(c)) return "Brand & Delivery";
  if (/festival|village|event|holi/.test(c)) return "Events";
  return "Reels";
}

const portfolio = posts
  .filter((p) => p.type === "Video" || p.videoUrl)
  .map((p) => {
    const id = p.shortCode;
    const views = p.videoPlayCount || p.videoViewCount || 0;
    const likes = p.likesCount > 0 ? p.likesCount : null;
    return {
      id,
      title: (p.caption || "")
        .split("\n")[0]
        .replace(/[^\w\s.,!?'"-]/g, "")
        .slice(0, 60)
        .trim() || "Reel edit",
      category: categorize(p.caption),
      thumbnail: `/photos/${id}.jpg`,
      video: `/videos/${id}.mp4`,
      views,
      likes,
      location: p.locationName || null,
    };
  })
  .sort((a, b) => b.views - a.views);

const categories = [...new Set(portfolio.map((p) => p.category))];

const content = {
  hero: {
    tagline: "Reels that feel like cinema. Shot on iPhone. Edited with intent.",
    subline:
      "Weddings, birthdays, brand deliveries, and festival films across Visakhapatnam. 24 hour turnaround available.",
  },
  stats: [
    { label: "Followers", value: `${profile.followersCount.toLocaleString()}+` },
    { label: "Projects", value: `${profile.postsCount}+` },
    { label: "Turnaround", value: "24 hrs" },
    { label: "Based in", value: "Vizag" },
  ],
  services: [
    {
      name: "Wedding Reels",
      description:
        "Sangeet, haldi, reception, and pre-wedding films cut for emotion and shareability.",
      fromPrice: "₹4,999",
      guessed: true,
    },
    {
      name: "Birthday & Celebration",
      description:
        "Beach birthdays, surprise parties, and milestone edits your guests will replay.",
      fromPrice: "₹2,499",
      guessed: true,
    },
    {
      name: "Brand & Delivery Shoots",
      description:
        "Car and bike delivery reels, showroom launches, and product moments that pop on feed.",
      fromPrice: "₹3,499",
      guessed: true,
    },
    {
      name: "Events & Festivals",
      description:
        "Village festivals, corporate events, and cultural moments captured and cut fast.",
      fromPrice: "₹3,999",
      guessed: true,
    },
  ],
  process: [
    { step: "01", title: "Book your slot", text: "Message on WhatsApp with your date, event type, and reference reel." },
    { step: "02", title: "We shoot or you send footage", text: "On-site iPhone capture in Vizag, or send your clips from anywhere." },
    { step: "03", title: "Edit and review", text: "Cinematic cuts, color, music sync, and transitions tuned to your vibe." },
    { step: "04", title: "Delivery", text: "Final reel ready for Instagram. Rush 24 hour option when you need it fast." },
  ],
  testimonials: [
    {
      quote: "Client was very happy with the best output. We caught every memorable moment.",
      source: "From Instagram captions",
    },
    {
      quote: "Proof you do not need a massive rig. Just a great song and an iPhone in hand.",
      source: "Wedding reception reel",
    },
    {
      quote: "Book the slot now. Memorial moments this couple will keep forever.",
      source: "Haldi ceremony reel",
    },
  ],
  faq: [
    {
      q: "Do you only work in Vizag?",
      a: "I am based in Visakhapatnam and shoot locally. You can also send footage from anywhere in India for editing.",
    },
    {
      q: "How fast can I get my reel?",
      a: "Standard delivery is 2 to 3 days. Rush 24 hour turnaround is available when slots are open.",
    },
    {
      q: "What should I send when I enquire?",
      a: "Your event date, the type of reel you want, and one reference video from my portfolio or elsewhere.",
    },
    {
      q: "Do you shoot and edit, or edit only?",
      a: "Both. I shoot on iPhone for local events and edit everything in-house for a consistent cinematic look.",
    },
  ],
  portfolio,
  categories,
};

writeFileSync(
  join(root, "src", "data", "content.json"),
  JSON.stringify(content, null, 2)
);
console.log(`Wrote ${portfolio.length} portfolio items`);
