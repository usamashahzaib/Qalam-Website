"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { FadeUp } from "@/components/FadeUp"

const APP_ORIGIN = (process.env.NEXT_PUBLIC_APP_URL || "https://app.byqalam.com").replace(/\/$/, "")

type FormulaSignal = { label: string; present: boolean; weight: number; note: string }

function analyzePost(text: string): { signals: FormulaSignal[]; hookType: string; verdict: string } {
  const lower = text.toLowerCase()
  const sentences = text.split(/[.!?]+/).filter(Boolean)
  const firstSentence = sentences[0] || ""
  const wordCount = text.trim().split(/\s+/).length
  const hasNumber = /\d+/.test(firstSentence)
  const isContrarian = /hot take|nobody|most people|wrong|myth|stop|counterintuitive|unpopular/i.test(firstSentence)
  const isStory = /i (was|am|spent|learned|realized|discovered|tried|failed|quit|started)/i.test(firstSentence)
  const isQuestion = firstSentence.trim().endsWith("?")
  const hasListStructure = /\n\d+[.\)]/m.test(text) || (text.match(/^\d+\./gm) || []).length >= 3
  const hasBreaks = (text.match(/\n\n/g) || []).length >= 2
  const hasCTA = /repost|comment|share|follow|save this|tag someone|let me know/i.test(text)
  const hasPersonalStory = /i (was|am|used to|remember|once)/i.test(text)
  const isGoodLength = wordCount >= 80 && wordCount <= 350

  const hookType = isContrarian ? "Contrarian" : isStory ? "Personal story" : isQuestion ? "Question" : hasNumber ? "Data/number" : "Statement"

  const signals: FormulaSignal[] = [
    { label: "Strong opening hook", present: isContrarian || isStory || isQuestion || hasNumber, weight: 3, note: hookType + " hook detected in first line" },
    { label: "Short line breaks for scannability", present: hasBreaks, weight: 2, note: hasBreaks ? "Good use of white space — easy to read on mobile" : "Dense paragraphs lose readers — add more line breaks" },
    { label: "List or structured body", present: hasListStructure, weight: 1, note: hasListStructure ? "Numbered or bulleted structure improves retention" : "Consider a list format for key points" },
    { label: "Personal experience or perspective", present: hasPersonalStory, weight: 2, note: hasPersonalStory ? "Personal framing builds connection and credibility" : "Adding a personal angle increases engagement" },
    { label: "Optimal length (80–350 words)", present: isGoodLength, weight: 2, note: isGoodLength ? `${wordCount} words — good for LinkedIn engagement` : wordCount < 80 ? `${wordCount} words — too short for algorithm depth` : `${wordCount} words — consider trimming for mobile readers` },
    { label: "Call to action", present: hasCTA, weight: 1, note: hasCTA ? "Good — you invite engagement" : "Adding a CTA (repost, comment, follow) lifts reach" },
  ]

  const totalWeight = signals.reduce((sum, s) => sum + s.weight, 0)
  const earnedWeight = signals.filter((s) => s.present).reduce((sum, s) => sum + s.weight, 0)
  const ratio = earnedWeight / totalWeight

  const verdict = ratio >= 0.8 ? "Strong formula — this post is built to reach." : ratio >= 0.6 ? "Solid foundation — a few tweaks would push this further." : ratio >= 0.4 ? "Partial formula — good elements, but missing key drivers." : "Weak signal — this post needs structural work to perform."

  return { signals, hookType, verdict }
}

export default function ViralCheckerPage() {
  const [post, setPost] = useState("")
  const [result, setResult] = useState<ReturnType<typeof analyzePost> | null>(null)

  return (
    <div className="pt-24 min-h-screen bg-zinc-50">
      <section className="py-16 px-6 bg-white border-b border-zinc-100 relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(13,74,69,0.2) 0%, transparent 70%)" }}
        />
        <div className="max-w-[760px] mx-auto relative z-10">
          <FadeUp>
            <Link href="/free-tools" className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-teal transition-colors mb-6">
              ← All Free Tools
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-2xl">🔬</div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 mb-4 leading-tight">
              Viral Formula Checker
            </h1>
            <p className="text-zinc-500 text-lg leading-relaxed max-w-xl">
              Paste any LinkedIn post and get a structural breakdown — which engagement signals are present and which are missing. Pattern analysis, no AI guessing.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-[760px] mx-auto space-y-6">
          <FadeUp>
            <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-zinc-100">
                <label className="block text-sm font-semibold text-zinc-800 mb-2">Paste your LinkedIn post</label>
                <textarea
                  value={post}
                  onChange={(e) => setPost(e.target.value)}
                  placeholder="Paste the full text of the post you want to analyze..."
                  rows={7}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/50 resize-none transition-all"
                />
                <div className="flex items-center justify-between mt-3">
                  <p className="text-xs text-zinc-400">{post.trim().split(/\s+/).filter(Boolean).length} words</p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => post.trim() && setResult(analyzePost(post))}
                    disabled={!post.trim()}
                    className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                      post.trim() ? "bg-teal text-white hover:bg-teal-600 shadow-sm" : "bg-zinc-200 text-zinc-400 cursor-not-allowed"
                    }`}
                  >
                    Analyze Formula
                  </motion.button>
                </div>
              </div>

              <AnimatePresence>
                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="p-6 space-y-5"
                  >
                    <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-100">
                      <p className="text-xs text-zinc-400 uppercase tracking-widest font-semibold mb-1">Verdict</p>
                      <p className="text-sm font-semibold text-zinc-800">{result.verdict}</p>
                    </div>

                    <div className="space-y-3">
                      {result.signals.map((signal) => (
                        <div key={signal.label} className="flex items-start gap-3">
                          <span className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${signal.present ? "bg-green-100 text-green-700" : "bg-zinc-100 text-zinc-400"}`}>
                            {signal.present ? "✓" : "○"}
                          </span>
                          <div>
                            <p className="text-sm font-medium text-zinc-800">{signal.label}</p>
                            <p className="text-xs text-zinc-500 mt-0.5">{signal.note}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </FadeUp>

          <FadeUp>
            <div className="bg-teal rounded-2xl p-8 text-center">
              <p className="text-teal-200 text-sm font-semibold uppercase tracking-widest mb-3">Write posts with these patterns built in</p>
              <h2 className="text-2xl font-bold text-white mb-2">Qalam generates posts that check the right boxes in your voice.</h2>
              <p className="text-white/60 text-sm mb-6 max-w-md mx-auto">Unlimited posts. Voice training. Hook variations. 7-day free trial.</p>
              <Link
                href={`${APP_ORIGIN}/auth/sign-up`}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-white font-bold rounded-xl hover:bg-gold-600 transition-colors shadow-lg"
              >
                Start Writing Free →
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  )
}
