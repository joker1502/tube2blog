import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { Globe, Sparkles, Search, FileText, Video, Zap, Check, ArrowRight, Film, PenLine, Mic, Megaphone, GraduationCap } from "lucide-react";

export const metadata: Metadata = {
  title: "Features - YouTube to Blog Post Generator | Tube2Blog",
  description:
    "Tube2Blog features: AI-powered YouTube transcript to blog post converter. Extract transcripts, generate SEO metadata, export Markdown. The best video to blog post generator.",
  alternates: { canonical: "/features" },
};

const features = [
  { icon: Video, title: "Transcript Extraction", description: "Automatically extract transcripts from any YouTube video. Supports multiple languages and formats." },
  { icon: Sparkles, title: "AI-Powered Rewriting", description: "Generate SEO-optimized blog posts from your transcript with a single click. Natural and engaging." },
  { icon: Search, title: "SEO Optimized", description: "Proper headings, meta descriptions, keywords, and Schema markup built into every post." },
  { icon: FileText, title: "Markdown Export", description: "Export clean Markdown ready for any CMS. Copy and publish to WordPress, Medium, and more." },
  { icon: Globe, title: "Multi-Platform", description: "Publish your generated content anywhere. Works with any CMS that supports Markdown or HTML." },
  { icon: Zap, title: "Fast & Free to Start", description: "No sign-up required. Paste a URL and get your blog post in seconds. Free credits included." },
];

const useCases = [
  { icon: Film, title: "YouTubers", desc: "Repurpose your back catalog into searchable blog content. Every video becomes a blog post that ranks on Google." },
  { icon: PenLine, title: "Bloggers", desc: "Embed YouTube videos in your posts and let readers get both video and text versions of your content." },
  { icon: Search, title: "SEO Specialists", desc: "Generate structured, schema-optimized content from video transcripts faster than manual writing." },
  { icon: Mic, title: "Podcasters", desc: "Turn episode transcripts into show notes, SEO articles, and social snippets in minutes." },
  { icon: Megaphone, title: "Content Marketers", desc: "Scale your content production by converting every video asset into a text asset." },
  { icon: GraduationCap, title: "Course Creators", desc: "Transform lesson recordings into supplementary reading materials and blog tutorials." },
];

const steps = [
  { step: "01", title: "Paste a YouTube link", desc: "Any video or podcast URL works. The transcript is extracted automatically." },
  { step: "02", title: "Review your SEO draft", desc: "Title, description, tags, and Schema are generated from your content." },
  { step: "03", title: "Edit, copy, and publish", desc: "Fine-tune in the editor with live preview. Copy the result for any CMS." },
];

const comparisons = [
  { task: "Transcribe video", manual: "30-60 min", tool: "10 seconds" },
  { task: "Write SEO title & description", manual: "10-15 min", tool: "Generated" },
  { task: "Select featured image", manual: "5 min", tool: "Auto-picked" },
  { task: "Format Markdown", manual: "10 min", tool: "Auto-formatted" },
  { task: "Add Schema markup", manual: "15 min", tool: "Built-in" },
];

const faqs = [
  { q: "How does the YouTube to Blog tool work?", a: "Paste a YouTube URL, and we extract the transcript, generate SEO metadata, and present everything in an editable format. You can then copy or publish the result." },
  { q: "Is this tool free?", a: "Yes, the free tier supports video transcription up to 10 minutes with full editing and export. The Pro plan adds AI rewriting and unlimited length." },
  { q: "Do I need an API key?", a: "No. The free tier works without any API keys — just paste a YouTube URL and start editing." },
  { q: "Can I export to WordPress or Medium?", a: "Yes, you can copy the generated Markdown directly and paste into any CMS. One-click publishing is coming soon." },
  { q: "How is this different from manual transcription?", a: "Our tool automates the entire process: transcript extraction, SEO metadata, thumbnail selection, and Schema markup — saving hours per article." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-full">
      <JsonLd data={faqSchema} />
      <Header />
      <main className="flex-1">
        {/* Why */}
        <section className="border-b py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight">
                Your Transcripts Are Boring — Turn Them Into Blog Posts That Rank
              </h2>
              <div className="mt-6 text-muted-foreground leading-relaxed space-y-4 text-[15px]">
                <p>
                  Video content is great for engagement, but it doesn&apos;t rank in
                  Google search. A blog post derived from your video reaches people
                  who prefer reading, captures long-tail keywords, and serves as
                  shareable content for social media and newsletters.
                </p>
                <p>
                  Instead of manually transcribing, rewriting, and formatting —
                  which takes 2-3 hours per video — this tool does it in seconds.
                  You get <strong>twice the content</strong> at a fraction of the time and cost.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="border-b py-24">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Everything you need to repurpose video content
              </h2>
              <p className="mt-4 text-muted-foreground">
                A lightweight, powerful tool for content creators.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <Card key={f.title} className="group transition-all duration-200 hover:border-brand/30 hover:shadow-soft">
                    <CardContent className="flex flex-col gap-3 pt-6">
                      <div className="flex size-10 items-center justify-center rounded-lg border bg-brand-light text-brand dark:bg-brand/10">
                        <Icon className="size-5" />
                      </div>
                      <h3 className="font-semibold">{f.title}</h3>
                      <p className="text-sm text-muted-foreground">{f.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-b py-24">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How it works</h2>
              <p className="mt-4 text-muted-foreground">Three simple steps to turn any video into a blog post.</p>
            </div>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="space-y-8">
                {steps.map((s, i) => (
                  <div key={s.step} className="relative flex gap-6">
                    <div className="flex flex-col items-center">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-primary-foreground">
                        {s.step}
                      </div>
                      {i < steps.length - 1 && <div className="mt-1 w-px flex-1 bg-border" />}
                    </div>
                    <div className="pb-8">
                      <h3 className="text-lg font-semibold">{s.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="hidden lg:block">
                <div className="overflow-hidden rounded-xl border bg-card shadow-soft">
                  <div className="flex items-center gap-1.5 border-b bg-muted/50 px-4 py-2.5">
                    <div className="size-2.5 rounded-full bg-destructive/70" />
                    <div className="size-2.5 rounded-full bg-warning/70" />
                    <div className="size-2.5 rounded-full bg-success/70" />
                    <span className="ml-2 text-xs text-muted-foreground">tube2blog.app</span>
                  </div>
                  <div className="space-y-4 p-6">
                    <div className="flex gap-2">
                      <div className="flex-1 rounded-md border bg-muted/30 px-3 py-2 text-xs text-muted-foreground font-mono">
                        https://youtube.com/watch?v=dQw4w9WgXcQ
                      </div>
                      <div className="rounded-md bg-brand px-3 py-2 text-xs font-medium text-primary-foreground">
                        Convert
                      </div>
                    </div>
                    <div className="h-px bg-border" />
                    <div className="space-y-2">
                      <div className="h-4 w-3/4 rounded bg-muted" />
                      <div className="h-3 w-full rounded bg-muted/60" />
                      <div className="h-3 w-5/6 rounded bg-muted/60" />
                      <div className="mt-3 flex gap-2">
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">youtube</span>
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">seo</span>
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">blog</span>
                      </div>
                      <div className="mt-4 rounded-md border bg-muted/20 p-3">
                        <div className="h-3 w-1/3 rounded bg-muted/40" />
                        <div className="mt-2 space-y-1">
                          <div className="h-2 w-full rounded bg-muted/30" />
                          <div className="h-2 w-11/12 rounded bg-muted/30" />
                          <div className="h-2 w-4/5 rounded bg-muted/30" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use cases */}
        <section className="border-b py-24">
          <div className="mx-auto max-w-4xl px-4">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Who is this for</h2>
              <p className="mt-4 text-muted-foreground">Designed for anyone who creates video content.</p>
            </div>
            <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
              {useCases.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border bg-brand-light text-brand dark:bg-brand/10">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="border-b py-24">
          <div className="mx-auto max-w-4xl px-4">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Compared to manual transcription</h2>
              <p className="mt-4 text-muted-foreground">See the difference in time and effort.</p>
            </div>
            <div className="overflow-hidden rounded-xl border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="p-4 text-left font-medium text-muted-foreground">Task</th>
                    <th className="p-4 text-left font-medium text-muted-foreground">Manual</th>
                    <th className="p-4 text-left font-medium text-muted-foreground">Tube2Blog</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {comparisons.map((row) => (
                    <tr key={row.task} className="transition-colors hover:bg-muted/30">
                      <td className="p-4 font-medium">{row.task}</td>
                      <td className="p-4 text-muted-foreground">{row.manual}</td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1.5 text-brand font-medium">
                          <Check className="size-3.5" />
                          {row.tool}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-b py-24">
          <div className="mx-auto max-w-3xl px-4">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Frequently asked questions</h2>
            </div>
            <Accordion>
              {faqs.map((faq) => (
                <AccordionItem key={faq.q} value={faq.q}>
                  <AccordionTrigger className="text-lg font-medium">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Ready to Double Your Content Output?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Every video becomes a blog post that ranks on Google. No sign-up required.
            </p>
            <div className="mt-8 flex justify-center gap-3">
              <Link href="/" className={cn(buttonVariants({ size: "lg" }))}>
                Try It Free <ArrowRight className="size-4" />
              </Link>
              <Link href="/pricing" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
                View Pricing
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
