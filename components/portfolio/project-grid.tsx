"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { ArrowUpRight, ChevronDown, Lock } from "lucide-react"

import { CustomIcon } from "@/components/portfolio/custom-icon"
import { useSiteCopy } from "@/components/locale-provider"
import { EASE, Reveal } from "@/components/portfolio/motion"
import { getSkillIcons } from "@/lib/tech-icons"
import type { ResolvedProject } from "@/lib/site-data"
import { cn } from "@/lib/utils"

/** Cards shown before "show all" — two full rows on desktop. */
const INITIAL_COUNT = 6

type Status = "live" | "building" | "private"

function statusOf(project: ResolvedProject): Status {
  if (project.live) return "live"
  if (project.building) return "building"
  return "private"
}

function StatusPill({ status }: { status: Status }) {
  const site = useSiteCopy()

  if (status === "live") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-live ring-1 ring-green-600/15 ring-inset">
        <span className="size-1.5 rounded-full bg-live" aria-hidden />
        {site.ui.statusLive}
      </span>
    )
  }
  if (status === "building") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-2.5 py-1 text-xs font-medium text-brand ring-1 ring-brand/15 ring-inset">
        <span
          className="size-1.5 rounded-full border border-brand"
          aria-hidden
        />
        {site.ui.statusBuilding}
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-soft">
      <Lock size={11} aria-hidden />
      {site.ui.statusPrivate}
    </span>
  )
}

function ProjectCard({
  project,
  index,
}: {
  project: ResolvedProject
  index: number
}) {
  const site = useSiteCopy()

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-line bg-panel p-6 transition-colors duration-300 hover:border-zinc-300">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium text-brand tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="truncate text-xs text-soft">
          {project.domain}
          <span className="mx-1.5 text-faint" aria-hidden>
            ·
          </span>
          <span className="tabular-nums">{project.year}</span>
        </span>
      </div>

      <h3 className="mt-3 text-xl font-semibold tracking-tight text-ink">
        {project.title}
      </h3>
      <p className="mt-2.5 text-justify text-sm leading-relaxed hyphens-auto text-soft">
        {project.description}
      </p>

      <div className="mt-auto pt-6">
        <ul className="flex flex-wrap gap-1.5">
          {project.stack.map((token) => {
            const slug = getSkillIcons(token)[0]?.slug
            return (
              <li
                key={token}
                className="inline-flex items-center gap-1.5 rounded-md border border-line bg-paper px-2 py-1 text-xs text-soft"
              >
                {slug ? (
                  <CustomIcon slug={slug} size={12} brandColor={false} />
                ) : null}
                {token}
              </li>
            )
          })}
        </ul>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
          <StatusPill status={statusOf(project)} />
          <div className="flex items-center gap-3">
            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} ${site.ui.gitHubProjectSuffix}`}
                className="text-xs font-medium text-soft transition-colors hover:text-ink"
              >
                GitHub
              </a>
            ) : null}
            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-ink transition-colors hover:text-brand"
              >
                {site.ui.viewProject}
                <ArrowUpRight size={14} />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  )
}

export function ProjectGrid({
  projects,
}: {
  projects: readonly ResolvedProject[]
}) {
  const site = useSiteCopy()
  const reduce = useReducedMotion()
  const [expanded, setExpanded] = React.useState(false)
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  /* Where the button sat on screen before collapsing. */
  const anchorTop = React.useRef<number | null>(null)

  const toggle = () => {
    if (expanded && buttonRef.current) {
      anchorTop.current = buttonRef.current.getBoundingClientRect().top
    }
    setExpanded((v) => !v)
  }

  /* Collapsing removes seven cards above the button. Keep the button where
     it was under the pointer instead of dropping the reader further down
     the page. */
  React.useLayoutEffect(() => {
    const top = anchorTop.current
    const button = buttonRef.current
    if (expanded || top === null || !button) return
    anchorTop.current = null
    const shift = button.getBoundingClientRect().top - top
    window.scrollTo({ top: window.scrollY + shift, behavior: "instant" })
  }, [expanded])

  const first = projects.slice(0, INITIAL_COUNT)
  const rest = projects.slice(INITIAL_COUNT)

  return (
    <div>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {first.map((project, i) => (
          <li key={project.id}>
            <Reveal className="h-full" delay={(i % 3) * 0.06}>
              <ProjectCard project={project} index={i} />
            </Reveal>
          </li>
        ))}
        {/* No exit animation: the cards must leave at once so the scroll
            anchor below measures the final layout. */}
        {expanded
          ? rest.map((project, i) => (
              <motion.li
                key={project.id}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: EASE, delay: i * 0.04 }}
              >
                <ProjectCard project={project} index={INITIAL_COUNT + i} />
              </motion.li>
            ))
          : null}
      </ul>

      {rest.length > 0 ? (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            ref={buttonRef}
            onClick={toggle}
            aria-expanded={expanded}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-panel px-5 text-sm font-medium text-ink transition hover:border-zinc-300 hover:bg-zinc-50"
          >
            {expanded
              ? site.ui.showFewerProjects
              : `${site.ui.showAllProjects} (${projects.length})`}
            <ChevronDown
              size={16}
              className={cn(
                "transition-transform duration-300",
                expanded && "rotate-180"
              )}
            />
          </button>
        </div>
      ) : null}
    </div>
  )
}
