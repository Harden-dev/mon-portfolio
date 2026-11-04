import type { Locale } from "@/lib/site-i18n"

export type NotFoundCopy = {
  kicker: string
  title: string
  description: string
  ctaHome: string
  ctaWork: string
}

const en: NotFoundCopy = {
  kicker: "Not found",
  title: "This page doesn’t exist",
  description:
    "The URL may be wrong or the page was removed. Head back to the portfolio or jump to projects.",
  ctaHome: "Back home",
  ctaWork: "View projects",
}

const fr: NotFoundCopy = {
  kicker: "Introuvable",
  title: "Cette page n’existe pas",
  description:
    "L’URL est peut-être incorrecte ou la page a été retirée. Revenez au portfolio ou ouvrez les projets.",
  ctaHome: "Accueil",
  ctaWork: "Voir les projets",
}

export function getNotFoundCopy(locale: Locale): NotFoundCopy {
  return locale === "fr" ? fr : en
}
