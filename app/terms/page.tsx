import type { Metadata } from "next"
import Link from "next/link"
import { FadeUp } from "@/components/FadeUp"
import { SITE_URL } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Terms of Service | Qalam",
  description:
    "Qalam Terms of Service — acceptable use, intellectual property, billing, content ownership, and enforcement.",
  alternates: { canonical: `${SITE_URL}/terms` },
  robots: { index: true, follow: true },
}

const SECTIONS = [
  {
    id: "ip",
    title: "Intellectual Property and Copyright",
    content: [
      "All content on byqalam.com — including but not limited to the product interface, copy, design, code, icons, illustrations, marketing materials, documentation, blog posts, and generated output templates — is the exclusive intellectual property of Qalam and is protected by copyright, trade dress, and applicable intellectual property laws.",
      "You may not copy, reproduce, republish, upload, transmit, distribute, sell, license, adapt, or create derivative works from any part of this site or product without prior written permission from Qalam. Scraping, automated harvesting, or systematic extraction of content via bots, spiders, or other automated means is expressly prohibited.",
      "Fair use and legitimate quotation (with attribution and a link to the source) are permitted for non-commercial editorial, journalistic, or educational purposes, limited to excerpts of no more than 100 words per article or page.",
    ],
  },
  {
    id: "watermark",
    title: "Content Fingerprinting and Watermarking",
    content: [
      "All content copied from byqalam.com — including marketing copy, product descriptions, blog articles, and application output — is automatically fingerprinted with invisible digital watermarks at the session and device level. These watermarks persist through plain-text copy-paste operations and allow Qalam to identify the origin, session, and approximate time of unauthorized reproduction.",
      "By using this site you acknowledge that this fingerprinting is active and that any copied content carries an embedded identifier. Qalam reserves the right to use this evidence in legal proceedings, DMCA takedown actions, or cease-and-desist enforcement.",
    ],
  },
  {
    id: "prohibited",
    title: "Prohibited Uses",
    content: [
      "You may not use this site or the Qalam product to: copy or reproduce proprietary content for commercial gain; train, fine-tune, or otherwise inform any AI or machine learning model without express written permission; impersonate Qalam or its staff; distribute spam, phishing, or deceptive content; attempt to reverse-engineer, decompile, or extract source code from the application; access the product through automated scripts, bots, or credential-sharing; or engage in any activity that violates applicable law.",
      "Violation of these terms may result in immediate account termination, IP-level blocking, and legal action including claims for damages, injunctive relief, and recovery of legal costs.",
    ],
  },
  {
    id: "your-content",
    title: "Your Content",
    content: [
      "Content you create using Qalam — drafts, posts, voice examples, and exported assets — remains yours. You grant Qalam a limited, non-exclusive license to process that material solely to deliver the product features you use. Qalam does not claim ownership of your original content and does not sell or share it with third parties for advertising or commercial purposes.",
      "You represent that you have the rights necessary to submit any content you provide, and that it does not infringe on third-party intellectual property.",
    ],
  },
  {
    id: "dmca",
    title: "DMCA and Copyright Infringement Claims",
    content: [
      "If you believe content on byqalam.com infringes your copyright, send a DMCA takedown notice to legal@byqalam.com with: (1) identification of the copyrighted work claimed to have been infringed; (2) identification of the infringing material and its location on the site; (3) your contact information; (4) a statement of good faith belief that the use is not authorized; and (5) a statement under penalty of perjury that the information is accurate and that you are authorized to act on the copyright owner's behalf.",
    ],
  },
  {
    id: "billing",
    title: "Billing and Subscriptions",
    content: [
      "Paid plans renew automatically at the end of each billing period until you cancel. Cancellation takes effect at the end of the current billing period — you retain access until then. Refunds are not issued for partial billing periods. If you believe a charge is in error, contact billing@byqalam.com within 14 days.",
    ],
  },
  {
    id: "availability",
    title: "Availability and Changes",
    content: [
      "Qalam is provided 'as is'. We aim to maintain high uptime and improve the product over time, but make no guarantees of uninterrupted availability. We reserve the right to modify or discontinue features, pricing, or the service itself with reasonable notice. Material changes to these Terms will be communicated by email or in-app notice.",
    ],
  },
  {
    id: "governing",
    title: "Governing Law and Disputes",
    content: [
      "These Terms are governed by the laws of the jurisdiction in which Qalam is registered. Any disputes shall first be attempted to be resolved through good-faith negotiation. If unresolved after 30 days, disputes shall be submitted to binding arbitration under the applicable arbitration rules of that jurisdiction. Nothing in this clause prevents Qalam from seeking emergency injunctive relief in any court of competent jurisdiction.",
    ],
  },
  {
    id: "contact",
    title: "Questions",
    content: [
      "For intellectual property matters: legal@byqalam.com. For billing: billing@byqalam.com. For general support: hello@byqalam.com. If any provision of these Terms is unclear, contact us before relying on an assumption.",
    ],
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-zinc-50 pt-24">
      <section className="border-b border-zinc-100 bg-white px-6 py-20">
        <div className="mx-auto max-w-[760px]">
          <FadeUp>
            <span className="chip mb-5 inline-flex border-teal/30 bg-teal-50 text-teal">
              Legal
            </span>
            <h1 className="mb-4 text-5xl font-extrabold text-zinc-900">Terms of Service</h1>
            <p className="text-lg leading-relaxed text-zinc-500">
              Last updated: January 2025 · Questions?{" "}
              <a href="mailto:legal@byqalam.com" className="text-teal underline underline-offset-2">
                legal@byqalam.com
              </a>
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-[760px]">
          {/* Quick navigation */}
          <FadeUp>
            <div className="mb-10 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-400">
                On this page
              </p>
              <div className="flex flex-wrap gap-2">
                {SECTIONS.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:border-teal/30 hover:text-teal"
                  >
                    {s.title}
                  </a>
                ))}
              </div>
            </div>
          </FadeUp>

          <div className="space-y-6">
            {SECTIONS.map((section, i) => (
              <FadeUp key={section.id} delay={i * 0.04}>
                <div
                  id={section.id}
                  className="scroll-mt-28 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm"
                >
                  <h2 className="mb-4 text-xl font-bold text-zinc-900">{section.title}</h2>
                  <div className="space-y-3">
                    {section.content.map((para, j) => (
                      <p key={j} className="text-sm leading-relaxed text-zinc-600">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp>
            <div className="mt-10 rounded-2xl bg-teal p-8 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-teal-200">
                Need something in writing?
              </p>
              <h2 className="mb-4 text-2xl font-bold text-white">
                Enterprise agreements, DPA, and custom licensing available.
              </h2>
              <Link
                href="mailto:legal@byqalam.com"
                className="inline-flex items-center gap-2 rounded-xl bg-gold px-7 py-3.5 font-bold text-white shadow-lg transition-colors hover:bg-gold-600"
              >
                Contact Legal →
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  )
}
