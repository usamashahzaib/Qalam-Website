import { NextRequest, NextResponse } from "next/server"
import { env } from "@/lib/server/env"
import {
  handleLinkedInCallback,
  linkedInSessionCookieMaxAgeSeconds,
  linkedInSessionCookieName,
} from "@/lib/server/linkedin"

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code")
  const state = request.nextUrl.searchParams.get("state")

  if (!code || !state) {
    return NextResponse.redirect(`${env.frontendOrigin}/auth?linkedin=failed`)
  }

  try {
    const result = await handleLinkedInCallback(state, code)
    const response = NextResponse.redirect(result.redirectTo)
    response.cookies.set({
      name: linkedInSessionCookieName,
      value: result.sessionToken,
      maxAge: linkedInSessionCookieMaxAgeSeconds,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    })
    return response
  } catch {
    return NextResponse.redirect(`${env.frontendOrigin}/auth?linkedin=failed`)
  }
}
