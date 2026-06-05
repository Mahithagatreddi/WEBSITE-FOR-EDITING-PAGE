import content from "@/data/content.json";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

function findRemoteUrl(id: string): string | null {
  const item = content.portfolio.find((p) => p.id === id);
  return item?.remoteVideo ?? null;
}

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const remoteUrl = findRemoteUrl(id);

  if (!remoteUrl) {
    return new Response("Reel not found", { status: 404 });
  }

  const upstream = await fetch(remoteUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Referer: "https://www.instagram.com/",
      Accept: "*/*",
    },
  });

  if (!upstream.ok) {
    return new Response("Video unavailable", { status: 502 });
  }

  return new Response(upstream.body, {
    headers: {
      "Content-Type": upstream.headers.get("Content-Type") || "video/mp4",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
