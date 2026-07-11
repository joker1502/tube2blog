import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"

export const metadata: Metadata = {
  title: "Pricing - YouTube to Blog Post Plans",
  description: "Free YouTube to blog converter with 5 posts. Pro at $29/mo for unlimited video to blog conversion. Business at $59/mo for teams. No credit card required.",
  alternates: { canonical: "/pricing" },
}

const plans = [
  {
    name: "FREE",
    price: "$0",
    period: "",
    desc: "For casual users and evaluation.",
    features: [
      "YouTube transcript extraction",
      "Videos up to 10 minutes",
      "Markdown editor with preview",
      "SEO metadata generation",
      "Thumbnail picker",
    ],
    cta: "Get Started",
    href: "/sign-up",
  },
  {
    name: "PRO",
    price: "$29",
    period: "/month",
    desc: "For content creators and bloggers.",
    features: [
      "Everything in Free",
      "Unlimited video length",
      "AI-powered content rewriting",
      "AI-optimized SEO tags & titles",
      "FAQs Schema auto-generation",
      "WordPress / Medium export",
    ],
    cta: "Sign in to Upgrade",
    href: "/sign-in",
    popular: true,
  },
  {
    name: "BUSINESS",
    price: "$59",
    period: "/month",
    desc: "For teams and agencies.",
    features: [
      "Everything in Pro",
      "5 team seats",
      "API access for batch processing",
      "Custom brand templates",
      "Priority support",
      "SSO / SAML",
    ],
    cta: "Sign in to Upgrade",
    href: "/sign-in",
  },
]

const faq = [
  { q: "Can I switch plans anytime?", a: "Yes. Upgrade or downgrade at any time. Your posts and data transfer seamlessly between plans." },
  { q: "Is there a free trial for Pro?", a: "The Pro plan includes credits to get started. No credit card required." },
  { q: "What payment methods do you accept?", a: "All major credit cards via Creem, our secure payment processor." },
  { q: "Can I cancel anytime?", a: "Yes. Cancel anytime with no penalties. Your data remains accessible." },
]

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-full">
      <Header />
      <main className="flex-1">
        <section className="border-b py-20">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Simple, transparent pricing</h1>
            <p className="mt-4 text-lg text-muted-foreground">Start free. Upgrade when you outgrow us.</p>
          </div>
        </section>

        <section className="border-b py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {plans.map((plan) => (
                <Card
                  key={plan.name}
                  className={`relative flex flex-col transition-all duration-200 hover:shadow-soft ${
                    plan.popular ? "ring-2 ring-brand overflow-visible" : ""
                  }`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-brand text-primary-foreground">
                      Most Popular
                    </Badge>
                  )}
                  <CardContent className="flex flex-1 flex-col gap-6 pt-8">
                    <div>
                      <h2 className="text-lg font-semibold">{plan.name}</h2>
                      <p className="mt-1 text-sm text-muted-foreground">{plan.desc}</p>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      {plan.period && <span className="text-sm text-muted-foreground">{plan.period}</span>}
                    </div>
                    <ul className="flex flex-col gap-2">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm">
                          <Check className="size-4 shrink-0 text-success" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <a href={plan.href} className="mt-auto w-full">
                      <Button variant={plan.popular ? "default" : "outline"} className="w-full">{plan.cta}</Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="text-2xl font-bold text-center">Frequently asked questions</h2>
            <div className="mt-8 space-y-6">
              {faq.map((item) => (
                <div key={item.q}>
                  <h3 className="font-medium">{item.q}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.a}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <a href="/sign-up"><Button size="lg">Get Started Free</Button></a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
