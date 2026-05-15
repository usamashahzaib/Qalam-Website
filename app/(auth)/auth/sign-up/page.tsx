"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useAuth } from "@/components/providers/AuthProvider"
import { AnalyticsIcon, ArchiveIcon, BrandMarkIcon, LinkedInIcon, VoiceIcon } from "@/components/ui/qalam-icons"

const SOCIAL_PROOF = ["No credit card required", "Voice Profile starts on paid plans", "Free forever plan"]

export default function SignupPage() {
  const router = useRouter()
  const { login, beginLinkedInAuth } = useAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const nextPath = useMemo(() => {
    if (typeof window === "undefined") return "/dashboard"
    const next = new URLSearchParams(window.location.search).get("next")
    return next && next.startsWith("/") ? next : "/dashboard"
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreed) return
    setLoading(true)
    setError(null)
    try {
      await login({ name, email })
      router.push(nextPath)
    } catch (err) {
      setError((err as Error).message || "Sign-up failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen font-jakarta">
      <div className="relative order-2 hidden w-1/2 flex-col justify-between overflow-hidden bg-teal-800 p-12 lg:flex">
        <div className="absolute right-[-10%] top-[-20%] h-[500px] w-[500px] rounded-full opacity-20 mesh-blob" style={{ background: "radial-gradient(circle, rgba(201,135,31,0.4) 0%, transparent 70%)", ["--dur" as string]: "20s" }} />
        <div className="absolute bottom-[-20%] left-[-10%] h-[400px] w-[400px] rounded-full opacity-25 mesh-blob" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)", ["--dur" as string]: "16s" }} />

        <Link href="/" className="relative z-10 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10">
            <BrandMarkIcon className="h-4 w-4 text-gold" />
          </div>
          <span className="text-xl font-bold text-white">Qalam</span>
        </Link>

        <div className="relative z-10 space-y-8">
          <div>
            <h2 className="mb-3 text-4xl font-extrabold leading-tight text-white">
              Start building your
              <br />
              <span className="text-gold">content system</span>
              <br />
              today.
            </h2>
            <p className="font-cormorant text-xl italic leading-relaxed text-white/60">
              LinkedIn creates the real connected account. Email creates a local dev session for now.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {[
              { icon: VoiceIcon, label: "Voice Profile", value: "Available after sign-up on paid-plan workflows" },
              { icon: ArchiveIcon, label: "Post archive", value: "Workspace ownership comes from the signed session" },
              { icon: AnalyticsIcon, label: "Product routes", value: "Dashboard, writer, calendar, library, and settings are live" },
            ].map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-gold">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs text-white/60">{stat.label}</p>
                    <p className="text-xl font-bold text-white">{stat.value}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="order-1 flex flex-1 items-center justify-center bg-white px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="w-full max-w-[420px]">
          <Link href="/" className="mb-10 flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal">
              <BrandMarkIcon className="h-4 w-4 text-gold" />
            </div>
            <span className="text-xl font-bold text-teal">Qalam</span>
          </Link>

          <h1 className="mb-1 text-3xl font-extrabold text-zinc-900">Create your account</h1>
          <p className="mb-6 text-zinc-500">
            Already have an account?{" "}
            <Link href="/auth" className="font-semibold text-teal hover:underline">
              Sign in
            </Link>
          </p>

          <div className="mb-7 flex flex-wrap gap-2">
            {SOCIAL_PROOF.map((proof) => (
              <span key={proof} className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs text-zinc-600">
                {proof}
              </span>
            ))}
          </div>

          <div className="mb-7 flex flex-col gap-3">
            <button disabled className="flex w-full items-center justify-center gap-3 rounded-xl border border-zinc-200 py-3 text-sm font-semibold text-zinc-400 opacity-60">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M17.64 9.2A10.34 10.34 0 0 0 17.52 8H9v3.47h4.84A4.14 4.14 0 0 1 12.08 13.7v2.26h2.8C16.52 14.42 17.64 12 17.64 9.2Z" fill="#4285F4" />
                <path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.79-2.18c-.8.54-1.81.86-3.17.86-2.44 0-4.5-1.65-5.23-3.87H.89v2.26A8.97 8.97 0 0 0 9 18Z" fill="#34A853" />
                <path d="M3.77 10.63A5.4 5.4 0 0 1 3.49 9c0-.56.1-1.1.28-1.63V5.1H.89A9 9 0 0 0 0 9c0 1.45.35 2.82.89 4.06l2.88-2.43Z" fill="#FBBC05" />
                <path d="M9 3.58c1.32 0 2.5.45 3.44 1.34l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .89 5.1l2.88 2.27C4.5 5.23 6.56 3.58 9 3.58Z" fill="#EA4335" />
              </svg>
              Google not wired yet
            </button>
            <button onClick={() => beginLinkedInAuth(nextPath)} className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#0A66C2] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#085fa8]">
              <LinkedInIcon className="h-4 w-4" />
              Sign up with LinkedIn
            </button>
          </div>

          <div className="mb-7 flex items-center gap-3">
            <div className="h-px flex-1 bg-zinc-100" />
            <span className="text-xs font-medium text-zinc-400">or create local email session</span>
            <div className="h-px flex-1 bg-zinc-100" />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-zinc-700">Full name</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Sarah Chen" className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 transition-all focus:border-teal/50 focus:outline-none focus:ring-2 focus:ring-teal/30" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-zinc-700">Work email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 transition-all focus:border-teal/50 focus:outline-none focus:ring-2 focus:ring-teal/30" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-zinc-700">Password</label>
              <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Accepted but not verified yet" className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 transition-all focus:border-teal/50 focus:outline-none focus:ring-2 focus:ring-teal/30" />
            </div>

            <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-800">
              Email/password still creates a signed local session only. Full credential auth migration is separate from this pass.
            </p>

            <label className="flex cursor-pointer items-start gap-3">
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 rounded border-zinc-300 text-teal accent-teal" />
              <span className="text-xs leading-relaxed text-zinc-500">
                I agree to the <Link href="/terms" className="text-teal underline underline-offset-2">Terms of Service</Link> and <Link href="/privacy" className="text-teal underline underline-offset-2">Privacy Policy</Link>. I&apos;m okay with Qalam sending me product updates.
              </span>
            </label>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} type="submit" disabled={!agreed || loading} className="mt-2 w-full rounded-xl bg-teal py-3.5 text-sm font-bold text-white shadow-[0_4px_20px_rgba(13,74,69,0.3)] transition-colors hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-50">
              {loading ? "Creating account..." : "Create Free Account"}
            </motion.button>
          </form>

          <p className="mt-5 text-center text-xs text-zinc-400">No credit card required - cancel anytime</p>
        </motion.div>
      </div>
    </div>
  )
}
