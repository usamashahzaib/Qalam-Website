export interface PricingPlan {
  plan: string
  price: string
  period: string
  description: string
  features: string[]
  cta: string
  href: string
  highlighted?: boolean
  badge?: string
  annualPrice?: string
  annualHref?: string
  annualDescription?: string
}

export const PLANS: PricingPlan[] = [
  {
    plan: "Free",
    price: "$0",
    period: "forever",
    description: "Try the core writer — no credit card. Upgrade to unlock Voice Profile training and your post archive.",
    features: [
      "5 AI posts per week",
      "3 hook variations per post",
      "3 tone modes",
      "Post preview & copy",
      "No Voice Profile (upgrade to train your voice)",
    ],
    cta: "Start Free →",
    href: "/auth/sign-up",
    highlighted: false,
  },
  {
    plan: "Pro",
    price: "$19",
    period: "mo",
    description: "Your trained Voice Profile and full performance archive — assets that compound with every post.",
    features: [
      "Voice Fingerprint — trains and improves over time",
      "Unlimited AI posts",
      "All 5 tone modes",
      "Hook Generator — 10 variations/post",
      "Post Scheduler (30 posts/mo)",
      "LinkedIn Analytics dashboard",
      "7-day free trial",
      "Priority email support",
    ],
    cta: "Start Pro Trial →",
    href: "/auth/sign-up?plan=pro",
    highlighted: true,
    badge: "Most Popular",
    annualPrice: "$15",
    annualHref: "/auth/sign-up?plan=pro-annual",
    annualDescription: "Billed annually — save $48/year.",
  },
  {
    plan: "Team",
    price: "$49",
    period: "mo",
    description: "A shared brand voice, team draft reviews, and a content library your whole team writes from.",
    features: [
      "Everything in Pro",
      "5 team seats (each with their own Voice Fingerprint)",
      "Brand Voice Rulebook — shared style guide",
      "Team draft reviews & comments",
      "Shared content library",
      "Team analytics & reporting",
      "Unlimited scheduling",
      "Dedicated success manager",
    ],
    cta: "Start Team Trial →",
    href: "/auth/sign-up?plan=team",
    highlighted: false,
    annualPrice: "$39",
    annualHref: "/auth/sign-up?plan=team-annual",
    annualDescription: "Billed annually — save $120/year.",
  },
  {
    plan: "Agency",
    price: "$99",
    period: "mo",
    description: "Per-client Voice Fingerprints, approval pipelines, and cross-client performance intelligence.",
    features: [
      "Everything in Team",
      "Up to 15 client workspaces",
      "Per-client Voice Fingerprints",
      "Client approval pipeline",
      "Agency analytics — cross-client dashboard",
      "White-label post export",
      "Priority Slack support",
    ],
    cta: "Start Agency Trial →",
    href: "/auth/sign-up?plan=agency",
    highlighted: false,
    badge: "For Agencies",
    annualPrice: "$79",
    annualHref: "/auth/sign-up?plan=agency-annual",
    annualDescription: "Billed annually — save $240/year.",
  },
]

export const COMPARISON_ROWS: {
  label: string
  free: string
  pro: string
  team: string
  agency: string
}[] = [
  { label: "AI Post Generation", free: "5/week", pro: "Unlimited", team: "Unlimited", agency: "Unlimited" },
  { label: "Hook Variations", free: "3/post", pro: "10/post", team: "10/post", agency: "10/post" },
  { label: "Tone Modes", free: "3", pro: "All 5", team: "All 5", agency: "All 5" },
  { label: "Voice Fingerprint", free: "✗", pro: "✓ Trains over time", team: "✓ Per seat", agency: "✓ Per client" },
  { label: "Post Scheduler", free: "✗", pro: "30/mo", team: "Unlimited", agency: "Unlimited" },
  { label: "LinkedIn Analytics", free: "✗", pro: "✓ Full", team: "✓ Team reports", agency: "✓ Cross-client" },
  { label: "Brand Voice Rulebook", free: "✗", pro: "✗", team: "✓", agency: "✓" },
  { label: "Team Draft Reviews", free: "✗", pro: "✗", team: "✓", agency: "✓" },
  { label: "Shared Content Library", free: "✗", pro: "✗", team: "✓", agency: "✓" },
  { label: "Client Workspaces", free: "✗", pro: "✗", team: "✗", agency: "Up to 15" },
  { label: "Client Approval Pipeline", free: "✗", pro: "✗", team: "✗", agency: "✓" },
  { label: "Team Seats", free: "1", pro: "1", team: "5", agency: "5 + 15 workspaces" },
  { label: "Support", free: "Email", pro: "Priority email", team: "Dedicated Manager", agency: "Priority Slack" },
]
