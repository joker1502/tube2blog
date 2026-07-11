import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Hash, Clock } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MarkdownContent } from "@/components/markdown-content";
import { getPost, getAllPosts, formatTag } from "@/lib/blog";
import { JsonLd } from "@/components/json-ld";
import { articleSchema } from "@/lib/schema";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = (await params).slug;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const slug = (await params).slug;
  const post = getPost(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const related = allPosts
    .filter((p) => p.slug !== slug && p.tags?.some((t) => post.tags?.includes(t)))
    .slice(0, 3);

  const schema = articleSchema({
    title: post.title,
    description: post.description,
    url: `https://tube2blog.com/blog/${post.slug}`,
    datePublished: post.date,
  });

  return (
    <div className="flex flex-col min-h-full">
      <JsonLd data={schema} />
      <Header />
      <main className="flex-1">
        <article className="mx-auto max-w-5xl px-4 py-16">
          <Link href="/blog" className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" />
            Back to blog
          </Link>

          <div className="flex gap-10">
            <div className="min-w-0 flex-1">
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog/tag/${tag}`}
                      className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-colors"
                    >
                      <Hash className="size-3" />
                      {formatTag(tag)}
                    </Link>
                  ))}
                </div>
              )}

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{post.title}</h1>

              <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="size-3" />{post.date}</span>
                <span className="flex items-center gap-1"><Clock className="size-3" />{post.readTime}</span>
              </div>

              <div className="mt-10">
                <MarkdownContent content={post.content} />
              </div>

              {related.length > 0 && (
                <div className="mt-16 border-t pt-10">
                  <h2 className="text-xl font-bold mb-6">Related Articles</h2>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {related.map((r) => (
                      <Link key={r.slug} href={`/blog/${r.slug}`} className="group rounded-xl border bg-card p-4 transition-all hover:shadow-soft">
                        <h3 className="font-medium group-hover:text-brand transition-colors">{r.title}</h3>
                        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{r.description}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
