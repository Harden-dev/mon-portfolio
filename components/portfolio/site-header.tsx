"use client"

import * as React from "react"
import Link from "next/link"

import { useSiteCopy } from "@/components/locale-provider"
import { LanguageToggle } from "@/components/portfolio/language-toggle"
import { cn } from "@/lib/utils"

const SECTION_IDS = ["home", "work", "about", "stack", "contact"] as const
const PROBE_OFFSET_PX = 140

export function useActiveSectionHash() {
  const [activeHash, setActiveHash] = React.useState("#home")

  React.useEffect(() => {
    const compute = () => {
      let next = "#home"
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= PROBE_OFFSET_PX) next = `#${id}`
      }
      /* The last section is too short to reach the probe; the page bottom
         is where it lives. */
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2
      const last = SECTION_IDS[SECTION_IDS.length - 1]
      if (atBottom && document.getElementById(last)) next = `#${last}`
      setActiveHash((prev) => (prev === next ? prev : next))
    }

    compute()
    window.addEventListener("scroll", compute, { passive: true })
    window.addEventListener("resize", compute, { passive: true })
    return () => {
      window.removeEventListener("scroll", compute)
      window.removeEventListener("resize", compute)
    }
  }, [])

  return activeHash
}

export function SiteHeader({ activeHash }: { activeHash: string }) {
  const site = useSiteCopy()
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled
          ? "border-line bg-paper/80 backdrop-blur-md"
          : "border-transparent bg-paper/0"
      )}
    >
      <div className="sheet flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          title={site.name}
          className="flex h-11 min-w-0 shrink items-center gap-2.5 text-base font-semibold tracking-tight whitespace-nowrap text-ink"
        >
          <span
            className="flex size-8 items-center justify-center rounded-lg bg-ink text-sm font-semibold text-white"
            aria-hidden
          >
            M
          </span>
          {/* Full name wherever it fits, the short name when it cannot. */}
          <span className="hidden lg:inline">{site.name}</span>
          <span className="lg:hidden">{site.shortName}</span>
        </Link>

        <nav
          aria-label={site.ui.railLabel}
          className="hidden items-center gap-1 rounded-full border border-line bg-panel/70 p-1 shadow-sm backdrop-blur md:flex"
        >
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={`/${item.href}`}
              aria-current={activeHash === item.href ? "location" : undefined}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                activeHash === item.href
                  ? "bg-ink text-white"
                  : "text-soft hover:text-ink"
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <LanguageToggle />
          <a
            href={site.contact.mailHref}
            className="hidden h-10 items-center rounded-full bg-ink px-4 text-sm font-medium whitespace-nowrap text-white shadow-sm transition hover:bg-zinc-700 sm:inline-flex"
          >
            {site.contact.cta}
          </a>
        </div>
      </div>
    </header>
  )
}
