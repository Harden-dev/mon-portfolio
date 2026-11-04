# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # next dev --webpack (Turbopack is explicitly disabled)
pnpm build      # next build --webpack
pnpm start      # production server
pnpm lint       # eslint (flat config, eslint-config-next core-web-vitals + typescript)
pnpm typecheck  # tsc --noEmit
pnpm format     # prettier --write on ts/tsx
```

Use pnpm — `.npmrc` sets `public-hoist-pattern[]=*@radix-ui/*` for shadcn under pnpm's strict layout, and `pnpm-workspace.yaml` pins the `allowBuilds` decisions (sharp and unrs-resolver must build) that pnpm 10+ otherwise blocks every script on. `pnpm-lock.yaml` is the source of truth; a stray `package-lock.json` is not.

There is no test suite.

## Architecture

Next.js 16 App Router + React 19 + Tailwind v4 (CSS-first, no tailwind.config) single-page portfolio. Routes are thin: `app/page.tsx` and `app/not-found.tsx` each render one client component from `components/portfolio/`.

### Content and i18n — the central pattern

All site copy is data, not JSX literals. The pipeline is:

- `lib/site-static.ts` — locale-independent facts (name, project ids, `year`, `live`, stacks, socials, contact email). `PROJECT_IDS` is the canonical project list, ordered newest first; `ProjectId` derives from it.
- `lib/site-i18n.ts` — `en`/`fr` message bundles keyed by the same ids, plus `resolveSite(locale): ResolvedSite` merging static + localized into one flat object. `ResolvedSite.ui` and `.stack` hold every button label, aria-label, the hero title (`heroTitle.before/highlight/after`), the stat strip and the about facts; each project also carries a localized `domain` shown on its card — **never hardcode user-facing strings in a component**; add the field to `ResolvedSite`/`MessageBundle` and fill it in both `en` and `fr`.
- `lib/site-data.ts` — the import barrel, plus `site = resolveSite("en")` for server-only use (`metadata` in `app/layout.tsx`).
- `components/locale-provider.tsx` — client context; persists to `localStorage` (`LOCALE_STORAGE_KEY`), syncs `documentElement.lang`. Components read copy via `useSiteCopy()`.

Because locale lives in client state rather than the URL, every component that renders copy is `"use client"`. `lib/not-found-i18n.ts` is a separate bundle for the 404.

### Design: light studio

A light, quiet, professional page in the style of modern component galleries (21st.dev / shadcn): near-white ground, zinc ink, hairline borders, rounded cards, generous whitespace. The rules that keep it coherent:

- **Palette** lives in `:root` in `app/globals.css` and is mapped through `@theme inline`: `paper` (page ground), `panel` (cards), `ink` / `soft` / `faint` (text levels), `line` (borders), `brand` (#ea580c) + `brand-soft`, and `live` (green). Primary buttons are `bg-ink` pills, secondary are bordered white pills.
- **One accent.** `brand` marks section eyebrows, the highlighted hero phrase, project domains and the "In progress" pill — never large filled areas. `live` (green) means "online" and nothing else. Do not add a third colour.
- **Cards, not rows.** Projects are a 1/2/3-column grid of rounded cards (`project-grid.tsx`): domain + year, title, description, stack chips, status pill. The first 6 show; "Show all" reveals the rest. A CSS spotlight (`.spotlight`, fed `--x`/`--y` on mouse move) and a 4px lift answer hover.
- **One family.** Geist (`--font-geist`, mapped to `font-sans`/`font-heading`/`font-display`). Hierarchy comes from size and weight (`font-semibold tracking-tight` for headings). No italics, no monospace; figures use `tabular-nums`.
- `app/globals.css` semantic classes: `.sheet` (72rem column), `.hero-grid` (faint masked grid behind hero/contact/404), `.brand-glow`, `.spotlight`, `.marquee-mask`. They are unlayered, so they beat Tailwind utilities on the same element.
- Section headings go through `SectionHead` (`components/portfolio/motion.tsx`): brand eyebrow + title + optional note.
- Nav hrefs in the bundles are bare hashes (`#work`); header and footer render them as `/#work` so they still work from the 404.
- Only a light theme is implemented.

### Motion — framer-motion, light and short

`components/portfolio/motion.tsx` exports `EASE` and `Reveal` (fade + 16px rise + blur, once, when scrolled into view). Every motion uses `useReducedMotion()` and falls back to the end state. The motions are:

1. **Hero load** (`hero-section.tsx`) — badge, title, note, buttons and stat strip settle in with a small stagger.
2. **Reveal on scroll** — section heads, project cards, about, stack panels and contact card, via `Reveal`.
3. **Tech marquee** (`tech-marquee.tsx`) — a slow CSS `animate-marquee` strip of the stack; pauses on hover, stops under reduced motion. The only looping motion.
4. **Hover feedback** — card lift + spotlight, chip tint, arrow nudge. CSS transitions only.
5. **Show all projects** — extra cards animate in/out with `AnimatePresence`.

Keep durations ≤ 0.7s and distances small; no parallax, no scroll-jacking.

### Tech icons

Two files that must stay in sync: `lib/tech-icons.ts` maps skill/stack labels → Simple Icons slugs; `components/portfolio/custom-icon.tsx` holds `ICON_BY_SLUG` with one `si*` import per slug and renders inline SVG. Add a slug to the map without adding the import and the icon silently renders nothing. `css3` is a hand-written special case. Always pass `brandColor={false}` so icons render in `currentColor` — brand colours must never compete with the accent. Project cards only show an icon when the token is a real technology in `SKILL_ICONS` (`getSkillIcons`); the `PROJECT_STACK_SLUGS` aliases (Payments→Stripe etc.) are not used, because they would claim tools the project did not use.

### Conventions

- `@/*` maps to the repo root.
- Prettier: no semicolons, double quotes, 80 cols, `prettier-plugin-tailwindcss` sorting (aware of `cn` and `cva`).
- Compose class names with `cn()` from `lib/utils.ts`.
- `next.config.mjs` restricts remote images to `harden-dev.vercel.app/assets/**` and `images.unsplash.com`; no `next/image` is currently rendered.
