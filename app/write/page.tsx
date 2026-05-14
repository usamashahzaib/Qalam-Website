"use client"

import { useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { HookCard } from "@/components/HookCard"
import {
  AnalyticsIcon,
  BrandMarkIcon,
  CalendarIcon,
  CommentIcon,
  ComposeIcon,
  LibraryIcon,
  LinkedInIcon,
  ProfileIcon,
  RepostIcon,
  VoiceIcon,
} from "@/components/ui/qalam-icons"

const TONES = [
  { id: "witty", label: "Witty", desc: "Playful and clever" },
  { id: "professional", label: "Professional", desc: "Authoritative and polished" },
  { id: "bold", label: "Bold", desc: "Provocative and direct" },
  { id: "storytelling", label: "Storytelling", desc: "Narrative and personal" },
  { id: "direct", label: "Direct", desc: "Short and impactful" },
]

const SAMPLE_HOOKS = [
  "I tried 47 different LinkedIn strategies last year. Here is the only one that actually worked:",
  "Nobody tells you this when you start posting on LinkedIn. I wish someone had told me sooner.",
  "Hot take: the best LinkedIn posts are written in 10 minutes, not 2 hours. Here is why.",
  "I was embarrassed to post on LinkedIn. Then I realized everyone else was too, and that changed everything.",
  "Stop optimizing for followers. Start optimizing for this one metric instead:",
]

const SAMPLE_POST = `I was embarrassed to post on LinkedIn. Then I realized everyone else was too, and that changed everything.

For 2 years, I had a half-drafted post sitting in my notes. Every time I opened it, I'd think:

"Who am I to share this?"
"What if people judge me?"
"My ideas are not that original."

Then I read a stat that stopped me cold: 99% of LinkedIn users only consume content. They never post.

That means you are not competing with millions of creators. You are competing with 1% of users.

Your imperfect ideas, shared consistently, will always beat the perfect post that never gets written.

I pressed publish that day.

That post got 14,000 impressions and 200+ connections.

The lesson: done is infinitely better than perfect.

Start before you are ready.`

const SIDEBAR_ITEMS = [
  { label: "Write Post", href: "/write", active: true, icon: ComposeIcon },
  { label: "My Posts", href: "/dashboard", active: false, icon: LibraryIcon },
  { label: "Voice Profile", href: "/dashboard/voice", active: false, icon: VoiceIcon },
  { label: "Content Library", href: "/dashboard/library", active: false, icon: LibraryIcon },
  { label: "Scheduled", href: "/dashboard/scheduled", active: false, icon: CalendarIcon },
  { label: "Analytics", href: "/dashboard/analytics", active: false, icon: AnalyticsIcon },
  { label: "Settings", href: "/dashboard/settings", active: false, icon: ProfileIcon },
]

export default function WritePage() {
  const [topic, setTopic] = useState("")
  const [selectedTone, setSelectedTone] = useState("bold")
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [selectedHook, setSelectedHook] = useState(0)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleGenerate = () => {
    if (!topic.trim()) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setGenerated(true)
    }, 1800)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(SAMPLE_POST)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex min-h-screen bg-zinc-50 font-jakarta">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-zinc-100 bg-white md:flex">
        <div className="border-b border-zinc-100 px-6 py-5">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal">
              <BrandMarkIcon className="h-4 w-4 text-gold" />
            </div>
            <span className="text-lg font-bold text-teal">Qalam</span>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {SIDEBAR_ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                  item.active ? "bg-teal text-white shadow-sm" : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-3 border-t border-zinc-100 px-4 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal text-sm font-bold text-white">SC</div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-zinc-900">Sarah Chen</p>
            <p className="truncate text-xs text-zinc-400">Free Plan · 3/5 posts</p>
          </div>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-100 bg-white/80 px-6 py-4 backdrop-blur-sm">
          <div>
            <h1 className="text-lg font-bold text-zinc-900">AI Post Writer</h1>
            <p className="text-xs text-zinc-400">Enter a topic, pick a tone, and let Qalam draft the first version.</p>
          </div>
          <Link href="/dashboard" className="flex items-center gap-1 text-sm text-zinc-500 transition-colors hover:text-zinc-900">
            Back to dashboard
          </Link>
        </div>

        <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
          <div className="w-full shrink-0 overflow-y-auto border-r border-zinc-100 bg-white lg:w-[380px]">
            <div className="space-y-6 p-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-zinc-800">What do you want to post about?</label>
                <textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. How I grew from 0 to 10K LinkedIn followers in 6 months..."
                  rows={4}
                  className="w-full resize-none rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-800 placeholder-zinc-400 transition-all focus:border-teal/50 focus:outline-none focus:ring-2 focus:ring-teal/30"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm font-semibold text-zinc-800">Select Tone</label>
                <div className="grid grid-cols-1 gap-2">
                  {TONES.map((tone) => (
                    <button
                      key={tone.id}
                      onClick={() => setSelectedTone(tone.id)}
                      className={`rounded-xl border-2 px-4 py-3 text-left transition-all ${
                        selectedTone === tone.id ? "border-teal bg-teal-50" : "border-zinc-100 bg-white hover:border-zinc-200"
                      }`}
                    >
                      <p className={`text-sm font-semibold ${selectedTone === tone.id ? "text-teal" : "text-zinc-800"}`}>{tone.label}</p>
                      <p className="text-xs text-zinc-400">{tone.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-teal/20 bg-teal-50 p-4">
                <div>
                  <p className="text-sm font-semibold text-teal">Use My Voice</p>
                  <p className="mt-0.5 text-xs text-zinc-500">Write in your trained voice profile</p>
                </div>
                <button onClick={() => setVoiceEnabled((v) => !v)} className={`relative h-6 w-12 rounded-full transition-colors ${voiceEnabled ? "bg-teal" : "bg-zinc-300"}`}>
                  <motion.div animate={{ x: voiceEnabled ? 24 : 2 }} transition={{ type: "spring", stiffness: 500, damping: 35 }} className="absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm" />
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleGenerate}
                disabled={!topic.trim() || loading}
                className={`w-full rounded-xl py-4 text-base font-bold text-white transition-all ${
                  !topic.trim() ? "cursor-not-allowed bg-zinc-300" : "pulse-gold bg-teal shadow-[0_4px_20px_rgba(13,74,69,0.35)] hover:bg-teal-600"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="inline-block h-4 w-4 rounded-full border-2 border-white/30 border-t-white" />
                    Generating...
                  </span>
                ) : (
                  "Generate Post"
                )}
              </motion.button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto bg-zinc-50">
            <AnimatePresence mode="wait">
              {!generated ? (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-full flex-col items-center justify-center p-12 text-center">
                  <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border border-zinc-100 bg-white shadow-sm">
                    <ComposeIcon className="h-8 w-8 text-teal" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-zinc-700">Your post will appear here</h3>
                  <p className="max-w-xs text-sm leading-relaxed text-zinc-400">Enter a topic on the left, choose your tone, and generate a working first draft.</p>
                </motion.div>
              ) : (
                <motion.div key="result" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }} className="space-y-6 p-6">
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-sm font-bold text-zinc-800">Choose your opening hook</h3>
                      <span className="rounded-md bg-zinc-100 px-2 py-1 text-xs text-zinc-400">5 options</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      {SAMPLE_HOOKS.map((hook, i) => (
                        <HookCard key={i} index={i} text={hook} selected={selectedHook === i} onSelect={() => setSelectedHook(i)} />
                      ))}
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
                    <div className="flex items-start gap-3 border-b border-zinc-100 p-5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal text-sm font-bold text-white">SC</div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-zinc-900">Sarah Chen</p>
                        <p className="text-xs text-zinc-400">Head of Marketing · 1st · Just now</p>
                      </div>
                      <div className="text-xs text-zinc-400">···</div>
                    </div>

                    <div className="p-5">
                      <p className="whitespace-pre-line text-sm leading-relaxed text-zinc-800">
                        {SAMPLE_HOOKS[selectedHook]}
                        {"\n\n"}
                        {SAMPLE_POST.split("\n").slice(2).join("\n")}
                      </p>
                    </div>

                    <div className="flex items-center gap-6 border-t border-zinc-100 px-5 py-3 text-xs text-zinc-500">
                      <span className="inline-flex items-center gap-1.5"><AnalyticsIcon className="h-3.5 w-3.5" /> Like</span>
                      <span className="inline-flex items-center gap-1.5"><CommentIcon className="h-3.5 w-3.5" /> Comment</span>
                      <span className="inline-flex items-center gap-1.5"><RepostIcon className="h-3.5 w-3.5" /> Repost</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleCopy} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-teal py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-600">
                      {copied ? "Copied" : "Copy Post"}
                    </motion.button>
                    <button className="flex-1 rounded-xl border border-zinc-200 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50">
                      Save Draft
                    </button>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#0A66C2] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#085fa8]">
                      <LinkedInIcon className="h-4 w-4" />
                      Share on LinkedIn
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
