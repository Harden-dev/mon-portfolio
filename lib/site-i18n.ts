import {
  PROJECT_IDS,
  siteContactStatic,
  siteStatic,
  type ProjectId,
  type SiteProjectStatic,
} from "@/lib/site-static"

export type Locale = "en" | "fr"

export const LOCALES: readonly Locale[] = ["en", "fr"] as const
export const LOCALE_STORAGE_KEY = "michel-portfolio-locale" as const

export type JourneyEntry = {
  range: string
  title: string
  detail: string
}

export type ResolvedProject = SiteProjectStatic & {
  title: string
  /** What kind of system it is — the board is read by domain, not by stack. */
  domain: string
  description: string
}

export type StatEntry = {
  value: string
  label: string
}

export type ResolvedSite = {
  name: string
  shortName: string
  brand: { prefix: string; surname: string }
  role: string
  location: string
  tagline: string
  sourceSite: string
  about: { title: string; body: string }
  timeline: readonly JourneyEntry[]
  nav: readonly { label: string; href: string }[]
  work: { title: string; subtitle: string }
  skills: { frontend: readonly string[]; backend: readonly string[] }
  projects: ResolvedProject[]
  contact: {
    headline: string
    sub: string
    cta: string
    email: string
    mailHref: string
  }
  social: { github: string; linkedin: string }
  ui: {
    /** Small pill above the hero title. */
    heroBadge: string
    /** Hero title, split so the middle phrase can carry the accent. */
    heroTitle: { before: string; highlight: string; after: string }
    heroNote: string
    stats: readonly StatEntry[]
    heroViewWork: string
    heroContact: string
    kickers: {
      projects: string
      about: string
      skills: string
      contact: string
    }
    journeyTitle: string
    facts: readonly { label: string; value: string }[]
    elsewhere: string
    viewProject: string
    gitHubProjectSuffix: string
    statusLive: string
    statusPrivate: string
    statusBuilding: string
    showAllProjects: string
    showFewerProjects: string
    copyEmail: string
    copied: string
    marqueeLabel: string
    railLabel: string
    languageToggle: string
  }
  stack: {
    title: string
    intro: string
    panelFrontend: string
    panelBackend: string
  }
}

type ProjectCopy = Record<
  ProjectId,
  { title: string; domain: string; description: string }
>

type MessageBundle = {
  role: string
  location: string
  tagline: string
  about: { title: string; body: string }
  timeline: readonly JourneyEntry[]
  nav: readonly { label: string; href: string }[]
  work: { title: string; subtitle: string }
  projects: ProjectCopy
  contact: { headline: string; sub: string; cta: string }
  ui: ResolvedSite["ui"]
  stack: ResolvedSite["stack"]
}

const projectsEn: ProjectCopy = {
  kypaye: {
    title: "KYPAYE",
    domain: "Rent payments",
    description:
      "Rent payment application: pay your own rent or a relative’s, rent and deposit advances, and unpaid-rent insurance through the SAAR Assurance API. Laravel and PostgreSQL backend with payment integration. In progress.",
  },
  omilaye: {
    title: "OMILAYE",
    domain: "Connection requests",
    description:
      "Internal application for handling utility connection requests in Benin: intake, follow-up and processing of each request. Laravel on the front end.",
  },
  merchant: {
    title: "Merchant Tracker",
    domain: "Point-of-sale tracking",
    description:
      "Big Data application for managing MTN MoMo points of sale: merchant records and field tracking of each outlet.",
  },
  tricv: {
    title: "TRI CV",
    domain: "AI CV screening",
    description:
      "Internal GS2E tool that sorts incoming CVs with AI and puts a chatbot in front of the recruiting team to query them. I built the Vue.js front end; the Node.js backend was built by another team.",
  },
  psofo: {
    title: "PSOFO",
    domain: "Property subscriptions",
    description:
      "Internal real-estate subscription portal for GS2E, built full-stack in Laravel.",
  },
  branchements: {
    title: "Connection digitisation",
    domain: "Water connections",
    description:
      "Internal SODECI application that takes connection requests off paper. Laravel on the backend.",
  },
  raccordement: {
    title: "Raccordement HT",
    domain: "HV grid connections",
    description:
      "CIE application for high-voltage (HTA) grid connection requests, from submission to processing. Laravel on the front end.",
  },
  alpha: {
    title: "Alpha Sécurité",
    domain: "Security operations",
    description:
      "Management platform for a Côte d’Ivoire security firm: agent records, site assignments, shift planning, and access scoped to what each operations role is allowed to see.",
  },
  stedii: {
    title: "Stediihome",
    domain: "Marketplace & trust",
    description:
      "Marketplace connecting domestic workers with employers: a profile and application flow on both sides, plus an admin role that moderates listings and accounts before they reach anyone.",
  },
  mda: {
    title: "MDA - Shareholder portal",
    domain: "Shareholding",
    description:
      "Full-stack shareholder portal: purchases, transaction history, portfolio views, and hardened access to holdings data.",
  },
  nissi: {
    title: "Nissi Printing",
    domain: "Order pipeline",
    description:
      "Backend for an online print ordering flow: quotes, orders, and automated notifications to ops and customers.",
  },
  sihios: {
    title: "Sihios-TS",
    domain: "Multi-tenant SaaS",
    description:
      "Multi-user platform with blog, per-client sessions, and content scoped by role.",
  },
  hofa: {
    title: "Hofa",
    domain: "Content & accounts",
    description:
      "Dynamic site backend: blog, client accounts, gallery uploads, secure login.",
  },
}

const projectsFr: ProjectCopy = {
  kypaye: {
    title: "KYPAYE",
    domain: "Paiement de loyer",
    description:
      "Application de paiement de loyer : paiement pour soi ou pour un proche, avances sur loyer et caution, et garantie loyers impayés via l’API de SAAR Assurance. Backend Laravel et PostgreSQL avec intégration de paiement. En cours de développement.",
  },
  omilaye: {
    title: "OMILAYE",
    domain: "Demandes de branchement",
    description:
      "Application interne de gestion des demandes de branchement au Bénin : dépôt, suivi et traitement de chaque demande. Laravel côté interface.",
  },
  merchant: {
    title: "Merchant Tracker",
    domain: "Suivi des points de vente",
    description:
      "Application Big Data de gestion des points de vente MTN MoMo : fiches marchands et suivi terrain de chaque point de vente.",
  },
  tricv: {
    title: "TRI CV",
    domain: "Tri de CV par IA",
    description:
      "Outil interne GS2E qui trie les CV reçus grâce à l’IA, avec un chatbot intégré pour que l’équipe recrutement puisse les interroger. J’ai développé l’interface Vue.js ; le backend Node.js a été réalisé par une autre équipe.",
  },
  psofo: {
    title: "PSOFO",
    domain: "Souscription immobilière",
    description:
      "Portail interne de souscription immobilière pour GS2E, développé en Laravel full-stack.",
  },
  branchements: {
    title: "Digitalisation des branchements",
    domain: "Branchements d’eau",
    description:
      "Application interne SODECI qui dématérialise les demandes de branchement. Laravel côté backend.",
  },
  raccordement: {
    title: "Raccordement HT",
    domain: "Raccordement HTA",
    description:
      "Application CIE de demandes de raccordement au réseau haute tension (HTA), du dépôt jusqu’au traitement. Laravel côté interface.",
  },
  alpha: {
    title: "Alpha Sécurité",
    domain: "Opérations de sécurité",
    description:
      "Plateforme de gestion pour une société de sécurité ivoirienne : fiches agents, affectations de sites, planification des vacations, et accès limité à ce que chaque rôle d’exploitation a le droit de voir.",
  },
  stedii: {
    title: "Stediihome",
    domain: "Mise en relation",
    description:
      "Place de marché entre travailleurs domestiques et employeurs : profils et candidatures des deux côtés, plus un rôle admin qui modère les annonces et les comptes avant qu’ils n’atteignent qui que ce soit.",
  },
  mda: {
    title: "MDA - Portail actionnaires",
    domain: "Actionnariat",
    description:
      "Portail actionnaires full-stack : achats, historique des transactions, vues portefeuille et accès renforcé aux données de détention.",
  },
  nissi: {
    title: "Nissi Printing",
    domain: "Chaîne de commande",
    description:
      "Backend pour un parcours de commande d’impression en ligne : devis, commandes et notifications automatiques vers l’équipe et les clients.",
  },
  sihios: {
    title: "Sihios-TS",
    domain: "SaaS multi-tenant",
    description:
      "Plateforme multi-utilisateurs avec blog, sessions par client et contenu filtré par rôles.",
  },
  hofa: {
    title: "Hofa",
    domain: "Contenu & comptes",
    description:
      "Backend de site dynamique : blog, comptes clients, galerie média, connexion sécurisée.",
  },
}

const messages: Record<Locale, MessageBundle> = {
  en: {
    role: "Web developer",
    location: "Abidjan, Côte d’Ivoire",
    tagline:
      "Twelve production systems: utility connection requests, property subscriptions, AI CV screening, mobile-money point-of-sale tracking, security operations, domestic-work matching, shareholder records and print orders. Laravel and NestJS on the server, Vue and Nuxt in front.",
    about: {
      title: "Software a business actually runs on",
      body: "I build the software a business actually runs on - the part that holds the records, decides who may see them, and still works on a Monday morning. Schema and secure APIs first, then the admin tools the staff live in, then the app the customer sees. Recent work is concentrated in Côte d’Ivoire: agent and shift management for a security firm, and a marketplace putting domestic workers in front of employers with moderation in between.",
    },
    timeline: [
      {
        range: "2026",
        title: "Utility operations",
        detail:
          "KYPAYE in progress (rent payments, SAAR Assurance API), plus PSOFO, SODECI connection digitisation and CIE HV connections — internal tools for connection requests and property subscriptions.",
      },
      {
        range: "2025",
        title: "Platforms with real operators",
        detail:
          "Alpha Sécurité, Stediihome and Merchant Tracker - agent scheduling, marketplace moderation and MTN MoMo point-of-sale tracking, built for staff who open them every day.",
      },
      {
        range: "2024",
        title: "Records, requests and AI",
        detail:
          "Shareholder portal and print-order pipeline, OMILAYE for connection requests in Benin, and TRI CV, AI CV screening with a built-in chatbot.",
      },
      {
        range: "2023",
        title: "Full-stack delivery",
        detail:
          "Laravel and Nest backends, Vue and Nuxt front ends, RBAC, email workflows, deployments.",
      },
    ],
    nav: [
      { label: "Work", href: "#work" },
      { label: "About", href: "#about" },
      { label: "Stack", href: "#stack" },
      { label: "Contact", href: "#contact" },
    ],
    work: {
      title: "Selected projects",
      subtitle:
        "Business applications built for real companies in Côte d’Ivoire and Benin — from utility connection requests to shareholder portals.",
    },
    projects: projectsEn,
    contact: {
      headline: "Have a project in mind, or a role to fill?",
      sub: "Tell me the problem and who will use it. I’ll get back to you with a clear scope.",
      cta: "Email me",
    },
    ui: {
      heroBadge: "Full-stack web developer · Abidjan",
      heroTitle: {
        before: "I build web apps ",
        highlight: "businesses run on",
        after: ".",
      },
      heroNote:
        "Laravel and NestJS on the server, Vue and Nuxt in front — from the database schema to the screens teams use all day.",
      stats: [
        { value: "12", label: "projects in production" },
        { value: "4", label: "publicly online" },
        { value: "2023", label: "shipping since" },
      ],
      heroViewWork: "View my work",
      heroContact: "Get in touch",
      kickers: {
        projects: "Work",
        about: "About",
        skills: "Stack",
        contact: "Contact",
      },
      journeyTitle: "Track record",
      facts: [
        { label: "Based in", value: "Abidjan, Côte d’Ivoire" },
        { label: "Focus", value: "Business apps & secure APIs" },
        { label: "Main stack", value: "Laravel, NestJS, Vue, Nuxt" },
      ],
      elsewhere: "Find me on",
      viewProject: "Visit site",
      gitHubProjectSuffix: "on GitHub",
      statusLive: "Online",
      statusPrivate: "Client project",
      statusBuilding: "In progress",
      showAllProjects: "Show all projects",
      showFewerProjects: "Show fewer",
      copyEmail: "Copy email",
      copied: "Copied",
      marqueeLabel: "Technologies I ship with",
      railLabel: "Sections",
      languageToggle: "Language",
    },
    stack: {
      title: "Tools I use in production",
      intro: "What actually runs behind the projects above, server first.",
      panelBackend: "Server & data",
      panelFrontend: "Client & interface",
    },
  },
  fr: {
    role: "Développeur web",
    location: "Abidjan, Côte d’Ivoire",
    tagline:
      "Douze systèmes en production : demandes de branchement et de raccordement, souscription immobilière, tri de CV par IA, suivi de points de vente mobile money, opérations de sécurité, mise en relation domestique, registres d’actionnaires et commandes d’impression. Laravel et NestJS côté serveur, Vue et Nuxt côté interface.",
    about: {
      title: "Le logiciel sur lequel une entreprise tourne",
      body: "Je construis le logiciel sur lequel une entreprise tourne vraiment - celui qui garde les dossiers, décide qui a le droit de les voir, et fonctionne encore le lundi matin. Le schéma et des APIs sécurisées d’abord, puis les outils d’administration dans lesquels les équipes passent leurs journées, puis l’application que le client voit. Mes travaux récents sont concentrés en Côte d’Ivoire : la gestion des agents et des vacations d’une société de sécurité, et une place de marché qui met des travailleurs domestiques en face d’employeurs, avec de la modération entre les deux.",
    },
    timeline: [
      {
        range: "2026",
        title: "Métiers de l’eau et de l’électricité",
        detail:
          "KYPAYE en cours (paiement de loyer, API SAAR Assurance), ainsi que PSOFO, digitalisation des branchements SODECI et raccordement HT CIE — outils internes de demandes de branchement et de souscription immobilière.",
      },
      {
        range: "2025",
        title: "Des plateformes avec de vrais opérateurs",
        detail:
          "Alpha Sécurité, Stediihome et Merchant Tracker - planification des agents, modération de la mise en relation et suivi des points de vente MTN MoMo, conçus pour ceux qui les ouvrent tous les jours.",
      },
      {
        range: "2024",
        title: "Dossiers, demandes et IA",
        detail:
          "Portail actionnaires et chaîne de commande d’impression, OMILAYE pour les demandes de branchement au Bénin, et TRI CV, tri de CV par IA avec chatbot intégré.",
      },
      {
        range: "2023",
        title: "Livraison full-stack",
        detail:
          "Backends Laravel et Nest, interfaces Vue et Nuxt, RBAC, emails transactionnels, déploiements.",
      },
    ],
    nav: [
      { label: "Projets", href: "#work" },
      { label: "À propos", href: "#about" },
      { label: "Stack", href: "#stack" },
      { label: "Contact", href: "#contact" },
    ],
    work: {
      title: "Projets sélectionnés",
      subtitle:
        "Des applications métier conçues pour de vraies entreprises en Côte d’Ivoire et au Bénin — des demandes de branchement aux portails actionnaires.",
    },
    projects: projectsFr,
    contact: {
      headline: "Un projet en tête, ou un poste à pourvoir ?",
      sub: "Décrivez-moi le besoin et qui va l’utiliser. Je reviens vers vous avec un périmètre clair.",
      cta: "M’écrire",
    },
    ui: {
      heroBadge: "Développeur web full-stack · Abidjan",
      heroTitle: {
        before: "Je développe des applications web ",
        highlight: "qui font tourner les entreprises",
        after: ".",
      },
      heroNote:
        "Laravel et NestJS côté serveur, Vue et Nuxt côté interface — du schéma de base de données jusqu’aux écrans que les équipes utilisent toute la journée.",
      stats: [
        { value: "12", label: "projets en production" },
        { value: "4", label: "en ligne publiquement" },
        { value: "2023", label: "en production depuis" },
      ],
      heroViewWork: "Voir mes projets",
      heroContact: "Me contacter",
      kickers: {
        projects: "Projets",
        about: "À propos",
        skills: "Stack",
        contact: "Contact",
      },
      journeyTitle: "Parcours",
      facts: [
        { label: "Basé à", value: "Abidjan, Côte d’Ivoire" },
        { label: "Spécialité", value: "Applications métier & APIs sécurisées" },
        { label: "Stack principale", value: "Laravel, NestJS, Vue, Nuxt" },
      ],
      elsewhere: "Retrouvez-moi sur",
      viewProject: "Voir le site",
      gitHubProjectSuffix: "sur GitHub",
      statusLive: "En ligne",
      statusPrivate: "Projet client",
      statusBuilding: "En cours",
      showAllProjects: "Voir tous les projets",
      showFewerProjects: "Voir moins",
      copyEmail: "Copier l’email",
      copied: "Copié",
      marqueeLabel: "Technologies que j’utilise en production",
      railLabel: "Sections",
      languageToggle: "Langue",
    },
    stack: {
      title: "Les outils que j’utilise en production",
      intro:
        "Ce qui tourne réellement derrière les projets ci-dessus, serveur d’abord.",
      panelBackend: "Serveur & données",
      panelFrontend: "Client & interface",
    },
  },
}

function assertProjectIds(): void {
  for (const p of siteStatic.projects) {
    if (!PROJECT_IDS.includes(p.id)) {
      throw new Error(`Unknown project id: ${p.id}`)
    }
  }
}

assertProjectIds()

export function resolveSite(locale: Locale): ResolvedSite {
  const m = messages[locale]
  const projects: ResolvedProject[] = siteStatic.projects.map((p) => ({
    ...p,
    title: m.projects[p.id].title,
    domain: m.projects[p.id].domain,
    description: m.projects[p.id].description,
  }))

  return {
    name: siteStatic.name,
    shortName: siteStatic.shortName,
    brand: siteStatic.brand,
    role: m.role,
    location: m.location,
    tagline: m.tagline,
    sourceSite: siteStatic.sourceSite,
    about: m.about,
    timeline: m.timeline,
    nav: m.nav,
    work: m.work,
    skills: siteStatic.skills,
    projects,
    contact: {
      ...m.contact,
      email: siteContactStatic.email,
      mailHref: siteContactStatic.mailHref,
    },
    social: siteStatic.social,
    ui: m.ui,
    stack: m.stack,
  }
}

export function isLocale(value: string): value is Locale {
  return value === "en" || value === "fr"
}
