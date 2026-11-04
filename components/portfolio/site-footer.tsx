"use client"

import { useSiteCopy } from "@/components/locale-provider"

export function SiteFooter() {
  const site = useSiteCopy()

  return (
    <footer className="border-t border-line">
      <div className="sheet flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-soft">
          © {new Date().getFullYear()} {site.name} · {site.location}
        </p>
        <nav
          aria-label={site.ui.railLabel}
          className="flex flex-wrap gap-x-6 gap-y-2"
        >
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={`/${item.href}`}
              className="inline-flex h-11 items-center text-sm text-soft transition-colors hover:text-ink sm:h-auto"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
