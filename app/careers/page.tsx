"use client"

import { FadeUp } from "@/components/FadeUp"

export default function CareersPage() {
  return (
    <div className="pt-24 min-h-screen bg-teal-900">
      <section className="py-20 px-6">
        <div className="max-w-[760px] mx-auto">
          <FadeUp className="text-center mb-10">
            <span className="chip border-white/20 text-white/70 bg-white/5 mb-5 inline-flex">
              Careers
            </span>
            <h1 className="text-5xl font-extrabold text-white mb-4">Careers</h1>
            <p className="text-white/55 text-lg leading-relaxed">
              A public hiring page is not active yet. This route exists so the company surface stays
              clean without publishing invented roles, perks, or traction claims.
            </p>
          </FadeUp>

          <FadeUp>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
              <p className="text-white font-semibold mb-3">Interested anyway?</p>
              <a
                href="mailto:careers@byqalam.com"
                className="inline-flex items-center justify-center px-6 py-3 bg-teal text-white font-semibold rounded-xl hover:bg-teal-600 transition-colors"
              >
                careers@byqalam.com
              </a>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  )
}
