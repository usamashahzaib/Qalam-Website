"use client"

import Link from "next/link"
import { FadeUp } from "@/components/FadeUp"

const SECTIONS = [
  "Getting started",
  "Voice Profile setup",
  "Writing and revising posts",
  "Scheduling and publishing",
  "Analytics and post outcomes",
  "Team and agency workflows",
]

export default function DocsPage() {
  return (
    <div className="pt-24 min-h-screen bg-teal-900">
      <section className="py-20 px-6">
        <div className="max-w-[760px] mx-auto text-center">
          <FadeUp>
            <span className="chip border-white/20 text-white/70 bg-white/5 mb-5 inline-flex">
              Help Center
            </span>
            <h1 className="text-5xl font-extrabold text-white mb-4">Docs</h1>
            <p className="text-white/55 text-lg leading-relaxed">
              Public documentation is still being structured. The core sections are mapped below so the
              surface exists without pretending the library is complete.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-[760px] mx-auto space-y-4">
          {SECTIONS.map((section, i) => (
            <FadeUp key={section} delay={i * 0.06}>
              <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-5">
                <p className="text-white font-medium">{section}</p>
              </div>
            </FadeUp>
          ))}

          <FadeUp className="pt-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
              <p className="text-white/60 mb-5">
                Need something specific now? Use the free tools or contact support directly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/free-tools"
                  className="inline-flex items-center justify-center px-6 py-3 bg-teal text-white font-semibold rounded-xl hover:bg-teal-600 transition-colors"
                >
                  Browse Free Tools
                </Link>
                <a
                  href="mailto:support@byqalam.com"
                  className="inline-flex items-center justify-center px-6 py-3 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
                >
                  support@byqalam.com
                </a>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  )
}
