"use client"

import { CustomIcon } from "@/components/portfolio/custom-icon"
import { useSiteCopy } from "@/components/locale-provider"
import { Reveal } from "@/components/portfolio/motion"
import { getSkillIcons } from "@/lib/tech-icons"

function Panel({
  heading,
  skills,
}: {
  heading: string
  skills: readonly string[]
}) {
  return (
    <div className="h-full rounded-2xl border border-line bg-panel p-6 sm:p-8">
      <h3 className="text-sm font-medium text-soft">{heading}</h3>
      <ul className="mt-5 flex flex-wrap gap-2.5">
        {skills.map((skill) => {
          const icons = getSkillIcons(skill)
          return (
            <li
              key={skill}
              className="group inline-flex items-center gap-2 rounded-xl border border-line bg-paper px-3.5 py-2.5 text-sm font-medium text-ink transition hover:border-brand/30 hover:bg-brand-soft"
            >
              {icons.length > 0 ? (
                <span className="flex items-center gap-1 text-soft transition-colors group-hover:text-brand">
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
              {skill}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function StackSection() {
  const site = useSiteCopy()

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <Reveal className="h-full">
        <Panel heading={site.stack.panelBackend} skills={site.skills.backend} />
      </Reveal>
      <Reveal className="h-full" delay={0.08}>
        <Panel
          heading={site.stack.panelFrontend}
          skills={site.skills.frontend}
        />
      </Reveal>
    </div>
  )
}
