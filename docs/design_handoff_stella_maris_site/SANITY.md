# Sanity content model

Written against the schema already in `src/sanity/schemaTypes/`. The rule throughout: **if a staff member leaving requires a developer commit, the schema is wrong.**

---

## 1. What is CMS-editable vs hardcoded

### CMS

| Content | Type |
|---|---|
| Staff — photo, name, role, email, class, year, team, order | `staff` (needs new fields) |
| Board members, PTFA members | `staff`, filtered by a new `group` field |
| Documents — handbook, enrolment scheme, financials, ERO, plans | `downloadableResource` |
| External URLs — Hero, Kindo, SchoolDocs, newsletters, term dates | `siteSettings` |
| Page intros, leads, section copy | per-page types |
| Fees content | `enrolmentPage` |
| Office hours, address, phone, email | `siteSettings` |
| Site alert | `siteSettings` (already built) |
| All photography | image fields throughout |
| Navigation labels and order | `navigation` |

### Hardcoded

| Content | Why |
|---|---|
| Marian Values — scripture, essence statements, intercessions | Formal approved statements; a CMS typo shouldn't be possible. Move to CMS only if the DRS asks. |
| Progress descriptors (Emerging → Exceeding) | Ministry-aligned wording |
| Star motif, layout, type scale, colour | Design system |

---

## 2. Schema changes

### 2.1 `staff` — add fields

Current fields: `name`, `role`, `photo`, `bio`, `sortOrder`. Add:

```ts
defineField({
  name: "email",
  title: "Email",
  type: "string",
  group: "content",
  validation: (Rule) => Rule.email(),
}),
defineField({
  name: "group",
  title: "Group",
  type: "string",
  group: "content",
  initialValue: "marama",
  options: {
    list: [
      { title: "Senior leadership team", value: "slt" },
      { title: "School office", value: "office" },
      { title: "Mārama Team — Years 0–3", value: "marama" },
      { title: "Ahi Team — Years 4–6", value: "ahi" },
      { title: "Support staff", value: "support" },
      { title: "Teacher aide", value: "aide" },
      { title: "School board", value: "board" },
      { title: "PTFA", value: "ptfa" },
    ],
  },
  validation: (Rule) => Rule.required(),
}),
defineField({
  name: "className",
  title: "Class",
  type: "string",
  group: "content",
  description: "Saint name, e.g. St Lucy",
  hidden: ({ document }) => !["marama", "ahi"].includes(document?.group as string),
}),
defineField({
  name: "yearLevel",
  title: "Year level",
  type: "string",
  group: "content",
  options: { list: ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5", "Year 6"] },
  hidden: ({ document }) => !["marama", "ahi"].includes(document?.group as string),
}),
defineField({
  name: "isTeamLeader",
  title: "Team leader",
  type: "boolean",
  group: "content",
  initialValue: false,
}),
```

Notes:
- Karl Hobman and Mel Hogg appear in both a leadership group and a teaching team. Either allow `group` to be an array of strings, or create a second document. **Array is cleaner** — change `group` to `type: "array", of: [{type:"string"}], options: {list: [...]}`.
- Teacher aides render as name-only chips, so `photo`, `role` and `email` stay optional.

### 2.2 New object: `teamInfo`

The Mārama and Ahi team blurbs ("Mārama signifies the clarity and light that comes with new learning") are editable prose. Add to `communityPage` or a small `staffPage` document:

```ts
defineField({
  name: "teams",
  title: "Teaching teams",
  type: "array",
  of: [defineArrayMember({
    type: "object",
    fields: [
      defineField({ name: "key", type: "string", options: { list: ["marama", "ahi"] } }),
      defineField({ name: "title", type: "string" }),        // "Mārama Team"
      defineField({ name: "yearRange", type: "string" }),    // "Years 0–3"
      defineField({ name: "meaning", type: "text", rows: 2 }),
    ],
  })],
}),
```

### 2.3 `siteSettings` — add URLs

Already present: `heroAppUrl`, `absenceUrl`, `newsletterUrl`, `policiesUrl`, `facebookUrl`, `contactAddress/Email/Phone`, `officeHours`.

Add to the **Contact & social** group:

```ts
defineField({ name: "kindoUrl",     title: "Kindo payments URL", type: "url", group: "contact" }),
defineField({ name: "termDatesUrl", title: "Term dates URL",     type: "url", group: "contact" }),
defineField({ name: "eroUrl",       title: "ERO report URL",     type: "url", group: "contact" }),
defineField({ name: "calendarUrl",  title: "School calendar URL", type: "url", group: "contact" }),
```

Header, footer and every body link read these — one change updates the whole site. Any that are empty should **hide** their link rather than render a dead `#`.

### 2.4 `downloadableResource` — add a placement key

So a page can pull its own documents without hardcoded IDs:

```ts
defineField({
  name: "placement",
  title: "Show on",
  type: "array",
  of: [{ type: "string" }],
  options: {
    list: [
      { title: "Our School — parent information", value: "about" },
      { title: "Our Community — plans & reports", value: "reports" },
      { title: "Enrolment", value: "enrolment" },
      { title: "Footer", value: "footer" },
    ],
  },
}),
```

### 2.5 Optional: `marianValue`

Only if the DRS wants editorial control. Fields: `name` (te reo), `englishName`, `scripture`, `scriptureReference`, `essence` (text), `intercession`, `icon` (image), `sortOrder`. Otherwise keep the six values as a constant in `src/lib/`.

---

## 3. Page type mapping

| Page section | Reads from |
|---|---|
| Home hero | `siteSettings.homeHeroEyebrow / homeHeroTitle / homeHeroSubtitle / homeHeroBackground / homeCtas` |
| Home vision quote | `siteSettings.principalMessage`, `principalPhoto` |
| Home values | constant, or `marianValue` |
| Home everyday links | `siteSettings` URLs + `downloadableResource` where `placement == "footer"` |
| Our School — principal | `aboutPage.principalWelcome` (extend to rich text — the full message is ~7 paragraphs) |
| Our School — special character | `aboutPage.specialCharacter` (extend to rich text), plus a repeatable "Encountering Christ" array of 4 |
| Our School — parent information | `downloadableResource` where `placement == "about"` + `siteSettings.policiesUrl / eroUrl / heroAppUrl / kindoUrl` |
| Our learning | new `learningPage` type, or `page` docs — needs rich text plus a repeatable programme-card array and the descriptor list |
| Our Community — staff preview | `staff` where `group` includes `slt` |
| Our Community — reports | `downloadableResource` where `placement == "reports"` |
| Staff page | `staff` grouped by `group`, ordered by `sortOrder` |
| Enrolment | `enrolmentPage` (existing fields cover most) + `downloadableResource` where `placement == "enrolment"` |
| Absences | `absencesPage` (existing) |
| Contact | `siteSettings.contact*` + `staff` where a `showOnContact` flag is set |
| Parish | `page` doc `hibiscus-coast-parish` (already seeded) |

**`aboutPage.principalWelcome` and `specialCharacter` are currently `text`.** Change both to `blockContent` — the real copy is multi-paragraph with emphasis.

---

## 4. Navigation

`scripts/seed-sitemap.mjs` currently seeds ~30 CMS pages under two dropdowns. The approved structure is smaller:

```
Our School (→ /about)
  Principal's message      /about#principal
  Values & special character /about#character
  Our learning             /about/our-learning
  Parent information       /about#parent-information
  Parent handbook          (downloadableResource)
  School fees              /about#fees
  Policies & ERO report    /about#parent-information
  School app               /about#apps

Our Community (→ /community)
  Staff                    /community/staff
  PTFA                     /community#ptfa
  School board             /community#board
  Plans & reports          /community#reports
  Financial statements     (downloadableResource)
  Attendance management plan /absences#plan

Enrolment   /enrolment
Absences    /absences
Contact     /contact
Parish      /parish
```

`linkItem` needs to support an **anchor**: add an optional `anchor` string alongside `siteRoute`, appended as `#anchor`. Without it, every in-page link has to be a CMS page, which is what the current seed does and what the new structure removes.

Delete the now-unused `page.*` documents from the seed, keeping `page.hibiscus-coast-parish`.

---

## 5. Seed plan

Extend `scripts/seed-sitemap.mjs`, which already supports `--export` to NDJSON.

1. `siteSettings` — school name, address `50 Silverdale Street, Silverdale 0944`, phone `09 427 9189`, email `achieve@stellamaris.school.nz`, office hours `8:00am – 3:30pm`, hero copy, principal message excerpt. Leave the new URLs blank for SLT.
2. `staff` — 31 documents from `School Staff 2026.docx`: 4 SLT, 2 office, 7 Mārama teachers, 8 Ahi teachers, 2 support, 14 teacher aides. Names, roles, emails, classes and year levels are all in the design files and are current.
3. `aboutPage` — full principal's message and special character copy as block content.
4. `enrolmentPage` — value proposition, three application steps, fee categories.
5. `absencesPage` — reporting methods and attendance copy.
6. `downloadableResource` — three documents that exist today (handbook, enrolment scheme, 2025 financial statements), with placements.
7. `navigation` — the structure above.

All source copy is in the design files and in the school's own documents; nothing needs rewriting.

---

## 6. Build order

1. Tokens, fonts, `StarMark`, and the shared header/footer.
2. Schema changes and seed — do this before the pages, so pages are built against real data.
3. Home, Our School, Our learning (the three content-heavy pages).
4. Our Community, Staff, Enrolment.
5. Absences, Contact, Parish.
6. Contact form wiring.
7. Replace dashed placeholder panels only as SLT supplies content — they should stay visible until then.
