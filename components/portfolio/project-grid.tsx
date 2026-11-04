"use client"

import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
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

function ProjectCard({ project }: { project: ResolvedProject }) {
  const site = useSiteCopy()

  /* Feed the pointer position to the CSS spotlight. */
  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`)
  }

  return (
    <article
      onMouseMove={onMove}
      className="spotlight group flex h-full flex-col rounded-2xl border border-line bg-panel p-6 transition duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_12px_32px_-16px_rgb(24_24_27/0.18)] motion-reduce:hover:translate-y-0"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="truncate text-xs font-medium tracking-wide text-brand uppercase">
          {project.domain}
        </span>
        <span className="shrink-0 text-xs text-faint tabular-nums">
          {project.year}
        </span>
      </div>

      <h3 className="mt-3 text-xl font-semibold tracking-tight text-ink">
        {project.title}
      </h3>
      <p className="mt-2.5 text-sm leading-relaxed text-soft">
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

  const first = projects.slice(0, INITIAL_COUNT)
  const rest = projects.slice(INITIAL_COUNT)

  return (
    <div>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {first.map((project, i) => (
          <li key={project.id}>
            <Reveal className="h-full" delay={(i % 3) * 0.06}>
              <ProjectCard project={project} />
            </Reveal>
          </li>
        ))}
        <AnimatePresence initial={false}>
          {expanded
            ? rest.map((project, i) => (
                <motion.li
                  key={project.id}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: 8 }}
                  transition={{ duration: 0.45, ease: EASE, delay: i * 0.04 }}
                >
                  <ProjectCard project={project} />
                </motion.li>
              ))
            : null}
        </AnimatePresence>
      </ul>

      {rest.length > 0 ? (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-panel px-5 text-sm font-medium text-ink shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50"
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
