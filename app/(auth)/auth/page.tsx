"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useAuth } from "@/components/providers/AuthProvider"
import { ArchiveIcon, BrandMarkIcon, CheckIcon, LinkedInIcon, VoiceIcon } from "@/components/ui/qalam-icons"

export default function LoginPage() {
  const router = useRouter()
  const { login, beginLinkedInAuth } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const authQuery = useMemo(() => {
    if (typeof window === "undefined") return { nextPath: "/dashboard", linkedInFailed: false }
    const params = new URLSearchParams(window.location.search)
    const next = params.get("next")
    return {
      nextPath: next && next.startsWith("/") ? next : "/dashboard",
      linkedInFailed: params.get("linkedin") === "failed",
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const name = email.split("@")[0] || "User"
      await login({ name, email })
      router.push(authQuery.nextPath)
    } catch (err) {
      setError((err as Error).message || "Sign-in failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen font-jakarta">
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-teal p-12 lg:flex">
        <div className="absolute right-[-10%] top-[-20%] h-[500px] w-[500px] rounded-full opacity-25 mesh-blob" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)", ["--dur" as string]: "18s" }} />
        <div className="absolute bottom-[-20%] left-[-10%] h-[400px] w-[400px] rounded-full opacity-20 mesh-blob" style={{ background: "radial-gradient(circle, rgba(201,135,31,0.4) 0%, transparent 70%)", ["--dur" as string]: "22s", animationDelay: "5s" }} />

        <Link href="/" className="relative z-10 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10">
            <BrandMarkIcon className="h-4 w-4 text-gold" />
          </div>
          <span className="text-xl font-bold text-white">Qalam</span>
        </Link>

        <div className="relative z-10">
          <p className="mb-6 font-cormorant text-3xl italic leading-relaxed text-white/90">
            Write in your own voice. Keep every draft, edit, and performance signal in one place.
          </p>
          <div className="space-y-4">
            {[
              { icon: VoiceIcon, text: "LinkedIn sign-in creates the real connected session" },
              { icon: ArchiveIcon, text: "Email sign-in is local-dev only until full auth migration" },
              { icon: CheckIcon, text: "Workspace ownership now comes from the signed server session" },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.text} className="flex items-start gap-3 text-sm text-white/72">
                  <Icon className="mt-0.5 h-4 w-4 text-gold" />
                  <span>{item.text}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center bg-white px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="w-full max-w-[420px]">
          <Link href="/" className="mb-10 flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal">
              <BrandMarkIcon className="h-4 w-4 text-gold" />
            </div>
            <span className="text-xl font-bold text-teal">Qalam</span>
          </Link>

          <h1 className="mb-2 text-3xl font-extrabold text-zinc-900">Welcome back</h1>
          <p className="mb-8 text-zinc-500">
            Don&apos;t have an account?{" "}
            <Link href="/auth/sign-up" className="font-semibold text-teal hover:underline">
              Sign up free
            </Link>
          </p>

          <div className="mb-8 flex flex-col gap-3">
            <button disabled className="flex w-full items-center justify-center gap-3 rounded-xl border border-zinc-200 py-3 text-sm font-semibold text-zinc-400 opacity-60">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M17.64 9.2A10.34 10.34 0 0 0 17.52 8H9v3.47h4.84A4.14 4.14 0 0 1 12.08 13.7v2.26h2.8C16.52 14.42 17.64 12 17.64 9.2Z" fill="#4285F4" />
                <path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.79-2.18c-.8.54-1.81.86-3.17.86-2.44 0-4.5-1.65-5.23-3.87H.89v2.26A8.97 8.97 0 0 0 9 18Z" fill="#34A853" />
                <path d="M3.77 10.63A5.4 5.4 0 0 1 3.49 9c0-.56.1-1.1.28-1.63V5.1H.89A9 9 0 0 0 0 9c0 1.45.35 2.82.89 4.06l2.88-2.43Z" fill="#FBBC05" />
                <path d="M9 3.58c1.32 0 2.5.45 3.44 1.34l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .89 5.1l2.88 2.27C4.5 5.23 6.56 3.58 9 3.58Z" fill="#EA4335" />
              </svg>
              Google not wired yet
            </button>
            <button onClick={() => beginLinkedInAuth(authQuery.nextPath)} className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#0A66C2] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#085fa8]">
              <LinkedInIcon className="h-4 w-4" />
              Continue with LinkedIn
            </button>
          </div>

          {authQuery.linkedInFailed && (
            <p className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs leading-relaxed text-red-700">
              LinkedIn authentication did not complete. Please try again.
            </p>
          )}

          <div className="mb-8 flex items-center gap-3">
            <div className="h-px flex-1 bg-zinc-100" />
            <span className="text-xs font-medium text-zinc-400">or continue with local email session</span>
            <div className="h-px flex-1 bg-zinc-100" />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-zinc-700">Email address</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 transition-all focus:border-teal/50 focus:outline-none focus:ring-2 focus:ring-teal/30" />
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-sm font-semibold text-zinc-700">Password</label>
                <Link href="/contact" className="text-xs text-teal hover:underline">Contact support</Link>
              </div>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Accepted but not verified yet" className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 transition-all focus:border-teal/50 focus:outline-none focus:ring-2 focus:ring-teal/30" />
            </div>

            <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-800">
              Email/password currently creates a signed local session only. Use LinkedIn for the real connected auth path.
            </p>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} type="submit" disabled={loading} className="mt-2 w-full rounded-xl bg-teal py-3.5 text-sm font-bold text-white shadow-[0_4px_20px_rgba(13,74,69,0.3)] transition-colors hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-70">
              {loading ? "Signing in..." : "Sign In"}
            </motion.button>
          </form>

          <p className="mt-6 text-center text-xs text-zinc-400">
            By signing in, you agree to our <Link href="/terms" className="underline hover:text-zinc-600">Terms</Link> and <Link href="/privacy" className="underline hover:text-zinc-600">Privacy Policy</Link>.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
