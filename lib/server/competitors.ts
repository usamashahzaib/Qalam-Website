const extractLines = (text = "") =>
  text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)

const detectPlatformThemes = (text = "") => {
  const lower = text.toLowerCase()
  const patterns: Array<{ topic: string; pattern: RegExp }> = [
    { topic: "Hiring", pattern: /(hire|hiring|recruit|candidate|talent)/g },
    { topic: "Growth", pattern: /(growth|pipeline|revenue|mrr|saas|scale)/g },
    { topic: "Leadership", pattern: /(leadership|team|manager|culture|board)/g },
    { topic: "Product", pattern: /(product|roadmap|build|feature|launch)/g },
    { topic: "Brand", pattern: /(brand|audience|content|post|writing|voice)/g },
  ]

  return patterns
    .map(({ topic, pattern }) => ({
      topic,
      count: (lower.match(pattern) || []).length,
    }))
    .filter((item) => item.count > 0)
    .sort((a, b) => b.count - a.count)
}

export const analyzeCompetitorPaste = ({
  sourceText = "",
  profileName = "",
}: {
  sourceText?: string
  profileName?: string
}) => {
  const lines = extractLines(sourceText)
  const themes = detectPlatformThemes(sourceText)
  const hooks = lines.filter((line) => line.length > 40).slice(0, 3)
  const shortLines = lines.filter((line) => line.length <= 90)
  const cadence = shortLines.length > lines.length * 0.6 ? "Short-form, high break-rate" : "Longer-form, lower break-rate"
  const ctas = lines.filter((line) => /\?$|comment|dm|follow|share|save/i.test(line)).slice(0, 3)
  const summary = `${profileName || "This profile"} leans on ${
    themes[0]?.topic?.toLowerCase() || "general"
  } themes, uses ${cadence.toLowerCase()}, and repeats a direct teachable-post structure.`

  return {
    summary,
    themes: themes.slice(0, 4),
    hooks,
    ctas,
    cadence,
    recommendation: hooks[0]
      ? `Counter with a sharper angle on "${themes[0]?.topic || "their strongest theme"}" and avoid mirroring the opener: "${hooks[0]}".`
      : "Paste more profile/post text to extract a stronger pattern read.",
  }
}
