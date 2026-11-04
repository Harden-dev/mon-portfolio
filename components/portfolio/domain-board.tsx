"use client"

import * as React from "react"

import { gsap } from "@/lib/gsap"

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)"
const NARROW_QUERY = "(max-width: 639px)"
/** Columns on a narrow board; long domains wrap onto a second line of tiles. */
const NARROW_COLS = 12
const FLAP_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ&-"
const HOLD = 2.8
const TICK = 0.05
const STAGGER = 0.03

function useMedia(query: string): boolean {
  const subscribe = React.useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query)
      mq.addEventListener("change", onChange)
      return () => mq.removeEventListener("change", onChange)
    },
    [query]
  )
  return React.useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  )
}

/** Greedy word wrap into lines of at most `cols` characters. */
function wrap(text: string, cols: number): string[][] {
  const lines: string[][] = []
  let line: string[] = []
  for (const word of text.split(" ")) {
    const chars = Array.from(word)
    if (line.length && line.length + 1 + chars.length > cols) {
      lines.push(line)
      line = []
    }
    line = line.length ? [...line, " ", ...chars] : chars
  }
  lines.push(line)
  return lines
}

function pad(value: number, width: number): string {
  return String(value).padStart(width, "0")
}

/**
 * A departures board for the domains he works in: one domain on the tiles at
 * a time, each tile flipping through letters before it lands, left to right.
 * It carries content rather than decorating, which is what earns it the
 * movement — and under reduced motion it becomes a plain, still list.
 */
export function DomainBoard({ items }: { items: readonly string[] }) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const reduced = useMedia(REDUCED_QUERY)
  const narrow = useMedia(NARROW_QUERY)

  /* Each domain laid out as a flat run of tiles, `cols` per line. */
  const { rows, cols, cells } = React.useMemo(() => {
    const longestWord = Math.max(
      1,
      ...items.flatMap((item) =>
        item.split(" ").map((word) => Array.from(word).length)
      )
    )
    const longest = Math.max(1, ...items.map((item) => Array.from(item).length))
    const cols = narrow ? Math.max(NARROW_COLS, longestWord) : longest
    const laid = items.map((item) => wrap(item, cols))
    const lines = Math.max(1, ...laid.map((l) => l.length))
    const rows = laid.map((l) =>
      Array.from({ length: lines * cols }, (_, i) => {
        const line = l[Math.floor(i / cols)] ?? []
        return line[i % cols] ?? ""
      })
    )
    return { rows, cols, cells: lines * cols }
  }, [items, narrow])
  const width = Math.max(2, String(items.length).length)

  React.useEffect(() => {
    const root = rootRef.current
    if (!root || reduced || rows.length < 2) return

    const tiles = Array.from(
      root.querySelectorAll<HTMLElement>("[data-flap-cell]")
    )
    const index = root.querySelector<HTMLElement>("[data-flap-index]")

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1 })
      let at = HOLD

      /* Walk every domain and come back to the first, so the loop is seamless. */
      for (let step = 1; step <= rows.length; step++) {
        const from = rows[step - 1]
        const to = rows[step % rows.length]
        const shown = (step % rows.length) + 1

        tl.call(
          () => {
            if (index) index.textContent = pad(shown, width)
          },
          undefined,
          at
        )

        tiles.forEach((tile, c) => {
          const target = to[c] ?? ""
          if ((from[c] ?? "") === target) return
          const flips = 3 + Math.floor(Math.random() * 5)
          const sequence = Array.from(
            { length: flips },
            () => FLAP_CHARS[Math.floor(Math.random() * FLAP_CHARS.length)]
          ).concat(target)
          const proxy = { p: 0 }

          tl.to(
            proxy,
            {
              p: 1,
              duration: sequence.length * TICK,
              ease: "none",
              onUpdate: () => {
                const i = Math.min(
                  sequence.length - 1,
                  Math.floor(proxy.p * sequence.length)
                )
                tile.textContent = sequence[i]
              },
            },
            at + (c % cols) * STAGGER + Math.floor(c / cols) * STAGGER * 2
          )
        })

        at = tl.duration() + HOLD
      }

      /* Hold the first domain again before the timeline wraps. */
      tl.to({}, { duration: at - tl.duration() })
    }, root)

    return () => ctx.revert()
  }, [rows, cols, reduced, width])

  if (reduced) {
    return (
      <div className="flap py-4 sm:py-5" aria-hidden>
        <ul className="sheet flap-static flex flex-wrap gap-x-6 gap-y-2 text-lg text-chalk sm:text-2xl">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    )
  }

  const first = rows[0] ?? []

  return (
    <div className="flap py-4 sm:py-5" aria-hidden>
      {/* Keyed on copy and layout: a locale or breakpoint switch remounts
          clean tiles. */}
      <div
        key={`${cols}:${items.join("|")}`}
        ref={rootRef}
        className="sheet flex items-stretch gap-3 sm:gap-5"
      >
        <span
          data-flap-index
          className="flap-index tnum flex shrink-0 items-center px-2.5 text-lg sm:px-4 sm:text-3xl"
        >
          {pad(1, width)}
        </span>
        <div className="flap-board">
          <div
            className="flap-row"
            style={{ "--flap-cells": cols } as React.CSSProperties}
          >
            {Array.from({ length: cells }, (_, c) => (
              <span key={c} data-flap-cell className="flap-cell">
                {first[c] ?? ""}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
