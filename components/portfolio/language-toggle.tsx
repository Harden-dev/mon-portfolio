"use client"

import { useLocaleContext } from "@/components/locale-provider"
import type { Locale } from "@/lib/site-i18n"
import { cn } from "@/lib/utils"

const LANGS: readonly Locale[] = ["en", "fr"] as const

/** Two codes, the live one lit. No pill, no thumb, no chrome. */
export function LanguageToggle({ className }: { className?: string }) {
  const { locale, setLocale, site } = useLocaleContext()

  return (
    <div
      role="group"
      aria-label={site.ui.languageToggle}
      className={cn("flex shrink-0 items-center text-sm", className)}
    >
      {LANGS.map((code, i) => (
        <span key={code} className="flex items-center">
          {i > 0 ? (
            <span className="text-dim/50" aria-hidden>
              /
            </span>
          ) : null}
          <button
            type="button"
            lang={code}
            aria-pressed={locale === code}
            aria-label={code === "en" ? "English" : "Français"}
            onClick={() => setLocale(code)}
            className={cn(
              "inline-flex size-11 items-center justify-center transition-colors",
              locale === code ? "text-volt" : "text-dim hover:text-chalk"
            )}
          >
            {code.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  )
}
