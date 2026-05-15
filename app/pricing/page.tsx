import type { Metadata } from "next"
import { PricingPageContent } from "@/components/PricingPageContent"
import { SITE_URL } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Pricing | Qalam",
  description:
    "Qalam pricing — Free forever, Pro at $19/mo, Team at $49/mo, Agency at $99/mo. All paid plans include a 7-day free trial. No credit card required to start.",
  alternates: { canonical: `${SITE_URL}/pricing` },
  openGraph: {
    title: "Pricing — Qalam",
    description:
      "Free forever, Pro at $19/month, Team at $49/month, Agency at $99/month. 7-day free trial on all paid plans.",
    url: `${SITE_URL}/pricing`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing — Qalam",
    description:
      "Free, Pro ($19/mo), Team ($49/mo), Agency ($99/mo). 7-day free trial on all paid plans.",
  },
}

const pricingFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is there a free plan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The Free plan gives you 5 AI post drafts per week. No credit card is required.",
      },
    },
    {
      "@type": "Question",
      name: "How much does Qalam cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pro is $19/month (or $15/month billed annually). Team is $49/month for 5 seats. Agency is $99/month with 15 client workspaces.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a free trial for paid plans?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All paid plans — Pro, Team, and Agency — include a 7-day free trial.",
      },
    },
    {
      "@type": "Question",
      name: "Can I cancel anytime?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Monthly plans cancel at the end of the billing period. Your voice data, archive, and post history remain on the account.",
      },
    },
  ],
}

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingFaqSchema) }}
      />
      <PricingPageContent />
    </>
  )
}
