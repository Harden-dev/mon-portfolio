"use client"

import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight } from "lucide-react"

import { useSiteCopy } from "@/components/locale-provider"
import { EASE } from "@/components/portfolio/motion"

/**
 * Opening block, set like a page in a magazine: name and role on one plain
 * line, a large left-aligned title, one line of context, two actions and
 * three figures on a rule. They settle in once on load.
 */
export function HeroSection() {
  const site = useSiteCopy()
  const reduce = useReducedMotion()
  const { before, highlight, after } = site.ui.heroTitle

  const item = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, ease: EASE, delay: 0.07 * i },
        }

  return (
    <section
      id="home"
      className="sheet scroll-mt-24 pt-16 pb-16 sm:pt-28 sm:pb-24"
    >
      <motion.p {...item(0)} className="text-sm text-soft sm:text-base">
        <span className="font-medium text-ink">{site.name}</span>
        <span className="mx-2 text-faint" aria-hidden>
          —
        </span>
        {site.ui.heroKicker}
      </motion.p>

      <motion.h1
        {...item(1)}
        className="mt-6 max-w-5xl text-[2.6rem] leading-[1.05] font-semibold tracking-tight text-balance text-ink sm:text-6xl lg:text-7xl"
      >
        {before}
        <span className="underline decoration-brand decoration-[0.08em] underline-offset-[0.12em]">
          {highlight}
        </span>
        {after}
      </motion.h1>

      <motion.div
        {...item(2)}
        className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end"
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
      </motion.div>

      <motion.dl
        {...item(3)}
        className="mt-14 grid grid-cols-3 gap-6 border-t border-zinc-300 pt-6 sm:mt-20"
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
      </motion.dl>
    </section>
  )
}
