"use client"

import { useSiteCopy } from "@/components/locale-provider"

export function SiteFooter() {
  const site = useSiteCopy()

  return (
    <footer className="relative z-10 border-t border-line">
      <div className="sheet flex flex-col gap-8 py-10">
        <nav
          aria-label={site.ui.railLabel}
          className="flex flex-wrap gap-x-8 gap-y-4 md:hidden"
        >
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={`/${item.href}`}
              className="link-quiet text-sm"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 text-sm text-dim">
          <p>
            {site.name} — {site.location}
          </p>
          <p className="tnum">{new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  )
}
