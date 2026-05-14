"use client"

import Link from "next/link"
import { FadeUp } from "@/components/FadeUp"

const PRINCIPLES = [
  {
    title: "Voice before volume",
    desc: "If a feature helps users publish more but sound less like themselves, it fails the test.",
  },
  {
    title: "Retention through memory",
    desc: "The product should improve because it remembers your edits, drafts, approved posts, and outcomes.",
  },
  {
    title: "No fake intelligence",
    desc: "If a workflow is manual, we say it is manual. If a signal is heuristic, we label it heuristic.",
  },
]

export default function AboutPage() {
  return (
    <div className="pt-24 min-h-screen bg-teal-900">
      <section className="py-24 px-6">
        <div className="max-w-[860px] mx-auto text-center">
          <FadeUp>
            <span className="chip border-white/20 text-white/70 bg-white/5 mb-6 inline-flex">
              About Qalam
            </span>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-tight mb-6">
              A publishing system for people who need
              <span className="text-gold gold-underline"> authority, not filler.</span>
            </h1>
            <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
              Qalam is being built as a serious LinkedIn publishing desk: voice memory, post history,
              content assets, scheduling, and performance feedback in one system.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-[860px] mx-auto">
          <FadeUp>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10">
              <h2 className="text-2xl font-bold text-white mb-4">What this product is trying to solve</h2>
              <div className="space-y-4 text-white/60 leading-relaxed">
                <p>
                  Most AI writing tools reset every session. They generate a draft, but they do not
                  accumulate knowledge about the writer behind it.
                </p>
                <p>
                  Qalam is designed around a different idea: each approved post, edit, saved asset,
                  and publishing outcome should make the next session more useful than the last one.
                </p>
                <p>
                  That is the product direction. Not chat for chat&apos;s sake. Not generic content
                  volume. A system that becomes harder to replace the longer someone uses it.
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRINCIPLES.map((item, i) => (
            <FadeUp key={item.title} delay={i * 0.08}>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-7 h-full">
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-white/55 leading-relaxed text-sm">{item.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-[860px] mx-auto">
          <FadeUp>
            <div className="bg-gradient-to-br from-teal/30 to-transparent border border-teal/20 rounded-3xl p-10 text-center">
              <h2 className="text-3xl font-bold text-white mb-3">Want the product updates?</h2>
              <p className="text-white/55 mb-7 max-w-xl mx-auto">
                The changelog, pricing, and free tools pages show the current public state more honestly
                than a polished brand story ever could.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center px-7 py-3.5 bg-gold text-white font-bold rounded-xl hover:bg-gold-600 transition-colors"
                >
                  Compare Plans
                </Link>
                <Link
                  href="/free-tools"
                  className="inline-flex items-center justify-center px-7 py-3.5 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
                >
                  Explore Free Tools
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  )
}
