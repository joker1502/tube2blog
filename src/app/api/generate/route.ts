import { NextResponse } from "next/server";
import { streamText } from "ai";
import { getAIModel } from "@/lib/ai/provider";
import { getTranscript, extractVideoId } from "@/lib/youtube/transcript";

export async function POST(request: Request) {
  const { url, tone } = await request.json();

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  let videoId: string;
  try {
    videoId = extractVideoId(url);
  } catch {
    return NextResponse.json(
      { error: "Invalid YouTube URL" },
      { status: 400 },
    );
  }

  let transcript: string;
  try {
    transcript = await getTranscript(videoId);
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 422 },
    );
  }

  const result = streamText({
    model: getAIModel("default"),
    system: `You are an SEO blog writer. Convert YouTube video transcripts into well-structured blog posts${
      tone ? ` in a ${tone} tone` : ""
    }. Use headings, bullet points, and paragraphs. Include SEO keywords naturally. Output in markdown.`,
    prompt: `Title: YouTube Video (${videoId})\n\nTranscript:\n${transcript}\n\nWrite the blog post:`,
  });

  return result.toTextStreamResponse();
}
