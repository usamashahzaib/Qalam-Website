import { NextRequest, NextResponse } from "next/server"
import { resolveWorkspaceKey } from "@/lib/server/app-session"
import { supabaseInsert, supabaseSelect } from "@/lib/server/supabase-rest"

type WorkspaceRow = {
  state: Record<string, unknown> | null
  updated_at: string | null
}

export async function GET(request: NextRequest) {
  try {
    const workspaceKey = resolveWorkspaceKey(request, request.nextUrl.searchParams.get("workspaceKey"))
    const query = `workspace_key=eq.${encodeURIComponent(workspaceKey)}&select=state,updated_at&limit=1`
    const rows = await supabaseSelect<WorkspaceRow>("workspace_snapshots", query)
    const row = rows?.[0]
    return NextResponse.json({
      state: row?.state || null,
      updatedAt: row?.updated_at || null,
    })
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message || "server_error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = (await request.json()) as { workspaceKey?: string; state?: Record<string, unknown> }
    const workspaceKey = resolveWorkspaceKey(request, body.workspaceKey)
    const rows = await supabaseInsert<WorkspaceRow>(
      "workspace_snapshots",
      {
        workspace_key: workspaceKey,
        state: body.state || {},
        updated_at: new Date().toISOString(),
      },
      "resolution=merge-duplicates,return=representation"
    )
    return NextResponse.json({ saved: true, row: rows?.[0] || null })
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message || "server_error" }, { status: 500 })
  }
}
