"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { FadeUp } from "@/components/FadeUp"

const APP_ORIGIN = (process.env.NEXT_PUBLIC_APP_URL || "https://app.byqalam.com").replace(/\/$/, "")

const QUESTIONS = [
  { id: "photo", label: "Do you have a professional profile photo?", weight: 15 },
  { id: "banner", label: "Do you have a custom LinkedIn banner?", weight: 8 },
  { id: "headline_specific", label: "Does your headline say more than just your job title?", weight: 12 },
  { id: "about_length", label: "Is your About section longer than 200 words?", weight: 10 },
  { id: "about_first_person", label: "Does your About section use first-person voice (I, my)?", weight: 8 },
  { id: "featured", label: "Do you have something in your Featured section?", weight: 8 },
  { id: "posting", label: "Have you posted on LinkedIn in the last 30 days?", weight: 15 },
  { id: "recommendations", label: "Do you have 3 or more recommendations?", weight: 8 },
  { id: "skills", label: "Do you have 10 or more skills listed?", weight: 6 },
  { id: "contact", label: "Is your contact info (email or website) visible on your profile?", weight: 10 },
]

const IMPROVEMENTS: Record<string, string> = {
  photo: "A professional headshot increases profile views by up to 14×. Natural light, clear face, neutral background.",
  banner: "A custom banner signals intentionality. Use your headline, role, or a visual that reinforces your brand.",
  headline_specific: "Your headline is the most-read line on your profile. Add your specialty, who you help, or a result you've driven.",
  about_length: "Short About sections miss the SEO and credibility opportunity. Aim for 200–400 words that tell your story.",
  about_first_person: "Third-person About sections feel like a bio someone else wrote. First person is warmer and builds faster trust.",
  featured: "The Featured section is prime real estate. Pin your best post, a newsletter, or a link to your work.",
  posting: "LinkedIn rewards consistent publishers. Even one post per week significantly increases your profile visibility.",
  recommendations: "Recommendations are the most trusted signal on LinkedIn. Ask 3–5 people you've worked closely with.",
  skills: "Skills drive discoverability in LinkedIn search. Add your real competencies — don't game it, but fill it.",
  contact: "If someone can't contact you, they won't. Make it frictionless.",
}

export default function ProfileOptimizerPage() {
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({})
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = QUESTIONS.every((q) => answers[q.id] !== undefined && answers[q.id] !== null)

  const score = submitted
    ? QUESTIONS.filter((q) => answers[q.id] === true).reduce((sum, q) => sum + q.weight, 0)
    : 0

  const missed = submitted ? QUESTIONS.filter((q) => answers[q.id] === false) : []

  const verdict = score >= 85 ? "Excellent" : score >= 65 ? "Strong" : score >= 45 ? "Good start" : "Needs work"
  const verdictColor = score >= 85 ? "text-green-700" : score >= 65 ? "text-teal" : score >= 45 ? "text-amber-700" : "text-red-700"

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
              <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-2xl">👤</div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 mb-4 leading-tight">LinkedIn Profile Optimizer</h1>
            <p className="text-zinc-500 text-lg leading-relaxed max-w-xl">
              Answer 10 questions about your current profile and get a score with specific, actionable improvements. No sign-in needed.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-[760px] mx-auto space-y-6">
          <FadeUp>
            <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-zinc-100">
                <p className="text-sm font-semibold text-zinc-800">Your LinkedIn profile checklist</p>
                <p className="text-xs text-zinc-400 mt-0.5">Answer honestly based on your profile right now</p>
              </div>

              <div className="divide-y divide-zinc-50">
                {QUESTIONS.map((q, i) => (
                  <motion.div
                    key={q.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    className="px-6 py-4 flex items-center justify-between gap-4"
                  >
                    <p className="text-sm text-zinc-700 flex-1">{q.label}</p>
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => setAnswers((a) => ({ ...a, [q.id]: true }))}
                        className={`px-4 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          answers[q.id] === true
                            ? "bg-green-600 text-white border-green-600"
                            : "border-zinc-200 text-zinc-600 hover:border-green-400 hover:text-green-700"
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setAnswers((a) => ({ ...a, [q.id]: false }))}
                        className={`px-4 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          answers[q.id] === false
                            ? "bg-zinc-700 text-white border-zinc-700"
                            : "border-zinc-200 text-zinc-600 hover:border-zinc-400"
                        }`}
                      >
                        No
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="p-6 border-t border-zinc-100">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => allAnswered && setSubmitted(true)}
                  disabled={!allAnswered}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all ${
                    allAnswered ? "bg-teal text-white hover:bg-teal-600 shadow-sm" : "bg-zinc-200 text-zinc-400 cursor-not-allowed"
                  }`}
                >
                  {allAnswered ? "Get My Profile Score →" : `Answer all ${QUESTIONS.length} questions to continue`}
                </motion.button>
              </div>
            </div>
          </FadeUp>

          <AnimatePresence>
            {submitted && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-4">
                <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-xs text-zinc-400 uppercase tracking-widest font-semibold mb-1">Profile score</p>
                      <div className="flex items-baseline gap-2">
                        <span className={`text-5xl font-extrabold ${verdictColor}`}>{score}</span>
                        <span className="text-zinc-400 text-lg">/100</span>
                        <span className={`text-lg font-semibold ml-1 ${verdictColor}`}>{verdict}</span>
                      </div>
                    </div>
                    <div className="w-20 h-20 rounded-full border-4 border-zinc-100 flex items-center justify-center">
                      <span className="text-3xl font-extrabold text-zinc-800">{score}</span>
                    </div>
                  </div>

                  {missed.length > 0 && (
                    <div>
                      <p className="text-sm font-semibold text-zinc-800 mb-3">Where to focus next</p>
                      <div className="space-y-3">
                        {missed.map((q) => (
                          <div key={q.id} className="flex items-start gap-3 p-3 rounded-xl bg-amber-50 border border-amber-100">
                            <span className="shrink-0 text-amber-500 font-bold text-xs mt-0.5">+{q.weight}pts</span>
                            <div>
                              <p className="text-sm font-medium text-zinc-800">{q.label}</p>
                              <p className="text-xs text-zinc-500 mt-0.5">{IMPROVEMENTS[q.id]}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-teal rounded-2xl p-8 text-center">
                  <p className="text-teal-200 text-sm font-semibold uppercase tracking-widest mb-3">A strong profile deserves consistent content</p>
                  <h2 className="text-2xl font-bold text-white mb-2">Now build the content engine that matches your profile.</h2>
                  <p className="text-white/60 text-sm mb-6 max-w-md mx-auto">Voice training, post scheduling, and performance tracking — 7-day free trial.</p>
                  <Link
                    href={`${APP_ORIGIN}/auth/sign-up`}
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-white font-bold rounded-xl hover:bg-gold-600 transition-colors shadow-lg"
                  >
                    Start Writing Free →
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}
