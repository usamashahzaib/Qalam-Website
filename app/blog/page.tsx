"use client"

import Link from "next/link"
import { FadeUp } from "@/components/FadeUp"

const POSTS = [
  {
    title: "How to train an AI writing system without losing your voice",
    desc: "A practical breakdown of what source material matters, what to avoid, and how edits become training data.",
    tag: "Voice",
  },
  {
    title: "Why post history is a better moat than another prompt template",
    desc: "A product argument for saving drafts, versions, approvals, and outcomes instead of shipping more surface-level generation.",
    tag: "Product",
  },
  {
    title: "What agencies actually need from a content workflow",
    desc: "Separate client memory, clear approvals, shared assets, and less revision churn.",
    tag: "Agency",
  },
]

export default function BlogPage() {
  return (
    <div className="pt-24 min-h-screen bg-teal-900">
      <section className="py-20 px-6">
        <div className="max-w-[920px] mx-auto text-center">
          <FadeUp>
            <span className="chip border-white/20 text-white/70 bg-white/5 mb-6 inline-flex">
              Journal
            </span>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-5">
              Notes on publishing systems,
              <span className="text-gold gold-underline"> voice, and workflow.</span>
            </h1>
            <p className="text-lg text-white/55 leading-relaxed max-w-2xl mx-auto">
              This section is intentionally lightweight for now. It holds product thinking, workflow
              notes, and operating principles behind Qalam.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {POSTS.map((post, i) => (
            <FadeUp key={post.title} delay={i * 0.08}>
              <article className="bg-white/5 border border-white/10 rounded-2xl p-7 h-full">
                <span className="inline-flex text-xs font-semibold px-3 py-1 rounded-full border border-gold/20 text-gold bg-gold/5 mb-5">
                  {post.tag}
                </span>
                <h2 className="text-xl font-bold text-white leading-snug mb-3">{post.title}</h2>
                <p className="text-white/50 text-sm leading-relaxed">{post.desc}</p>
              </article>
            </FadeUp>
          ))}
        </div>

        <FadeUp className="max-w-[920px] mx-auto mt-12">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
            <p className="text-white/60 mb-5">
              Want product updates instead of essays? The changelog is the faster source of truth.
            </p>
            <Link
              href="/changelog"
              className="inline-flex items-center justify-center px-6 py-3 bg-teal text-white font-semibold rounded-xl hover:bg-teal-600 transition-colors"
            >
              View Changelog
            </Link>
          </div>
        </FadeUp>
      </section>
    </div>
  )
}
