"use client"

import { CustomIcon } from "@/components/portfolio/custom-icon"
import { useSiteCopy } from "@/components/locale-provider"
import { getSkillIcons } from "@/lib/tech-icons"

/**
 * A slow strip of the technologies in production. The page's only looping
 * motion: it pauses on hover and stands still under reduced motion.
 */
export function TechMarquee() {
  const site = useSiteCopy()
  const skills = [...site.skills.backend, ...site.skills.frontend]

  const row = (hidden: boolean) => (
    <ul
      className="flex shrink-0 items-center gap-10 pr-10"
      aria-hidden={hidden || undefined}
    >
      {skills.map((skill) => (
        <li
          key={skill}
          className="flex items-center gap-2.5 text-base font-medium whitespace-nowrap text-faint transition-colors hover:text-ink"
        >
          {getSkillIcons(skill).map(({ slug }) => (
            <CustomIcon key={slug} slug={slug} size={20} brandColor={false} />
          ))}
          {skill}
        </li>
      ))}
    </ul>
  )

  return (
    <section
      aria-label={site.ui.marqueeLabel}
      className="border-y border-line bg-panel/60 py-7"
    >
      <p className="sheet mb-5 text-center text-xs font-medium tracking-wider text-faint uppercase">
        {site.ui.marqueeLabel}
      </p>
      <div className="marquee-mask group flex overflow-hidden">
        <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  )
}
