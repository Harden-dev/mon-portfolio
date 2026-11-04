"use client"

import { useLocaleContext } from "@/components/locale-provider"
import type { Locale } from "@/lib/site-i18n"
import { cn } from "@/lib/utils"

const LANGS: readonly Locale[] = ["en", "fr"] as const

/** A two-option segmented control; the live language sits on the dark thumb. */
export function LanguageToggle({ className }: { className?: string }) {
  const { locale, setLocale, site } = useLocaleContext()

  return (
    <div
      role="group"
      aria-label={site.ui.languageToggle}
      className={cn(
        "flex shrink-0 items-center rounded-full border border-line bg-panel/70 p-1 text-xs font-medium",
        className
      )}
    >
      {LANGS.map((code) => (
        <button
          key={code}
          type="button"
          lang={code}
          aria-pressed={locale === code}
          aria-label={code === "en" ? "English" : "Français"}
          onClick={() => setLocale(code)}
          className={cn(
            "inline-flex h-8 min-w-9 items-center justify-center rounded-full px-2.5 transition-colors",
            locale === code ? "bg-ink text-white" : "text-soft hover:text-ink"
          )}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
