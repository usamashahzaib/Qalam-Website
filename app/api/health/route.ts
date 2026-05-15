import { NextResponse } from "next/server"
import { env } from "@/lib/server/env"

export async function GET() {
  try {
    const ok = Boolean(env.appSessionSecret && env.supabaseUrl && env.supabaseServiceRoleKey)
    return NextResponse.json({ ok }, { status: ok ? 200 : 503 })
  } catch {
    return NextResponse.json({ ok: false }, { status: 503 })
  }
}
