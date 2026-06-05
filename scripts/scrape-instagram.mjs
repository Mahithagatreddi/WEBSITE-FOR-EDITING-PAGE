import { writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

// Load .env.local manually
const envPath = join(root, ".env.local");
const envText = await import("fs").then((fs) =>
  fs.readFileSync(envPath, "utf8")
);
const token = envText.match(/APIFY_TOKEN=(.+)/)?.[1]?.trim();
const profileUrl =
  envText.match(/NEXT_PUBLIC_INSTAGRAM_URL=(.+)/)?.[1]?.trim() ||
  "https://www.instagram.com/rjeditzzz_/";
const username = profileUrl.replace(/\/$/, "").split("/").pop();

if (!token) {
  console.error("No APIFY_TOKEN in .env.local");
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

async function runActor(actorId, body, label) {
  const url = `https://api.apify.com/v2/acts/${actorId}/run-sync-get-dataset-items?timeout=120`;
  console.log(`Scraping ${label}...`);
  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${label} failed (${res.status}): ${text.slice(0, 500)}`);
  }
  const data = await res.json();
  console.log(`${label}: got ${Array.isArray(data) ? data.length : 0} items`);
  return data;
}

mkdirSync(join(root, "data", "raw"), { recursive: true });

try {
  const profile = await runActor(
    "apify~instagram-profile-scraper",
    { usernames: [username] },
    "profile"
  );
  writeFileSync(
    join(root, "data", "raw", "profile.json"),
    JSON.stringify(profile, null, 2)
  );

  const posts = await runActor(
    "apify~instagram-scraper",
    {
      directUrls: [profileUrl],
      resultsType: "posts",
      resultsLimit: 30,
    },
    "posts"
  );
  writeFileSync(
    join(root, "data", "raw", "posts.json"),
    JSON.stringify(posts, null, 2)
  );

  console.log("Scrape complete.");
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
