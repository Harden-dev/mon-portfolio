/**
 * Simple Icons slugs — rendered as inline SVG via `CustomIcon` (see `components/portfolio/custom-icon.tsx`).
 */
export type TechIconDef = { slug: string }

const SKILL_ICONS: Record<string, TechIconDef[]> = {
  "Vue.js": [{ slug: "vuedotjs" }],
  "Nuxt.js": [{ slug: "nuxt" }],
  TypeScript: [{ slug: "typescript" }],
  JavaScript: [{ slug: "javascript" }],
  "HTML/CSS": [{ slug: "html5" }, { slug: "css3" }],
  NestJS: [{ slug: "nestjs" }],
  Laravel: [{ slug: "laravel" }],
  PHP: [{ slug: "php" }],
  REST: [{ slug: "openapiinitiative" }],
  PostgreSQL: [{ slug: "postgresql" }],
  MySQL: [{ slug: "mysql" }],
}

export function getSkillIcons(skill: string): TechIconDef[] {
  return SKILL_ICONS[skill] ?? []
}

/** Short labels on project cards → Simple Icons slug */
const PROJECT_STACK_SLUGS: Record<string, string> = {
  Laravel: "laravel",
  MySQL: "mysql",
  Payments: "stripe",
  RBAC: "auth0",
  "Multi-tenant": "docker",
  Media: "cloudinary",
  Auth: "auth0",
}

export function getProjectStackSlug(token: string): string | undefined {
  return PROJECT_STACK_SLUGS[token]
}

/** Prefer skill map, then project stack aliases (for compact pills). */
export function getStackTokenIconSlug(token: string): string | undefined {
  const fromSkill = getSkillIcons(token)[0]?.slug
  if (fromSkill) return fromSkill
  return PROJECT_STACK_SLUGS[token]
}
