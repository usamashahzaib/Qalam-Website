"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import {
  consumeLinkedInSession,
  getLinkedInAuthUrl,
  loadAuthSession,
  loginWithLocalSession,
  logoutAuthSession,
} from "@/lib/api/client"

type AuthUser = {
  email: string
  fullName: string
  firstName: string
  imageUrl: string | null
  role: "admin" | "user"
  linkedinMemberId?: string | null
  linkedinTokenExpiresAt?: number | null
}

type AuthContextValue = {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoadingAuth: boolean
  authChecked: boolean
  login: (input: { name: string; email: string }) => Promise<AuthUser>
  loginWithLinkedIn: (user: AuthUser) => AuthUser
  beginLinkedInAuth: (nextPath?: string) => Promise<void>

  completeLinkedInAuth: () => Promise<AuthUser>
  disconnectLinkedIn: () => void
  logout: () => void
}

const STORAGE_KEY = "qalam-auth-user"
const AuthContext = createContext<AuthContextValue | null>(null)

const readStoredUser = () => {
  if (typeof window === "undefined") return null
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as AuthUser) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(readStoredUser)
  const [authChecked, setAuthChecked] = useState(false)

  const persistUser = useCallback((nextUser: AuthUser | null) => {
    setUser(nextUser)
    if (typeof window === "undefined") return
    if (!nextUser) {
      sessionStorage.removeItem(STORAGE_KEY)
      return
    }
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser))
  }, [])

  useEffect(() => {
    let active = true
    loadAuthSession()
      .then(({ user }) => {
        if (!active) return
        persistUser(user)
        setAuthChecked(true)
      })
      .catch(() => {
        if (!active) return
        persistUser(null)
        setAuthChecked(true)
      })
    return () => {
      active = false
    }
  }, [persistUser])

  const login = useCallback(
    async ({ name, email }: { name: string; email: string }) => {
      const { user } = await loginWithLocalSession({ name, email })
      persistUser(user)
      return user
    },
    [persistUser]
  )

  const loginWithLinkedIn = useCallback((nextUser: AuthUser) => {
    persistUser(nextUser)
    return nextUser
  }, [persistUser])

  const beginLinkedInAuth = useCallback(async (nextPath = "/dashboard") => {
    const callbackUrl = new URL("/auth/linkedin/callback", window.location.origin)
    if (nextPath.startsWith("/")) callbackUrl.searchParams.set("next", nextPath)
    const { url } = await getLinkedInAuthUrl(callbackUrl.toString())
    window.location.assign(url)
  }, [])


  const completeLinkedInAuth = useCallback(async () => {
    const { user } = await consumeLinkedInSession()
    return loginWithLinkedIn(user)
  }, [loginWithLinkedIn])

  const disconnectLinkedIn = useCallback(() => {
    if (!user) return
    persistUser({
      ...user,
      linkedinMemberId: null,
      linkedinTokenExpiresAt: null,
    })
  }, [persistUser, user])

  const logout = useCallback(() => {
    logoutAuthSession()
      .catch(() => undefined)
      .finally(() => {
        persistUser(null)
        window.location.assign("/auth")
      })
  }, [persistUser])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoadingAuth: !authChecked,
      authChecked,
      login,
      loginWithLinkedIn,
      beginLinkedInAuth,
      completeLinkedInAuth,
      disconnectLinkedIn,
      logout,
    }),
    [authChecked, beginLinkedInAuth, completeLinkedInAuth, disconnectLinkedIn, login, loginWithLinkedIn, logout, user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}
