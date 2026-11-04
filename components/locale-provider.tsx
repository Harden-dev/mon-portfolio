"use client"

import * as React from "react"

import {
  isLocale,
  LOCALE_STORAGE_KEY,
  resolveSite,
  type Locale,
  type ResolvedSite,
} from "@/lib/site-i18n"

type LocaleContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  site: ResolvedSite
}

const LocaleContext = React.createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = React.useState<Locale>("en")

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(LOCALE_STORAGE_KEY)
      if (raw && isLocale(raw)) setLocaleState(raw)
    } catch {
      /* ignore */
    }
  }, [])

  React.useEffect(() => {
    document.documentElement.lang = locale === "fr" ? "fr" : "en"
  }, [locale])

  const setLocale = React.useCallback((next: Locale) => {
    setLocaleState(next)
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }, [])

  const site = React.useMemo(() => resolveSite(locale), [locale])

  const value = React.useMemo(
    () => ({ locale, setLocale, site }),
    [locale, setLocale, site]
  )

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  )
}

export function useLocaleContext(): LocaleContextValue {
  const ctx = React.useContext(LocaleContext)
  if (!ctx) {
    throw new Error("useLocaleContext must be used within LocaleProvider")
  }
  return ctx
}

export function useSiteCopy(): ResolvedSite {
  return useLocaleContext().site
}
