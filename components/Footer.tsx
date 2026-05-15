import Link from "next/link"
import { BrandMarkIcon, InstagramIcon, LinkedInIcon } from "@/components/ui/qalam-icons"

const FOOTER_LINKS = {
  Product: [
    { label: "AI Post Writer", href: "/product/post-writer" },
    { label: "Voice Profile", href: "/product/voice-profile" },
    { label: "Hook Generator", href: "/product/hook-generator" },
    { label: "Post Scheduler", href: "/product/post-scheduler" },
    { label: "Agency Workspaces", href: "/product/agency-workspaces" },
  ],
  "Use Cases": [
    { label: "Founders", href: "/use-cases/founders" },
    { label: "Marketing Teams", href: "/use-cases/marketing-teams" },
    { label: "HR Leaders", href: "/use-cases/hr-leaders" },
    { label: "Consultants", href: "/use-cases/consultants" },
    { label: "Agencies", href: "/use-cases/agencies" },
  ],
  Resources: [
    { label: "Blog", href: "/blog" },
    { label: "Free Tools", href: "/free-tools" },
    { label: "About", href: "/about" },
  ],
  Legal: [
    { label: "Pricing", href: "/pricing" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Contact", href: "/contact" },
  ],
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/40 transition-all duration-200 hover:border-gold/40 hover:bg-gold/10 hover:text-gold"
    >
      {children}
    </a>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-[#153a37] bg-[#041514]">
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-5">
          <div className="md:col-span-1">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-teal">
                <BrandMarkIcon className="h-4 w-4 text-gold" />
              </div>
              <span className="text-lg font-bold text-white">Qalam</span>
            </Link>
            <p className="mb-5 text-sm leading-relaxed text-white/55">
              The publishing system that learns your voice, stores your archive, and turns ideas into authority over time.
            </p>
            <div className="flex gap-2">
              <SocialLink href="https://www.instagram.com/byyqalam" label="Instagram">
                <InstagramIcon className="h-4 w-4" />
              </SocialLink>
              <SocialLink href="https://www.linkedin.com/company/byqalam" label="LinkedIn">
                <LinkedInIcon className="h-4 w-4" />
              </SocialLink>
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="mb-4 text-sm font-semibold text-white/90">{section}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-white/55 transition-colors hover:text-gold">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-white/35">© {new Date().getFullYear()} Qalam. All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm text-white/35">
            <Link href="/privacy" className="transition-colors hover:text-white/60">Privacy</Link>
            <Link href="/terms" className="transition-colors hover:text-white/60">Terms</Link>
            <a href="mailto:hello@byqalam.com" className="transition-colors hover:text-white/60">hello@byqalam.com</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
