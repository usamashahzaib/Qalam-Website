import type { Metadata } from "next"
import "./globals.css"
import { NavWrapper } from "@/components/NavWrapper"
import GridGlowBackground from "@/components/ui/grid-glow-background"
import { SITE_NAME, SITE_URL } from "@/lib/seo"

const siteUrl = SITE_URL

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Qalam | AI LinkedIn Writing System for Professionals",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Qalam is a voice-aware LinkedIn writing system for founders, teams, consultants, and agencies. Build drafts, archive winning posts, schedule publishing, and keep reusable content memory.",
  keywords: [
    "Qalam",
    "LinkedIn writing tool",
    "AI LinkedIn post generator",
    "LinkedIn content system",
    "voice profile writing AI",
    "LinkedIn post writer",
    "LinkedIn scheduler",
    "agency content workflow",
    "brand voice AI",
    "content archive software",
  ],
  authors: [{ name: SITE_NAME, url: siteUrl }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  applicationName: SITE_NAME,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: SITE_NAME,
    title: "Qalam | AI LinkedIn Writing System",
    description:
      "Voice-aware LinkedIn drafting, post memory, archive continuity, scheduling, and content operations in one system.",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Qalam AI LinkedIn writing system",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Qalam | AI LinkedIn Writing System",
    description:
      "Voice-aware LinkedIn drafting, archive continuity, scheduling, and publishing workflow for professionals.",
    images: [`${siteUrl}/og-image.png`],
    creator: "@byqalam",
    site: "@byqalam",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
}

const appSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: SITE_NAME,
      url: siteUrl,
      logo: `${siteUrl}/og-image.png`,
      sameAs: [
        "https://www.linkedin.com/company/byqalam",
        "https://www.instagram.com/byyqalam",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: SITE_NAME,
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en",
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#app`,
      name: SITE_NAME,
      url: siteUrl,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "Qalam is a voice-aware LinkedIn writing system with post memory, archive continuity, scheduling, and team workflow support.",
      publisher: { "@id": `${siteUrl}/#organization` },
      offers: [
        {
          "@type": "Offer",
          name: "Free",
          price: "0",
          priceCurrency: "USD",
          description: "5 AI posts per week. No credit card required.",
        },
        {
          "@type": "Offer",
          name: "Pro",
          price: "19",
          priceCurrency: "USD",
          description: "Unlimited AI posts, Voice Profile, analytics, and post scheduling.",
        },
        {
          "@type": "Offer",
          name: "Team",
          price: "49",
          priceCurrency: "USD",
          description: "5 team seats, shared content library, review workflow, and team analytics.",
        },
        {
          "@type": "Offer",
          name: "Agency",
          price: "99",
          priceCurrency: "USD",
          description: "15 client workspaces, per-client Voice Profiles, and client approval workflow.",
        },
      ],
    },
  ],
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Qalam?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Qalam is an AI-powered LinkedIn content platform that helps creators, founders, and teams draft, archive, and improve professional content in their own voice.",
      },
    },
    {
      "@type": "Question",
      name: "How does the Voice Profile work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You provide real LinkedIn posts and examples. Qalam uses those examples, plus later edits and approvals, to move future drafts closer to your tone and structure.",
      },
    },
    {
      "@type": "Question",
      name: "What happens to my Voice Profile if I cancel?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your Voice Profile and post archive stay attached to the account. Access changes by plan, but the memory layer is preserved.",
      },
    },
    {
      "@type": "Question",
      name: "Does Qalam work for any LinkedIn niche?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Qalam performs best when the writer brings real source material from their own audience and niche instead of relying on generic prompts.",
      },
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <GridGlowBackground
          glowColors={["#b8e6c8", "#e8d5a8", "#7abf9e"]}
          backgroundColor="#fafaf8"
          gridColor="rgba(13,74,69,0.07)"
          glowCount={12}
        >
          <NavWrapper>{children}</NavWrapper>
        </GridGlowBackground>
      </body>
    </html>
  )
}
