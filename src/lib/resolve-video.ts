/** Vercel often serves 132-byte LFS placeholders instead of real MP4s. */
export function preferProxyVideo(): boolean {
  if (typeof window === "undefined") return false;
  const host = window.location.hostname;
  return host.includes("vercel.app") || host.includes("vercel.sh");
}

export async function isBrokenLocalVideo(path: string): Promise<boolean> {
  if (!path.startsWith("/videos/")) return false;
  if (preferProxyVideo()) return true;
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
