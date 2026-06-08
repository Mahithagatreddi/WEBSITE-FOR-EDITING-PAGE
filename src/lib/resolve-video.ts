export async function resolveVideoSrc(
  local: string,
  proxy: string
): Promise<string> {
  // We no longer use LFS, so local video files are real MP4s and will work on Vercel.
  return local;
}
