"use client"

import * as React from "react"
import { ArrowRight } from "lucide-react"

import { useSiteCopy } from "@/components/locale-provider"
import { HeroOrbit } from "@/components/portfolio/hero-orbit"

/**
 * Opening block, set like a page in a magazine: name and role on one plain
 * line, a large left-aligned title, one line of context, two actions and
 * three figures on a rule. They settle in once on load through CSS
 * (`.hero-in` / `.hero-rise`), so the text paints before any JavaScript
 * runs. The title only slides; it is never transparent.
 */
export function HeroSection() {
  const site = useSiteCopy()
  const { before, highlight, after } = site.ui.heroTitle

  return (
    <section
      id="home"
      className="relative isolate scroll-mt-24 overflow-x-clip"
    >
      <HeroOrbit />
      <div className="sheet pt-16 pb-16 sm:pt-28 sm:pb-24 lg:min-h-[680px] lg:pt-24">
        <div className="lg:max-w-[34rem] xl:max-w-[38rem]">
          <p className="hero-in text-sm text-soft sm:text-base">
            <span className="font-medium text-ink">{site.name}</span>
            {", "}
            {site.ui.heroKicker}
          </p>

          <h1 className="hero-rise mt-6 max-w-5xl text-[2.6rem] leading-[1.05] font-semibold tracking-tight text-balance text-ink sm:text-6xl lg:text-[3.6rem] xl:text-[4rem]">
            {before}
            <span className="underline decoration-brand decoration-[0.08em] underline-offset-[0.12em]">
              {highlight}
            </span>
            {after}
          </h1>

          <div
            style={{ "--d": "140ms" } as React.CSSProperties}
            className="hero-in mt-8 flex flex-col gap-8"
          >
            <p className="max-w-xl text-base leading-relaxed text-pretty text-soft sm:text-lg">
              {site.ui.heroNote}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="group inline-flex h-11 items-center gap-2 rounded-full bg-ink px-6 text-sm font-medium text-white transition hover:bg-zinc-700"
              >
                {site.ui.heroViewWork}
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </a>
              <a
                href="#contact"
                className="inline-flex h-11 items-center rounded-full border border-zinc-300 bg-panel px-6 text-sm font-medium text-ink transition hover:border-zinc-400"
              >
                {site.ui.heroContact}
              </a>
            </div>
          </div>

          <dl
            style={{ "--d": "210ms" } as React.CSSProperties}
            className="hero-in mt-14 grid grid-cols-3 gap-6 border-t border-zinc-300 pt-6 sm:mt-16"
          >
            {site.ui.stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col-reverse justify-end gap-1"
              >
                <dt className="text-xs leading-snug text-soft sm:text-sm">
                  {stat.label}
                </dt>
                <dd className="text-3xl font-semibold tracking-tight text-ink tabular-nums sm:text-5xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
