import { YoutubeTranscript } from "youtube-transcript";
import { Redis } from "@upstash/redis";

const redis = (() => {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
})();

export async function getTranscript(videoId: string): Promise<string> {
  if (redis) {
    const cached = await redis.get<string>(`yt:${videoId}`);
    if (cached) return cached;
  }

  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId, {
      lang: "en",
    });
    const text = transcript.map((t) => t.text).join(" ");

    if (redis) {
      await redis.setex(`yt:${videoId}`, 86400, text);
    }

    return text;
  } catch (err) {
    throw new Error(
      `TRANSCRIPT_FETCH_FAILED: ${(err as Error).message}`,
    );
  }
}

export function extractVideoId(url: string): string {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/,
  );
  if (!match) throw new Error("INVALID_YOUTUBE_URL");
  return match[1];
}
