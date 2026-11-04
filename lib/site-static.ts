export const CONTACT_EMAIL = "micstech.28@gmail.com" as const

/** Newest first — the board reads top-down as a service history. */
export const PROJECT_IDS = [
  "kypaye",
  "psofo",
  "branchements",
  "raccordement",
  "alpha",
  "stedii",
  "merchant",
  "omilaye",
  "tricv",
  "mda",
  "nissi",
  "sihios",
  "hofa",
] as const
export type ProjectId = (typeof PROJECT_IDS)[number]

export type SiteProjectStatic = {
  id: ProjectId
  /** Year the system went into service. */
  year: string
  stack: readonly string[]
  /** A running system burns green; everything else stays dim. */
  live?: boolean
  /** Still being built — shown dim, never green. */
  building?: boolean
  demoUrl?: string
  repoUrl?: string
}

export const siteStatic = {
  name: "Michel Kouame Banh",
  shortName: "Michel K.",
  brand: { prefix: "Michel", surname: "K." },
  sourceSite: "https://harden-dev.vercel.app/",
  skills: {
    frontend: ["Vue.js", "Nuxt.js", "TypeScript", "JavaScript", "HTML/CSS"],
    backend: ["Laravel", "NestJS", "PHP", "REST", "PostgreSQL", "MySQL"],
  },
  projects: [
    {
      id: "kypaye",
      year: "2026",
      building: true,
      stack: ["Laravel", "PostgreSQL", "Payments", "SAAR API"],
    },
    {
      id: "psofo",
      year: "2026",
      stack: ["Laravel", "MySQL", "Full-stack", "Subscriptions"],
    },
    {
      id: "branchements",
      year: "2026",
      stack: ["Laravel", "PostgreSQL", "REST", "Workflow"],
    },
    {
      id: "raccordement",
      year: "2026",
      stack: ["Laravel", "Workflow"],
    },
    {
      id: "alpha",
      year: "2025",
      live: true,
      stack: ["Laravel", "Vue.js", "MySQL", "RBAC", "Scheduling"],
    },
    {
      id: "stedii",
      year: "2025",
      live: true,
      stack: ["Laravel", "Vue.js", "MySQL", "RBAC", "Media"],
    },
    {
      id: "merchant",
      year: "2025",
      stack: ["Laravel", "PostgreSQL", "Tracking"],
    },
    {
      id: "omilaye",
      year: "2024",
      stack: ["Laravel", "Workflow"],
    },
    {
      id: "tricv",
      year: "2024",
      stack: ["Vue.js", "AI", "Chatbot"],
    },
    {
      id: "mda",
      year: "2024",
      live: true,
      stack: ["Laravel", "MySQL", "Payments"],
    },
    {
      id: "nissi",
      year: "2024",
      live: true,
      stack: ["Laravel", "MySQL", "Mail"],
    },
    {
      id: "sihios",
      year: "2023",
      stack: ["Laravel", "RBAC", "Multi-tenant"],
    },
    {
      id: "hofa",
      year: "2023",
      stack: ["Laravel", "Media", "Auth"],
    },
  ] as const satisfies readonly SiteProjectStatic[],
  social: {
    github: "https://github.com/Harden-dev",
    linkedin: "https://www.linkedin.com/in/kouame-michel-banh-003756202/",
  },
} as const

export const siteContactStatic = {
  email: CONTACT_EMAIL,
  mailHref: `mailto:${CONTACT_EMAIL}`,
} as const
