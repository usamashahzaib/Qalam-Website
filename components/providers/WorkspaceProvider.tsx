"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import {
  createWorkspaceJob,
  fetchWorkspaceEvents,
  fetchWorkspaceJobs,
  trackWorkspaceEvent,
} from "@/lib/api/client"
import { useAuth } from "@/components/providers/AuthProvider"
import { canUseRemoteWorkspace, loadWorkspaceState, saveWorkspaceState } from "@/lib/workspace-store"

export type WorkspacePost = {
  id: string
  title: string
  content: string
  type: string
  status: "draft" | "scheduled" | "published"
  date: string
  scheduledTime: string | null
  externalPostUrn: string | null
  updatedAt: string
}

export type WorkspaceBilling = {
  plan: "Free" | "Pro" | "Team" | "Agency"
  billingCycle: "monthly" | "annual"
  checkoutReady: boolean
}

export type AgencyClient = {
  id: string
  name: string
  industry: string
  linkedinUrl: string
  notes: string
  addedAt: string
}

export type AgencyTeamMember = {
  id: string
  name: string
  email: string
  role: "admin" | "editor" | "viewer"
  addedAt: string
}

type AgencyState = {
  clients: AgencyClient[]
  teamMembers: AgencyTeamMember[]
  activeClientId: string | null
}

type WorkspaceProfile = {
  name: string
  title: string
  linkedinUrl: string
  industry: string
  goals: string[]
  tone: string
}

type WorkspaceState = {
  profile: WorkspaceProfile
  billing: WorkspaceBilling
  posts: WorkspacePost[]
  drafts: WorkspacePost[]
  scheduled: WorkspacePost[]
  published: WorkspacePost[]
  competitors: Array<Record<string, unknown>>
  agency: AgencyState
}

type WorkspaceContextValue = {
  state: WorkspaceState
  remoteHydrated: boolean
  remoteError: string | null
  setWorkspaceState: (updater: WorkspaceState | ((prev: WorkspaceState) => WorkspaceState)) => void
  saveProfile: (input: WorkspaceProfile) => void
  saveBilling: (input: Partial<WorkspaceBilling>) => void
  deletePost: (id: string) => void
  saveDraft: (input: { id?: string | null; title: string; content: string; type: string }) => string
  schedulePost: (input: { id?: string | null; title: string; content: string; type: string; date: string; time: string }) => string
  publishPost: (input: {
    id?: string | null
    title: string
    content: string
    type: string
    publishedAt: string
    externalPostUrn?: string | null
  }) => string
  loadEvents: (limit?: number) => Promise<unknown[]>
  trackEvent: (type: string, payload?: Record<string, unknown>) => Promise<void>
  loadJobs: (type?: string, limit?: number) => Promise<unknown[]>
  createJob: (input: {
    type?: string
    title?: string
    payload?: Record<string, unknown>
    status?: string
  }) => Promise<unknown>
  saveAgency: (input: Partial<AgencyState>) => void
}

const STORAGE_PREFIX = "qalam-workspace-state:"
const WorkspaceContext = createContext<WorkspaceContextValue | null>(null)

const asDateLabel = (value: Date) =>
  value.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })

const toWorkspacePost = (
  input: Partial<WorkspacePost> & Pick<WorkspacePost, "id" | "title" | "content" | "type" | "status">
): WorkspacePost => ({
  id: input.id,
  title: input.title,
  content: input.content,
  type: input.type,
  status: input.status,
  date: input.date || asDateLabel(new Date()),
  scheduledTime: input.scheduledTime ?? null,
  externalPostUrn: input.externalPostUrn ?? null,
  updatedAt: input.updatedAt || new Date().toISOString(),
})

const deriveBuckets = (posts: WorkspacePost[]) => ({
  drafts: posts.filter((post) => post.status === "draft"),
  scheduled: posts.filter((post) => post.status === "scheduled"),
  published: posts.filter((post) => post.status === "published"),
})

const normalizePosts = (posts: unknown[]): WorkspacePost[] =>
  posts
    .map((item) => {
      if (!item || typeof item !== "object") return null
      const post = item as Partial<WorkspacePost>
      if (!post.id || !post.title || !post.content || !post.type) return null
      const status = post.status === "scheduled" || post.status === "published" ? post.status : "draft"
      return toWorkspacePost({
        id: String(post.id),
        title: String(post.title),
        content: String(post.content),
        type: String(post.type),
        status,
        date: post.date,
        scheduledTime: post.scheduledTime,
        externalPostUrn: post.externalPostUrn,
        updatedAt: post.updatedAt,
      })
    })
    .filter(Boolean) as WorkspacePost[]

const withBuckets = (state: WorkspaceState): WorkspaceState => {
  const posts = normalizePosts(Array.isArray(state.posts) ? state.posts : [])
  const buckets = deriveBuckets(posts)
  return {
    ...state,
    posts,
    drafts: buckets.drafts,
    scheduled: buckets.scheduled,
    published: buckets.published,
  }
}

const upsertPost = (posts: WorkspacePost[], post: WorkspacePost) => {
  const index = posts.findIndex((item) => item.id === post.id)
  if (index === -1) return [post, ...posts]
  const next = [...posts]
  next[index] = post
  return next
}

const nextPostId = () =>
  typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`

const seedState = (): WorkspaceState => ({
  profile: {
    name: "",
    title: "",
    linkedinUrl: "",
    industry: "",
    goals: [],
    tone: "",
  },
  billing: {
    plan: "Free",
    billingCycle: "monthly",
    checkoutReady: false,
  },
  posts: [],
  drafts: [],
  scheduled: [],
  published: [],
  competitors: [],
  agency: {
    clients: [],
    teamMembers: [],
    activeClientId: null,
  },
})

const readLocalState = (workspaceKey: string): WorkspaceState => {
  if (typeof window === "undefined") return seedState()
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${workspaceKey}`)
    if (!raw) return seedState()
    const base = seedState()
    const parsed = { ...base, ...(JSON.parse(raw) as Partial<WorkspaceState>) }
    return withBuckets({
      ...parsed,
      profile: { ...base.profile, ...(parsed.profile || {}) },
      billing: { ...base.billing, ...(parsed.billing || {}) },
      competitors: Array.isArray(parsed.competitors) ? parsed.competitors : [],
      agency: {
        clients: Array.isArray(parsed.agency?.clients) ? parsed.agency.clients : [],
        teamMembers: Array.isArray(parsed.agency?.teamMembers) ? parsed.agency.teamMembers : [],
        activeClientId: typeof parsed.agency?.activeClientId === "string" ? parsed.agency.activeClientId : null,
      },
      posts: Array.isArray(parsed.posts) ? parsed.posts : [],
      drafts: [],
      scheduled: [],
      published: [],
    })
  } catch {
    return seedState()
  }
}

function WorkspaceProviderInner({
  children,
  workspaceKey,
}: {
  children: React.ReactNode
  workspaceKey: string
}) {
  const [state, setState] = useState<WorkspaceState>(() => readLocalState(workspaceKey))
  const [remoteHydrated, setRemoteHydrated] = useState(!canUseRemoteWorkspace())
  const [remoteError, setRemoteError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    if (!canUseRemoteWorkspace()) return

    loadWorkspaceState(workspaceKey)
      .then((remoteState) => {
        if (!active) return
        if (remoteState) {
          const base = seedState()
          setState((prev) =>
            withBuckets({
              ...prev,
              ...(remoteState as Partial<WorkspaceState>),
              profile: { ...base.profile, ...prev.profile, ...((remoteState as Partial<WorkspaceState>).profile || {}) },
              billing: { ...base.billing, ...prev.billing, ...((remoteState as Partial<WorkspaceState>).billing || {}) },
              competitors: Array.isArray((remoteState as Partial<WorkspaceState>).competitors)
                ? (((remoteState as Partial<WorkspaceState>).competitors || []) as Array<Record<string, unknown>>)
                : prev.competitors,
              agency: {
                clients: Array.isArray((remoteState as Partial<WorkspaceState>).agency?.clients)
                  ? (remoteState as Partial<WorkspaceState>).agency!.clients
                  : prev.agency.clients,
                teamMembers: Array.isArray((remoteState as Partial<WorkspaceState>).agency?.teamMembers)
                  ? (remoteState as Partial<WorkspaceState>).agency!.teamMembers
                  : prev.agency.teamMembers,
                activeClientId: (remoteState as Partial<WorkspaceState>).agency?.activeClientId !== undefined
                  ? (remoteState as Partial<WorkspaceState>).agency!.activeClientId
                  : prev.agency.activeClientId,
              },
              posts: Array.isArray((remoteState as Partial<WorkspaceState>).posts)
                ? (((remoteState as Partial<WorkspaceState>).posts || []) as WorkspacePost[])
                : prev.posts,
              drafts: [],
              scheduled: [],
              published: [],
            })
          )
        }
        setRemoteHydrated(true)
      })
      .catch((error) => {
        if (!active) return
        setRemoteError((error as Error).message || "remote_load_failed")
        setRemoteHydrated(true)
      })

    return () => {
      active = false
    }
  }, [workspaceKey])

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}${workspaceKey}`, JSON.stringify(state))
  }, [state, workspaceKey])

  useEffect(() => {
    if (!remoteHydrated || !canUseRemoteWorkspace()) return
    const timer = setTimeout(() => {
      saveWorkspaceState(state, workspaceKey).catch((error) => {
        setRemoteError((error as Error).message || "remote_save_failed")
      })
    }, 250)

    return () => clearTimeout(timer)
  }, [remoteHydrated, state, workspaceKey])

  const setWorkspaceState = useCallback(
    (updater: WorkspaceState | ((prev: WorkspaceState) => WorkspaceState)) => {
      setState((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater
        return withBuckets(next)
      })
    },
    []
  )

  const saveProfile = useCallback((input: WorkspaceProfile) => {
    setState((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        ...input,
        goals: Array.isArray(input.goals) ? input.goals.filter(Boolean) : prev.profile.goals,
      },
    }))
  }, [])

  const saveBilling = useCallback((input: Partial<WorkspaceBilling>) => {
    setState((prev) => ({
      ...prev,
      billing: {
        ...prev.billing,
        ...input,
      },
    }))
  }, [])

  const saveAgency = useCallback((input: Partial<AgencyState>) => {
    setState((prev) => ({
      ...prev,
      agency: { ...prev.agency, ...input },
    }))
  }, [])

  const deletePost = useCallback(
    (id: string) => {
      setState((prev) => withBuckets({ ...prev, posts: prev.posts.filter((post) => post.id !== id) }))
      trackWorkspaceEvent("post_deleted", { id }, workspaceKey).catch(() => undefined)
    },
    [workspaceKey]
  )

  const saveDraft = useCallback(
    ({ id, title, content, type }: { id?: string | null; title: string; content: string; type: string }) => {
      const postId = id || nextPostId()
      let savedId = postId
      setState((prev) => {
        const nextPost = toWorkspacePost({
          id: postId,
          title: title || "Untitled draft",
          content,
          type,
          status: "draft",
          date: asDateLabel(new Date()),
        })
        const posts = upsertPost(prev.posts, nextPost)
        savedId = nextPost.id
        return withBuckets({ ...prev, posts })
      })
      trackWorkspaceEvent("draft_saved", { id: savedId, type, title }, workspaceKey).catch(() => undefined)
      return savedId
    },
    [workspaceKey]
  )

  const schedulePost = useCallback(
    ({
      id,
      title,
      content,
      type,
      date,
      time,
    }: {
      id?: string | null
      title: string
      content: string
      type: string
      date: string
      time: string
    }) => {
      const postId = id || nextPostId()
      let savedId = postId
      setState((prev) => {
        const nextPost = toWorkspacePost({
          id: postId,
          title: title || "Untitled post",
          content,
          type,
          status: "scheduled",
          date,
          scheduledTime: time,
        })
        const posts = upsertPost(prev.posts, nextPost)
        savedId = nextPost.id
        return withBuckets({ ...prev, posts })
      })
      trackWorkspaceEvent("post_scheduled", { id: savedId, type, date, time }, workspaceKey).catch(() => undefined)
      return savedId
    },
    [workspaceKey]
  )

  const publishPost = useCallback(
    ({
      id,
      title,
      content,
      type,
      publishedAt,
      externalPostUrn,
    }: {
      id?: string | null
      title: string
      content: string
      type: string
      publishedAt: string
      externalPostUrn?: string | null
    }) => {
      const postId = id || nextPostId()
      let savedId = postId
      setState((prev) => {
        const nextPost = toWorkspacePost({
          id: postId,
          title: title || "Untitled post",
          content,
          type,
          status: "published",
          date: publishedAt,
          scheduledTime: null,
          externalPostUrn: externalPostUrn || null,
        })
        const posts = upsertPost(prev.posts, nextPost)
        savedId = nextPost.id
        return withBuckets({ ...prev, posts })
      })
      trackWorkspaceEvent("post_published", { id: savedId, type, externalPostUrn: externalPostUrn || null }, workspaceKey).catch(() => undefined)
      return savedId
    },
    [workspaceKey]
  )

  const loadEvents = useCallback(async (limit = 100) => {
    const response = await fetchWorkspaceEvents(limit, workspaceKey)
    return response.events
  }, [workspaceKey])

  const trackEvent = useCallback(async (type: string, payload: Record<string, unknown> = {}) => {
    await trackWorkspaceEvent(type, payload, workspaceKey)
  }, [workspaceKey])

  const loadJobs = useCallback(async (type = "", limit = 100) => {
    const response = await fetchWorkspaceJobs(type, limit, workspaceKey)
    return response.jobs
  }, [workspaceKey])

  const createJob = useCallback(
    async ({ type, title, payload = {}, status = "completed" }: { type?: string; title?: string; payload?: Record<string, unknown>; status?: string }) => {
      const response = await createWorkspaceJob({ type, title, payload, status, workspaceKey })
      return response.job
    },
    [workspaceKey]
  )

  const value = useMemo(
    () => ({
      state,
      remoteHydrated,
      remoteError,
      setWorkspaceState,
      saveProfile,
      saveBilling,
      saveAgency,
      deletePost,
      saveDraft,
      schedulePost,
      publishPost,
      loadEvents,
      trackEvent,
      loadJobs,
      createJob,
    }),
    [
      createJob,
      deletePost,
      loadEvents,
      loadJobs,
      publishPost,
      remoteError,
      remoteHydrated,
      saveBilling,
      saveAgency,
      saveDraft,
      saveProfile,
      schedulePost,
      setWorkspaceState,
      state,
      trackEvent,
    ]
  )

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>
}

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const workspaceKey = user?.email?.toLowerCase() || "local-default"
  return <WorkspaceProviderInner key={workspaceKey} workspaceKey={workspaceKey}>{children}</WorkspaceProviderInner>
}

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext)
  if (!context) throw new Error("useWorkspace must be used within WorkspaceProvider")
  return context
}
