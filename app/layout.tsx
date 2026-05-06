import type { Metadata } from "next"
import { Plus_Jakarta_Sans, Cormorant_Garamond } from "next/font/google"
import "./globals.css"
import { NavWrapper } from "@/components/NavWrapper"

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
  title: "Qalam — AI LinkedIn Content for Creators & Founders",
  description:
    "Write less. Post more. Grow faster. Qalam's AI learns your voice and generates scroll-stopping LinkedIn content in seconds.",
  keywords: ["LinkedIn", "AI writing", "content creation", "social media", "Qalam"],
  openGraph: {
    title: "Qalam — AI LinkedIn Content",
    description: "Your AI writing partner for LinkedIn dominance.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${cormorant.variable}`}
    >
      <body className="min-h-screen flex flex-col antialiased">
        <NavWrapper>{children}</NavWrapper>
      </body>
    </html>
  )
}
