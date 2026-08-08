import { getAllPosts } from "@/lib/blog";

function buildContent() {
  const base = "https://tube2blog.com";
  const posts = getAllPosts();

  const tools = [
    ["YouTube to Blog Converter", base, "Paste a YouTube URL, get an AI-written SEO blog post in seconds"],
    ["Features", `${base}/features`, "Transcript extraction, AI writing, metadata generation, Markdown export"],
    ["Dashboard", `${base}/dashboard`, "Manage your converted posts"],
  ].map(([title, url, desc]) => `- [${title}](${url}): ${desc}`);

  const blog = posts
    .map((p) => `- [${p.title}](${base}/blog/${p.slug}): ${p.description}`)
    .join("\n");

  return `# Tube2Blog

> Free YouTube to blog converter: paste any YouTube URL and get an AI-written SEO blog post in seconds. Extract transcripts, generate metadata, export Markdown.

## Core Tools
${tools.join("\n")}

## Pricing
- [Pricing](${base}/pricing): Free and paid plans

## Blog
${blog}

## Company
- [Privacy Policy](${base}/privacy)
- [Terms of Service](${base}/terms)

## Contact
- Website: ${base}
`;
}

export async function GET() {
  return new Response(buildContent(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
