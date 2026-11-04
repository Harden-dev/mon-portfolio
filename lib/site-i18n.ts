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
  aiTools: readonly { label: string; slug: string }[]
  ui: {
    /** Plain line above the hero title, after the name. */
    heroKicker: string
    /** Hero title, split so the middle phrase can carry the accent. */
    heroTitle: { before: string; highlight: string; after: string }
    heroNote: string
    /** Small caption beside the hero orbit. */
    orbitCaption: string
    stats: readonly StatEntry[]
    heroViewWork: string
    heroContact: string
    kickers: {
      projects: string
      approach: string
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
    railLabel: string
    languageToggle: string
  }
  approach: {
    title: string
    intro: string
    steps: readonly { title: string; body: string; points: readonly string[] }[]
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
  approach: ResolvedSite["approach"]
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
    title: "MDA shareholder portal",
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
    title: "Portail actionnaires MDA",
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
      title: "A bit about me",
      body: "I’m a full-stack web developer based in Abidjan. Most of my work is business software: the tools a company uses every day to manage its customers, requests, staff and payments. I usually start with the database and the API, then build the back office, then the screens the customers see. Lately I’ve worked on shift planning for a security company and on a platform that connects domestic workers with employers.",
    },
    timeline: [
      {
        range: "2026",
        title: "Water and power utilities",
        detail:
          "Internal tools for SODECI, CIE and GS2E: water and power connection requests, and a property subscription portal. KYPAYE, a rent payment app, is in progress.",
      },
      {
        range: "2025",
        title: "Platforms used every day",
        detail:
          "Alpha Sécurité for agent scheduling, Stediihome for hiring domestic workers, and Merchant Tracker for MTN MoMo points of sale.",
      },
      {
        range: "2024",
        title: "Portals and internal tools",
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
      { label: "Approach", href: "#approach" },
      { label: "About", href: "#about" },
      { label: "Stack", href: "#stack" },
      { label: "Contact", href: "#contact" },
    ],
    work: {
      title: "Selected projects",
      subtitle:
        "Applications I built for companies in Côte d’Ivoire and Benin. Most are internal tools, so they have no public link.",
    },
    projects: projectsEn,
    contact: {
      headline: "Let’s work together",
      sub: "You have a project or a job opening? Send me a short message about what you need and I’ll get back to you.",
      cta: "Email me",
    },
    ui: {
      heroKicker: "full-stack web developer in Abidjan",
      heroTitle: {
        before: "I build web apps ",
        highlight: "businesses run on",
        after: ".",
      },
      heroNote:
        "I work with Laravel and NestJS on the back end, Vue and Nuxt on the front end. I handle the whole project, from the database to the interface.",
      stats: [
        { value: "12", label: "projects in production" },
        { value: "4", label: "publicly online" },
        { value: "2023", label: "shipping since" },
      ],
      orbitCaption:
        "My daily toolkit: AI assistants around a Laravel and Vue stack.",
      heroViewWork: "View my work",
      heroContact: "Get in touch",
      kickers: {
        projects: "Work",
        approach: "Approach",
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
      railLabel: "Sections",
      languageToggle: "Language",
    },
    approach: {
      title: "How I work on a project",
      intro:
        "I build in three steps, starting with the data, so the rest of the app has solid ground to stand on.",
      steps: [
        {
          title: "Data & secure APIs",
          body: "I start by modelling the data and deciding who can see or change what.",
          points: ["Database design", "REST APIs", "Role-based access"],
        },
        {
          title: "Admin tools",
          body: "Then the back office your team uses every day to handle records, requests and planning.",
          points: ["Dashboards", "Workflows", "Notifications"],
        },
        {
          title: "Customer-facing apps",
          body: "Last, the app your customers use. It runs on the same data, so everything stays in sync.",
          points: ["Vue & Nuxt front ends", "Payments", "Deployment"],
        },
      ],
    },
    stack: {
      title: "My tools",
      intro: "The languages and frameworks I use on the projects above.",
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
      title: "Qui je suis",
      body: "Je suis développeur web full-stack, basé à Abidjan. Je développe surtout des applications métier : les outils qu’une entreprise utilise au quotidien pour gérer ses clients, ses demandes, ses équipes et ses paiements. Je commence en général par la base de données et l’API, puis le back-office, puis les écrans que voient les clients. Récemment, j’ai travaillé sur la planification des agents d’une société de sécurité et sur une plateforme qui met en relation des employés de maison et des employeurs.",
    },
    timeline: [
      {
        range: "2026",
        title: "Eau et électricité",
        detail:
          "Des outils internes pour la SODECI, la CIE et GS2E : demandes de branchement d’eau et d’électricité, et un portail de souscription immobilière. KYPAYE, une application de paiement de loyer, est en cours.",
      },
      {
        range: "2025",
        title: "Des plateformes utilisées chaque jour",
        detail:
          "Alpha Sécurité pour la planification des agents, Stediihome pour le recrutement d’employés de maison, et Merchant Tracker pour les points de vente MTN MoMo.",
      },
      {
        range: "2024",
        title: "Portails et outils internes",
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
      { label: "Approche", href: "#approach" },
      { label: "À propos", href: "#about" },
      { label: "Stack", href: "#stack" },
      { label: "Contact", href: "#contact" },
    ],
    work: {
      title: "Projets sélectionnés",
      subtitle:
        "Des applications que j’ai développées pour des entreprises en Côte d’Ivoire et au Bénin. La plupart sont des outils internes, donc sans lien public.",
    },
    projects: projectsFr,
    contact: {
      headline: "Travaillons ensemble",
      sub: "Vous avez un projet ou un poste à pourvoir ? Écrivez-moi quelques lignes sur votre besoin, je vous réponds rapidement.",
      cta: "M’écrire",
    },
    ui: {
      heroKicker: "développeur web full-stack à Abidjan",
      heroTitle: {
        before: "Je développe des applications web ",
        highlight: "qui font tourner les entreprises",
        after: ".",
      },
      heroNote:
        "Je travaille avec Laravel et NestJS côté serveur, Vue et Nuxt côté interface. Je prends en charge tout le projet, de la base de données jusqu’à l’interface.",
      stats: [
        { value: "12", label: "projets en production" },
        { value: "4", label: "en ligne publiquement" },
        { value: "2023", label: "en production depuis" },
      ],
      orbitCaption:
        "Mon quotidien : des assistants IA autour d’une stack Laravel et Vue.",
      heroViewWork: "Voir mes projets",
      heroContact: "Me contacter",
      kickers: {
        projects: "Projets",
        approach: "Approche",
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
      railLabel: "Sections",
      languageToggle: "Langue",
    },
    approach: {
      title: "Ma façon de travailler",
      intro:
        "Je construis en trois étapes, en commençant par les données, pour que le reste de l’application repose sur une base solide.",
      steps: [
        {
          title: "Données & APIs sécurisées",
          body: "Je commence par organiser les données et définir qui peut voir ou modifier quoi.",
          points: [
            "Conception de base de données",
            "APIs REST",
            "Gestion des rôles",
          ],
        },
        {
          title: "Outils d’administration",
          body: "Ensuite le back-office que votre équipe utilise chaque jour pour gérer les dossiers, les demandes et le planning.",
          points: ["Tableaux de bord", "Workflows", "Notifications"],
        },
        {
          title: "Applications client",
          body: "Enfin l’application de vos clients. Elle utilise les mêmes données, donc tout reste à jour.",
          points: ["Interfaces Vue & Nuxt", "Paiements", "Mise en production"],
        },
      ],
    },
    stack: {
      title: "Mes outils",
      intro:
        "Les langages et frameworks que j’utilise sur les projets ci-dessus.",
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
    aiTools: siteStatic.aiTools,
    ui: m.ui,
    approach: m.approach,
    stack: m.stack,
  }
}

export function isLocale(value: string): value is Locale {
  return value === "en" || value === "fr"
}
