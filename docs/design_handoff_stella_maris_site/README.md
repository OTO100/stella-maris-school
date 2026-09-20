# Handoff: Stella Maris Catholic Primary School — website

## Overview

A complete redesign of the Stella Maris website: nine pages built to the school's proposed sitemap (Stella Website Site Map, 08.06.26), using real school content supplied by SLT.

The target codebase already exists: a Next.js App Router app with Sanity embedded at `/studio` (`stella-maris-school/`). This handoff describes what to build there.

## About the design files

The `.dc.html` files in this bundle are **design references**, not production code. They open in a browser and show exact layout, colour, type and interaction. Do **not** port them.

Recreate them as React components in the existing Next.js app, using its established patterns (`src/components/`, `src/sanity/`, Tailwind/`globals.css`).

## Fidelity

**High-fidelity.** Colours, typography, spacing, hover states and copy are final. Match them closely — the client has approved this exact look.

---

## Design tokens

### Colour

| Token | Hex | Use |
|---|---|---|
| Burgundy | `#6C142C` | Primary. Hero grounds, buttons, links, footer |
| Burgundy dark | `#4E0E20` | Utility bar, CTA bands |
| Burgundy hover | `#8A2038` | Link and button hover |
| Gold | `#AC973F` | Accent rules, eyebrow labels, primary CTA fill |
| Gold light | `#DFCB7E` | Eyebrow text and links on dark grounds |
| Gold muted | `#C9B25E` | Gold button hover |
| Olive | `#8A7A46` | Small caps beneath value names |
| Canvas | `#FAF8F5` | Page background, alternating sections |
| Card | `#FFFCF7` | Raised sections and cards |
| Warm grey | `#F0EBE3` | Third section tone, avatar circles |
| Border | `#E7E0D4` | All hairlines and card borders |
| Border dashed | `#C9BCA4` | "To come / to upload" placeholder panels |
| Ink | `#1C1917` | Headings |
| Body | `#44403C` | Long-form body copy |
| Muted | `#57534E` | Secondary copy |
| Faint | `#78716C` | Captions, meta |
| Rose tint | `#F5EDEE` | Year-level pills on Staff |

Contrast: all body text meets 4.5:1. Never use alpha-muted ink on the accent grounds.

### Typography

- **Headings:** Gabarito, weight 600, `letter-spacing: -.025em`
- **Body and UI:** Work Sans, 400/500/600, italic 400 for quotes
- Gabarito has **no italic** — italic quotes use Work Sans

```html
<link href="https://fonts.googleapis.com/css2?family=Gabarito:wght@500;600;700&family=Work+Sans:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap" rel="stylesheet">
```

Scale (px):

| Role | Size | Line height |
|---|---|---|
| Home h1 | 70 (44 under 620px) | 1.03 |
| Inner page h1 | 56 (42 under 620px) | 1.06 |
| Section h2 | 36–44 | 1.08–1.15 |
| Card h3 | 20–29 | 1.16–1.25 |
| Lead paragraph | 19–19.5 | 1.68 |
| Body | 17–17.5 | 1.78 |
| Card body | 15.5–16 | 1.68–1.72 |
| Eyebrow | 12, weight 600, `letter-spacing:.16em`, uppercase | — |
| Meta / caption | 13.5–14 | — |

Body copy is capped at `max-width: 62–64ch`.

### Spacing, radius, shadow

- Page container `max-width: 1152px`, `padding: 0 24px`
- Section padding `72–80px` vertical; hero `64–96px`
- Radius: cards `16–20px`, small cards `12–14px`, pills/buttons `999px`
- Card rest shadow `0 2px 4px -2px rgba(108,20,44,.06)`
- Card hover shadow `0 22px 40px -26px rgba(108,20,44,.55)` with `transform: translateY(-4px)`
- Transitions `.18–.2s ease`

### The star

Eight-point star traced from the logo mark (cardinal radius 50, diagonal 41, inner notch 29.5, in a `0 0 100 100` box):

```
M50 0 L61.3 22.7 L79 21 L77.3 38.7 L100 50 L77.3 61.3 L79 79 L61.3 77.3 L50 100 L38.7 77.3 L21 79 L22.7 61.3 L0 50 L22.7 38.7 L21 21 L38.7 22.7Z
```

Used as a gold watermark, `fill:#DFCB7E`, never stroked:
- Photo heroes: `opacity .13` (320px, top-right, offset outside the frame) plus `opacity .10` (140px, bottom)
- Flat burgundy heroes: `opacity .07` / `.06`
- Dark CTA bands: `opacity .12`, bottom-left

Build it once as `<StarMark />` and pass size/position/opacity.

### Recurring devices

1. **Gold gradient rule** closing every hero: 6px, `linear-gradient(90deg,#AC973F,#DFCB7E 45%,#AC973F)`
2. **Eyebrow dash** — a 34×2px `#AC973F` bar before every eyebrow label, `display:flex; gap:12px`
3. **Dashed placeholder panel** — `1px dashed #C9BCA4`, gold "TO COME / TO UPLOAD / TO CONFIRM" eyebrow. Every unfinished area uses this so nothing reads as final. **Keep this pattern** until SLT supplies content.

---

## Pages

Nine pages; seven in the menu. Everything else in the sitemap is an anchored section, so it can be split into its own route later without breaking links.

| Page | Route | Design file |
|---|---|---|
| Home | `/` | `Stella Maris Home.dc.html` |
| Our School | `/about` | `Our School.dc.html` |
| Our learning | `/about/our-learning` | `Our Learning.dc.html` |
| Our Community | `/community` | `Our Community.dc.html` |
| Staff | `/community/staff` | `Staff.dc.html` |
| Enrolment information | `/enrolment` | `Enrolment.dc.html` |
| Absences | `/absences` | `Absences.dc.html` |
| Contact us | `/contact` | `Contact.dc.html` |
| Hibiscus Coast Parish | `/parish` | `Parish.dc.html` |

Anchors that navigation and CMS links depend on:

`/about#principal` · `#character` · `#values` · `#parent-information` · `#fees` · `#apps`
`/community#staff` · `#ptfa` · `#board` · `#reports`
`/about/our-learning#assessment` · `#support`
`/absences#plan` · `/enrolment#apply` · `#fees`

### Header (shared)

Sticky, `rgba(255,252,247,.96)` with `backdrop-filter: blur(10px)`, 1px bottom border.

- **Utility bar** above it: `#4E0E20`, 13px, phone and email left; Report an absence / Hero app / Newsletters / Term dates right. Right group hides below 720px.
- **Main bar**: logo 62px tall, `padding: 22px 24px`.
- **Nav**: Our School ▾, Our Community ▾, Enrolment, Absences, Contact, Parish, then a burgundy "Enrol now" pill.
- **Dropdowns** open on hover and click, close on mouse leave of the bar. Three columns: a description column with an overview link, plus two link lists. Panel is `#FFFCF7`, `border-top: 3px solid #AC973F`, radius `0 0 18px 18px`, shadow `0 24px 48px -16px rgba(108,20,44,.22)`.
- **Below 940px** the nav collapses to a hamburger; the mobile panel lists all pages with 52px minimum touch targets and two full-width action buttons.
- Skip-to-content link, visible on focus.

### Footer (shared)

`#6C142C`, `border-top: 4px solid #C9B25E`. Centred Star of the Sea line, then four columns (logo + description, Contact, Pages, For families), then a bottom bar with copyright and Privacy / Accessibility / Complaints. Collapses to two columns at 860px, one at 560px.

### Home

1. **Hero** — photo background, `linear-gradient(105deg, rgba(78,14,32,.94), rgba(108,20,44,.86) 46%, rgba(108,20,44,.55))`, two star watermarks, eyebrow with dash, 70px headline, lead line, gold + outline buttons, gold rule.
2. **Vision** — two columns. Left: heading and "Read the principal's message" button. Right: card with a 110px gold `”` mark, principal quote in italic Work Sans 21px, supporting paragraph, avatar initials and attribution. Card has a 4px gold left border.
3. **Marian Values** — `#F0EBE3`. Six badge tiles in a row (3 at 900px, 2 at 620px). Badge PNGs use `mix-blend-mode: multiply` so their white ground disappears. Tiles lift and gain a `#FFFCF7` card on hover.
4. **Find your way around** — four link cards, gold top border, lift on hover.
5. **Everyday links** — two columns; right is a hairline-separated list. Each row shifts `padding-left` to 28px on hover.
6. **CTA** — `#4E0E20`, 6px gold top border, star bottom-left, heading + two buttons.

### Our School

Hero (flat burgundy, anchor pills) → **Principal's message** (sticky left column with an author card; full message right) → **Special character** (two columns plus a pull quote, then a four-card "Encountering Christ" row: Daily / Fortnightly / With our parish / At assembly) → **Marian Values** (six cards, 96px badge + te reo name + English + scripture + essence statement + intercession line, in a 2-column grid) → **Our learning teaser** on `#F0EBE3` → **Parent information** (full-width burgundy handbook download panel, then six info cards) → CTA.

### Our learning

Hero → Curriculum (two curricula) → Literacy and maths (three programme cards: Little Learners Love Literacy Y0–3, The Code Y4–6, Maths — No Problem!) → Responsive learning environments → Assessment (intro plus a five-row descriptor table: Emerging, Developing, Consolidating, Proficient, Exceeding, in a `200px 1fr` grid) → Learning support → Attendance note band → "Growing this section" roadmap list.

### Our Community

Hero → Staff (four leadership cards + link to the staff page) → PTFA → School board → Plans, reports & policies (six cards: three live downloads, three dashed placeholders).

### Staff

Hero → Senior leadership (four portrait cards, 4:5 image area, initials placeholder) → School office (two cards) → **Mārama Team** (Years 0–3) and **Ahi Team** (Years 4–6): a `300px 1fr` layout with team name, meaning, team leader and AP on the left, and a hairline-separated roster on the right. Each row is name + email left, saint class name + year pill right → Support staff (two cards plus teacher-aide name chips).

### Enrolment

Photo hero → Why families choose us (four cards) → How to apply (three numbered steps) → Preference & non-preference → School fees (five-row list) → Enquiry band on `#4E0E20` with contact details and three download/action tiles.

### Absences

Hero → Three ways to report (Hero app card is a filled burgundy card; phone and email are light cards) → What to tell us (four-row list) → Why every day matters.

### Contact

Hero → two columns: details list, "Who to ask" cards (Katherine Craig, Colleen Smith, Catherine Cyprian, Mel Hogg) and an enquiry form (name, email, phone, subject select, message, submit) → quick-links band.

Form is **not wired**. Choose an approach — a Next.js route handler posting to email, or a form service.

### Parish

Hero → School and parish → Catholic & community links (three cards).

---

## Interactions

- All hovers `.18–.2s ease`. Cards lift 4px; list rows shift padding; buttons lift 2px.
- Header dropdowns: hover to open, click to toggle, `onMouseLeave` on the bar closes. Add Escape-to-close and focus trapping when you build it — the prototype omits keyboard handling.
- Mobile menu toggles open/closed; nothing else is stateful.
- No animation beyond hover transitions.

## Responsive

Prototype breakpoints: 940px (nav collapse), 900px (two-column layouts stack, 3- and 4-up grids reduce), 860px / 560px (footer), 720px (utility bar links hide), 620px (hero type down, grids to one column).

## Assets

| File | Notes |
|---|---|
| `assets/logo-transparent.png` | Header logo, 62px tall |
| `assets/logo-reversed.png` | Footer logo, 56px tall |
| `assets/hero-home.webp` | Home and Enrolment hero. **The only photograph that exists.** |
| `assets/value-faith.png` | Whakapono |
| `assets/value-love.png` | Aroha |
| `assets/value-wisdom.png` | Whakaaronui |
| `assets/value-whanaungatanga.png` | Belonging |
| `assets/value-kaitiakitanga.png` | Guardianship |
| `assets/value-service.png` | Āwhina |
| `assets/docs/Parent-Information-Handbook-2026.pdf` | Linked from four places |
| `assets/docs/Stella-Maris-Enrolment-Scheme.pdf` | Enrolment, Our Community |
| `assets/docs/Annual-Financial-Statements-2025.pdf` | Our Community |

The two value badges were originally mis-named against their artwork; the filenames above are verified correct. Badges are opaque white JPEGs saved as `.png` — `mix-blend-mode: multiply` is what removes the white ground. If you'd rather not rely on blend mode, have them re-exported as transparent PNGs.

## Content still needed from SLT

Every one of these is marked on-page with a dashed placeholder panel:

1. Photography throughout (the sitemap asks for photos across pages, no gallery)
2. Leadership portraits
3. PTFA statement, members, event calendar
4. Board statement, members, photos, meeting calendar
5. Strategic and annual plan, attendance management plan, ERO link, SchoolDocs URL
6. Fee amounts; current preference / non-preference wording
7. Hero, Kindo, newsletter and term-date URLs

## Decisions carried from the sitemap

- No Facebook link — the sitemap notes one page only (Stella Parents & Friends) with all comms through the apps.
- One master parent handbook, linked from four places rather than duplicated as pages.
- Depth-3 learning topics (RE, Te Ao Māori, sports, arts, e-learning, wellbeing, EOTC, Shine Challenge, Stella Stars) are a visible roadmap list on Our learning, not empty pages.
- News, Events and Resources have no pages in v1 — newsletters, term dates and the calendar are external links.

## Files in this bundle

Nine page designs, the shared header and footer, `support.js` (runtime for the prototypes — not needed in production), and `assets/`.

**Next:** see `SANITY.md` for the content model, schema changes and seed plan.
