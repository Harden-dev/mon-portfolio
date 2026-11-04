"use client"

import * as React from "react"
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react"

import { CustomIcon } from "@/components/portfolio/custom-icon"
import { useSiteCopy } from "@/components/locale-provider"
import { EASE } from "@/components/portfolio/motion"
import { getSkillIcons } from "@/lib/tech-icons"

/** Stack shown on the middle ring, in this order. */
const STACK = [
  "Laravel",
  "Vue.js",
  "NestJS",
  "Nuxt.js",
  "PostgreSQL",
  "TypeScript",
]

/** Ring radii in px (the orbit box is 600 × 600). */
const R_AI = 118
const R_STACK = 205
const R_OUTER = 290

type Satellite = { key: string; slug: string; angle: number }

function Ring({
  radius,
  seconds,
  reverse = false,
  dashed = false,
  satellites = [],
  chipSize,
  delay,
  extra,
}: {
  radius: number
  seconds: number
  reverse?: boolean
  dashed?: boolean
  satellites?: Satellite[]
  chipSize?: number
  delay: number
  extra?: React.ReactNode
}) {
  const reduce = useReducedMotion()
  const spin = {
    "--orbit-duration": `${seconds}s`,
    animationDirection: reverse ? "reverse" : "normal",
  } as React.CSSProperties
  /* The chip spins the other way at the same speed, so it stays upright. */
  const counter = {
    "--orbit-duration": `${seconds}s`,
    animationDirection: reverse ? "normal" : "reverse",
  } as React.CSSProperties

  return (
    <motion.div
      className="absolute top-1/2 left-1/2"
      style={{ width: radius * 2, height: radius * 2, x: "-50%", y: "-50%" }}
      initial={reduce ? false : { opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      <div
        className={
          dashed
            ? "absolute inset-0 rounded-full border border-dashed border-zinc-300"
            : "absolute inset-0 rounded-full border border-zinc-300/80"
        }
      />
      <div className="orbit-spin absolute inset-0" style={spin}>
        {satellites.map((s, i) => (
          <div
            key={s.key}
            className="absolute top-1/2 left-1/2"
            style={{
              transform: `rotate(${s.angle}deg) translateX(${radius}px) rotate(${-s.angle}deg)`,
            }}
          >
            <motion.div
              className="-translate-x-1/2 -translate-y-1/2"
              initial={reduce ? false : { opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                ease: EASE,
                delay: delay + 0.25 + i * 0.07,
              }}
            >
              <div className="orbit-spin" style={counter}>
                <span
                  className="flex items-center justify-center rounded-full border border-line bg-panel text-ink shadow-[0_10px_30px_-12px_rgb(24_24_27/0.35)]"
                  style={{ width: chipSize, height: chipSize }}
                >
                  <CustomIcon
                    slug={s.slug}
                    size={Math.round((chipSize ?? 48) * 0.42)}
                    brandColor={false}
                  />
                </span>
              </div>
            </motion.div>
          </div>
        ))}
        {extra}
      </div>
    </motion.div>
  )
}

/**
 * The hero's background piece: AI tools on the inner ring, the production
 * stack on the middle one, slowly turning around the monogram. Decorative
 * (aria-hidden); the caption under it says the same thing in words.
 * It drifts a few pixels towards the pointer for depth.
 */
export function HeroOrbit() {
  const site = useSiteCopy()
  const reduce = useReducedMotion()

  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 60, damping: 20 })
  const sy = useSpring(py, { stiffness: 60, damping: 20 })
  const x = useTransform(sx, (v) => v * 18)
  const y = useTransform(sy, (v) => v * 18)

  React.useEffect(() => {
    if (reduce) return
    const onMove = (e: PointerEvent) => {
      px.set(e.clientX / window.innerWidth - 0.5)
      py.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => window.removeEventListener("pointermove", onMove)
  }, [reduce, px, py])

  const ai: Satellite[] = site.aiTools.map((t, i, all) => ({
    key: t.slug,
    slug: t.slug,
    angle: -90 + (360 / all.length) * i,
  }))
  const stack: Satellite[] = STACK.flatMap((label, i) => {
    const slug = getSkillIcons(label)[0]?.slug
    return slug
      ? [{ key: label, slug, angle: -60 + (360 / STACK.length) * i }]
      : []
  })

  return (
    <div className="pointer-events-none absolute top-1/2 left-[56%] -z-10 hidden -translate-y-1/2 lg:block xl:left-[57%]">
      <motion.div
        aria-hidden
        className="relative size-[600px]"
        style={{ x, y }}
      >
        <Ring
          radius={R_OUTER}
          seconds={140}
          dashed
          delay={0.3}
          extra={
            <span className="absolute top-1/2 left-0 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand" />
          }
        />
        <Ring
          radius={R_STACK}
          seconds={90}
          reverse
          satellites={stack}
          chipSize={50}
          delay={0.2}
        />
        <Ring
          radius={R_AI}
          seconds={55}
          satellites={ai}
          chipSize={58}
          delay={0.1}
        />

        <motion.div
          className="absolute top-1/2 left-1/2 flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ink text-3xl font-semibold text-white shadow-[0_20px_50px_-15px_rgb(24_24_27/0.5)]"
          initial={reduce ? false : { opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          M
        </motion.div>
      </motion.div>

      <motion.p
        className="absolute bottom-6 left-28 max-w-[15rem] rounded-xl border border-line bg-panel/90 px-4 py-3 text-xs leading-relaxed text-soft shadow-[0_10px_30px_-15px_rgb(24_24_27/0.3)]"
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.9 }}
      >
        {site.ui.orbitCaption}
      </motion.p>
    </div>
  )
}
