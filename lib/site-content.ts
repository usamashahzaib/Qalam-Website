export const PRODUCT_PAGES = {
  "post-writer": {
    eyebrow: "Product",
    title: "AI Post Writer",
    summary: "Draft LinkedIn posts in a structured workflow that keeps voice, hooks, and revisions in one place.",
    description:
      "Qalam's writer is the drafting surface for serious publishing. It is designed to turn a raw idea into a working post, then keep that draft connected to your voice settings, saved hooks, and revision history.",
    bullets: [
      "Topic-to-draft workflow in one screen",
      "Voice-aware tone selection and revision path",
      "Hooks, drafts, and final post stay connected",
    ],
  },
  "voice-profile": {
    eyebrow: "Product",
    title: "Voice Profile",
    summary: "Train Qalam on your approved writing so the system gets closer to your real tone over time.",
    description:
      "Voice Profile is the core memory layer. It stores the examples, edits, and approvals that make future drafts more specific to the writer instead of falling back to generic AI tone.",
    bullets: [
      "Learns from real source posts and edits",
      "Preserves long-term writing patterns",
      "Creates switching cost through accumulated voice data",
    ],
  },
  "hook-generator": {
    eyebrow: "Product",
    title: "Hook Generator",
    summary: "Build stronger opening lines, then feed the strongest structures back into your content system.",
    description:
      "The hook system is more useful when it is connected to your archive. Qalam tracks which openings you keep, which you reject, and which patterns you return to most often.",
    bullets: [
      "Pattern-based opening generation",
      "Reusable hook structures inside the archive",
      "Fast entry point into longer post workflows",
    ],
  },
  "post-scheduler": {
    eyebrow: "Product",
    title: "Post Scheduler",
    summary: "Move from drafting to planned publishing without losing attribution, timing, or revision context.",
    description:
      "Scheduling is part of the compounding loop. A scheduled post should remain tied to the draft that produced it, the version that was approved, and the outcome that followed after it went live.",
    bullets: [
      "Draft-to-schedule continuity",
      "Operational planning for teams and agencies",
      "Feeds later performance review and reuse",
    ],
  },
  "agency-workspaces": {
    eyebrow: "Product",
    title: "Agency Workspaces",
    summary: "Separate clients cleanly with their own voice memory, approvals, and publishing context.",
    description:
      "Agency workflows break when client memory bleeds together. Qalam isolates voice profiles, drafts, and approvals per client workspace so agencies can scale without flattening every account into the same tone.",
    bullets: [
      "Per-client workspace separation",
      "Approval flow before publishing",
      "Cleaner delivery and lower revision churn",
    ],
  },
} as const

export const USE_CASE_PAGES = {
  founders: {
    eyebrow: "Use Case",
    title: "For Founders",
    summary: "Publish with consistency without sounding like a ghostwritten content machine.",
    description:
      "Founders need a repeatable system for thought leadership, hiring signal, and market credibility. Qalam gives them a way to keep shipping posts without losing the personal voice people actually follow.",
    bullets: [
      "Faster authority-building workflow",
      "Keeps founder tone intact",
      "Reduces blank-page friction",
    ],
  },
  "marketing-teams": {
    eyebrow: "Use Case",
    title: "For Marketing Teams",
    summary: "Give every operator a sharper workflow while keeping the brand voice from drifting.",
    description:
      "Marketing teams need a shared system, not another disconnected content tool. Qalam helps teams organize voice rules, draft reviews, and reusable assets around the same operating surface.",
    bullets: [
      "Shared content system",
      "Cleaner review loop",
      "More consistent team output",
    ],
  },
  "hr-leaders": {
    eyebrow: "Use Case",
    title: "For HR Leaders",
    summary: "Build a credible professional voice for hiring, culture, and employer brand communication.",
    description:
      "HR leaders often need to publish consistently without sounding over-produced. Qalam helps them maintain clarity, warmth, and authority while preserving examples that can be reused and refined later.",
    bullets: [
      "Employer-brand publishing support",
      "Reusable narratives for culture and hiring",
      "Authority without agency overhead",
    ],
  },
  consultants: {
    eyebrow: "Use Case",
    title: "For Consultants",
    summary: "Turn expertise into a repeatable publishing system that compounds credibility over time.",
    description:
      "Consultants do not just need content volume. They need a consistent public signal that reinforces expertise. Qalam helps them keep frameworks, post ideas, and proven angles organized around one workflow.",
    bullets: [
      "Thought-leadership consistency",
      "Archive of reusable angles and frameworks",
      "Better signal for inbound opportunities",
    ],
  },
  agencies: {
    eyebrow: "Use Case",
    title: "For Agencies",
    summary: "Run multiple client content operations without collapsing every account into the same process.",
    description:
      "Agency mode is built around separation, approvals, and delivery quality. Each client can maintain a dedicated memory layer, while the agency keeps the overall workflow operational and reviewable.",
    bullets: [
      "Separate client memory",
      "Approval discipline before publish",
      "More scalable delivery quality",
    ],
  },
} as const
