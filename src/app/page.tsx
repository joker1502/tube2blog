import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { HomeTool } from "./home-tool";
import { Sparkles, Search, FileText, Zap, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "YouTube to Blog Post Converter - Turn Videos into SEO Content",
  description:
    "Free YouTube to blog converter: paste any YouTube URL and get an AI-written SEO blog post in seconds. Extract transcripts, generate metadata, export Markdown. The easiest video to blog post generator for creators.",
  keywords: [
    "youtube video to blog post",
    "youtube video to blog post ai",
    "youtube to blog converter",
    "podcast to blog post ai",
    "podcast to blog post converter",
    "video to blog post generator",
    "youtube transcript to blog post",
    "ai blog writer from video",
    "repurpose youtube videos into blogs",
    "automated blogging from video",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "YouTube to Blog Post Converter - Turn Videos into SEO Content",
    description:
      "Free YouTube to blog converter: paste any YouTube URL and get an AI-written SEO blog post in seconds. Extract transcripts, generate metadata, export Markdown.",
  },
  twitter: {
    title: "YouTube to Blog Post Converter - Turn Videos into SEO Content",
    description:
      "Free YouTube to blog converter: paste any YouTube URL and get an AI-written SEO blog post in seconds.",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does the YouTube to Blog tool work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Paste a YouTube URL, and we extract the transcript, generate SEO metadata, pull video thumbnails, and present everything in an editable Markdown editor. You can then copy or publish the result.",
      },
    },
    {
      "@type": "Question",
      name: "Is this YouTube to Blog converter free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the free tier supports video transcription up to 10 minutes. A Pro plan with AI rewriting and unlimited length is available.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need an API key?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The free tier works without any API keys — just paste a YouTube URL and start editing.",
      },
    },
    {
      "@type": "Question",
      name: "How is this different from manual transcription?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our tool automates the entire process: transcript extraction, SEO metadata generation, thumbnail selection, and Schema markup — saving hours per article.",
      },
    },
    {
      "@type": "Question",
      name: "Can I export to WordPress or Medium?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, you can copy the generated Markdown directly and paste into any CMS. One-click publishing is coming soon.",
      },
    },
  ],
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
      <JsonLd data={faqSchema} />
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
