import type { Metadata } from "next"
import { ProtectedAppProviders } from "@/components/providers/ProtectedAppProviders"

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedAppProviders>{children}</ProtectedAppProviders>
}
