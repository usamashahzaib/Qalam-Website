import Link from "next/link"

const FOOTER_LINKS = {
  Product: [
    { label: "AI Post Writer", href: "/write" },
    { label: "Hook Generator", href: "/free-tools" },
    { label: "Voice Fingerprint", href: "/#features" },
    { label: "Post Scheduler", href: "/#features" },
    { label: "LinkedIn Analytics", href: "/#features" },
  ],
  "Use Cases": [
    { label: "Founders", href: "/#use-cases" },
    { label: "Marketing Teams", href: "/#use-cases" },
    { label: "HR Leaders", href: "/#use-cases" },
    { label: "Consultants", href: "/#use-cases" },
    { label: "Coaches", href: "/#use-cases" },
  ],
  Resources: [
    { label: "Blog", href: "/blog" },
    { label: "Free Tools", href: "/free-tools" },
    { label: "Documentation", href: "/docs" },
    { label: "Changelog", href: "/changelog" },
    { label: "Status", href: "/status" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Pricing", href: "/pricing" },
    { label: "Careers", href: "/careers" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
}

function SocialIcon({ icon, href }: { icon: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-9 h-9 rounded-lg border border-zinc-200 flex items-center justify-center text-zinc-500 hover:border-teal hover:text-teal transition-all duration-200 hover:bg-teal-50"
    >
      <span className="text-sm">{icon}</span>
    </a>
  )
}

export function Footer() {
  return (
    <footer className="bg-zinc-50 border-t border-zinc-100">
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          {/* Brand column */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-teal flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 13 C3 13 5 11 8 7 C11 3 13 2 13 2"
                    stroke="#C9871F"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx="13" cy="2" r="1.5" fill="#C9871F" />
                  <path d="M3 13 L2 14.5" stroke="#C9871F" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-lg font-bold text-teal">Qalam</span>
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed mb-5">
              The AI writing partner that learns your voice and turns ideas into viral LinkedIn content.
            </p>
            <div className="flex gap-2">
              <SocialIcon icon="𝕏" href="#" />
              <SocialIcon icon="in" href="#" />
              <SocialIcon icon="◈" href="#" />
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-sm font-semibold text-zinc-900 mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-500 hover:text-teal transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-400">
            © {new Date().getFullYear()} Qalam Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-sm text-zinc-400">
            <span>Made with</span>
            <span className="text-gold">♥</span>
            <span>for LinkedIn creators everywhere</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
