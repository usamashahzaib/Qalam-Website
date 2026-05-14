"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion, useInView } from "framer-motion"
import {
  AnalyticsIcon,
  ArchiveIcon,
  BrandMarkIcon,
  CalendarIcon,
  ComposeIcon,
  GrowthIcon,
  LibraryIcon,
  ProfileIcon,
  VoiceIcon,
} from "@/components/ui/qalam-icons"

function useCountUp(end: number, duration = 1600) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let startTime: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, end, duration])

  return { count, ref }
}

const RECENT_POSTS = [
  {
    id: 1,
    preview: "I spent 3 years trying every LinkedIn strategy out there. None of them worked until I discovered this counterintuitive truth...",
    tone: "Storytelling",
    status: "published",
    impressions: "12,480",
    date: "2 hours ago",
  },
  {
    id: 2,
    preview: "Hot take: most LinkedIn advice is written by people who do not actually use LinkedIn. Here is what drives traction for me...",
    tone: "Bold",
    status: "scheduled",
    impressions: "—",
    date: "Tomorrow 9:00 AM",
  },
  {
    id: 3,
    preview: "Five things I learned from growing from 0 to 10K LinkedIn followers in six months.",
    tone: "Professional",
    status: "draft",
    impressions: "—",
    date: "Draft",
  },
]

const SIDEBAR_ITEMS = [
  { label: "Write Post", href: "/write", active: false, icon: ComposeIcon },
  { label: "My Posts", href: "/dashboard", active: true, icon: ArchiveIcon },
  { label: "Voice Profile", href: "/dashboard/voice", active: false, icon: VoiceIcon },
  { label: "Content Library", href: "/dashboard/library", active: false, icon: LibraryIcon },
  { label: "Scheduled", href: "/dashboard/scheduled", active: false, icon: CalendarIcon },
  { label: "Analytics", href: "/dashboard/analytics", active: false, icon: AnalyticsIcon },
  { label: "Settings", href: "/dashboard/settings", active: false, icon: ProfileIcon },
]

const STATUS_STYLES: Record<string, string> = {
  published: "border-green-200 bg-green-50 text-green-700",
  scheduled: "border-blue-200 bg-blue-50 text-blue-700",
  draft: "border-zinc-200 bg-zinc-100 text-zinc-600",
}

function StatCard({
  label,
  value,
  suffix = "",
  change,
  icon: Icon,
  index,
}: {
  label: string
  value: number
  suffix?: string
  change: string
  icon: React.ComponentType<{ className?: string }>
  index: number
}) {
  const { count, ref } = useCountUp(value)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm"
    >
      <div className="mb-4 flex items-start justify-between">
        <p className="text-sm font-medium text-zinc-500">{label}</p>
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-50 text-teal">
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <p className="mb-1 text-4xl font-bold text-zinc-900">
        <span ref={ref}>{count.toLocaleString()}</span>
        {suffix}
      </p>
      <p className="text-sm font-medium text-green-600">{change}</p>
    </motion.div>
  )
}

export default function DashboardPage() {
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

        <div className="border-t border-zinc-100 p-4">
          <div className="rounded-xl border border-teal/20 bg-teal-50 p-4">
            <p className="mb-1 text-xs font-semibold text-teal">Free Plan</p>
            <div className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-teal-100">
              <div className="h-full w-3/5 rounded-full bg-teal" />
            </div>
            <p className="mb-3 text-xs text-zinc-500">3/5 posts used this week</p>
            <Link href="/pricing" className="block w-full rounded-lg bg-teal py-2 text-center text-xs font-semibold text-white transition-colors hover:bg-teal-600">
              Upgrade to Pro
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3 border-t border-zinc-100 px-4 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal text-sm font-bold text-white">SC</div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-zinc-900">Sarah Chen</p>
            <p className="truncate text-xs text-zinc-400">sarah@studio.dev</p>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-100 bg-white/80 px-6 py-4 backdrop-blur-sm">
          <div>
            <h1 className="text-xl font-bold text-zinc-900">Good morning, Sarah</h1>
            <p className="text-sm text-zinc-500">Your LinkedIn audience is waiting.</p>
          </div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link href="/write" className="flex items-center gap-2 rounded-xl bg-teal px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-600">
              <ComposeIcon className="h-4 w-4" />
              Write Post
            </Link>
          </motion.div>
        </div>

        <div className="max-w-[1000px] p-6">
          <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard label="Voice Posts Trained" value={47} change="Up 6 this week" icon={VoiceIcon} index={0} />
            <StatCard label="Avg Impressions" value={8940} change="Up 23% vs last month" icon={AnalyticsIcon} index={1} />
            <StatCard label="Content Assets" value={12} change="3 reused this week" icon={LibraryIcon} index={2} />
            <StatCard label="Day Streak" value={14} change="Personal best" icon={GrowthIcon} index={3} />
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.4 }} className="mb-6 rounded-2xl border border-zinc-100 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-4">
              <h2 className="font-bold text-zinc-900">Recent Posts</h2>
              <Link href="/dashboard/posts" className="text-sm font-medium text-teal hover:underline">View all</Link>
            </div>

            <div className="divide-y divide-zinc-50">
              {RECENT_POSTS.map((post, i) => (
                <motion.div key={post.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.5 + i * 0.06 }} className="group flex items-start gap-4 px-6 py-4 transition-colors hover:bg-zinc-50/50">
                  <div className="min-w-0 flex-1">
                    <p className="mb-2 line-clamp-2 text-sm leading-relaxed text-zinc-700">{post.preview}</p>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`rounded-md border px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[post.status]}`}>{post.status}</span>
                      <span className="rounded-md border border-zinc-200 px-2 py-0.5 text-xs text-zinc-400">{post.tone}</span>
                      {post.impressions !== "—" && <span className="text-xs text-zinc-500">{post.impressions} impressions</span>}
                      <span className="text-xs text-zinc-400">{post.date}</span>
                    </div>
                  </div>
                  <div className="shrink-0 gap-2 opacity-0 transition-opacity group-hover:flex">
                    <button className="rounded-lg bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-200">Edit</button>
                    <button className="rounded-lg bg-teal-50 px-3 py-1.5 text-xs font-medium text-teal transition-colors hover:bg-teal hover:text-white">Publish</button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.6 }} className="mb-6 rounded-2xl border border-zinc-100 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-4">
              <div>
                <h2 className="font-bold text-zinc-900">Voice Profile</h2>
                <p className="mt-0.5 text-xs text-zinc-400">47 posts trained · Accuracy improving</p>
              </div>
              <Link href="/dashboard/voice" className="text-sm font-medium text-teal hover:underline">Manage</Link>
            </div>
            <div className="p-5">
              <div className="mb-4 grid grid-cols-3 gap-4">
                {[
                  { label: "Avg Edit Delta", value: "12%", desc: "You change this little of each draft" },
                  { label: "Top Tone", value: "Bold", desc: "Your best-performing style" },
                  { label: "Best Hook Type", value: "Contrarian", desc: "Drives 2.1x your avg reach" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl bg-zinc-50 p-4">
                    <p className="mb-1 text-xs text-zinc-500">{stat.label}</p>
                    <p className="text-lg font-bold text-zinc-900">{stat.value}</p>
                    <p className="mt-0.5 text-xs leading-tight text-zinc-400">{stat.desc}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-100">
                  <div className="h-full rounded-full bg-gradient-to-r from-teal to-teal-300" style={{ width: "47%" }} />
                </div>
                <span className="shrink-0 text-xs text-zinc-500">47/100 posts to full intelligence</span>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.7 }} className="rounded-2xl border border-zinc-100 bg-white shadow-sm">
            <div className="border-b border-zinc-100 px-6 py-4">
              <h2 className="font-bold text-zinc-900">Quick Actions</h2>
            </div>
            <div className="grid grid-cols-2 gap-3 p-5 sm:grid-cols-4">
              {[
                { icon: ComposeIcon, label: "Write a Post", href: "/write", color: "border-teal/20 bg-teal-50 text-teal" },
                { icon: VoiceIcon, label: "Train Voice", href: "/dashboard/voice", color: "border-gold/20 bg-gold-50 text-gold-700" },
                { icon: LibraryIcon, label: "Content Library", href: "/dashboard/library", color: "border-zinc-200 bg-zinc-50 text-zinc-700" },
                { icon: AnalyticsIcon, label: "View Analytics", href: "/dashboard/analytics", color: "border-blue-200 bg-blue-50 text-blue-700" },
              ].map((action) => {
                const Icon = action.icon
                return (
                  <Link key={action.label} href={action.href} className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-transform hover:scale-105 active:scale-95 ${action.color}`}>
                    <Icon className="h-5 w-5" />
                    <span className="text-xs font-semibold">{action.label}</span>
                  </Link>
                )
              })}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
