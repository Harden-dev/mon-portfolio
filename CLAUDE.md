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
- `lib/site-i18n.ts` — `en`/`fr` message bundles keyed by the same ids, plus `resolveSite(locale): ResolvedSite` merging static + localized into one flat object. `ResolvedSite.ui` and `.stack` hold every button label, aria-label, the hero statement lines and the stat strip; each project also carries a localized `domain` that the board and the domain board both read — **never hardcode user-facing strings in a component**; add the field to `ResolvedSite`/`MessageBundle` and fill it in both `en` and `fr`.
- `lib/site-data.ts` — the import barrel, plus `site = resolveSite("en")` for server-only use (`metadata` in `app/layout.tsx`).
- `components/locale-provider.tsx` — client context; persists to `localStorage` (`LOCALE_STORAGE_KEY`), syncs `documentElement.lang`. Components read copy via `useSiteCopy()`.

Because locale lives in client state rather than the URL, every component that renders copy is `"use client"`. `lib/not-found-i18n.ts` is a separate bundle for the 404.

### Design: the night board

Twelve systems of record that keep running for real businesses — utility connection requests, property subscriptions, AI CV screening, point-of-sale tracking, security rosters, worker matching, shareholdings, print orders. The page is a control board for them. The rules that keep it coherent:

- **Dark ground, one hot field.** `--volt` (#ff5a1f) is the only brand colour and it is used as a *field* — a whole board row floods with it — not as a trim. `--jade` means one thing, "running", and appears nowhere else — a `building` project gets a hollow ring in the type colour, never jade. Adding a third colour breaks the system.
- **No cards, no shadows, no radii.** `--radius` is 0 everywhere. Structure is hairline rules (`--line`) plus the measured `.sheet` column. `components/ui/*` is shadcn scaffolding the portfolio no longer uses.
- **Two families.** Space Grotesk (`--font-space-grotesk`, weights 500–700, mapped to `font-display`/`font-heading`) carries every display voice — the statement, section titles, board row names, stat figures, stack items, the domain board tiles. DM Sans (`--font-dm-sans`, mapped to `font-sans`) carries everything you read in sentences. Space Grotesk is wide, so display sizes run smaller than a condensed face would and use negative tracking; always give `font-heading` an explicit weight (`font-medium`/`font-semibold`). Italic is a scarce counter-voice, DM Sans only (Space Grotesk has no italic — never fake one): the statement lines from `ui.heroAccentFrom` on (`.statement-accent`), section notes, the contact sub-line and the "In progress" status. Nowhere else. No monospace anywhere; small figures use `.tnum`, but not the large hero stats, where Space Grotesk's tabular `1` reads as a glitch.
- `app/globals.css` holds the palette, the `@theme inline` mapping, and the semantic classes: `.sheet`, `.statement` / `.section-title` / `.prose-col` / `.tnum`, `.wipe-line`, `.entry` / `.entry-fill` / `.entry-*` (board rows and the invert-on-hot rules), `.flap*` (the domain board), `.link-hot` / `.link-quiet` / `.button-hot`.
- **Cascade gotcha.** Those semantic classes are unlayered, so they beat Tailwind utilities on the same element (`.button-hot` wins over `px-*` and `hidden`, `.prose-col` over `leading-*`). Don't rely on a utility to override a property the semantic class sets.
- `.link-hot` / `.link-quiet` extend their hit area with an invisible `::after` (about 44px tall) so thin text links stay tappable without changing their look. Buttons and the language toggle use `h-11` directly.
- **The board bleeds, the content does not.** `.entry` spans the full viewport so the volt field and the rules run edge to edge, while the row's inner content sits in a nested `.sheet` so years and titles stay on the same grid as the rest of the page. Keep that split when editing rows.
- **One column template.** `GRID` in `project-register.tsx` is shared by the column header, every row and the open panel: year | system | domain | status | +/− from `lg`, the domain dropping under the name between `sm` and `lg`, and a stacked layout on mobile. Place cells with `col-start-*`/`col-end-*`, not `col-span-*` — in Tailwind v4 `col-span-*` is the `grid-column` shorthand and resets a start set by another utility. Rows are grouped by year: only the first row of a year shows it (the others keep it `sr-only`) and carries `data-year-start` for the heavier rule. Keyboard focus (`:focus-visible` only, so a mouse click never pins the field) floods the row like hover; the focus ring is drawn inset in `--void`.
- Nav hrefs in the bundles are bare hashes (`#work`); header and footer render them as `/#work` so they still work from the 404.
- Light mode is not implemented; the page is dark only.

### Motion — GSAP, deliberately scarce

`lib/gsap.ts` is the single registration point (registers `ScrollTrigger`, exports `gsap`, `EASE`, `prefersReducedMotion`). It touches `window`, so import it only from `"use client"` components, and always tear timelines down with `gsap.context()` + `ctx.revert()`.

There are exactly four motions, and adding a fifth needs a reason:

1. **Hero load** (`hero-section.tsx`) — one timeline: kicker, statement lines wiping up, the rule drawing across, details settling, and the stat figures counting to their real value. The page's only unprompted motion.
2. **Board row flood + expand** (`project-register.tsx`) — the volt field wipes in from the left on hover/focus and the panel opens on click. Both answer a person's action.
3. **Domain board** (`domain-board.tsx`) — a split-flap departures board: one project domain on the tiles at a time, each tile flipping through letters before landing, staggered left to right, with a volt index block counting `01`…`13`. Tiles are sized in container units: one row as wide as the longest domain from `sm` up, and below `sm` a 12-column board where domains word-wrap onto a second line. Under reduced motion it renders a still, wrapped list of every domain instead.
4. **Stack set-in** (`stack-section.tsx`) — added on request: when the stack section scrolls into view (ScrollTrigger, `once`), the hairline rules draw left to right, the names rise out of `.wipe-line` masks and the icons fade in, staggered row by row. Plays once; under reduced motion everything is simply there. The only scroll-driven motion — do not spread it to other sections.

Per-section fade-ups and per-card hover lifts were removed on purpose. Every timeline checks `prefersReducedMotion()` and falls back to the end state.

### Tech icons

Two files that must stay in sync: `lib/tech-icons.ts` maps skill/stack labels → Simple Icons slugs; `components/portfolio/custom-icon.tsx` holds `ICON_BY_SLUG` with one `si*` import per slug and renders inline SVG. Add a slug to the map without adding the import and the icon silently renders nothing. `css3` is a hand-written special case. Always pass `brandColor={false}` so icons render in `currentColor` — brand colours must never compete with volt.

### Conventions

- `@/*` maps to the repo root.
- Prettier: no semicolons, double quotes, 80 cols, `prettier-plugin-tailwindcss` sorting (aware of `cn` and `cva`).
- Compose class names with `cn()` from `lib/utils.ts`.
- `next.config.mjs` restricts remote images to `harden-dev.vercel.app/assets/**` and `images.unsplash.com`; no `next/image` is currently rendered — the design carries no photography.
