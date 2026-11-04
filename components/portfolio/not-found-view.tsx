"use client"

import Link from "next/link"

import { useLocaleContext } from "@/components/locale-provider"
import { SiteHeader } from "@/components/portfolio/site-header"
import { getNotFoundCopy } from "@/lib/not-found-i18n"

export function NotFoundView() {
  const { locale, site } = useLocaleContext()
  const copy = getNotFoundCopy(locale)

  return (
    <>
      <SiteHeader activeHash="#home" />

      <main className="flex min-h-[72svh] flex-col justify-center py-20">
        <div className="sheet flex flex-col items-start">
          <p className="text-sm font-medium text-brand">404 · {copy.kicker}</p>
          <h1 className="mt-6 max-w-2xl text-4xl font-semibold tracking-tight text-balance text-ink sm:text-5xl">
            {copy.title}
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-soft">
            {copy.description}
          </p>

          <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex h-11 items-center rounded-full bg-ink px-6 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-700"
            >
              {copy.ctaHome}
            </Link>
            <Link
              href="/#work"
              className="inline-flex h-11 items-center rounded-full border border-line bg-panel px-6 text-sm font-medium text-ink shadow-sm transition hover:bg-zinc-50"
            >
              {copy.ctaWork}
            </Link>
          </div>
          <a
            href={site.contact.mailHref}
            className="mt-6 inline-flex h-11 items-center text-sm text-soft transition-colors hover:text-ink"
          >
            {site.contact.email}
          </a>
        </div>
      </main>
    </>
  )
}
