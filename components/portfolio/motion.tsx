"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

/** Every motion on the page shares this curve, so they read as one hand. */
export const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Fades its children up into place the first time they scroll into view.
 * Short, once, and skipped entirely under reduced motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 14,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
}) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

export function SectionHead({
  eyebrow,
  title,
  note,
  className,
  dark = false,
}: {
  eyebrow: string
  title: string
  note?: string
  className?: string
  /** Set on the dark band so the title and note invert. */
  dark?: boolean
}) {
  return (
    <Reveal className={className}>
      <p className="text-sm font-medium text-brand">{eyebrow}</p>
      <h2
        className={cn(
          "mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl",
          dark ? "text-white" : "text-ink"
        )}
      >
        {title}
      </h2>
      {note ? (
        <p
          className={cn(
            "mt-4 max-w-2xl text-base leading-relaxed",
            dark ? "text-zinc-400" : "text-soft"
          )}
        >
          {note}
        </p>
      ) : null}
    </Reveal>
  )
}
