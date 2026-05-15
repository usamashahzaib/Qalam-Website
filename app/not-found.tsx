import Link from "next/link"
import { BrandMarkIcon } from "@/components/ui/qalam-icons"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-6 text-center">
      <Link href="/" className="mb-10 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal">
          <BrandMarkIcon className="h-4 w-4 text-gold" />
        </div>
        <span className="text-xl font-bold tracking-tight text-teal">Qalam</span>
      </Link>

      <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-zinc-400">
        404
      </p>
      <h1 className="mb-4 text-4xl font-extrabold text-zinc-900 sm:text-5xl">
        Page not found
      </h1>
      <p className="mb-10 max-w-md text-lg leading-relaxed text-zinc-500">
        The page you are looking for does not exist or has moved. The rest of the
        system is still here.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-xl bg-teal px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-600"
        >
          Back to Home
        </Link>
        <Link
          href="/free-tools"
          className="rounded-xl border border-zinc-200 bg-white px-7 py-3.5 text-sm font-semibold text-zinc-700 transition-colors hover:border-teal/30 hover:bg-teal/5"
        >
          Explore Free Tools
        </Link>
      </div>

      <div className="mt-16 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-zinc-400">
        <Link href="/pricing" className="hover:text-teal">Pricing</Link>
        <Link href="/blog" className="hover:text-teal">Blog</Link>
        <Link href="/contact" className="hover:text-teal">Contact</Link>
        <a href="mailto:hello@byqalam.com" className="hover:text-teal">hello@byqalam.com</a>
      </div>
    </div>
  )
}
