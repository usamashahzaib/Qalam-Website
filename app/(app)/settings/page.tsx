"use client"

import { useMemo, useState } from "react"
import { useAuth } from "@/components/providers/AuthProvider"
import { useWorkspace, type WorkspaceBilling } from "@/components/providers/WorkspaceProvider"

const PLANS: WorkspaceBilling["plan"][] = ["Free", "Pro", "Team", "Agency"]

export default function SettingsPage() {
  const { user, beginLinkedInAuth } = useAuth()
  const workspace = useWorkspace()
  const formKey = useMemo(
    () => JSON.stringify({ profile: workspace.state.profile, billing: workspace.state.billing, name: user?.fullName || "" }),
    [user?.fullName, workspace.state.billing, workspace.state.profile]
  )

  return (
    <SettingsForm
      key={formKey}
      user={user}
      beginLinkedInAuth={beginLinkedInAuth}
      state={workspace.state}
      remoteHydrated={workspace.remoteHydrated}
      remoteError={workspace.remoteError}
      saveProfile={workspace.saveProfile}
      saveBilling={workspace.saveBilling}
    />
  )
}

function SettingsForm({
  user,
  beginLinkedInAuth,
  state,
  remoteHydrated,
  remoteError,
  saveProfile,
  saveBilling,
}: {
  user: ReturnType<typeof useAuth>["user"]
  beginLinkedInAuth: (nextPath?: string) => Promise<void>
  state: ReturnType<typeof useWorkspace>["state"]
  remoteHydrated: boolean
  remoteError: string | null
  saveProfile: ReturnType<typeof useWorkspace>["saveProfile"]
  saveBilling: ReturnType<typeof useWorkspace>["saveBilling"]
}) {
  const [profile, setProfile] = useState({
    name: state.profile.name || user?.fullName || "",
    title: state.profile.title,
    linkedinUrl: state.profile.linkedinUrl,
    industry: state.profile.industry,
    tone: state.profile.tone,
    goals: state.profile.goals.join(", "),
  })
  const [billing, setBilling] = useState<WorkspaceBilling>(state.billing)
  const [status, setStatus] = useState<string | null>(null)

  const onSaveProfile = () => {
    saveProfile({
      name: profile.name.trim(),
      title: profile.title.trim(),
      linkedinUrl: profile.linkedinUrl.trim(),
      industry: profile.industry.trim(),
      tone: profile.tone.trim(),
      goals: profile.goals.split(",").map((item) => item.trim()).filter(Boolean),
    })
    setStatus("Profile saved")
  }

  const onSaveBilling = () => {
    saveBilling(billing)
    setStatus("Plan state saved")
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 sm:px-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900">Settings</h1>
        <p className="mt-1 text-sm text-zinc-500">Profile, workspace plan state, and live integration status.</p>
      </div>

      {status ? <p className="mb-4 text-sm text-zinc-600">{status}</p> : null}

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6">
          <h2 className="text-base font-semibold text-zinc-900">Profile</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Field label="Name">
              <input value={profile.name} onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))} className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900" />
            </Field>
            <Field label="Title">
              <input value={profile.title} onChange={(e) => setProfile((prev) => ({ ...prev, title: e.target.value }))} className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900" />
            </Field>
            <Field label="LinkedIn URL">
              <input value={profile.linkedinUrl} onChange={(e) => setProfile((prev) => ({ ...prev, linkedinUrl: e.target.value }))} className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900" />
            </Field>
            <Field label="Industry">
              <input value={profile.industry} onChange={(e) => setProfile((prev) => ({ ...prev, industry: e.target.value }))} className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900" />
            </Field>
            <Field label="Brand tone">
              <input value={profile.tone} onChange={(e) => setProfile((prev) => ({ ...prev, tone: e.target.value }))} className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900" />
            </Field>
            <Field label="Goals (comma separated)">
              <input value={profile.goals} onChange={(e) => setProfile((prev) => ({ ...prev, goals: e.target.value }))} className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900" />
            </Field>
          </div>
          <button onClick={onSaveProfile} className="mt-4 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800">Save profile</button>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6">
          <h2 className="text-base font-semibold text-zinc-900">Billing and plan</h2>
          <p className="mt-1 text-sm text-zinc-500">Plan state persists in workspace. Checkout and billing portal are not migrated yet.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {PLANS.map((plan) => (
              <button
                key={plan}
                onClick={() => setBilling((prev) => ({ ...prev, plan }))}
                className={`rounded-lg px-3 py-2 text-sm font-semibold ${billing.plan === plan ? "bg-zinc-900 text-white" : "border border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-50"}`}
              >
                {plan}
              </button>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            {(["monthly", "annual"] as const).map((cycle) => (
              <button
                key={cycle}
                onClick={() => setBilling((prev) => ({ ...prev, billingCycle: cycle }))}
                className={`rounded-lg px-3 py-2 text-sm font-semibold ${billing.billingCycle === cycle ? "bg-teal text-white" : "border border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-50"}`}
              >
                {cycle}
              </button>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <MiniStat label="Current plan" value={billing.plan} />
            <MiniStat label="Billing cycle" value={billing.billingCycle} />
            <MiniStat label="Posts" value={String(state.posts.length)} />
            <MiniStat label="Checkout" value={billing.checkoutReady ? "Ready" : "Not migrated"} />
          </div>
          <button onClick={onSaveBilling} className="mt-4 rounded-lg border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-800 hover:bg-zinc-50">Save plan state</button>
        </section>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6">
          <h2 className="text-base font-semibold text-zinc-900">Integrations</h2>
          <div className="mt-4 rounded-xl border border-zinc-200 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-zinc-900">LinkedIn</h3>
                <p className="mt-1 text-sm text-zinc-500">{user?.linkedinMemberId ? `Connected as ${user.linkedinMemberId}` : "Not connected"}</p>
                {user?.linkedinTokenExpiresAt ? <p className="mt-1 text-xs text-zinc-500">Token expiry: {new Date(user.linkedinTokenExpiresAt).toLocaleString()}</p> : null}
              </div>
              {user?.linkedinMemberId ? (
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">Connected</span>
              ) : (
                <button onClick={() => beginLinkedInAuth("/settings")} className="rounded-lg bg-[#0A66C2] px-4 py-2 text-sm font-semibold text-white hover:bg-[#085fa8]">Connect</button>
              )}
            </div>
            <p className="mt-3 text-xs text-zinc-500">Publishing uses the live app session. OAuth revoke/disconnect UI is not migrated yet.</p>
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6">
          <h2 className="text-base font-semibold text-zinc-900">Workspace state</h2>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <MiniStat label="Remote hydrate" value={remoteHydrated ? "Ready" : "Loading"} />
            <MiniStat label="Remote error" value={remoteError || "None"} />
            <MiniStat label="Drafts" value={String(state.drafts.length)} />
            <MiniStat label="Scheduled" value={String(state.scheduled.length)} />
          </div>
          <p className="mt-4 text-xs text-zinc-500">Workspace profile and plan state save here. External billing and broader integrations stay out of scope for this phase.</p>
        </section>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-1 block text-xs font-medium text-zinc-500">{label}</span>{children}</label>
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3"><p className="text-xs text-zinc-500">{label}</p><p className="mt-1 text-sm font-semibold text-zinc-900">{value}</p></div>
}
