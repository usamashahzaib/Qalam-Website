"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { FadeUp } from "@/components/FadeUp"

type Slide = { title: string; body: string }

function buildSlides(text: string): Slide[] {
  const cleaned = text.trim()
  const chunks = cleaned
    .split(/\n+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 6)

  if (!chunks.length) return []

  const [first, ...rest] = chunks
  return [
    { title: "Cover", body: first },
    ...rest.map((part, i) => ({
      title: `Slide ${i + 2}`,
      body: part,
    })),
    { title: "Close", body: "End with a clear takeaway or CTA." },
  ].slice(0, 8)
}

export default function CarouselBuilderPage() {
  const [text, setText] = useState("")
  const [slides, setSlides] = useState<Slide[]>([])

  return (
    <div className="pt-24 min-h-screen bg-zinc-50">
      <section className="py-16 px-6 bg-white border-b border-zinc-100">
        <div className="max-w-[760px] mx-auto">
          <FadeUp>
            <Link href="/free-tools" className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-teal transition-colors mb-6">
              ← All Free Tools
            </Link>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 mb-4">Carousel Builder</h1>
            <p className="text-zinc-500 text-lg leading-relaxed max-w-xl">
              Paste a post or outline and turn it into a simple carousel structure. This builds the
              narrative skeleton, not final visual design.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-[900px] mx-auto space-y-6">
          <FadeUp>
            <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-6">
              <label className="block text-sm font-semibold text-zinc-800 mb-2">Source text</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={8}
                placeholder="Paste a post, thread, or outline..."
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/50 resize-none transition-all"
              />
              <div className="flex justify-end mt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => text.trim() && setSlides(buildSlides(text))}
                  disabled={!text.trim()}
                  className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all ${text.trim() ? "bg-teal text-white hover:bg-teal-600" : "bg-zinc-200 text-zinc-400 cursor-not-allowed"}`}
                >
                  Build Carousel Outline
                </motion.button>
              </div>
            </div>
          </FadeUp>

          <AnimatePresence>
            {slides.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {slides.map((slide, i) => (
                  <div key={`${slide.title}-${i}`} className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-6 min-h-44">
                    <p className="text-xs font-semibold uppercase tracking-widest text-teal mb-3">{slide.title}</p>
                    <p className="text-lg font-bold text-zinc-900 mb-3 leading-snug">{slide.body}</p>
                    <p className="text-xs text-zinc-400">Keep each slide to one clear point.</p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}
