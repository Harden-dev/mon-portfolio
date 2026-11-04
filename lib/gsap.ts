import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

/**
 * Single registration point. GSAP plugins touch `window`, so this module is
 * only ever imported from `"use client"` components.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

/** Motion is opt-out at the OS level, not at the component level. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return true
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

/** Every timeline in the page shares one curve, so they read as one hand. */
export const EASE = "power3.out"

export { gsap, ScrollTrigger }
