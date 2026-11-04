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

      <main className="sheet flex min-h-[72svh] flex-col justify-center py-20">
        <p className="tnum font-heading text-6xl leading-none font-bold tracking-tighter text-volt sm:text-8xl">
          404
        </p>
        <h1 className="section-title mt-6 max-w-3xl text-balance">
          {copy.title}
        </h1>
        <p className="prose-col mt-6 text-base text-dim">{copy.description}</p>

        <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-5">
          <Link href="/" className="button-hot text-sm">
            {copy.ctaHome}
          </Link>
          <Link href="/#work" className="link-quiet text-base">
            {copy.ctaWork}
          </Link>
          <a href={site.contact.mailHref} className="link-quiet text-base">
            {site.contact.email}
          </a>
        </div>
      </main>
    </>
  )
}
