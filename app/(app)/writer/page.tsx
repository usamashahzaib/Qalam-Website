"use client"

import { useEffect, useMemo, useState } from "react"
import { useAuth } from "@/components/providers/AuthProvider"
import { useWorkspace } from "@/components/providers/WorkspaceProvider"
import { shareToLinkedIn } from "@/lib/api/client"

const POST_TYPES = ["LinkedIn - Text post", "LinkedIn - Carousel", "LinkedIn - Visual"]

type PublishState = { status: "idle" | "loading" | "success" | "error"; message: string; postUrn: string | null }
type WriterBootstrapPost = { id?: string; title?: string; content?: string; type?: string; externalPostUrn?: string | null }
type WriterBootstrap = { post: WriterBootstrapPost | null; scheduleDate: string; parseFailed: boolean; hasWriterLoad: boolean; hasWriterScheduleDate: boolean }

const normalizeLinkedInUrn = (value: string) => {
  const urn = value.trim()
  if (!urn) return ""
  return urn.startsWith("urn:") ? urn : `urn:li:share:${urn}`
}

const readWriterBootstrap = (): WriterBootstrap => {
  if (typeof window === "undefined") {
    return { post: null, scheduleDate: "", parseFailed: false, hasWriterLoad: false, hasWriterScheduleDate: false }
  }

  const rawPost = sessionStorage.getItem("writerLoad")
  const rawDate = sessionStorage.getItem("writerScheduleDate")

  if (!rawPost) {
    return {
      post: null,
      scheduleDate: rawDate || "",
      parseFailed: false,
      hasWriterLoad: false,
      hasWriterScheduleDate: Boolean(rawDate),
    }
  }

  try {
    return {
      post: JSON.parse(rawPost) as WriterBootstrapPost,
      scheduleDate: rawDate || "",
      parseFailed: false,
      hasWriterLoad: true,
      hasWriterScheduleDate: Boolean(rawDate),
    }
  } catch {
    return {
      post: null,
      scheduleDate: rawDate || "",
      parseFailed: true,
      hasWriterLoad: true,
      hasWriterScheduleDate: Boolean(rawDate),
    }
  }
}

export default function WriterPage() {
  const { user } = useAuth()
  const { state, saveDraft, schedulePost, publishPost, createJob } = useWorkspace()
  const bootstrap = useMemo(() => readWriterBootstrap(), [])

  const [editingId, setEditingId] = useState<string | null>(bootstrap.post?.id || null)
  const [title, setTitle] = useState(bootstrap.post?.title || "")
  const [content, setContent] = useState(bootstrap.post?.content || "")
  const [postType, setPostType] = useState(bootstrap.post?.type || POST_TYPES[0])
  const [scheduleDate, setScheduleDate] = useState(bootstrap.scheduleDate)
  const [scheduleTime, setScheduleTime] = useState("09:00")
  const [status, setStatus] = useState<string | null>(
    bootstrap.parseFailed ? "Could not load requested draft" : bootstrap.scheduleDate ? `Drafting for ${bootstrap.scheduleDate}` : null
  )
  const [publish, setPublish] = useState<PublishState>(
    bootstrap.post?.externalPostUrn
      ? { status: "success", message: "Already published", postUrn: String(bootstrap.post.externalPostUrn) }
      : { status: "idle", message: "", postUrn: null }
  )

  useEffect(() => {
    if (bootstrap.hasWriterLoad) {
      sessionStorage.removeItem("writerLoad")
    }
    if (bootstrap.hasWriterScheduleDate) {
      sessionStorage.removeItem("writerScheduleDate")
    }
  }, [bootstrap.hasWriterLoad, bootstrap.hasWriterScheduleDate])

  const wordCount = useMemo(() => (content.trim() ? content.trim().split(/\s+/).length : 0), [content])
  const characterCount = content.length

  const resolveTitle = () => title.trim() || content.trim().split("\n")[0]?.slice(0, 80) || "Untitled post"

  const onSaveDraft = () => {
    if (!content.trim()) {
      setStatus("Write content first")
      return
    }
    const id = saveDraft({ id: editingId, title: resolveTitle(), content, type: postType })
    setEditingId(id)
    setStatus("Draft saved")
  }

  const onSchedule = () => {
    if (!content.trim()) {
      setStatus("Write content first")
      return
    }
    if (!scheduleDate || !scheduleTime) {
      setStatus("Select date and time")
      return
    }
    const id = schedulePost({ id: editingId, title: resolveTitle(), content, type: postType, date: scheduleDate, time: scheduleTime })
    setEditingId(id)
    if (postType.toLowerCase().includes("carousel")) {
      createJob({
        type: "carousel_generation",
        status: "queued",
        title: "Carousel generation",
        payload: { postId: id, title: resolveTitle(), content },
      }).catch(() => undefined)
    }
    setStatus(`Scheduled for ${scheduleDate} at ${scheduleTime}`)
  }

  const onPublish = async () => {
    if (!content.trim()) {
      setPublish({ status: "error", message: "Write content first", postUrn: null })
      return
    }

    setPublish({ status: "loading", message: "Publishing to LinkedIn...", postUrn: null })
    try {
      const result = await shareToLinkedIn({ content })
      const postUrn = normalizeLinkedInUrn(result.postUrn || "") || null
      const id = publishPost({
        id: editingId,
        title: resolveTitle(),
        content,
        type: postType,
        publishedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        externalPostUrn: postUrn,
      })
      setEditingId(id)
      setPublish({ status: "success", message: "Published to LinkedIn", postUrn })
      if (postType.toLowerCase().includes("carousel")) {
        createJob({
          type: "carousel_generation",
          status: "queued",
          title: "Carousel asset generation",
          payload: { postId: id, postUrn, title: resolveTitle() },
        }).catch(() => undefined)
      }
    } catch (error) {
      setPublish({ status: "error", message: (error as Error).message || "LinkedIn publish failed", postUrn: null })
    }
  }

  const onLoadPost = (postId: string) => {
    const post = state.posts.find((item) => item.id === postId)
    if (!post) return
    setEditingId(post.id)
    setTitle(post.title)
    setContent(post.content)
    setPostType(post.type)
    setScheduleDate(post.date || "")
    setScheduleTime(post.scheduledTime || "09:00")
    setPublish({ status: "idle", message: "", postUrn: post.externalPostUrn })
    setStatus(`Loaded ${post.status} post`)
  }

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-8 lg:grid-cols-[1fr_320px]">
      <section className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-zinc-900">Writer</h1>
          <div className="flex flex-wrap items-center gap-2">
            <select value={postType} onChange={(e) => setPostType(e.target.value)} className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-700">
              {POST_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
            </select>
            <button onClick={onSaveDraft} className="rounded-lg border border-zinc-300 px-3 py-2 text-sm font-semibold text-zinc-800 hover:bg-zinc-50">Save draft</button>
            <button onClick={onPublish} disabled={publish.status === "loading"} className="rounded-lg bg-teal px-3 py-2 text-sm font-semibold text-white hover:bg-teal-600 disabled:opacity-60">
              {publish.status === "loading" ? "Publishing..." : "Publish now"}
            </button>
          </div>
        </div>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Working title"
          className="mb-3 w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post..."
          className="min-h-[420px] w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm leading-7 text-zinc-900"
        />

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500">
          <span>{wordCount} words</span>
          <span>{characterCount} characters</span>
          <span>{editingId ? `Editing ${editingId.slice(0, 8)}` : "New draft"}</span>
          <span>{user?.linkedinMemberId ? "LinkedIn connected" : "LinkedIn session required for publish"}</span>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-3 sm:grid-cols-[1fr_120px_auto]">
          <input type="date" value={scheduleDate} onChange={(e) => setScheduleDate(e.target.value)} className="rounded-lg border border-zinc-200 px-3 py-2 text-sm" />
          <input type="time" value={scheduleTime} onChange={(e) => setScheduleTime(e.target.value)} className="rounded-lg border border-zinc-200 px-3 py-2 text-sm" />
          <button onClick={onSchedule} className="rounded-lg border border-zinc-300 px-3 py-2 text-sm font-semibold text-zinc-800 hover:bg-white">Schedule</button>
        </div>

        {status && <p className="mt-3 text-sm text-zinc-600">{status}</p>}
        {publish.status !== "idle" && (
          <p className={`mt-2 text-sm ${publish.status === "error" ? "text-red-600" : "text-zinc-700"}`}>
            {publish.message}
            {publish.postUrn ? ` - ${publish.postUrn}` : ""}
          </p>
        )}
      </section>

      <aside className="rounded-2xl border border-zinc-200 bg-white p-4">
        <h2 className="mb-3 text-sm font-semibold text-zinc-900">Workspace posts</h2>
        <div className="space-y-2">
          {state.posts.length === 0 ? (
            <p className="text-xs text-zinc-500">No posts yet.</p>
          ) : (
            state.posts.slice(0, 20).map((post) => (
              <button key={post.id} onClick={() => onLoadPost(post.id)} className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-left hover:bg-zinc-50">
                <p className="truncate text-sm font-medium text-zinc-900">{post.title}</p>
                <p className="mt-0.5 text-xs text-zinc-500">{post.status} - {post.type}</p>
              </button>
            ))
          )}
        </div>
      </aside>
    </div>
  )
}

