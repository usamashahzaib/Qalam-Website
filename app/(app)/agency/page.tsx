"use client"

import { useCallback, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { useWorkspace, type AgencyClient, type AgencyTeamMember, type WorkspacePost } from "@/components/providers/WorkspaceProvider"

const ROLES = ["admin", "editor", "viewer"] as const

const newId = () =>
  typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`

const buildClientDraft = (client: AgencyClient) => ({
  id: null as string | null,
  title: `Content for ${client.name}`,
  content: [
    `Writing for: ${client.name}`,
    client.industry ? `Industry: ${client.industry}` : null,
    client.linkedinUrl ? `LinkedIn: ${client.linkedinUrl}` : null,
    client.notes ? `\nClient notes:\n${client.notes}` : null,
    "\n[Start writing here]",
  ]
    .filter(Boolean)
    .join("\n"),
  type: "client post",
  status: "draft",
  date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
  scheduledTime: null as string | null,
  externalPostUrn: null as string | null,
  updatedAt: new Date().toISOString(),
})

const buildMarkdownExport = (posts: WorkspacePost[], clientName?: string) => {
  const header = [
    `# Post export${clientName ? ` — ${clientName}` : ""}`,
    `Generated: ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`,
    "",
  ]
  if (posts.length === 0) return [...header, "No posts in workspace."].join("\n")
  const body = posts.flatMap((p) => [
    `## ${p.title}`,
    `Status: ${p.status} · Type: ${p.type} · Date: ${p.date}`,
    "",
    p.content,
    "",
    "---",
    "",
  ])
  return [...header, ...body].join("\n")
}

export default function AgencyPage() {
  const router = useRouter()
  const { state, saveAgency } = useWorkspace()
  const { clients, teamMembers, activeClientId } = state.agency

  const [status, setStatus] = useState<string | null>(null)
  const [addingClient, setAddingClient] = useState(false)
  const [clientForm, setClientForm] = useState({ name: "", industry: "", linkedinUrl: "", notes: "" })
  const [editingClientId, setEditingClientId] = useState<string | null>(null)
  const [editClientForm, setEditClientForm] = useState({ name: "", industry: "", linkedinUrl: "", notes: "" })
  const [addingMember, setAddingMember] = useState(false)
  const [memberForm, setMemberForm] = useState<{ name: string; email: string; role: AgencyTeamMember["role"] }>({
    name: "",
    email: "",
    role: "editor",
  })

  const activeClient = useMemo(
    () => clients.find((c) => c.id === activeClientId) || null,
    [clients, activeClientId]
  )

  const onAddClient = useCallback(() => {
    if (!clientForm.name.trim()) return
    const entry: AgencyClient = {
      id: newId(),
      name: clientForm.name.trim(),
      industry: clientForm.industry.trim(),
      linkedinUrl: clientForm.linkedinUrl.trim(),
      notes: clientForm.notes.trim(),
      addedAt: new Date().toISOString(),
    }
    saveAgency({ clients: [entry, ...clients] })
    setClientForm({ name: "", industry: "", linkedinUrl: "", notes: "" })
    setAddingClient(false)
    setStatus(`Added ${entry.name}`)
  }, [clientForm, clients, saveAgency])

  const onSaveClientEdit = useCallback(
    (id: string) => {
      saveAgency({
        clients: clients.map((c) =>
          c.id === id
            ? {
                ...c,
                name: editClientForm.name.trim() || c.name,
                industry: editClientForm.industry.trim(),
                linkedinUrl: editClientForm.linkedinUrl.trim(),
                notes: editClientForm.notes.trim(),
              }
            : c
        ),
      })
      setEditingClientId(null)
      setStatus("Client updated")
    },
    [clients, editClientForm, saveAgency]
  )

  const onRemoveClient = useCallback(
    (id: string) => {
      saveAgency({
        clients: clients.filter((c) => c.id !== id),
        activeClientId: activeClientId === id ? null : activeClientId,
      })
    },
    [clients, activeClientId, saveAgency]
  )

  const onSetActiveClient = useCallback(
    (id: string | null) => {
      saveAgency({ activeClientId: id })
      setStatus(
        id
          ? `Active client: ${clients.find((c) => c.id === id)?.name || id}`
          : "Active client cleared"
      )
    },
    [clients, saveAgency]
  )

  const onAddMember = useCallback(() => {
    if (!memberForm.name.trim()) return
    const entry: AgencyTeamMember = {
      id: newId(),
      name: memberForm.name.trim(),
      email: memberForm.email.trim(),
      role: memberForm.role,
      addedAt: new Date().toISOString(),
    }
    saveAgency({ teamMembers: [entry, ...teamMembers] })
    setMemberForm({ name: "", email: "", role: "editor" })
    setAddingMember(false)
    setStatus(`Added ${entry.name} to team`)
  }, [memberForm, teamMembers, saveAgency])

  const onRemoveMember = useCallback(
    (id: string) => {
      saveAgency({ teamMembers: teamMembers.filter((m) => m.id !== id) })
    },
    [teamMembers, saveAgency]
  )

  const onWriteAsClient = useCallback(
    (client: AgencyClient) => {
      if (typeof window === "undefined") return
      sessionStorage.setItem("writerLoad", JSON.stringify(buildClientDraft(client)))
      router.push("/writer")
    },
    [router]
  )

  const onExport = useCallback(() => {
    if (typeof window === "undefined") return
    const md = buildMarkdownExport(state.posts, activeClient?.name)
    const blob = new Blob([md], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `posts-export${activeClient ? `-${activeClient.name.toLowerCase().replace(/\s+/g, "-")}` : ""}.md`
    a.click()
    URL.revokeObjectURL(url)
    setStatus("Posts exported as markdown")
  }, [state.posts, activeClient])

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 sm:px-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Agency</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Manage clients and team members. State persists in your workspace.
          </p>
        </div>
        <button
          onClick={onExport}
          className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-800 hover:bg-zinc-50"
        >
          Export posts
        </button>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-3">
        <Stat label="Clients" value={String(clients.length)} />
        <Stat label="Team members" value={String(teamMembers.length)} />
        <Stat label="Active client" value={activeClient?.name || "None"} />
      </div>

      {status ? <p className="mb-4 text-sm text-zinc-600">{status}</p> : null}

      {activeClient && (
        <section className="mb-6 rounded-2xl border border-teal/20 bg-teal/5 p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-teal">Active client</p>
              <h2 className="mt-1 text-base font-semibold text-zinc-900">{activeClient.name}</h2>
              {activeClient.industry && <p className="mt-0.5 text-sm text-zinc-500">{activeClient.industry}</p>}
              {activeClient.linkedinUrl && (
                <p className="mt-0.5 truncate text-xs text-zinc-400">{activeClient.linkedinUrl}</p>
              )}
              {activeClient.notes && (
                <p className="mt-2 text-xs leading-relaxed text-zinc-600">{activeClient.notes}</p>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => onWriteAsClient(activeClient)}
                className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
              >
                Write as client
              </button>
              <button
                onClick={() => onSetActiveClient(null)}
                className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-600 hover:bg-zinc-50"
              >
                Clear
              </button>
            </div>
          </div>
        </section>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* clients */}
        <section className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-zinc-900">
              Clients{" "}
              <span className="ml-1 text-sm font-normal text-zinc-400">{clients.length}</span>
            </h2>
            <button
              onClick={() => setAddingClient((v) => !v)}
              className="text-xs font-semibold text-teal hover:underline"
            >
              {addingClient ? "Cancel" : "+ Add client"}
            </button>
          </div>

          {addingClient && (
            <div className="mb-4 space-y-2 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
              <div className="grid grid-cols-2 gap-2">
                <FormInput
                  label="Name"
                  value={clientForm.name}
                  onChange={(v) => setClientForm((p) => ({ ...p, name: v }))}
                  placeholder="Client name"
                />
                <FormInput
                  label="Industry"
                  value={clientForm.industry}
                  onChange={(v) => setClientForm((p) => ({ ...p, industry: v }))}
                  placeholder="e.g. Fintech"
                />
              </div>
              <FormInput
                label="LinkedIn URL"
                value={clientForm.linkedinUrl}
                onChange={(v) => setClientForm((p) => ({ ...p, linkedinUrl: v }))}
                placeholder="https://linkedin.com/in/..."
              />
              <FormTextarea
                label="Notes"
                value={clientForm.notes}
                onChange={(v) => setClientForm((p) => ({ ...p, notes: v }))}
                placeholder="Voice, tone, content goals..."
              />
              <button
                onClick={onAddClient}
                className="rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-zinc-800"
              >
                Add client
              </button>
            </div>
          )}

          {clients.length === 0 ? (
            <p className="py-6 text-center text-sm text-zinc-400">No clients yet.</p>
          ) : (
            <div className="space-y-2">
              {clients.map((client) => (
                <div
                  key={client.id}
                  className={`rounded-xl border p-4 ${
                    activeClientId === client.id
                      ? "border-teal/30 bg-teal/5"
                      : "border-zinc-200 bg-zinc-50"
                  }`}
                >
                  {editingClientId === client.id ? (
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <FormInput
                          label="Name"
                          value={editClientForm.name}
                          onChange={(v) => setEditClientForm((p) => ({ ...p, name: v }))}
                          placeholder={client.name}
                        />
                        <FormInput
                          label="Industry"
                          value={editClientForm.industry}
                          onChange={(v) => setEditClientForm((p) => ({ ...p, industry: v }))}
                          placeholder={client.industry || "Industry"}
                        />
                      </div>
                      <FormInput
                        label="LinkedIn URL"
                        value={editClientForm.linkedinUrl}
                        onChange={(v) => setEditClientForm((p) => ({ ...p, linkedinUrl: v }))}
                        placeholder={client.linkedinUrl || "URL"}
                      />
                      <FormTextarea
                        label="Notes"
                        value={editClientForm.notes}
                        onChange={(v) => setEditClientForm((p) => ({ ...p, notes: v }))}
                        placeholder={client.notes || "Notes"}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => onSaveClientEdit(client.id)}
                          className="rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-white"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingClientId(null)}
                          className="text-xs text-zinc-400 hover:underline"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="truncate text-sm font-semibold text-zinc-900">{client.name}</p>
                          {activeClientId === client.id && (
                            <span className="rounded-full bg-teal/10 px-2 py-0.5 text-[11px] font-semibold text-teal">
                              Active
                            </span>
                          )}
                        </div>
                        {client.industry && (
                          <p className="mt-0.5 text-xs text-zinc-500">{client.industry}</p>
                        )}
                        {client.notes && (
                          <p className="mt-1 line-clamp-2 text-xs text-zinc-400">{client.notes}</p>
                        )}
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-1.5">
                        <button
                          onClick={() =>
                            onSetActiveClient(activeClientId === client.id ? null : client.id)
                          }
                          className={`text-xs font-semibold ${
                            activeClientId === client.id
                              ? "text-zinc-400 hover:text-zinc-600"
                              : "text-teal hover:underline"
                          }`}
                        >
                          {activeClientId === client.id ? "Deselect" : "Set active"}
                        </button>
                        <button
                          onClick={() => {
                            setEditingClientId(client.id)
                            setEditClientForm({
                              name: client.name,
                              industry: client.industry,
                              linkedinUrl: client.linkedinUrl,
                              notes: client.notes,
                            })
                          }}
                          className="text-xs text-zinc-400 hover:text-zinc-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onRemoveClient(client.id)}
                          className="text-xs text-zinc-400 hover:text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* team members */}
        <section className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-zinc-900">
              Team{" "}
              <span className="ml-1 text-sm font-normal text-zinc-400">{teamMembers.length}</span>
            </h2>
            <button
              onClick={() => setAddingMember((v) => !v)}
              className="text-xs font-semibold text-teal hover:underline"
            >
              {addingMember ? "Cancel" : "+ Add member"}
            </button>
          </div>

          {addingMember && (
            <div className="mb-4 space-y-2 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
              <div className="grid grid-cols-2 gap-2">
                <FormInput
                  label="Name"
                  value={memberForm.name}
                  onChange={(v) => setMemberForm((p) => ({ ...p, name: v }))}
                  placeholder="Full name"
                />
                <FormInput
                  label="Email"
                  value={memberForm.email}
                  onChange={(v) => setMemberForm((p) => ({ ...p, email: v }))}
                  placeholder="email@..."
                />
              </div>
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-zinc-500">Role</span>
                <select
                  value={memberForm.role}
                  onChange={(e) =>
                    setMemberForm((p) => ({
                      ...p,
                      role: e.target.value as AgencyTeamMember["role"],
                    }))
                  }
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-teal/30"
                >
                  {ROLES.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </label>
              <button
                onClick={onAddMember}
                className="rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-zinc-800"
              >
                Add member
              </button>
            </div>
          )}

          {teamMembers.length === 0 ? (
            <p className="py-6 text-center text-sm text-zinc-400">No team members yet.</p>
          ) : (
            <div className="space-y-2">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-zinc-900">{member.name}</p>
                    <div className="mt-0.5 flex flex-wrap items-center gap-2">
                      {member.email && (
                        <span className="truncate text-xs text-zinc-400">{member.email}</span>
                      )}
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                          member.role === "admin"
                            ? "bg-zinc-900 text-white"
                            : member.role === "editor"
                              ? "bg-zinc-200 text-zinc-700"
                              : "bg-zinc-100 text-zinc-500"
                        }`}
                      >
                        {member.role}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveMember(member.id)}
                    className="ml-3 shrink-0 text-xs text-zinc-400 hover:text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <section className="mt-6 rounded-2xl border border-zinc-100 bg-zinc-50 p-5">
        <p className="text-xs font-semibold text-zinc-500">About agency mode</p>
        <p className="mt-1 text-xs leading-relaxed text-zinc-400">
          Client and team data persist in your workspace. &quot;Write as client&quot; opens the writer
          with a pre-loaded draft seeded from the client&apos;s name, industry, and notes. Export
          downloads all workspace posts as plain markdown with no Qalam branding. Per-client workspace
          isolation and role-based access control are not migrated yet.
        </p>
      </section>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4">
      <p className="text-xs text-zinc-500">{label}</p>
      <p className="mt-1 truncate text-lg font-bold text-zinc-900">{value}</p>
    </div>
  )
}

function FormInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-zinc-500">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-teal/30"
      />
    </label>
  )
}

function FormTextarea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-zinc-500">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full resize-none rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-teal/30"
      />
    </label>
  )
}
