/** Local Vercel deploys often serve 132-byte Git LFS placeholders instead of real MP4s. */
export async function isBrokenLocalVideo(path: string): Promise<boolean> {
  if (!path.startsWith("/videos/")) return false;
  try {
    const res = await fetch(path, { method: "HEAD", cache: "no-store" });
    if (!res.ok) return true;
    const len = Number(res.headers.get("content-length") || 0);
    return len > 0 && len < 5000;
  } catch {
    return true;
  }
}

export async function resolveVideoSrc(
  local: string,
  proxy: string
): Promise<string> {
  const broken = await isBrokenLocalVideo(local);
  return broken ? proxy : local;
}
