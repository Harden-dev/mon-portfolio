"use client"

import * as React from "react"

import { CustomIcon } from "@/components/portfolio/custom-icon"
import { useSiteCopy } from "@/components/locale-provider"
import { EASE, ScrollTrigger, gsap, prefersReducedMotion } from "@/lib/gsap"
import { getSkillIcons } from "@/lib/tech-icons"

function Column({
  heading,
  skills,
}: {
  heading: string
  skills: readonly string[]
}) {
  return (
    <div>
      <h3 className="relative pb-3 text-sm text-dim">
        {heading}
        <span
          data-stack="rule"
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-line"
          aria-hidden
        />
      </h3>
      <ul className="mt-2">
        {skills.map((skill) => {
          const icons = getSkillIcons(skill)
          return (
            <li
              key={skill}
              className="group relative flex items-center gap-3 py-4"
            >
              {icons.length > 0 ? (
                <span
                  data-stack="icon"
                  className="flex shrink-0 items-center gap-1 text-dim transition-colors group-hover:text-volt"
                >
                  {icons.map(({ slug }) => (
                    <CustomIcon
                      key={slug}
                      slug={slug}
                      size={16}
                      brandColor={false}
                    />
                  ))}
                </span>
              ) : null}
              <span className="wipe-line">
                <span
                  data-stack="label"
                  className="font-heading text-xl leading-none font-medium tracking-tight transition-transform duration-200 group-hover:translate-x-1.5"
                >
                  {skill}
                </span>
              </span>
              <span
                data-stack="rule"
                className="absolute inset-x-0 bottom-0 h-px origin-left bg-line/60"
                aria-hidden
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function StackSection() {
  const site = useSiteCopy()
  const scope = React.useRef<HTMLDivElement>(null)

  /* The fourth motion: the stack is set into the board as it scrolls in —
     rules draw across, names rise out of their masks, row by row, once. */
  React.useEffect(() => {
    const root = scope.current
    if (!root || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      const rules = gsap.utils.toArray<HTMLElement>("[data-stack='rule']")
      const labels = gsap.utils.toArray<HTMLElement>("[data-stack='label']")
      const icons = gsap.utils.toArray<HTMLElement>("[data-stack='icon']")

      gsap.set(rules, { scaleX: 0 })
      gsap.set(labels, { yPercent: 110 })
      gsap.set(icons, { autoAlpha: 0 })

      const tl = gsap.timeline({ paused: true, defaults: { ease: EASE } })
      tl.to(rules, { scaleX: 1, duration: 0.9, stagger: 0.05 }, 0)
        .to(labels, { yPercent: 0, duration: 0.7, stagger: 0.05 }, 0.15)
        .to(icons, { autoAlpha: 1, duration: 0.5, stagger: 0.05 }, 0.3)

      ScrollTrigger.create({
        trigger: root,
        start: "top 78%",
        once: true,
        onEnter: () => tl.play(),
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={scope} className="flex flex-col gap-10">
      <p className="prose-col text-base text-dim">{site.stack.intro}</p>
      <div className="grid gap-10 sm:grid-cols-2 sm:gap-16">
        <Column
          heading={site.stack.panelBackend}
          skills={site.skills.backend}
        />
        <Column
          heading={site.stack.panelFrontend}
          skills={site.skills.frontend}
        />
      </div>
    </div>
  )
}
