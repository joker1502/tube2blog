import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Terms of Service",
}

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-full">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h1 className="text-3xl font-bold">Terms of Service</h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated: July 2026</p>
          <div className="mt-10 space-y-6 text-sm leading-relaxed text-muted-foreground">
            <section>
              <h2 className="text-lg font-semibold text-foreground">1. Acceptance of Terms</h2>
              <p>By using Tube2Blog, you agree to these terms of service. If you do not agree, do not use the service.</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-foreground">2. Service Description</h2>
              <p>Tube2Blog is an AI-powered tool that converts YouTube video transcripts into SEO-optimized blog posts.</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-foreground">3. User Responsibilities</h2>
              <p>You agree not to use Tube2Blog for any unlawful purpose or to generate content that violates intellectual property rights.</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-foreground">4. Limitation of Liability</h2>
              <p>Tube2Blog is provided &quot;as is&quot; without warranty of any kind. We are not liable for any damages arising from use of the service.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
