"use client"

import * as React from "react"
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react"

import { useSiteCopy } from "@/components/locale-provider"
import { Reveal } from "@/components/portfolio/motion"

export function ContactSection() {
  const site = useSiteCopy()
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    if (!copied) return
    const t = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(t)
  }, [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.contact.email)
      setCopied(true)
    } catch {
      /* Clipboard blocked: the mailto button still works. */
    }
  }

  return (
    <Reveal>
      <div className="rounded-3xl border border-line bg-panel px-6 py-12 sm:px-12 sm:py-16">
        <p className="text-sm font-medium text-brand">
          {site.ui.kickers.contact}
        </p>
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-balance text-ink sm:text-5xl">
          {site.contact.headline}
        </h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-soft sm:text-lg">
          {site.contact.sub}
        </p>

        <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <a
            href={site.contact.mailHref}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-6 text-sm font-medium text-white transition hover:bg-zinc-700"
          >
            <Mail size={16} />
            {site.contact.cta}
          </a>
          <button
            type="button"
            onClick={copy}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-panel px-5 text-sm font-medium text-ink transition hover:border-zinc-300 hover:bg-zinc-50"
          >
            {copied ? (
              <Check size={16} className="text-live" />
            ) : (
              <Copy size={16} className="text-soft" />
            )}
            <span>{site.contact.email}</span>
            <span className="sr-only" aria-live="polite">
              {copied ? site.ui.copied : site.ui.copyEmail}
            </span>
          </button>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 border-t border-line pt-6 text-sm">
          <span className="text-faint">{site.ui.elsewhere}</span>
          {[
            { label: "LinkedIn", href: site.social.linkedin },
            { label: "GitHub", href: site.social.github },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-1 font-medium text-soft transition-colors hover:text-ink"
            >
              {s.label}
              <ArrowUpRight size={14} />
            </a>
          ))}
        </div>
      </div>
    </Reveal>
  )
}
