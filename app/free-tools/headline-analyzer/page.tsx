"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { FadeUp } from "@/components/FadeUp"

const APP_ORIGIN = (process.env.NEXT_PUBLIC_APP_URL || "https://app.byqalam.com").replace(/\/$/, "")

const POWER_WORDS = ["best", "proven", "secret", "ultimate", "top", "essential", "critical", "rare", "honest", "real", "direct", "simple", "clear", "fast", "deep"]
const ACTION_WORDS = ["build", "grow", "lead", "fix", "learn", "ship", "hire", "scale", "drive", "create", "manage", "run", "launch", "close", "win"]

function scoreHeadline(headline: string): { score: number; signals: { label: string; pass: boolean; note: string }[] } {
  const words = headline.trim().split(/\s+/)
  const lower = headline.toLowerCase()
  const wordCount = words.length
  const hasPowerWord = POWER_WORDS.some((w) => lower.includes(w))
  const hasActionWord = ACTION_WORDS.some((w) => lower.includes(w))
  const hasNumber = /\d/.test(headline)
  const hasSpecialty = headline.includes("|") || headline.includes("·") || headline.includes("@") || headline.includes("—")
  const notTooLong = wordCount <= 12
  const notTooShort = wordCount >= 4
  const hasRole = /manager|director|lead|founder|head|vp|ceo|cto|consultant|engineer|designer|analyst/i.test(headline)

  const signals = [
    { label: "4–12 words", pass: notTooLong && notTooShort, note: notTooShort ? (notTooLong ? "Good length for scannability" : "Too long — trim to under 12 words") : "Too short — add more context" },
    { label: "Contains a power or action word", pass: hasPowerWord || hasActionWord, note: hasPowerWord || hasActionWord ? "Adds credibility or momentum" : "Add a strong verb or descriptor (build, lead, drive, proven, etc.)" },
    { label: "Includes a number or specific detail", pass: hasNumber, note: hasNumber ? "Specificity builds trust" : "Consider adding a number (years of experience, clients, results)" },
    { label: "Uses a separator to show multiple dimensions", pass: hasSpecialty, note: hasSpecialty ? "Clear structure helps the eye" : "Try 'Role | Specialty | Who you help' format" },
    { label: "Includes your role or domain", pass: hasRole, note: hasRole ? "Immediately contextualises who you are" : "Make your title or domain explicit" },
  ]

  const passed = signals.filter((s) => s.pass).length
  const score = Math.round((passed / signals.length) * 100)
  return { score, signals }
}

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 80 ? "text-green-700 bg-green-50 border-green-200" : score >= 60 ? "text-amber-700 bg-amber-50 border-amber-200" : "text-red-700 bg-red-50 border-red-200"
  const label = score >= 80 ? "Strong" : score >= 60 ? "Solid" : "Needs work"
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border font-semibold text-sm ${color}`}>
      <span className="text-2xl font-extrabold">{score}</span>
      <div>
        <p className="leading-none">{label}</p>
        <p className="text-xs font-normal opacity-70">out of 100</p>
      </div>
    </div>
  )
}

export default function HeadlineAnalyzerPage() {
  const [headline, setHeadline] = useState("")
  const [result, setResult] = useState<ReturnType<typeof scoreHeadline> | null>(null)

  const handleAnalyze = () => {
    if (!headline.trim()) return
    setResult(scoreHeadline(headline))
  }

  return (
    <div className="pt-24 min-h-screen bg-zinc-50">
      <section className="py-16 px-6 bg-white border-b border-zinc-100 relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(201,135,31,0.2) 0%, transparent 70%)" }}
        />
        <div className="max-w-[760px] mx-auto relative z-10">
          <FadeUp>
            <Link href="/free-tools" className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-teal transition-colors mb-6">
              ← All Free Tools
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-2xl">📰</div>
              <span className="chip border-teal/30 text-teal bg-teal-50 text-xs">Popular</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 mb-4 leading-tight">LinkedIn Headline Analyzer</h1>
            <p className="text-zinc-500 text-lg leading-relaxed max-w-xl">
              Paste your current LinkedIn headline and get an instant score across five proven dimensions — with specific suggestions to improve it.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-[760px] mx-auto space-y-6">
          <FadeUp>
            <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-zinc-100">
                <label className="block text-sm font-semibold text-zinc-800 mb-2">Your LinkedIn headline</label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                    placeholder="e.g. Helping SaaS founders hire better | Talent Lead at Acme"
                    className="flex-1 px-4 py-3 rounded-xl border border-zinc-200 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/50 transition-all"
                  />
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleAnalyze}
                    disabled={!headline.trim()}
                    className={`px-5 py-3 rounded-xl font-semibold text-sm transition-all shrink-0 ${
                      headline.trim() ? "bg-teal text-white hover:bg-teal-600 shadow-sm" : "bg-zinc-200 text-zinc-400 cursor-not-allowed"
                    }`}
                  >
                    Analyze
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
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold mb-1">Headline score</p>
                        <ScoreBadge score={result.score} />
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-zinc-400">{headline.length} characters</p>
                        <p className="text-xs text-zinc-400">{headline.trim().split(/\s+/).length} words</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {result.signals.map((signal) => (
                        <div key={signal.label} className="flex items-start gap-3">
                          <span className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${signal.pass ? "bg-green-100 text-green-700" : "bg-red-50 text-red-600"}`}>
                            {signal.pass ? "✓" : "✕"}
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
              <p className="text-teal-200 text-sm font-semibold uppercase tracking-widest mb-3">Write content that matches your headline</p>
              <h2 className="text-2xl font-bold text-white mb-2">A strong headline builds the promise. Qalam helps you keep it.</h2>
              <p className="text-white/60 text-sm mb-6 max-w-md mx-auto">Your Voice Profile, post archive, and performance analytics — all in one place. 7-day free trial.</p>
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
