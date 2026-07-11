import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Hash, Clock } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getAllPosts, formatTag } from "@/lib/blog";

interface PageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  const tags = [...new Set(posts.flatMap((p) => p.tags ?? []))];
  return tags.map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const tag = (await params).tag;
  return {
    title: `Posts tagged "${formatTag(tag)}"`,
  };
}

export default async function TagPage({ params }: PageProps) {
  const tag = (await params).tag;
  const posts = getAllPosts().filter((p) => p.tags?.includes(tag));

  if (posts.length === 0) notFound();

  return (
    <div className="flex flex-col min-h-full">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <Link href="/blog" className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" />
            Back to blog
          </Link>

          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Hash className="size-6" />
            {formatTag(tag)}
          </h1>
          <p className="mt-2 text-muted-foreground">{posts.length} post{posts.length !== 1 ? "s" : ""}</p>

          <div className="mt-10 grid gap-8">
            {posts.map((post) => (
              <article key={post.slug} className="border-b pb-8">
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {post.tags.map((t) => (
                      <Link
                        key={t}
                        href={`/blog/tag/${t}`}
                        className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-colors"
                      >
                        <Hash className="size-2.5" />
                        {formatTag(t)}
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
