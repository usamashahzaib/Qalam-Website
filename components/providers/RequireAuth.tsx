"use client"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/components/providers/AuthProvider"

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { authChecked, isAuthenticated } = useAuth()

  useEffect(() => {
    if (authChecked && !isAuthenticated) {
      router.replace(`/auth?next=${encodeURIComponent(pathname || "/dashboard")}`)
    }
  }, [authChecked, isAuthenticated, pathname, router])

  if (!authChecked) {
    return <div className="flex min-h-screen items-center justify-center text-sm text-zinc-500">Loading workspace...</div>
  }

  if (!isAuthenticated) return null
  return <>{children}</>
}
