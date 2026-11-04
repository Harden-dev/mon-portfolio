export {
  CONTACT_EMAIL,
  PROJECT_IDS,
  siteStatic,
  siteContactStatic,
  type ProjectId,
  type SiteProjectStatic,
} from "./site-static"
export {
  resolveSite,
  isLocale,
  LOCALES,
  LOCALE_STORAGE_KEY,
  type Locale,
  type ResolvedSite,
  type ResolvedProject,
  type JourneyEntry,
  type StatEntry,
} from "./site-i18n"
import { resolveSite } from "./site-i18n"

/** English snapshot for `metadata`, OG, and any server-only usage */
export const site = resolveSite("en")
