"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { FadeUp } from "@/components/FadeUp"

const APP_ORIGIN = (process.env.NEXT_PUBLIC_APP_URL || "https://app.byqalam.com").replace(/\/$/, "")

const HOOK_TEMPLATES = [
  (t: string) => `Hot take: ${t} is misunderstood by most people. Here's what's actually going on:`,
  (t: string) => `I spent two years on ${t}. Here's the one insight that changed everything:`,
  (t: string) => `Nobody talks about the uncomfortable truth behind ${t}. But it's the part that matters most:`,
  (t: string) => `The counterintuitive lesson I learned from ${t} — that no article mentions:`,
  (t: string) => `5 things I wish I knew about ${t} before I started:`,
  (t: string) => `I used to think ${t} was complicated. Then I realized the real problem:`,
  (t: string) => `Everyone in my network talks about ${t}. But they're missing the most important part:`,
  (t: string) => `Here's what a year of working on ${t} taught me that no one says out loud:`,
  (t: string) => `The biggest mistake I made with ${t} — and what I do differently now:`,
  (t: string) => `${t} changed how I work. This is what I tell everyone who asks me about it:`,
]

export default function HookGeneratorPage() {
  const [topic, setTopic] = useState("")
  const [hooks, setHooks] = useState<string[]>([])
  const [generated, setGenerated] = useState(false)
  const [copied, setCopied] = useState<number | null>(null)

  const handleGenerate = () => {
    if (!topic.trim()) return
    const generated = HOOK_TEMPLATES.map((fn) => fn(topic.trim()))
    setHooks(generated)
    setGenerated(true)
  }

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopied(index)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="pt-24 min-h-screen bg-zinc-50">
      {/* Header */}
      <section className="py-16 px-6 bg-white border-b border-zinc-100 relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(13,74,69,0.2) 0%, transparent 70%)" }}
        />
        <div className="max-w-[760px] mx-auto relative z-10">
          <FadeUp>
            <Link
              href="/free-tools"
              className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-teal transition-colors mb-6"
            >
              ← All Free Tools
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-2xl">🎣</div>
              <div>
                <span className="chip border-gold/40 text-gold bg-gold/5 text-xs">Most Used</span>
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 mb-4 leading-tight">
              LinkedIn Hook Generator
            </h1>
            <p className="text-zinc-500 text-lg leading-relaxed max-w-xl">
              Enter your topic and get 10 opening lines built on proven LinkedIn hook patterns — ready to copy, edit, and post. No sign-in required.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Generator */}
      <section className="py-12 px-6">
        <div className="max-w-[760px] mx-auto">
          <FadeUp>
            <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-zinc-100">
                <label className="block text-sm font-semibold text-zinc-800 mb-2">
                  What&apos;s your post about?
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                    placeholder="e.g. building a personal brand, remote work culture, hiring mistakes..."
                    className="flex-1 px-4 py-3 rounded-xl border border-zinc-200 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/50 transition-all"
                  />
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleGenerate}
                    disabled={!topic.trim()}
                    className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all shrink-0 ${
                      topic.trim()
                        ? "bg-teal text-white hover:bg-teal-600 shadow-sm"
                        : "bg-zinc-200 text-zinc-400 cursor-not-allowed"
                    }`}
                  >
                    Generate 10 Hooks
                  </motion.button>
                </div>
                <p className="text-xs text-zinc-400 mt-2">
                  Tip: Be specific — "feedback culture in remote startups" beats "remote work"
                </p>
              </div>

              <AnimatePresence>
                {generated && hooks.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <div className="px-6 py-4 bg-zinc-50 border-b border-zinc-100 flex items-center justify-between">
                      <p className="text-sm font-semibold text-zinc-700">10 hook options for &ldquo;{topic}&rdquo;</p>
                      <span className="text-xs text-zinc-400">Click any hook to copy</span>
                    </div>
                    <div className="divide-y divide-zinc-50">
                      {hooks.map((hook, i) => (
                        <motion.button
                          key={i}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.04 }}
                          onClick={() => handleCopy(hook, i)}
                          className="w-full text-left px-6 py-4 hover:bg-zinc-50 transition-colors group flex items-start gap-4"
                        >
                          <span className="shrink-0 w-6 h-6 rounded-full bg-zinc-100 group-hover:bg-teal-50 text-zinc-500 group-hover:text-teal text-xs font-bold flex items-center justify-center transition-colors mt-0.5">
                            {i + 1}
                          </span>
                          <p className="flex-1 text-sm text-zinc-700 leading-relaxed text-left">{hook}</p>
                          <span className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-lg transition-all ${
                            copied === i
                              ? "bg-green-50 text-green-700"
                              : "bg-zinc-100 text-zinc-500 opacity-0 group-hover:opacity-100"
                          }`}>
                            {copied === i ? "✓ Copied" : "Copy"}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </FadeUp>

          {/* Explanation */}
          <FadeUp className="mt-8">
            <div className="bg-white rounded-2xl border border-zinc-100 p-6">
              <h3 className="text-sm font-semibold text-zinc-800 mb-3">How these hooks work</h3>
              <p className="text-sm text-zinc-500 leading-relaxed mb-4">
                These 10 patterns are built on the most consistently high-performing LinkedIn hook structures: contrarian framing, numbered lists, personal revelation, experience distillation, and curiosity gaps. Each pattern is designed to stop the scroll and earn the &ldquo;see more&rdquo; click.
              </p>
              <p className="text-sm text-zinc-500 leading-relaxed">
                For unlimited hooks trained on your specific voice, tone, and top-performing posts, try the full Qalam platform free for 7 days.
              </p>
            </div>
          </FadeUp>

          {/* CTA */}
          <FadeUp className="mt-6">
            <div className="bg-teal rounded-2xl p-8 text-center">
              <p className="text-teal-200 text-sm font-semibold uppercase tracking-widest mb-3">Want hooks in your voice?</p>
              <h2 className="text-2xl font-bold text-white mb-2">
                The full platform generates hooks trained on what works for <em>your</em> audience.
              </h2>
              <p className="text-white/60 text-sm mb-6 max-w-md mx-auto">
                Voice Fingerprint. Post archive. Hook performance tracking. $19/month — 7-day free trial.
              </p>
              <Link
                href={`${APP_ORIGIN}/auth/sign-up?plan=pro`}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-white font-bold rounded-xl hover:bg-gold-600 transition-colors shadow-lg"
              >
                Start Free Trial →
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  )
}
