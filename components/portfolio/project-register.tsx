"use client"

import * as React from "react"
import { Minus, Plus } from "lucide-react"

import { CustomIcon } from "@/components/portfolio/custom-icon"
import { useSiteCopy } from "@/components/locale-provider"
import { EASE, gsap, prefersReducedMotion } from "@/lib/gsap"
import { getStackTokenIconSlug } from "@/lib/tech-icons"
import type { ResolvedProject } from "@/lib/site-data"
import { cn } from "@/lib/utils"

/**
 * One column template for the header, the row and the open panel, so the
 * year, name, domain and status line up down the whole board. Below `lg` the
 * domain drops under the name instead of taking a column of its own.
 */
const GRID =
  "sm:grid sm:grid-cols-[4rem_minmax(0,1fr)_8.5rem_1.25rem] sm:gap-x-6 lg:grid-cols-[4.5rem_minmax(0,1fr)_14rem_9rem_1.25rem]"

/**
 * The board. Each system is a row; pointing at one or opening it floods the
 * row with volt and flips the type to black. Opening answers a click, which
 * is the only motion the page volunteers after the hero has landed.
 */
function Entry({
  project,
  open,
  yearStart,
  onToggle,
}: {
  project: ResolvedProject
  open: boolean
  /** First row of its year: carries the year label and a heavier rule. */
  yearStart: boolean
  onToggle: () => void
}) {
  const site = useSiteCopy()
  const fillRef = React.useRef<HTMLSpanElement>(null)
  const panelRef = React.useRef<HTMLDivElement>(null)
  const [hover, setHover] = React.useState(false)
  /* Keyboard focus only: a mouse click must not pin the field up. */
  const [focus, setFocus] = React.useState(false)
  const panelId = React.useId()
  const first = React.useRef(true)

  const hot = open || hover || focus
  const status = project.live
    ? "live"
    : project.building
      ? "building"
      : "private"

  /* The volt field. Wipes from the left in, and back out the way it came. */
  React.useEffect(() => {
    const fill = fillRef.current
    if (!fill) return
    const instant = prefersReducedMotion()
    gsap.to(fill, {
      scaleX: hot ? 1 : 0,
      transformOrigin: hot ? "left" : "right",
      duration: instant ? 0 : 0.42,
      ease: EASE,
    })
  }, [hot])

  React.useEffect(() => {
    const panel = panelRef.current
    if (!panel) return

    const instant = prefersReducedMotion() || first.current
    first.current = false
    const duration = instant ? 0 : 0.44

    if (open) {
      gsap.set(panel, { display: "block", height: "auto" })
      gsap.from(panel, {
        height: 0,
        duration,
        ease: EASE,
        onComplete: () => gsap.set(panel, { height: "auto" }),
      })
      gsap.fromTo(
        panel.querySelectorAll("[data-panel-item]"),
        { autoAlpha: 0, y: 8 },
        {
          autoAlpha: 1,
          y: 0,
          duration: instant ? 0 : 0.4,
          stagger: 0.06,
          ease: EASE,
        }
      )
    } else {
      gsap.to(panel, {
        height: 0,
        duration,
        ease: EASE,
        onComplete: () => gsap.set(panel, { display: "none" }),
      })
    }
  }, [open])

  return (
    <div
      className="entry"
      data-hot={hot ? "true" : "false"}
      data-year-start={yearStart ? "true" : "false"}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span ref={fillRef} className="entry-fill" aria-hidden />

      <button
        type="button"
        onClick={onToggle}
        onFocus={(e) => setFocus(e.currentTarget.matches(":focus-visible"))}
        onBlur={() => setFocus(false)}
        aria-expanded={open}
        aria-controls={panelId}
        className="w-full py-5 text-left sm:py-6"
      >
        {/* Field and rules bleed full width; the content stays on the grid. */}
        <span
          className={cn(
            "sheet grid grid-cols-[minmax(0,1fr)_1.25rem] items-center gap-x-4 gap-y-1.5 sm:gap-y-1",
            GRID
          )}
        >
          <span
            className={cn(
              "entry-year tnum text-sm text-dim",
              yearStart
                ? "col-start-1 col-end-3 sm:col-end-2 sm:row-start-1"
                : "sr-only"
            )}
          >
            {project.year}
          </span>

          <span className="entry-name col-start-1 min-w-0 sm:col-start-2 sm:row-start-1">
            {project.title}
          </span>

          <span className="col-start-1 flex flex-wrap items-center gap-x-4 gap-y-1 sm:contents">
            <span className="entry-domain text-sm text-dim sm:col-start-2 sm:row-start-2 lg:col-start-3 lg:row-start-1">
              {project.domain}
            </span>
            <span
              className={cn(
                "entry-status flex items-center gap-2 text-sm sm:col-start-3 sm:row-start-1 lg:col-start-4",
                status === "live" && "text-jade",
                status === "building" && "text-chalk italic",
                status === "private" && "text-dim"
              )}
            >
              {status === "private" ? null : (
                <span
                  className="entry-status-dot"
                  data-kind={status}
                  aria-hidden
                />
              )}
              {status === "live"
                ? site.ui.statusLive
                : status === "building"
                  ? site.ui.statusBuilding
                  : site.ui.statusPrivate}
            </span>
          </span>

          <span
            className={cn(
              "entry-toggle col-start-2 flex justify-end text-dim sm:col-start-4 sm:row-start-1 lg:col-start-5",
              yearStart ? "row-start-2" : "row-start-1"
            )}
            aria-hidden
          >
            {open ? <Minus size={18} /> : <Plus size={18} />}
          </span>
        </span>
      </button>

      <div
        id={panelId}
        ref={panelRef}
        className="overflow-hidden"
        style={{ display: "none", height: 0 }}
      >
        <div className={cn("sheet flex flex-col gap-6 pb-8 sm:gap-y-6", GRID)}>
          <p
            data-panel-item
            className="entry-body prose-col text-base text-dim sm:col-start-2 sm:col-end-5 lg:col-end-3"
          >
            {project.description}
          </p>

          <div className="flex flex-col gap-4 sm:col-start-2 sm:col-end-5 lg:col-start-3 lg:col-end-6">
            <div data-panel-item className="flex flex-col gap-2.5">
              <span className="entry-stack text-xs text-dim">
                {site.ui.kickers.skills}
              </span>
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {project.stack.map((token) => {
                  const slug = getStackTokenIconSlug(token)
                  return (
                    <li
                      key={token}
                      className="entry-stack flex items-center gap-1.5 text-sm text-chalk"
                    >
                      {slug ? (
                        <CustomIcon slug={slug} size={14} brandColor={false} />
                      ) : null}
                      {token}
                    </li>
                  )
                })}
              </ul>
            </div>

            {project.demoUrl ? (
              <a
                data-panel-item
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="entry-link link-hot w-fit text-sm"
              >
                {site.ui.viewProject}
              </a>
            ) : null}
            {project.repoUrl ? (
              <a
                data-panel-item
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="entry-link link-quiet w-fit text-sm"
              >
                {`${project.title} ${site.ui.gitHubProjectSuffix}`}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export function ProjectRegister({
  projects,
}: {
  projects: readonly ResolvedProject[]
}) {
  const site = useSiteCopy()
  const [openId, setOpenId] = React.useState<string | null>(
    projects[0]?.id ?? null
  )

  return (
    <div>
      <div
        aria-hidden
        className={cn("sheet hidden pb-3 text-xs text-dim sm:grid", GRID)}
      >
        <span>{site.ui.colYear}</span>
        <span>{site.ui.colSystem}</span>
        <span className="hidden lg:block">{site.ui.colDomain}</span>
        <span>{site.ui.colStatus}</span>
      </div>
      {projects.map((project, i) => (
        <Entry
          key={project.id}
          project={project}
          open={openId === project.id}
          yearStart={i === 0 || projects[i - 1].year !== project.year}
          onToggle={() =>
            setOpenId((prev) => (prev === project.id ? null : project.id))
          }
        />
      ))}
    </div>
  )
}
