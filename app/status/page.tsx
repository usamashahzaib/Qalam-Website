"use client"

import { FadeUp } from "@/components/FadeUp"

export default function StatusPage() {
  return (
    <div className="pt-24 min-h-screen bg-teal-900">
      <section className="py-20 px-6">
        <div className="max-w-[760px] mx-auto">
          <FadeUp className="text-center mb-10">
            <span className="chip border-white/20 text-white/70 bg-white/5 mb-5 inline-flex">
              Status
            </span>
            <h1 className="text-5xl font-extrabold text-white mb-4">System Status</h1>
            <p className="text-white/55 text-lg leading-relaxed">
              A live public status feed is not published yet. This page exists so the route resolves
              cleanly without inventing uptime numbers or fake incident history.
            </p>
          </FadeUp>

          <FadeUp>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <p className="text-white font-semibold mb-2">Current public note</p>
              <p className="text-white/55 text-sm leading-relaxed">
                If a production incident affects customers, support updates should go out through direct
                email or customer channels until a real status pipeline is in place.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  )
}
