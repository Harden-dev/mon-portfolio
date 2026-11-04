"use client"

import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight } from "lucide-react"

import { useSiteCopy } from "@/components/locale-provider"
import { EASE } from "@/components/portfolio/motion"

/**
 * Opening block: badge, title, one line of context, two actions and three
 * figures. They settle in once on load, a few tens of milliseconds apart.
 */
export function HeroSection() {
  const site = useSiteCopy()
  const reduce = useReducedMotion()
  const { before, highlight, after } = site.ui.heroTitle

  const item = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18, filter: "blur(8px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { duration: 0.7, ease: EASE, delay: 0.08 * i },
        }

  return (
    <section
      id="home"
      className="relative isolate scroll-mt-24 overflow-hidden pt-16 pb-16 sm:pt-24 sm:pb-20"
    >
      <div className="hero-grid absolute inset-0 -z-10" aria-hidden />
      <div
        className="brand-glow absolute -top-40 left-1/2 -z-10 h-[32rem] w-[48rem] -translate-x-1/2"
        aria-hidden
      />

      <div className="sheet flex flex-col items-center text-center">
        <motion.p
          {...item(0)}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-panel/80 px-3.5 py-1.5 text-sm text-soft shadow-sm backdrop-blur"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping-soft rounded-full bg-live/60 motion-reduce:hidden" />
            <span className="relative inline-flex size-2 rounded-full bg-live" />
          </span>
          {site.ui.heroBadge}
        </motion.p>

        <motion.h1
          {...item(1)}
          className="mt-7 max-w-4xl text-4xl leading-[1.08] font-semibold tracking-tight text-balance text-ink sm:text-5xl lg:text-6xl"
        >
          {before}
          <span className="bg-gradient-to-r from-brand to-amber-500 bg-clip-text text-transparent">
            {highlight}
          </span>
          {after}
        </motion.h1>

        <motion.p
          {...item(2)}
          className="mt-6 max-w-2xl text-base leading-relaxed text-pretty text-soft sm:text-lg"
        >
          {site.ui.heroNote}
        </motion.p>

        <motion.div
          {...item(3)}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <a
            href="#work"
            className="group inline-flex h-11 items-center gap-2 rounded-full bg-ink px-6 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-700"
          >
            {site.ui.heroViewWork}
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </a>
          <a
            href="#contact"
            className="inline-flex h-11 items-center rounded-full border border-line bg-panel px-6 text-sm font-medium text-ink shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50"
          >
            {site.ui.heroContact}
          </a>
        </motion.div>

        <motion.dl
          {...item(4)}
          className="mt-14 grid w-full max-w-2xl grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-panel/70 py-5 shadow-sm backdrop-blur"
        >
          {site.ui.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse gap-1 px-3">
              <dt className="text-xs leading-snug text-soft sm:text-sm">
                {stat.label}
              </dt>
              <dd className="text-2xl font-semibold tracking-tight text-ink tabular-nums sm:text-3xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}
