"use client"

import { FadeUp } from "@/components/FadeUp"

const UPDATES = [
  {
    date: "May 2026",
    title: "Positioning and pricing cleanup",
    items: [
      "Synced plan data across landing, pricing, schema, and CTAs.",
      "Removed fabricated ratings and fake enterprise proof.",
      "Added honest plan comparison language around Voice Profile, archive, and agency workflows.",
    ],
  },
  {
    date: "May 2026",
    title: "Free tools and support surfaces",
    items: [
      "Shipped working public tools for hooks, headline analysis, profile scoring, viral checks, carousel outlines, and engagement heuristics.",
      "Replaced dead links with real routes or honest placeholders.",
    ],
  },
  {
    date: "May 2026",
    title: "Trust pass across brand surfaces",
    items: [
      "Standardized Qalam branding across major pages while keeping byqalam.com as the domain.",
      "Reworked auth, about, and blog surfaces to avoid invented company history or fake traction claims.",
    ],
  },
]

export default function ChangelogPage() {
  return (
    <div className="pt-24 min-h-screen bg-teal-900">
      <section className="py-20 px-6">
        <div className="max-w-[760px] mx-auto">
          <FadeUp className="mb-14">
            <span className="chip border-white/20 text-white/70 bg-white/5 mb-5 inline-flex">
              Product Notes
            </span>
            <h1 className="text-5xl font-extrabold text-white mb-4">Changelog</h1>
            <p className="text-white/55 text-lg leading-relaxed">
              Public-facing changes that affect positioning, trust, workflow, or product behavior.
            </p>
          </FadeUp>

          <div className="space-y-6">
            {UPDATES.map((update, i) => (
              <FadeUp key={update.title} delay={i * 0.08}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                  <p className="text-sm text-gold font-semibold mb-3">{update.date}</p>
                  <h2 className="text-2xl font-bold text-white mb-4">{update.title}</h2>
                  <ul className="space-y-3 text-white/55 text-sm leading-relaxed">
                    {update.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="text-gold font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
