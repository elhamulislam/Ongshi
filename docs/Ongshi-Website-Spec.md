# Ongshi Website — Full Spec

*The complete reference for the WordPress → React rebuild. Pairs with `CLAUDE.md` (the short operational brief AI tools read in the repo) and `design/ongshi-homepage-reference.html` (the canonical visual design). Last updated June 23, 2026.*

---

## 1. Goal & priorities

Rebuild ongshi.org — a humanitarian nonprofit working in Bangladesh and Austin, TX — as a modern React site whose content the volunteer team can manage without code.

Priorities, in order (these drive every layout and design decision):

1. Drive donations and sponsorships
2. Recruit volunteers, including youth
3. Show impact and build trust
4. Be easy for the team to keep updated

---

## 2. What the current site is missing — and how the rebuild fixes it

This is the analysis of ongshi.org that shaped the whole plan. Each problem maps to a fix.

- **Donate is buried, not the main action** → a persistent Donate/Sponsor button site-wide, a dedicated donate hub, and the three sponsorships featured on the homepage.
- **Navigation sprawls and mixes evergreen programs with one-off events** → a clean structure that separates Programs (Our Work) from time-bound Events.
- **"Get Involved" appears in two different menus** → consolidated into one.
- **Impact and Annual Reports are "coming soon" placeholders — no proof of impact** → an Impact stat content type, an impact snapshot on the homepage, impact numbers on every program, and a real Impact & transparency section on About.
- **The site goes stale and is awkward for volunteers to update** → Sanity plus a Stories/Updates feed the team posts to, which auto-feeds the homepage and program pages.
- **It's informational rather than story-led** → a story-led hero, photo galleries on programs and events, and the stories feed.
- **Sponsorship programs don't show what a gift actually does** → each program template carries impact stats and a "what your gift funds" block.
- **Every page is hand-built with no reuse** → a structured content model with one template per type, so pages stay consistent and quick to add.
- **Elementor/WordPress is slower and harder to optimize** → React/Next.js for speed and SEO, with per-page SEO fields.
- **The pillars are fuzzy (e.g. "Awareness" with no real programs under it)** → rationalized to Health care / Relief & rehab / Education, matching the actual work.
- **Most donors are on phones** → mobile-first layouts throughout.

---

## 3. Information architecture

Top-level navigation:

- **Home** — story-led hero, impact snapshot, featured programs, persistent Donate
- **Our Work** — evergreen programs grouped by pillar:
  - Health Care — Sponsor an Eye, Cervical Cancer Elimination
  - Relief & Rehab — Sponsor a Village, Flood Relief
  - Education — Sponsor a Child
- **Ongshi Youth** — youth-led projects (Coats of Compassion, Soles4Souls) and how students join
- **Get Involved** — volunteer, partner/sponsor, newsletter (consolidated)
- **About** — who we are, team/board, partners, and a real Impact & transparency section
- **Events** — upcoming, plus a past archive (camps, fundraisers, relief responses)
- **Donate / Sponsor** — sticky button everywhere → one-time, monthly, and the three sponsorships

Cross-cutting: a **Stories / Updates** feed the team posts to; entries surface on the home page and on the related program or campaign.

---

## 4. Route map (Next.js App Router)

- `/` — Home
- `/our-work` — programs grouped by pillar
- `/our-work/[slug]` — a Program (e.g. `/our-work/sponsor-a-child`)
- `/donate` — donate & sponsor hub
- `/ongshi-youth` — youth section
- `/get-involved` — volunteer / partner / newsletter
- `/about` — who we are, team, partners, impact
- `/events` — upcoming + past
- `/events/[slug]` — an event or campaign
- `/stories` — the updates feed
- `/stories/[slug]` — a story
- `/studio` — the embedded Sanity Studio

---

## 5. Page blueprints

**Homepage** (the conversion engine, top to bottom):
1. Header — logo, nav, persistent Donate button
2. Hero — a rotating carousel of real field photos with a synced, crossfading impact-stat card (see the reference HTML), one-line mission, primary CTA (Sponsor / Donate) + secondary ("See our work")
3. Impact snapshot — 3–4 Impact stat cards (surgeries funded, projects, children sponsored)
4. Featured programs — the three sponsorships (Eye / Child / Village) as cards, each with a Sponsor button
5. Sponsorship hook — a focused "sponsor a child for $30/month" band for the recurring ask
6. Latest stories — 2–3 recent updates
7. Get involved — a volunteer + youth strip (priority #2)
8. Partners — Rotary and others
9. Newsletter — email capture
10. Footer — contact, socials, 501(c)3 line, donate

**Program template** (one layout, every program): hero with Sponsor button → the need → what we do → impact (stats + photos) → sponsorship block (suggested gift + what it funds) → related stories → gallery → closing Donate CTA.

**Donate hub** (`/donate`): headline and why give → general Zeffy donate action (`primaryUrl`) → four cause sponsorship cards (eye, cervical-cancer, village, child tier URLs) → a short "where your money goes" reassurance.

The rest are lighter:
- **Our Work index** — intro plus the programs under their three pillars, each a card.
- **Ongshi Youth** — what youth do, youth-led campaigns, youth stories, and a "how students join" CTA.
- **Get Involved** — volunteer options, partner/sponsor, youth link, newsletter.
- **About** — mission, the board, partners, and a real impact & transparency section.
- **Events** — upcoming list and past archive, each linking to an event page (title, date, result, photos, CTA).
- **Stories** — the feed and individual story pages (cover, body, related program, share).

Every page carries the global header (with Donate) and footer, and any Donate or Sponsor button anywhere points at the configured platform.

---

## 6. Content model & schema

Shared pieces: an `seo` object (`metaTitle`, `metaDescription`, `ogImage`) reused on every page-level type; every `image` uses hotspot cropping and a required `alt`; rich text is Portable Text (`array` of `block`) so editors get formatting, links, and inline images.

### program — evergreen sponsorable causes
- `title` string · required
- `slug` slug (from title) · required, unique
- `pillar` string radio: Health care / Relief & rehab / Education · required
- `summary` text · required · max 160
- `heroImage` image (+alt) · required
- `theNeed` Portable Text
- `whatWeDo` Portable Text
- `sponsorable` boolean · default true
- `suggestedGift` string ("$30 / month") · shown when sponsorable
- `whatGiftFunds` text · shown when sponsorable
- `donateUrlOverride` url · optional (blank = use global donation config)
- `impactStats` array of reference → `impactStat`
- `gallery` array of image (+alt)
- `relatedStories` array of reference → `story` · optional (frontend also auto-pulls stories linked to this program)
- `status` string: Active / Paused · default Active
- `featuredOnHome` boolean · default false
- `region` string: Bangladesh / Texas / Both · optional
- `order` number · optional
- `seo` object

### campaign — time-bound work, incl. youth drives
- `title` string · required
- `slug` slug · required
- `category` string: Eye/medical camp / Fundraiser / Relief response / Youth project / Community event · required
- `youthLed` boolean · default false (drives the Ongshi Youth section)
- `startDate` date · required · `endDate` date · optional
- `status` string: Upcoming / Ongoing / Completed · required
- `location` string
- `summary` text · required · max 200
- `heroImage` image (+alt)
- `details` Portable Text
- `outcome` text (transparency receipt, e.g. "collected 500 pairs of shoes")
- `ctaType` string: Register / Donate / Volunteer / None · `ctaUrl` url · optional
- `gallery` array of image (+alt)
- `supportsProgram` reference → `program` · optional
- `partners` array of reference → `partner` · optional
- `seo` object

### story — short updates
- `title` string · required · `slug` slug · required
- `publishedAt` datetime · required · default now
- `coverImage` image (+alt)
- `body` Portable Text · required
- `tags` array of string, predefined: youth / health / relief / education / Bangladesh / Texas
- `about` reference → `program` or `campaign` · optional
- `featuredOnHome` boolean · default false
- `seo` object

### impactStat — one reusable number
- `value` string · required ("156", "15+", "$30") — string so "+" and "$" render
- `label` string · required ("cataract surgeries in 2025")
- `relatedProgram` reference → `program` · optional
- `showOnHome` boolean · default false · `order` number · optional

### partner
- `name` string · required · `logo` image (+alt) · required
- `website` url · optional · `order` number · optional

### teamMember — optional, for About
- `name` required · `role` string · `photo` image (+alt) · optional · `bio` text · optional · `order` number

### Globals (singletons — one document each, locked from creation/deletion)

**siteSettings**
- `orgName`, `tagline`, `logo` (+alt)
- `contactEmail` string (email validation) · `contactPhone` · `address` text
- `social` object: facebook / instagram / x / youtube / linkedin (urls)
- `newsletter` object: `provider`, `signupUrl` or `embedCode`
- `nonprofitLine` string (the 501(c)3 footer line)
- `donation` object — Zeffy link config (editable in Studio, never hardcoded in components):
  - `platform` string: Zeffy · default Zeffy (read-only)
  - `primaryUrl` url (general / base Zeffy campaign)
  - `sponsorshipTiers` array of object: `key` (eye / cervical-cancer / village / child), `label`, `amount`, `whatItFunds` (text), `url`

**homePage**
- `heroSlides` array of object: `image` (+alt), `statValue`, `statLabel` (the rotating hero carousel)
- `heroHeadline`, `heroSubtext`
- `heroPrimaryCta` { label, url } (defaults to donation config) · `heroSecondaryCta` { label, url }
- `featuredPrograms` array of reference → `program` (the three sponsorships)
- `sponsorshipHook` object { headline, text, ctaLabel } (the "$30/month" band)
- `featuredStats` array of reference → `impactStat` · optional (else auto by `showOnHome`)
- `featuredStories` array of reference → `story` · optional (else auto by `featuredOnHome`)
- `seo` object

**page** — for About and Get Involved
- `title` required · `slug` required · `heroImage` (+alt) optional
- `body` Portable Text · required · `cta` object { label, url } · optional · `seo` object
- The About route also pulls Team members, Partners, and Impact stats from their collections into dedicated sections, so those are managed in one place rather than re-typed.

**Donation config:** the header Donate button links to `/donate`. The donate hub uses `primaryUrl` for the general campaign and tier URLs for cause cards. Program Sponsor buttons link directly to the matching cause URL (or `program.donateUrlOverride`). All URLs live in `siteSettings.donation`.

---

## 7. Tech stack & CMS

- **Framework:** Next.js (App Router) — tightest Sanity integration (next-sanity, embeddable Studio, Presentation visual editing + live preview), strong SEO and speed.
- **Language:** TypeScript. **Styling:** Tailwind CSS.
- **CMS:** Sanity, on the nonprofit plan (free, mirrors the Growth plan, 25 seats). Studio embedded at `/studio` — one repo, one deploy.
- **Toolkit:** `next-sanity` (client, `defineLive`, `VisualEditing`, `NextStudio`), `@sanity/image-url`, `@portabletext/react`. Client `apiVersion` 2026-02-01.
- **Hosting (at launch):** Vercel for the smoothest Next.js deploy, or Netlify to stay strictly free. Decide at deploy.
- **Version control:** GitHub from the first commit.

Why Sanity: structured content maps one-to-one onto the model above; free for a nonprofit; the Studio is React and customizable; real-time editing and live preview. Tradeoff: it's developer-first, so editing is structured fields rather than a visual page builder — fine here since easy editing ranked last, and mitigated with clear field labels, live preview, and restricted roles.

---

## 8. Design direction

The look is locked to the real Ongshi brand and shown in `design/ongshi-homepage-reference.html`. That file is the canonical reference — build the real site to match it, then extend the same system to the other pages.

**Subject & vibe.** Ongshi's world is humanitarian work across Bangladesh and Austin — restoring sight, sponsoring children, flood relief, youth volunteers. The logo's mark is a ring of linked figures, and the name comes from the Bengali for *share / part* (অংশ): the donor takes part. The real tagline is *partner in hope*. Tone is warm, hopeful, and dignified — never somber or guilt-driven. Photography-forward and human.

**Palette (from the logo):**
- Leaf green `#2E9E44` — primary brand color
- Deep green `#1C7233`, forest `#143F22` — dark sections, hovers, depth
- Green tint `#ECF6ED` — soft section backgrounds
- Emblem red `#DA2F23` (hover `#B42417`) — the one accent that means "act": donate / primary CTA only
- Quiet blue `#2A39C0` — minor accent (youth, focus rings)
- Charcoal `#2A2926` — body text; warm paper `#FAF8F4` — background; warm gray `#6E6A63` — secondary text; hairline `#E8E2D7`

The green-and-charcoal core with red reserved strictly for the donate action keeps the palette ownable and avoids the looks AI design defaults to.

**Type:** Fraunces (warm serif) for headlines, used with restraint; Inter for body and UI. Two typefaces, a clear scale with intentional weights.

**Layout.** Generous whitespace; max content width ~1180px; one consistent spacing scale; radius 14–20px; soft shadows used sparingly; mobile-first; strong type hierarchy; red for primary actions, green for brand/secondary.

**Signature.** The hero is a rotating carousel of real field photos with a synced, crossfading impact-stat card — movement that shows the breadth of the work without feeling busy. "Partner in hope / be part of it" runs throughout, and the ring-of-people motif echoes lightly (program accent card, the monthly-sponsor band). Impact is shown through real numbers and real faces, never a generic big-number-with-a-gradient.

**Photography.** Real, dignified field photos — faces, hands, the work — used large. This is the single biggest visual lever; never use stock. Starter images are in `public/images/`.

**Copy.** Warm, plain, active, specific. Name actions by what they do; keep a button's label consistent through its flow. Words are design material — they earn their place by making the page easier to use.

**Hard don'ts:** no generic gradient hero; no default Tailwind blue/purple; no more than two typefaces; no clip-art or emoji icons in production (use one set, e.g. Lucide); don't center every section; keep motion subtle; no lorem ipsum or stock photos.

**Quality floor (always):** responsive to mobile; visible keyboard focus; `prefers-reduced-motion` respected (the hero must not autoplay under it); semantic HTML; accessible contrast (check the red CTA and body text).

---

## 9. Build order

1. Apply for the Sanity nonprofit plan; create the Next.js + embedded-Studio project (done/in progress).
2. Model the Sanity schemas (section 6).
3. Build the global shell (header with Donate, footer), then the homepage to match `design/ongshi-homepage-reference.html`, then the program template, then the donate hub, then the lighter pages.
4. Wire content: real copy, real photos (`public/images/`), the donation config, impact stats.
5. Set up GitHub + hosting; inventory the current site's URLs and add redirects so search ranking carries over.
6. Launch and train the team on Sanity.

---

## Notes / to confirm before launch
- Impact numbers (156 surgeries, 15+ projects, $30/month) and the hero stat figures are pulled from the current site or are placeholders — confirm and update.
- Add a child/classroom photo (the "Sponsor a Child" card is a designed placeholder until then) and any youth photos.
- Replace placeholder partner logos, contact email, and social links with the real ones.
- Rewrite the first-pass homepage copy in the team's own voice.
