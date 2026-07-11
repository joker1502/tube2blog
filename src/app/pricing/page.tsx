import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"

export const metadata: Metadata = {
  title: "Pricing",
  description: "Free plan with 5 posts, Pro at $29/mo for unlimited, Enterprise for teams. No credit card required to start.",
  alternates: { canonical: "/pricing" },
}

const plans = [
  { name: "Free", price: "$0", period: "/mo", desc: "For getting started with YouTube to blog conversion.", features: ["5 posts per month", "Basic SEO metadata", "Standard AI model", "Markdown export"], cta: "Get Started" },
  { name: "Pro", price: "$29", period: "/mo", desc: "For serious creators who need unlimited content.", features: ["50 posts per month", "Advanced SEO", "High-quality AI model", "Priority support"], cta: "Start Free Trial", popular: true },
  { name: "Enterprise", price: "Custom", period: "", desc: "For teams and agencies.", features: ["Unlimited posts", "Custom AI fine-tuning", "API access", "Dedicated support"], cta: "Contact Sales" },
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
            <p className="mt-4 text-lg text-muted-foreground">Start free. Upgrade when you grow. No hidden fees.</p>
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
                    <a href={plan.name === "Free" ? "/sign-up" : plan.name === "Enterprise" ? "mailto:sales@tube2blog.com" : "/api/checkout?plan=PRO_MONTHLY"} className="mt-auto w-full">
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
