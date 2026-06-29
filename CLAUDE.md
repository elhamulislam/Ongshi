# CLAUDE.md — Ongshi Website

Context and working rules for AI assistants (Cursor, Claude Code) working in this repo. Read this before making changes. The full reference is `docs/Ongshi-Website-Spec.md`. The canonical visual design is `design/ongshi-homepage-reference.html` — open it and match it.

## What this is
A rebuild of ongshi.org — a humanitarian nonprofit working in Bangladesh and Austin, TX — from WordPress/Elementor to a modern React site, with content managed in Sanity by non-technical volunteers.

Priorities, in order (they drive every design and layout call):
1. Drive donations and sponsorships
2. Recruit volunteers, including youth
3. Show impact and build trust
4. Be easy for the team to keep updated

## Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS for styling
- Sanity for content; Studio embedded at `/studio` (single repo, single deploy)
- `next-sanity` (client, `defineLive`, `VisualEditing`, `NextStudio`), `@sanity/image-url`, `@portabletext/react`
- Client `apiVersion: 2026-02-01`. Data via GROQ, fetched with `sanityFetch` / `defineLive`. Render `<SanityLive />` in the root layout; render `<VisualEditing />` when draft mode is on.
- Images: `next/image` + `@sanity/image-url`; every image has alt text and hotspot cropping. Starter photos live in `public/images/`.

## Conventions
- Sanity schemas in `src/sanity/schemaTypes/`, one file per type, matching the content model in the spec.
- GROQ queries in `src/sanity/queries/` using `defineQuery`; keep them typed.
- Components in `src/components/`; route segments in `src/app/`.
- Env: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_READ_TOKEN`. Never commit `.env.local`.

## Content model (summary — full field spec in the spec doc)
Collections: `program`, `campaign` (time-bound, incl. youth-led), `story`, `impactStat`, `partner`, `teamMember` (optional).
Singletons: `siteSettings`, `homePage`, `page` (About, Get Involved).

Donation is a config object on `siteSettings` (`platform` = Givebutter by default, swappable to Zeffy). **Never hardcode donation links.** Always read from `siteSettings.donation` (and `program.donateUrlOverride` when set). This is what keeps the platform swap a one-field change.

## Routes
`/` · `/our-work` · `/our-work/[slug]` · `/donate` · `/ongshi-youth` · `/get-involved` · `/about` · `/events` · `/events/[slug]` · `/stories` · `/stories/[slug]` · `/studio`

## Page blueprints (summary — full in the spec doc)
- **Home:** header (+Donate) · hero (rotating photo carousel with a synced impact-stat card) · impact snapshot · featured sponsorships (Eye/Child/Village) · "$30/month" sponsorship hook · latest stories · get-involved strip · partners · newsletter · footer. The hero matches `design/ongshi-homepage-reference.html`.
- **Program template** (one layout for every program): hero (+Sponsor) · the need · what we do · impact (stats + photos) · sponsorship block (what your gift funds) · related stories · gallery · closing Donate CTA.
- **Donate hub:** why give · the donation form (Givebutter/Zeffy embed from `siteSettings`) with one-time/monthly toggle · the three sponsorship tiers · "where your money goes."

## Design system — build to this, do not improvise
The look is defined. **Match `design/ongshi-homepage-reference.html` on every page.** It is built from the real brand. Left to defaults, AI UI clusters into a few generic looks — avoid all of them.

Palette (from the Ongshi logo):
- Leaf green `#2E9E44` — primary brand color
- Deep green `#1C7233`, forest `#143F22` — dark sections, hovers, depth
- Green tint `#ECF6ED` — soft section backgrounds
- Emblem red `#DA2F23` (hover `#B42417`) — the ONE accent that means "act": donate / primary CTA only
- Quiet blue `#2A39C0` — minor accent (youth, focus rings)
- Charcoal `#2A2926` — body text
- Warm paper `#FAF8F4` — page background; warm gray `#6E6A63` — secondary text; hairline `#E8E2D7`

Type:
- Display / headings: **Fraunces** (warm serif, used with restraint)
- Body / UI: **Inter**
- Two typefaces total. Clear scale, intentional weights.

Layout & components:
- Generous whitespace; max content width ~1180px; one consistent spacing scale; radius 14–20px; soft shadows used sparingly.
- Photography-forward: real Ongshi field photos, often large — faces, hands, the work.
- Mobile-first. Strong type hierarchy. Red reserved for primary actions; green for brand/secondary.

Hard don'ts:
- No generic gradient hero; no default Tailwind blue/purple.
- No more than two typefaces; no clip-art or emoji icons in production (use one set, e.g. Lucide).
- Don't center every section — vary the rhythm.
- Keep motion subtle (the hero crossfade is about as much as the site needs); heavy animation reads as AI-generated.
- No lorem ipsum and no stock photos — real content only.

Quality floor (always): responsive to mobile; visible keyboard focus; `prefers-reduced-motion` respected (the hero must not autoplay under it); semantic HTML; accessible contrast (check the red CTA and body text).

## Copy voice
Warm, plain, active, specific, dignified — never guilt-driven. Name actions by what they do ("Sponsor a child," "Donate"), keep a button's label consistent through its flow. The throughline is "partner in hope" / "be part of it" — the name Ongshi comes from the Bengali for "share / part."

## How to work
- Build one page or section at a time, show a screenshot, and expect specific design feedback before moving on.
- Commit small, meaningful changes — that's the team's review checkpoint.
- When unsure about content shape, follow the spec; when unsure about look, match the homepage reference.
