import type { SimpleIcon } from "simple-icons"
import {
  siAuth0,
  siClaude,
  siCloudinary,
  siCursor,
  siDocker,
  siGooglegemini,
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

/**
 * OpenAI mark (ChatGPT). Simple Icons no longer ships it; the path comes from
 * @lobehub/icons-static-svg `openai.svg` (MIT). Drawn with fill-rule evenodd.
 */
const OPENAI_ICON: SimpleIcon = {
  title: "ChatGPT",
  slug: "openai",
  hex: "000000",
  source: "https://github.com/lobehub/lobe-icons",
  svg: "",
  path: "M9.205 8.658v-2.26c0-.19.072-.333.238-.428l4.543-2.616c.619-.357 1.356-.523 2.117-.523 2.854 0 4.662 2.212 4.662 4.566 0 .167 0 .357-.024.547l-4.71-2.759a.797.797 0 00-.856 0l-5.97 3.473zm10.609 8.8V12.06c0-.333-.143-.57-.429-.737l-5.97-3.473 1.95-1.118a.433.433 0 01.476 0l4.543 2.617c1.309.76 2.189 2.378 2.189 3.948 0 1.808-1.07 3.473-2.76 4.163zM7.802 12.703l-1.95-1.142c-.167-.095-.239-.238-.239-.428V5.899c0-2.545 1.95-4.472 4.591-4.472 1 0 1.927.333 2.712.928L8.23 5.067c-.285.166-.428.404-.428.737v6.898zM12 15.128l-2.795-1.57v-3.33L12 8.658l2.795 1.57v3.33L12 15.128zm1.796 7.23c-1 0-1.927-.332-2.712-.927l4.686-2.712c.285-.166.428-.404.428-.737v-6.898l1.974 1.142c.167.095.238.238.238.428v5.233c0 2.545-1.974 4.472-4.614 4.472zm-5.637-5.303l-4.544-2.617c-1.308-.761-2.188-2.378-2.188-3.948A4.482 4.482 0 014.21 6.327v5.423c0 .333.143.571.428.738l5.947 3.449-1.95 1.118a.432.432 0 01-.476 0zm-.262 3.9c-2.688 0-4.662-2.021-4.662-4.519 0-.19.024-.38.047-.57l4.686 2.71c.286.167.571.167.856 0l5.97-3.448v2.26c0 .19-.07.333-.237.428l-4.543 2.616c-.619.357-1.356.523-2.117.523zm5.899 2.83a5.947 5.947 0 005.827-4.756C22.287 18.339 24 15.84 24 13.296c0-1.665-.713-3.282-1.998-4.448.119-.5.19-.999.19-1.498 0-3.401-2.759-5.947-5.946-5.947-.642 0-1.26.095-1.88.31A5.962 5.962 0 0010.205 0a5.947 5.947 0 00-5.827 4.757C1.713 5.447 0 7.945 0 10.49c0 1.666.713 3.283 1.998 4.448-.119.5-.19 1-.19 1.499 0 3.401 2.759 5.946 5.946 5.946.642 0 1.26-.095 1.88-.309a5.96 5.96 0 004.162 1.713z",
}

/** Paths that need fill-rule evenodd to render their holes. */
const EVENODD = new Set(["openai"])

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
  /* AI tools, shown in the hero orbit (`siteStatic.aiTools`). */
  claude: siClaude,
  openai: OPENAI_ICON,
  cursor: siCursor,
  googlegemini: siGooglegemini,
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
      <path
        fill={brandColor ? `#${icon.hex}` : "currentColor"}
        fillRule={EVENODD.has(slug) ? "evenodd" : undefined}
        d={icon.path}
      />
    </svg>
  )
}
