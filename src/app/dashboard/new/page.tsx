import type { Metadata } from "next";
import { BlogGenerator } from "@/components/features/blog-generator";

export const metadata: Metadata = {
  title: "New Post",
  robots: { index: false },
};

export default function NewPostPage() {
  return (
    <div className="p-6 max-w-2xl space-y-6">
      <h1 className="text-3xl font-bold">New Blog Post</h1>
      <p className="text-muted-foreground">
        Paste a YouTube URL to generate an SEO-optimized blog post.
      </p>
      <BlogGenerator />
    </div>
  );
}
