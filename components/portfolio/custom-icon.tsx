import type { SimpleIcon } from "simple-icons"
import {
  siAuth0,
  siCloudinary,
  siDocker,
  siHtml5,
  siJavascript,
  siLaravel,
  siMysql,
  siNestjs,
  siNuxt,
  siOpenapiinitiative,
  siPhp,
  siPostgresql,
  siStripe,
  siTypescript,
  siVuedotjs,
} from "simple-icons"

import { cn } from "@/lib/utils"

/** Slugs used by `lib/tech-icons` — keep in sync */
const ICON_BY_SLUG: Record<string, SimpleIcon> = {
  vuedotjs: siVuedotjs,
  nuxt: siNuxt,
  typescript: siTypescript,
  javascript: siJavascript,
  html5: siHtml5,
  nestjs: siNestjs,
  laravel: siLaravel,
  php: siPhp,
  openapiinitiative: siOpenapiinitiative,
  postgresql: siPostgresql,
  mysql: siMysql,
  stripe: siStripe,
  auth0: siAuth0,
  docker: siDocker,
  cloudinary: siCloudinary,
}

type CustomIconProps = {
  slug: string
  size?: number
  className?: string
  /** Use brand hex fill (default). If false, uses `currentColor`. */
  brandColor?: boolean
  title?: string
  decorative?: boolean
}

/**
 * CSS3 shield — paths from Devicon `css3-original` (MIT). Simple Icons only exposes a flat “CSS” mark.
 */
function Css3Icon({
  size,
  className,
  brandColor,
  title,
  decorative,
}: {
  size: number
  className?: string
  brandColor: boolean
  title?: string
  decorative: boolean
}) {
  const a11yTitle = !decorative ? (title ?? "CSS3") : undefined
  const mono = !brandColor ? "currentColor" : undefined

  return (
    <svg
      role={decorative ? "presentation" : "img"}
      viewBox="0 0 128 128"
      width={size}
      height={size}
      className={cn("shrink-0", className)}
      aria-hidden={decorative ? true : undefined}
    >
      {a11yTitle ? <title>{a11yTitle}</title> : null}
      <path
        fill={mono ?? "#1572B6"}
        d="M18.814 114.123L8.76 1.352h110.48l-10.064 112.754-45.243 12.543-45.119-12.526z"
      />
      <path
        fill={mono ?? "#33A9DC"}
        d="M64.001 117.062l36.559-10.136 8.601-96.354h-45.16v106.49z"
      />
      <path
        fill={mono ?? "#fff"}
        d="M64.001 51.429h18.302l1.264-14.163H64.001V23.435h34.682l-.332 3.711-3.4 38.114h-30.95V51.429z"
      />
      <path
        fill={mono ?? "#EBEBEB"}
        d="M64.083 87.349l-.061.018-15.403-4.159-.985-11.031H33.752l1.937 21.717 28.331 7.863.063-.018v-14.39z"
      />
      <path
        fill={mono ?? "#fff"}
        d="M81.127 64.675l-1.666 18.522-15.426 4.164v14.39l28.354-7.858.208-2.337 2.406-26.881H81.127z"
      />
      <path
        fill={mono ?? "#EBEBEB"}
        d="M64.048 23.435v13.831H30.64l-.277-3.108-.63-7.012-.331-3.711h34.646zm-.047 27.996v13.831H48.792l-.277-3.108-.631-7.012-.33-3.711h16.447z"
      />
    </svg>
  )
}

/**
 * Inline SVG for a Simple Icons slug bundled locally (no CDN `img`).
 */
export function CustomIcon({
  slug,
  size = 20,
  className,
  brandColor = true,
  title,
  decorative = true,
}: CustomIconProps) {
  if (slug === "css3") {
    return (
      <Css3Icon
        size={size}
        className={className}
        brandColor={brandColor}
        title={title}
        decorative={decorative}
      />
    )
  }

  const icon = ICON_BY_SLUG[slug]
  if (!icon) return null

  const a11yTitle = !decorative ? (title ?? icon.title) : undefined

  return (
    <svg
      role={decorative ? "presentation" : "img"}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={cn("shrink-0", className)}
      aria-hidden={decorative ? true : undefined}
    >
      {a11yTitle ? <title>{a11yTitle}</title> : null}
      <path fill={brandColor ? `#${icon.hex}` : "currentColor"} d={icon.path} />
    </svg>
  )
}
