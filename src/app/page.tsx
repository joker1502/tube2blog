import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HomeTool } from "./home-tool";
import { Sparkles, Search, FileText, Zap, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "YouTube to SEO Blog Post Generator",
  description:
    "Turn YouTube videos into SEO-optimized blog posts in 30 seconds. Extract transcripts, generate metadata, and export clean Markdown. Double your content output from every video — free, no sign-up required.",
  keywords: [
    "youtube video to blog post",
    "youtube video to blog post ai",
    "youtube to blog converter",
    "podcast to blog post ai",
    "video to blog post generator",
    "youtube transcript to blog post",
    "ai blog writer from video",
    "repurpose youtube videos into blogs",
    "automated blogging from video",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Tube2Blog - From YouTuber to Automated Blogger in Seconds",
    description:
      "Turn YouTube videos into SEO-optimized blog posts in 30 seconds. Double your content output from every video with AI-powered transcription, SEO metadata, and Markdown export.",
  },
  twitter: {
    title: "Tube2Blog - From YouTuber to Automated Blogger in Seconds",
    description:
      "Turn YouTube videos into SEO-optimized blog posts in 30 seconds. Double your content output from every video.",
  },
};

const highlights = [
  { icon: Sparkles, text: "AI extracts transcript & generates SEO blog post" },
  { icon: Search, text: "Proper headings, meta descriptions, and Schema markup" },
  { icon: FileText, text: "Export clean Markdown for any CMS" },
  { icon: Zap, text: "Free to start. No sign-up required." },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-full">
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-4 pt-20 pb-16">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              AI-Powered YouTube to Blog Converter
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              YouTube to Blog Post
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
              Paste a YouTube URL. Get an SEO-optimized blog post in seconds.
              No sign-up required.
            </p>
          </div>

          <HomeTool />

          <div className="mt-20 grid gap-6 sm:gap-8 sm:grid-cols-2">
            {highlights.map((h) => {
              const Icon = h.icon;
              return (
                <div key={h.text} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border bg-brand-light text-brand dark:bg-brand/10">
                    <Icon className="size-4" />
                  </div>
                  <span className="pt-1.5">{h.text}</span>
                </div>
              );
            })}
          </div>
        </section>

        <section className="border-t">
          <div className="mx-auto max-w-3xl px-4 py-16 text-center">
            <h2 className="text-2xl font-bold tracking-tight">
              Ready for more? Unlock AI rewriting and unlimited length.
            </h2>
            <div className="mt-6 flex justify-center gap-3">
              <Link href="/features" className={cn(buttonVariants({ variant: "outline" }))}>
                Learn More
              </Link>
              <Link href="/pricing" className={cn(buttonVariants())}>
                View Pricing <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
