import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Privacy Policy",
}

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-full">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated: July 2026</p>
          <div className="mt-10 space-y-6 text-sm leading-relaxed text-muted-foreground">
            <section>
              <h2 className="text-lg font-semibold text-foreground">1. Information We Collect</h2>
              <p>When you use Tube2Blog, we collect:</p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>Account information (email, name) via OAuth providers</li>
                <li>YouTube video URLs you submit for processing</li>
                <li>Generated blog post content</li>
                <li>Usage data for service improvement</li>
              </ul>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-foreground">2. How We Use Your Data</h2>
              <p>Your data is used solely to provide and improve the Tube2Blog service. We do not sell your personal data to third parties.</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-foreground">3. Data Storage</h2>
              <p>Your data is stored securely in our Supabase database. We use industry-standard encryption at rest and in transit.</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-foreground">4. Contact</h2>
              <p>For privacy inquiries, contact us at privacy@tube2blog.com.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
