"use client"

import { useCallback, useMemo, useState } from "react"
import Link from "next/link"
import { useWorkspace } from "@/components/providers/WorkspaceProvider"
import { useAuth } from "@/components/providers/AuthProvider"

type ProfileDraft = {
  name: string
  title: string
  linkedinUrl: string
  industry: string
  goals: string[]
  tone: string
}

export default function VoicePage() {
  const { state, setWorkspaceState } = useWorkspace()
  const { user } = useAuth()
  const profile = state.profile

  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState<ProfileDraft>({ ...profile })
  const [goalInput, setGoalInput] = useState("")

  const completeness = useMemo(() => {
    const checks = [
      Boolean(profile.name),
      Boolean(profile.title),
      Boolean(profile.linkedinUrl),
      Boolean(profile.industry),
      Boolean(profile.tone),
      profile.goals.length > 0,
    ]
    return Math.round((checks.filter(Boolean).length / checks.length) * 100)
  }, [profile])

  const corpusByType = useMemo(() => {
    const map: Record<string, number> = {}
    for (const post of state.posts) {
      const key = post.type || "Unknown"
      map[key] = (map[key] || 0) + 1
    }
    return Object.entries(map).sort((a, b) => b[1] - a[1])
  }, [state.posts])

  const mostRecent = useMemo(() => {
    if (state.posts.length === 0) return null
    return [...state.posts].sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1))[0]
  }, [state.posts])

  const startEditing = useCallback(() => {
    setDraft({ ...profile })
    setEditing(true)
  }, [profile])

  const onCancel = useCallback(() => {
    setDraft({ ...profile })
    setGoalInput("")
    setEditing(false)
  }, [profile])

  const onSave = useCallback(() => {
    setWorkspaceState((prev) => ({
      ...prev,
      profile: { ...draft },
    }))
    setGoalInput("")
    setEditing(false)
  }, [draft, setWorkspaceState])

  const addGoal = useCallback(() => {
    const g = goalInput.trim()
    if (!g) return
    setDraft((prev) => ({ ...prev, goals: [...prev.goals, g] }))
    setGoalInput("")
  }, [goalInput])

  const removeGoal = useCallback((idx: number) => {
    setDraft((prev) => ({ ...prev, goals: prev.goals.filter((_, i) => i !== idx) }))
  }, [])

  const activeProfile = editing ? draft : profile

  return (
    <div className="mx-auto max-w-4xl px-6 py-10 font-jakarta sm:px-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900">Voice Profile</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Your voice memory comes from your profile settings and the posts you build here. Nothing is inferred — it reflects what you put in.
        </p>
      </div>

      {/* ── completeness bar ─────────────────────────────────────── */}
      <section className="mb-5 rounded-2xl border border-zinc-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-zinc-900">Profile completeness</p>
            <p className="mt-0.5 text-xs text-zinc-500">6 fields shape the voice signal available to the writer</p>
          </div>
          <span className={`text-2xl font-bold ${completeness === 100 ? "text-teal" : completeness >= 50 ? "text-amber-600" : "text-zinc-400"}`}>
            {completeness}%
          </span>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-zinc-100">
          <div
            className="h-full rounded-full bg-teal transition-all duration-500"
            style={{ width: `${completeness}%` }}
          />
        </div>
      </section>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_300px]">
        {/* ── profile form ─────────────────────────────────────── */}
        <section className="rounded-2xl border border-zinc-200 bg-white p-5">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-zinc-900">Voice settings</h2>
            {!editing ? (
              <button
                onClick={startEditing}
                className="text-xs font-semibold text-teal hover:underline"
              >
                Edit
              </button>
            ) : (
              <div className="flex gap-4">
                <button onClick={onCancel} className="text-xs text-zinc-500 hover:underline">
                  Cancel
                </button>
                <button onClick={onSave} className="text-xs font-semibold text-teal hover:underline">
                  Save
                </button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <ProfileField
              label="Name"
              value={activeProfile.name}
              editing={editing}
              onChange={(v) => setDraft((p) => ({ ...p, name: v }))}
              placeholder="Your full name"
            />
            <ProfileField
              label="Title / Role"
              value={activeProfile.title}
              editing={editing}
              onChange={(v) => setDraft((p) => ({ ...p, title: v }))}
              placeholder="e.g. Founder at Acme · CPO at Startup"
            />
            <ProfileField
              label="LinkedIn URL"
              value={activeProfile.linkedinUrl}
              editing={editing}
              onChange={(v) => setDraft((p) => ({ ...p, linkedinUrl: v }))}
              placeholder="https://linkedin.com/in/yourhandle"
            />
            <ProfileField
              label="Industry"
              value={activeProfile.industry}
              editing={editing}
              onChange={(v) => setDraft((p) => ({ ...p, industry: v }))}
              placeholder="e.g. SaaS, Fintech, Healthcare"
            />
            <ProfileField
              label="Tone"
              value={activeProfile.tone}
              editing={editing}
              onChange={(v) => setDraft((p) => ({ ...p, tone: v }))}
              placeholder="e.g. Direct, conversational, no corporate fluff"
            />

            {/* goals */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-zinc-700">
                Content goals
              </label>
              <div className="mb-2 flex min-h-8 flex-wrap gap-2">
                {activeProfile.goals.length > 0 ? (
                  activeProfile.goals.map((goal, idx) => (
                    <span
                      key={idx}
                      className="flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs text-zinc-700"
                    >
                      {goal}
                      {editing && (
                        <button
                          onClick={() => removeGoal(idx)}
                          className="ml-0.5 text-zinc-400 hover:text-zinc-700"
                          aria-label="Remove goal"
                        >
                          ×
                        </button>
                      )}
                    </span>
                  ))
                ) : (
                  <span className="text-xs italic text-zinc-400">No goals set</span>
                )}
              </div>
              {editing && (
                <div className="flex gap-2">
                  <input
                    value={goalInput}
                    onChange={(e) => setGoalInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addGoal()
                      }
                    }}
                    placeholder="Type a goal, press Enter"
                    className="flex-1 rounded-lg border border-zinc-200 px-3 py-1.5 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-teal/30"
                  />
                  <button
                    onClick={addGoal}
                    className="rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-50"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* LinkedIn session status */}
          <div className="mt-5">
            {user?.linkedinMemberId ? (
              <div className="rounded-xl border border-teal/20 bg-teal/5 px-4 py-3">
                <p className="text-xs font-semibold text-teal">LinkedIn connected</p>
                <p className="mt-0.5 text-xs text-zinc-500">
                  Authenticated via LinkedIn OAuth. Member ID is stored in the server session.
                </p>
              </div>
            ) : (
              <div className="rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3">
                <p className="text-xs font-semibold text-zinc-600">LinkedIn not connected</p>
                <p className="mt-0.5 text-xs text-zinc-500">
                  Connect via LinkedIn to enable publishing.{" "}
                  <Link href="/auth" className="font-semibold text-teal hover:underline">
                    Sign in with LinkedIn
                  </Link>
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ── right sidebar ────────────────────────────────────── */}
        <div className="flex flex-col gap-4">
          {/* corpus */}
          <section className="rounded-2xl border border-zinc-200 bg-white p-4">
            <h2 className="mb-3 text-sm font-semibold text-zinc-900">Voice corpus</h2>
            <div className="space-y-2">
              {[
                { label: "Total posts", value: state.posts.length },
                { label: "Drafts", value: state.drafts.length },
                { label: "Scheduled", value: state.scheduled.length },
                { label: "Published", value: state.published.length },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-xs text-zinc-500">{label}</span>
                  <span className="text-sm font-semibold text-zinc-900">{value}</span>
                </div>
              ))}
            </div>

            {corpusByType.length > 0 && (
              <>
                <div className="my-3 h-px bg-zinc-100" />
                <p className="mb-2 text-xs font-semibold text-zinc-500">By type</p>
                <div className="space-y-1.5">
                  {corpusByType.map(([type, count]) => (
                    <div key={type} className="flex items-center justify-between text-xs">
                      <span className="truncate text-zinc-600">{type}</span>
                      <span className="ml-2 shrink-0 font-medium text-zinc-900">{count}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {state.posts.length === 0 && (
              <p className="mt-3 text-xs italic text-zinc-400">
                No posts yet.{" "}
                <Link href="/writer" className="font-semibold text-teal hover:underline not-italic">
                  Start writing
                </Link>
              </p>
            )}
          </section>

          {/* most recent post */}
          {mostRecent && (
            <section className="rounded-2xl border border-zinc-200 bg-white p-4">
              <h2 className="mb-2 text-xs font-semibold text-zinc-500 uppercase tracking-wide">
                Most recent
              </h2>
              <p className="truncate text-sm font-medium text-zinc-900">{mostRecent.title}</p>
              <p className="mt-0.5 text-xs text-zinc-500">
                {mostRecent.status} · {mostRecent.type}
              </p>
              <p className="mt-0.5 text-xs text-zinc-400">{mostRecent.date}</p>
            </section>
          )}

          {/* about voice memory */}
          <section className="rounded-2xl border border-zinc-100 bg-zinc-50 p-4">
            <p className="text-xs font-semibold text-zinc-500">About voice memory</p>
            <p className="mt-1 text-xs leading-relaxed text-zinc-500">
              Voice memory is the combination of your profile settings and post corpus. Tone, goals, and industry context are passed to the writer when you draft. There is no inferred voice — it reflects exactly what you have entered here.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

function ProfileField({
  label,
  value,
  editing,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  editing: boolean
  onChange: (v: string) => void
  placeholder: string
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold text-zinc-700">{label}</label>
      {editing ? (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-teal/30"
        />
      ) : (
        <p className="min-h-9 rounded-lg bg-zinc-50 px-3 py-2 text-sm">
          {value ? (
            <span className="text-zinc-800">{value}</span>
          ) : (
            <span className="italic text-zinc-400">Not set</span>
          )}
        </p>
      )}
    </div>
  )
}
