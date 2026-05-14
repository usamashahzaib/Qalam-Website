"use client"

import { motion } from "framer-motion"
import { LinkedInIcon } from "@/components/ui/qalam-icons"

interface TestimonialCardProps {
  quote: string
  name: string
  title: string
  company: string
  initials: string
  color: string
  index?: number
}

export function TestimonialCard({
  quote,
  name,
  title,
  company,
  initials,
  color,
  index = 0,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="flex flex-col rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-gold/30 hover:shadow-[0_10px_36px_rgba(13,74,69,0.12)]"
    >
      <div className="mb-5 flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="h-1.5 w-6 rounded-full bg-gold/85" />
        ))}
      </div>

      <blockquote className="mb-7 flex-1 font-cormorant text-[31px] italic leading-[1.34] text-zinc-700">
        &ldquo;{quote}&rdquo;
      </blockquote>

      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: color }}>
          {initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-zinc-900">{name}</p>
          <p className="text-xs text-zinc-500">{company ? `${title} · ${company}` : title}</p>
        </div>
        <div className="ml-auto flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-[#0A66C2]">
          <LinkedInIcon className="h-4 w-4" />
        </div>
      </div>
    </motion.div>
  )
}
