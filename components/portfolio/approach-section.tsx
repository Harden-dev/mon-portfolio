"use client"

import { useSiteCopy } from "@/components/locale-provider"
import { Reveal } from "@/components/portfolio/motion"

/** Three numbered layers, read left to right like a process. */
export function ApproachSection() {
  const site = useSiteCopy()

  return (
    <ol className="grid border-t border-zinc-300 md:grid-cols-3">
      {site.approach.steps.map((step, i) => (
        <li
          key={step.title}
          className="border-b border-zinc-300 py-8 md:border-b-0 md:border-l md:px-8 md:first:border-l-0 md:first:pl-0 md:last:pr-0"
        >
          <Reveal delay={i * 0.07} className="h-full">
            <span className="text-sm font-medium text-brand tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 text-xl font-semibold tracking-tight text-ink">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-soft">
              {step.body}
            </p>
            <ul className="mt-5 flex flex-col gap-2">
              {step.points.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-2.5 text-sm text-ink"
                >
                  <span className="h-px w-3 bg-zinc-400" aria-hidden />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </li>
      ))}
    </ol>
  )
}
