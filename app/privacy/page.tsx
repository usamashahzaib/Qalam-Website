"use client"

import { FadeUp } from "@/components/FadeUp"

const SECTIONS = [
  {
    title: "What Qalam stores",
    content:
      "Account details, drafts, saved voice examples, post history, and the settings needed to run the product features you choose to use.",
  },
  {
    title: "How it is used",
    content:
      "Your data is used to operate your workspace, improve your Voice Profile, and preserve your publishing history. Public pages should not claim broader processing than the product actually performs.",
  },
  {
    title: "Third-party services",
    content:
      "Some infrastructure and payment providers may process data on our behalf. The public privacy page should stay conservative unless those vendors are verified in the live stack.",
  },
  {
    title: "Your controls",
    content:
      "For access, deletion, or export requests, contact privacy@byqalam.com. This public page is intentionally plain until the full operational policy is finalized.",
  },
]

export default function PrivacyPage() {
  return (
    <div className="pt-24 min-h-screen bg-teal-900">
      <section className="py-20 px-6">
        <div className="max-w-[760px] mx-auto">
          <FadeUp className="mb-12">
            <span className="chip border-white/20 text-white/70 bg-white/5 mb-5 inline-flex">Legal</span>
            <h1 className="text-5xl font-extrabold text-white mb-4">Privacy Policy</h1>
            <p className="text-white/55 text-lg leading-relaxed">
              A short public version that avoids promising infrastructure or data practices we have not
              formally documented yet.
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
