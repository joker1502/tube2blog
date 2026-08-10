import type { Metadata } from "next";
import Link from "next/link";
import { Hash } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getAllPosts, formatTag } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Topics - Tube2Blog",
  description: "Browse blog articles by topic — video to blog conversion tips, YouTube transcript guides, and content repurposing strategies.",
};

export default function TagsPage() {
  const posts = getAllPosts();
  const tags = [...new Set(posts.flatMap((p) => p.tags ?? []))].sort();

  return (
    <div className="flex flex-col min-h-full">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <h1 className="text-3xl font-bold tracking-tight">Topics</h1>
          <p className="mt-2 text-muted-foreground">Browse articles by topic.</p>

          <div className="mt-8 flex flex-wrap gap-2">
            {tags.map((tag) => {
              const count = posts.filter((p) => p.tags?.includes(tag)).length;
              return (
                <Link
                  key={tag}
                  href={`/blog/tags/${tag}`}
                  className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm font-medium text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-colors"
                >
                  <Hash className="size-3" />
                  {formatTag(tag)} ({count})
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
