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

Production runs on a VPS (Node + PM2 + Nginx + Certbot), app on 127.0.0.1:3001 by default (`PORT` overrides it in `ecosystem.config.cjs`); see `DEPLOY.md`, `ecosystem.config.cjs`, `deploy/nginx.conf.example` and `scripts/deploy.sh`.

## Architecture

Next.js 16 App Router + React 19 + Tailwind v4 (CSS-first, no tailwind.config) single-page portfolio. Routes are thin: `app/page.tsx` and `app/not-found.tsx` each render one client component from `components/portfolio/`.

### Content and i18n — the central pattern

All site copy is data, not JSX literals. The pipeline is:

- `lib/site-static.ts` — locale-independent facts (name, project ids, `year`, `live`, stacks, socials, contact email). `PROJECT_IDS` is the canonical project list, ordered newest first; `ProjectId` derives from it.
- `lib/site-i18n.ts` — `en`/`fr` message bundles keyed by the same ids, plus `resolveSite(locale): ResolvedSite` merging static + localized into one flat object. `ResolvedSite.ui` and `.stack` hold every button label, aria-label, the hero title (`heroTitle.before/highlight/after`), the stat strip and the about facts; each project also carries a localized `domain` shown on its card — **never hardcode user-facing strings in a component**; write copy in plain, first-person sentences, with no em/en dashes or " - " used as punctuation (use a comma, colon or a new sentence); add the field to `ResolvedSite`/`MessageBundle` and fill it in both `en` and `fr`.
- `lib/site-data.ts` — the import barrel, plus `site = resolveSite("en")` for server-only use (`metadata` in `app/layout.tsx`).
- `components/locale-provider.tsx` — client context; persists to `localStorage` (`LOCALE_STORAGE_KEY`), syncs `documentElement.lang`. Components read copy via `useSiteCopy()`.

Because locale lives in client state rather than the URL, every component that renders copy is `"use client"`. `lib/not-found-i18n.ts` is a separate bundle for the 404.

### Design: light editorial

A light, professional page set like an editorial layout: light grey ground (`paper` #f4f4f5), white cards and bands (`panel`), zinc ink, hairline borders, left-aligned headings. One dark band (`bg-ink`) breaks the rhythm: the Approach section (`SectionHead dark`). Keep it to one. **No decorative effects that read as generated-UI**: no background grids or dot patterns, no glows, no gradient text, no blur-in, no pointer spotlights, no pills/badges above the hero, no logo marquees. Keep it that way. The one deliberate exception is the **hero orbit** (`hero-orbit.tsx`), asked for to catch recruiters' eyes: desktop only (`lg+`), behind the text on the right, AI tools (`siteStatic.aiTools`) on the inner ring and the stack on the middle ring around the monogram, with a caption card (`ui.orbitCaption`). Edit `aiTools` to match the tools actually used; each slug needs an entry in `ICON_BY_SLUG` (`custom-icon.tsx`): an `si*` import, or a hand-added mark like `OPENAI_ICON` (ChatGPT; Simple Icons dropped OpenAI).

- **Palette** in `:root` of `app/globals.css`, mapped via `@theme inline`: `paper`, `panel`, `ink` / `soft` / `faint`, `line`, `brand` (#ea580c) + `brand-soft`, `live` (green). Primary buttons are `bg-ink` pills, secondary are white pills with a `zinc-300` border.
- **One accent.** `brand` is used for the hero underline, section eyebrows and the `01`, `02`… numbers — never large filled areas. `live` means "online" and nothing else.
- **Numbered, editorial structure.** Hero: plain "name, role" line, large left-aligned title with the highlighted phrase underlined in brand, note + actions, stats on a rule. Projects are numbered cards (`project-grid.tsx`: number, domain · year meta line, title, description, stack chips, status), first 6 shown then "Show all". The approach section (`approach-section.tsx`) is three numbered columns separated by rules.
- **One family.** Geist (`--font-geist`). Hierarchy from size and weight; figures use `tabular-nums`.
- Section headings go through `SectionHead` (`components/portfolio/motion.tsx`).
- Nav hrefs in the bundles are bare hashes (`#work`); header and footer render them as `/#work` so they still work from the 404.
- Only a light theme is implemented.

### Motion: Motion (`motion/react`), light and short

The library is Motion (the `motion` package, formerly framer-motion); import from `motion/react`. `components/portfolio/motion.tsx` exports `EASE` and `Reveal` (fade + 14px rise, once, on scroll into view). Every motion respects reduced motion and falls back to the end state. The motions are:

1. **Hero entrance**: pure CSS (`.hero-in` / `.hero-rise` in `globals.css`), so it plays on first paint without waiting for hydration. The `<h1>` only slides and is never transparent: it is the LCP element and must paint immediately. Do not move it back to a JS animation that starts at `opacity: 0`.
2. **`Reveal`** on section heads, cards, about, stack and contact. Its server HTML starts at `opacity:0`; a `<noscript>` style in `app/layout.tsx` un-hides it when JavaScript is off.
3. **Hover**: colour/border transitions and the arrow nudge only. Cards do **not** lift on hover, because they are not clickable; only add a lift if the whole card becomes a link.
4. **Show all projects**: extra cards fade in. Collapsing removes them at once (no exit animation) and the grid scrolls so the button stays under the pointer.

5. **Hero orbit**: rings and chips scale in with Motion on load, then the rings turn slowly through CSS (`.orbit-spin`, 55–140s per turn, chips counter-rotate to stay upright), and the whole piece drifts up to ~18px towards the pointer (spring). This is the only looping motion; under reduced motion it is still.

Nothing else loops. Keep durations ≤ 0.6s and distances small.

### Tech icons

Two files that must stay in sync: `lib/tech-icons.ts` maps skill/stack labels → Simple Icons slugs; `components/portfolio/custom-icon.tsx` holds `ICON_BY_SLUG` with one `si*` import per slug and renders inline SVG. Add a slug to the map without adding the import and the icon silently renders nothing. `css3` is a hand-written special case. Always pass `brandColor={false}` so icons render in `currentColor` — brand colours must never compete with the accent. Project cards only show an icon when the token is a real technology in `SKILL_ICONS` (`getSkillIcons`); the `PROJECT_STACK_SLUGS` aliases (Payments→Stripe etc.) are not used, because they would claim tools the project did not use.

### Conventions

- `@/*` maps to the repo root.
- Prettier: no semicolons, double quotes, 80 cols, `prettier-plugin-tailwindcss` sorting (aware of `cn` and `cva`).
- Compose class names with `cn()` from `lib/utils.ts`.
- `next.config.mjs` restricts remote images to `harden-dev.vercel.app/assets/**` and `images.unsplash.com`; no `next/image` is currently rendered.
