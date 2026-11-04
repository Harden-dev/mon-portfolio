"use client"

import * as React from "react"

import { useSiteCopy } from "@/components/locale-provider"
import { EASE, gsap, prefersReducedMotion } from "@/lib/gsap"
import { cn } from "@/lib/utils"

/**
 * The page's opening sequence: the statement wipes up line by line, the rule
 * draws across, the figures count in. One timeline, once, on load.
 */
export function HeroSection() {
  const site = useSiteCopy()
  const scope = React.useRef<HTMLElement>(null)

  React.useEffect(() => {
    const root = scope.current
    if (!root) return

    const counters = root.querySelectorAll<HTMLElement>("[data-count]")

    if (prefersReducedMotion()) {
      counters.forEach((el) => {
        el.textContent = el.dataset.count ?? ""
      })
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: EASE } })

      tl.fromTo(
        "[data-hero='kicker']",
        { autoAlpha: 0, x: -12 },
        { autoAlpha: 1, x: 0, duration: 0.5 }
      )
        .fromTo(
          "[data-hero='line'] > span",
          { yPercent: 106 },
          { yPercent: 0, duration: 0.95, stagger: 0.07 },
          "-=0.2"
        )
        .fromTo(
          "[data-hero='rule']",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, transformOrigin: "left" },
          "-=0.5"
        )
        .fromTo(
          "[data-hero='settle']",
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.07 },
          "-=0.5"
        )

      /* Figures tick up to their real value — motion carrying the proof. */
      counters.forEach((el) => {
        const target = el.dataset.count ?? ""
        const end = Number(target)
        if (!Number.isFinite(end)) {
          el.textContent = target
          return
        }
        const pad = target.length
        const obj = { n: 0 }
        tl.to(
          obj,
          {
            n: end,
            duration: 1.1,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = String(Math.round(obj.n)).padStart(pad, "0")
            },
          },
          "-=0.8"
        )
      })
    }, root)

    return () => ctx.revert()
  }, [site.ui.heroLines, site.ui.stats])

  return (
    <section
      ref={scope}
      id="home"
      className="scroll-mt-20 pt-14 pb-12 sm:pt-20 sm:pb-16"
    >
      {/* The name is read before the claim it is attached to. */}
      <div data-hero="kicker" className="mb-7 flex flex-col gap-1.5 sm:mb-10">
        <p className="flex items-center gap-3 font-heading text-2xl leading-none font-semibold tracking-tight sm:text-3xl">
          <span
            className="inline-block size-2.5 shrink-0 bg-volt"
            aria-hidden
          />
          {site.name}
        </p>
        <p className="pl-[1.4rem] text-base text-chalk/80 sm:text-lg">
          {site.ui.heroKicker}
        </p>
      </div>

      <h1 className="statement">
        {site.ui.heroLines.map((line, i) => (
          <span key={line} data-hero="line" className="wipe-line">
            <span
              className={cn(i >= site.ui.heroAccentFrom && "statement-accent")}
            >
              {line}
            </span>
          </span>
        ))}
      </h1>

      <div
        data-hero="rule"
        className="mt-10 h-px w-full bg-line sm:mt-12"
        aria-hidden
      />

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
        <div className="flex flex-col gap-8">
          <p
            data-hero="settle"
            className="prose-col text-base text-dim sm:text-lg"
          >
            {site.ui.heroNote}
          </p>

          <div
            data-hero="settle"
            className="flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <a href="#work" className="button-hot text-sm tracking-wide">
              {site.ui.heroViewWork}
            </a>
            <a href={site.contact.mailHref} className="link-hot text-base">
              {site.contact.email}
            </a>
          </div>
        </div>

        <dl
          data-hero="settle"
          className="grid grid-cols-3 gap-x-6 gap-y-2 border-t border-line pt-6 lg:border-t-0 lg:pt-0"
        >
          {site.ui.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <dt className="sr-only">{stat.label}</dt>
              <dd
                data-count={stat.value}
                className="font-heading text-3xl leading-none font-semibold tracking-tight text-volt sm:text-5xl"
              >
                {stat.value}
              </dd>
              <p className="text-xs leading-snug text-dim sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
