import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const photosDir = join(root, "public", "photos");
const videosDir = join(root, "public", "videos");
mkdirSync(photosDir, { recursive: true });
mkdirSync(videosDir, { recursive: true });

const profile = JSON.parse(
  readFileSync(join(root, "data", "raw", "profile.json"), "utf8")
);
const posts = JSON.parse(
  readFileSync(join(root, "data", "raw", "posts.json"), "utf8")
);

const profileData = Array.isArray(profile) ? profile[0] : profile;
const allPosts = [
  ...(Array.isArray(posts) ? posts : []),
  ...(profileData?.latestPosts || []),
];

const seen = new Set();
const items = [];

function addItem(id, type, url) {
  if (!url || seen.has(url)) return;
  seen.add(url);
  items.push({ id, type, url });
}

if (profileData?.profilePicUrlHD) {
  addItem("profile", "photo", profileData.profilePicUrlHD);
} else if (profileData?.profilePicUrl) {
  addItem("profile", "photo", profileData.profilePicUrl);
}

for (const post of allPosts) {
  const id = post.shortCode || post.id;
  if (post.displayUrl) addItem(id, "photo", post.displayUrl);
  if (post.videoUrl) addItem(id, "video", post.videoUrl);
  if (post.images?.length) {
    post.images.forEach((img, i) => addItem(`${id}-${i}`, "photo", img));
  }
  if (post.childPosts?.length) {
    for (const child of post.childPosts) {
      const cid = child.shortCode || child.id || `${id}-child`;
      if (child.displayUrl) addItem(cid, "photo", child.displayUrl);
      if (child.videoUrl) addItem(cid, "video", child.videoUrl);
    }
  }
}

const headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Referer: "https://www.instagram.com/",
};

const manifest = [];

async function downloadOne({ id, type, url }) {
  const ext = type === "video" ? "mp4" : "jpg";
  const dir = type === "video" ? videosDir : photosDir;
  const filename = `${id}.${ext}`;
  const filepath = join(dir, filename);
  const publicPath = `/${type === "video" ? "videos" : "photos"}/${filename}`;

  if (existsSync(filepath)) {
    console.log(`SKIP ${filename} (exists)`);
    manifest.push({ id, type, local: publicPath, url });
    return;
  }

  try {
    const res = await fetch(url, { headers });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(filepath, buf);
    console.log(`OK   ${filename} (${buf.length} bytes)`);
    manifest.push({ id, type, local: publicPath, url });
  } catch (err) {
    console.log(`FAIL ${filename}: ${err.message}`);
    manifest.push({ id, type, local: null, url, error: err.message });
  }
}

console.log(`Downloading ${items.length} media files...`);
for (const item of items) {
  await downloadOne(item);
}

writeFileSync(
  join(root, "data", "raw", "media-manifest.json"),
  JSON.stringify(manifest, null, 2)
);
console.log("Done. Manifest saved.");
