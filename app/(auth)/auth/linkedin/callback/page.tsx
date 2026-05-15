"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/providers/AuthProvider"

export default function LinkedInCallbackPage() {
  const router = useRouter()
  const { completeLinkedInAuth } = useAuth()

  useEffect(() => {
    const next =
      typeof window === "undefined" ? null : new URLSearchParams(window.location.search).get("next")
    completeLinkedInAuth()
      .then(() => {
        router.replace(next && next.startsWith("/") ? next : "/dashboard")
      })
      .catch(() => {
        router.replace("/auth?linkedin=failed")
      })
  }, [completeLinkedInAuth, router])

  return null
}
