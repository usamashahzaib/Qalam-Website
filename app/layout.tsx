import type { Metadata } from "next"
import { Plus_Jakarta_Sans, Cormorant_Garamond } from "next/font/google"
import "./globals.css"
import { NavWrapper } from "@/components/NavWrapper"
import GridGlowBackground from "@/components/ui/grid-glow-background"

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
})

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://qalam.ai"),
  title: {
    default: "Qalam — AI LinkedIn Post Generator for Creators & Founders",
    template: "%s | Qalam",
  },
  description:
    "Write less. Post more. Grow faster. Qalam's AI learns your unique voice and generates scroll-stopping LinkedIn content in seconds. Trusted by 12,000+ creators, founders, and HR leaders.",
  keywords: [
    "AI LinkedIn post generator",
    "LinkedIn content AI tool",
    "LinkedIn post writer",
    "Voice Fingerprint AI writing",
    "LinkedIn content creation",
    "AI writing assistant",
    "LinkedIn growth tool",
    "Qalam AI",
    "AI social media content",
    "LinkedIn scheduler",
  ],
  authors: [{ name: "Qalam", url: "https://qalam.ai" }],
  creator: "Qalam",
  publisher: "Qalam Inc.",
  alternates: {
    canonical: "https://qalam.ai",
  },
  openGraph: {
    type: "website",
    url: "https://qalam.ai",
    siteName: "Qalam",
    title: "Qalam — AI LinkedIn Post Generator",
    description:
      "Your AI writing partner that learns your voice and turns raw ideas into scroll-stopping LinkedIn content in seconds. Join 12,000+ creators growing faster with Qalam.",
    images: [
      {
        url: "https://qalam.ai/og-image.png",
        width: 1200,
        height: 630,
        alt: "Qalam — AI LinkedIn Content Generator",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Qalam — AI LinkedIn Post Generator",
    description:
      "Write less. Post more. Grow faster. Qalam's AI learns your voice and generates viral LinkedIn posts in seconds.",
    images: ["https://qalam.ai/og-image.png"],
    creator: "@qalamhq",
    site: "@qalamhq",
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${cormorant.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Qalam",
              url: "https://qalam.ai",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              description:
                "Qalam is an AI-powered LinkedIn content platform that learns your unique writing voice and generates scroll-stopping posts in seconds.",
              offers: [
                {
                  "@type": "Offer",
                  name: "Free",
                  price: "0",
                  priceCurrency: "USD",
                  description: "5 AI posts per week, 3 hook variations, basic tone options.",
                },
                {
                  "@type": "Offer",
                  name: "Pro",
                  price: "19",
                  priceCurrency: "USD",
                  description: "Unlimited AI posts, Voice Fingerprint, all tone modes, Hook Generator, Scheduler, Analytics.",
                },
                {
                  "@type": "Offer",
                  name: "Team",
                  price: "49",
                  priceCurrency: "USD",
                  description: "Everything in Pro plus 5 seats, team analytics, brand voice guidelines, and dedicated success manager.",
                },
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                ratingCount: "12000",
                bestRating: "5",
                worstRating: "1",
              },
              creator: {
                "@type": "Organization",
                name: "Qalam Inc.",
                url: "https://qalam.ai",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What is Qalam?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Qalam is an AI-powered LinkedIn content platform that helps creators, founders, and marketing teams write and publish high-performing posts in a fraction of the time. It learns your unique writing voice to generate content that sounds exactly like you.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How does the Voice Fingerprint work?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "You paste in 5\u201310 of your existing LinkedIn posts, and Qalam analyzes your sentence structure, vocabulary, tone, and cadence. It then mirrors your style in every piece of content it generates — so your audience always hears your authentic voice.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I cancel my subscription anytime?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Absolutely. There are no long-term contracts. Cancel from your account settings at any time with one click. You'll retain access until the end of your billing period.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How many posts can I generate per month?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Free plan users can generate 5 posts per week (20/month). Pro and Team plan subscribers enjoy unlimited post generation with no caps on creativity.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Does Qalam work for any LinkedIn niche?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. Qalam has been tested across SaaS, finance, HR, consulting, coaching, engineering, and 40+ other niches. The AI adapts to your industry's language and trending topics automatically.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is there a free trial for Pro?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes — Pro and Team plans include a 7-day free trial. No credit card required to start. Experience the full power of Qalam before committing.",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <GridGlowBackground
          glowColors={["#0D4A45", "#C9871F", "#0a3c38"]}
          backgroundColor="#030f0e"
          gridColor="rgba(13,74,69,0.08)"
          glowCount={12}
        >
          <NavWrapper>{children}</NavWrapper>
        </GridGlowBackground>
      </body>
    </html>
  )
}
