"use client"

import { FadeUp } from "@/components/FadeUp"

const SECTIONS = [
  {
    title: "Using Qalam",
    content:
      "Use the service lawfully and review anything AI-assisted before you publish it. Do not use the product for spam, impersonation, or deceptive content.",
  },
  {
    title: "Your content",
    content:
      "Your drafts, posts, voice examples, and related assets remain yours. Qalam processes that material only to provide the product features you use.",
  },
  {
    title: "Billing",
    content:
      "Paid plans renew automatically until cancelled. You keep access until the end of the current billing period unless a separate written agreement says otherwise.",
  },
  {
    title: "Availability",
    content:
      "We aim to keep the product available and improve it over time, but public pages should not claim guarantees or service levels that are not backed by a formal contract.",
  },
  {
    title: "Questions",
    content:
      "If anything here is unclear, contact legal@byqalam.com before relying on an assumption.",
  },
]

export default function TermsPage() {
  return (
    <div className="pt-24 min-h-screen bg-teal-900">
      <section className="py-20 px-6">
        <div className="max-w-[760px] mx-auto">
          <FadeUp className="mb-12">
            <span className="chip border-white/20 text-white/70 bg-white/5 mb-5 inline-flex">Legal</span>
            <h1 className="text-5xl font-extrabold text-white mb-4">Terms of Service</h1>
            <p className="text-white/55 text-lg leading-relaxed">
              A short public version while the full legal copy is being finalized.
            </p>
          </FadeUp>

          <div className="space-y-6">
            {SECTIONS.map((section, i) => (
              <FadeUp key={section.title} delay={i * 0.06}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                  <h2 className="text-xl font-bold text-white mb-3">{section.title}</h2>
                  <p className="text-white/55 text-sm leading-relaxed">{section.content}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
