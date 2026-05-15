import { randomUUID } from "node:crypto"
import { NextRequest, NextResponse } from "next/server"
import { resolveWorkspaceKey } from "@/lib/server/app-session"
import { analyzeCompetitorPaste } from "@/lib/server/competitors"
import { supabaseInsert } from "@/lib/server/supabase-rest"

type AnalyzeRequest = {
  workspaceKey?: string
  profileId?: string | null
  profileName?: string | null
  platform?: string
  sourceText?: string
}

type WorkspaceJob = {
  id: string
  workspace_key: string
  job_type: string
  status: string
  title: string
  payload: Record<string, unknown>
  created_at: string
  updated_at: string
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as AnalyzeRequest
    const workspaceKey = resolveWorkspaceKey(request, body.workspaceKey)
    if (!body.sourceText?.trim()) {
      return NextResponse.json({ error: "competitor_source_missing" }, { status: 400 })
    }

    const analysis = analyzeCompetitorPaste({
      sourceText: body.sourceText,
      profileName: body.profileName || "",
    })

    let job: WorkspaceJob | null = null
    try {
      const rows = await supabaseInsert<WorkspaceJob>("workspace_jobs", {
        id: randomUUID(),
        workspace_key: workspaceKey,
        job_type: "competitor_analysis",
        status: "completed",
        title: `${body.profileName || "Competitor"} analysis`,
        payload: {
          profileId: body.profileId || null,
          profileName: body.profileName || null,
          platform: body.platform || "linkedin",
          sourceText: body.sourceText,
          analysis,
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      job = rows?.[0] || null
    } catch {
      // Supabase unavailable — analysis result still returned
    }

    return NextResponse.json({ analysis, job })
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message || "server_error" }, { status: 500 })
  }
}
