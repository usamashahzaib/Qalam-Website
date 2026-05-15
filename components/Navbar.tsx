"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { SignInButton, SignUpButton, UserButton, Show } from "@clerk/nextjs"
import { BrandMarkIcon, ChevronRightIcon } from "@/components/ui/qalam-icons"

const NAV_LINKS = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Free Tools", href: "/free-tools" },
  { label: "For Teams", href: "/use-cases/agencies" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
]

function QalamLogo() {
  return (
    <Link href="/" className="flex select-none items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal">
        <BrandMarkIcon className="h-4 w-4 text-gold" />
      </div>
      <span className="text-xl font-bold tracking-tight text-teal">Qalam</span>
    </Link>
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [announcementVisible, setAnnouncementVisible] = useState(true)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="fixed left-0 right-0 top-0 z-50 flex flex-col">
      <AnimatePresence>
        {announcementVisible && (
          <motion.div
            initial={{ height: 40, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden bg-[#1f5e57]"
          >
            <div className="relative flex h-10 items-center justify-center gap-3 px-4 text-sm font-medium text-white">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/20 bg-white/10">
                <BrandMarkIcon className="h-2.5 w-2.5 text-gold" />
              </span>
              <span>
                <strong>New:</strong> agency workspaces with separate client voice memory
              </span>
              <Link href="/use-cases/agencies" className="inline-flex items-center gap-1 text-gold-100 underline underline-offset-2 transition-colors hover:text-white">
                See setup <ChevronRightIcon className="h-3.5 w-3.5" />
              </Link>
              <button
                onClick={() => setAnnouncementVisible(false)}
                className="absolute right-4 text-lg leading-none text-white/60 transition-colors hover:text-white"
                aria-label="Dismiss"
              >
                ×
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.nav
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`glass border-b transition-all duration-300 ${
          scrolled ? "border-zinc-200/90 shadow-[0_2px_24px_rgba(13,74,69,0.08)]" : "border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
          <QalamLogo />

          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition-all duration-150 hover:bg-teal/10 hover:text-teal"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="rounded-lg px-4 py-2 text-sm font-semibold text-teal transition-colors hover:bg-teal/10">
                  Log In
                </button>
              </SignInButton>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <SignUpButton mode="modal">
                  <button className="rounded-lg bg-teal px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-600">
                    Get Started Free
                  </button>
                </SignUpButton>
              </motion.div>
            </Show>
            <Show when="signed-in">
              <Link href="/dashboard" className="rounded-lg px-4 py-2 text-sm font-semibold text-teal transition-colors hover:bg-teal/10">
                Dashboard
              </Link>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-9 w-9",
                  },
                }}
              />
            </Show>
          </div>

          <button
            className="flex flex-col gap-1.5 rounded-lg p-2 transition-colors hover:bg-zinc-100 md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <motion.span animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} transition={{ duration: 0.2 }} className="block h-0.5 w-5 origin-center rounded-full bg-zinc-700" />
            <motion.span animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }} transition={{ duration: 0.15 }} className="block h-0.5 w-5 rounded-full bg-zinc-700" />
            <motion.span animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} transition={{ duration: 0.2 }} className="block h-0.5 w-5 origin-center rounded-full bg-zinc-700" />
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden border-t border-zinc-200 md:hidden"
            >
              <div className="flex flex-col gap-1 px-6 py-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-600 transition-all hover:bg-teal/10 hover:text-teal"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-3 flex flex-col gap-2 border-t border-zinc-200 pt-3">
                  <Show when="signed-out">
                    <SignInButton mode="modal">
                      <button onClick={() => setMobileOpen(false)} className="w-full rounded-lg px-3 py-2.5 text-center text-sm font-semibold text-teal transition-colors hover:bg-teal/10">
                        Log In
                      </button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button onClick={() => setMobileOpen(false)} className="w-full rounded-lg bg-teal px-3 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-teal-600">
                        Get Started Free
                      </button>
                    </SignUpButton>
                  </Show>
                  <Show when="signed-in">
                    <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2.5 text-center text-sm font-semibold text-teal transition-colors hover:bg-teal/10">
                      Dashboard
                    </Link>
                    <div className="flex justify-center pt-1">
                      <UserButton appearance={{ elements: { avatarBox: "h-9 w-9" } }} />
                    </div>
                  </Show>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  )
}
