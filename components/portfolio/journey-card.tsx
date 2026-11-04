export type JourneyEntry = {
  range: string
  title: string
  detail: string
}

/** Same ruled rhythm as the board, so the page reads as one document. */
export function JourneyCard({
  entries,
  heading = "Track record",
}: {
  entries: readonly JourneyEntry[]
  heading?: string
}) {
  return (
    <div>
      <h3 className="border-b border-line pb-3 text-sm text-dim">{heading}</h3>
      <ol className="m-0 list-none p-0">
        {entries.map((row, i) => (
          <li
            key={`${row.range}-${i}`}
            className="grid gap-2 border-b border-line/60 py-6 sm:grid-cols-[6rem_minmax(0,1fr)] sm:gap-6"
          >
            <span className="tnum font-heading text-2xl leading-none font-semibold tracking-tight text-volt">
              {row.range}
            </span>
            <span className="min-w-0">
              <span className="block text-base text-chalk">{row.title}</span>
              <span className="prose-col mt-1.5 block text-sm text-dim">
                {row.detail}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}
