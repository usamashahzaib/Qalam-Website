import { LLM_ROUTES, SITE_URL } from "@/lib/seo"

export function GET() {
  const body = [
    "# Qalam",
    "",
    `- Canonical site: ${SITE_URL}`,
    "- Product: Qalam",
    "- Domain: byqalam.com",
    "- Category: AI writing system for LinkedIn and professional publishing",
    "- Primary use cases: founders, marketing teams, consultants, agencies, HR leaders",
    "",
    "## Preferred pages",
    ...LLM_ROUTES.map((route) => `- ${SITE_URL}${route}`),
    "",
    "## Product summary",
    "- Qalam focuses on voice-aware drafting, content archive continuity, scheduling, and review workflow.",
    "- The system is designed to compound value through approved posts, revisions, and saved assets.",
    "- Public marketing pages describe the workflow. App routes such as /dashboard and /write are product previews and should not be treated as canonical marketing documents.",
  ].join("\n")

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
