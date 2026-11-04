import type { JourneyEntry } from "@/lib/site-i18n"

/** A vertical timeline: one dot per year on a hairline rail. */
export function JourneyCard({
  entries,
  heading,
}: {
  entries: readonly JourneyEntry[]
  heading: string
}) {
  return (
    <div className="rounded-2xl border border-line bg-panel p-6 sm:p-8">
      <h3 className="text-sm font-medium text-soft">{heading}</h3>
      <ol className="relative mt-6 ml-1.5 border-l border-line">
        {entries.map((row, i) => (
          <li
            key={`${row.range}-${i}`}
            className="relative pb-8 pl-6 last:pb-0"
          >
            <span
              className="absolute top-1.5 -left-[5px] size-[9px] rounded-full border-2 border-panel bg-brand ring-1 ring-brand/30"
              aria-hidden
            />
            <span className="text-sm font-semibold text-brand tabular-nums">
              {row.range}
            </span>
            <p className="mt-1 text-base font-medium text-ink">{row.title}</p>
            <p className="mt-1.5 text-justify text-sm leading-relaxed hyphens-auto text-soft">
              {row.detail}
            </p>
          </li>
        ))}
      </ol>
    </div>
  )
}
