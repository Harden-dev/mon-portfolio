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

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-void">
      <div className="sheet flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          title={site.name}
          className="flex h-11 min-w-0 shrink items-center font-heading text-lg leading-none font-semibold tracking-tight whitespace-nowrap"
        >
          {/* Full name wherever it fits, first name only when it cannot. */}
          <span className="hidden lg:inline">{site.name}</span>
          <span className="lg:hidden">{site.brand.prefix}</span>
          <span className="text-volt">.</span>
        </Link>

        <div className="flex min-w-0 items-center gap-5 sm:gap-8">
          <nav
            aria-label={site.ui.railLabel}
            className="hidden items-center gap-6 md:flex"
          >
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={`/${item.href}`}
                aria-current={activeHash === item.href ? "location" : undefined}
                className={cn(
                  "border-b pb-0.5 text-sm transition-colors",
                  activeHash === item.href
                    ? "border-volt text-chalk"
                    : "border-transparent text-dim hover:text-chalk"
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <LanguageToggle />

          <a
            href={site.contact.mailHref}
            className="button-hot h-11 text-sm whitespace-nowrap"
          >
            {site.contact.cta}
          </a>
        </div>
      </div>
    </header>
  )
}
