import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Hash, Clock } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getAllPosts, formatTag } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Tips, guides, and updates for turning video content into SEO blog posts.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const allTags = [...new Set(posts.flatMap((p) => p.tags ?? []))].sort();

  return (
    <div className="flex flex-col min-h-full">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
          <p className="mt-2 text-muted-foreground">Tips, guides, and updates for video to blog conversion.</p>

          {allTags.length > 0 && (
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-foreground">Browse by topic:</span>
              {allTags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${tag}`}
                  className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-colors"
                >
                  <Hash className="size-3" />
                  {formatTag(tag)}
                </Link>
              ))}
            </div>
          )}

          <div className="mt-10 grid gap-8">
            {posts.length === 0 && (
              <p className="text-sm text-muted-foreground">No posts yet. Check back soon.</p>
            )}
            {posts.map((post) => (
              <article key={post.slug} className="border-b pb-8">
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog/tag/${tag}`}
                        className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-colors"
                      >
                        <Hash className="size-2.5" />
                        {formatTag(tag)}
                      </Link>
                    ))}
                  </div>
                )}
                <Link href={`/blog/${post.slug}`} className="group block space-y-2">
                  <h2 className="text-xl font-semibold transition-colors group-hover:text-brand">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{post.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3" />
                      {post.readTime}
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
