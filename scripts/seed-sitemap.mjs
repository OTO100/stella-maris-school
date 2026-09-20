/**
 * Seeds CMS content for the approved Stella Maris sitemap.
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=... npm run seed:sitemap
 *   npm run seed:sitemap:export
 */
import { createClient } from "@sanity/client";
import { createReadStream, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";

const exportOnly = process.argv.includes("--export");
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!exportOnly && !projectId) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
  process.exit(1);
}
if (!exportOnly && !token) {
  console.error("Missing SANITY_API_WRITE_TOKEN");
  process.exit(1);
}

const client =
  !exportOnly &&
  createClient({
    projectId,
    dataset,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-04-01",
    token,
    useCdn: false,
  });

const root = dirname(fileURLToPath(import.meta.url));
const docsDir = join(root, "..", "public", "docs");

function key(prefix = "k") {
  return `${prefix}-${randomUUID().slice(0, 8)}`;
}

function paragraph(text, extra = {}) {
  return {
    _type: "block",
    _key: key("b"),
    style: extra.style ?? "normal",
    markDefs: [],
    children: [{ _type: "span", _key: key("s"), text, marks: extra.marks ?? [] }],
  };
}

function siteRouteLink(label, route, anchor) {
  return {
    _type: "linkItem",
    label,
    linkDestination: "siteRoute",
    siteRoute: route,
    ...(anchor ? { anchor } : {}),
    openInNewTab: false,
  };
}

function fileLink(label, file) {
  return {
    _type: "linkItem",
    label,
    linkDestination: "file",
    file,
    openInNewTab: true,
  };
}

const siteSettingsDoc = {
  _id: "siteSettings",
  _type: "siteSettings",
  schoolName: "Stella Maris Catholic Primary School",
  tagline: "Star of the Sea",
  contactAddress: "50 Silverdale Street\nSilverdale 0944",
  contactPhone: "09 427 9189",
  contactEmail: "achieve@stellamaris.school.nz",
  officeHours: "8:00am – 3:30pm",
  homeHeroEyebrow: "Silverdale, Auckland · Years 1–6",
  homeHeroTitle: "Stella Maris Catholic Primary School",
  homeHeroSubtitle:
    "We follow Jesus' way and live the Marian Values — and in doing so, we shine for God.",
  principalMessage:
    "The Stella Maris community is based on family. This extended family consists of students, teachers, parents, and extended family joining together to form a community that is wholeheartedly committed to the education of our young people.",
};

const staffMembers = [
  { id: "catherine-cyprian", name: "Catherine Cyprian", role: "Principal", email: "principal@stellamaris.school.nz", group: ["slt"], showOnContact: true, sortOrder: 10 },
  { id: "olwyn-hobman", name: "Olwyn Hobman", role: "Associate Principal Years 4–6 · Curriculum Leader", email: "olwyn@stellamaris.school.nz", group: ["slt"], sortOrder: 20 },
  { id: "mel-hogg", name: "Mel Hogg", role: "Associate Principal Years 0–3 · SENCo", email: "melh@stellamaris.school.nz", group: ["slt", "marama"], showOnContact: true, sortOrder: 30 },
  { id: "karl-hobman", name: "Karl Hobman", role: "Director of Religious Studies", email: "karl@stellamaris.school.nz", group: ["slt", "marama"], className: "St Mary", yearLevel: "Year 2", sortOrder: 40 },
  { id: "katherine-craig", name: "Katherine Craig", role: "School Administrator", email: "achieve@stellamaris.school.nz", group: ["office"], showOnContact: true, sortOrder: 50 },
  { id: "colleen-smith", name: "Colleen Smith", role: "Office Administrator", email: "colleen@stellamaris.school.nz", group: ["office"], showOnContact: true, sortOrder: 60 },
  { id: "isla-macdiarmid", name: "Isla MacDiarmid", role: "Teacher", email: "isla.macdiarmid@stellamaris.school.nz", group: ["marama"], className: "St Anne", yearLevel: "Year 1", sortOrder: 110 },
  { id: "erica-mainwaring", name: "Erica Mainwaring", role: "Teacher", email: "erica@stellamaris.school.nz", group: ["marama"], className: "St Benedict", yearLevel: "Year 1", sortOrder: 120 },
  { id: "monica-allemann", name: "Monica Allemann", role: "Teacher", email: "monica@stellamaris.school.nz", group: ["marama"], className: "St Clare", yearLevel: "Year 1", sortOrder: 130 },
  { id: "jenny-bentley", name: "Jenny Bentley", role: "Teacher", email: "jenny@stellamaris.school.nz", group: ["marama"], className: "St Nicholas", yearLevel: "Year 2", sortOrder: 150 },
  { id: "diana-pearson", name: "Diana Pearson", role: "Teacher", email: "diana@stellamaris.school.nz", group: ["marama"], className: "St Lucy", yearLevel: "Year 3", isTeamLeader: true, sortOrder: 160 },
  { id: "nada-boric", name: "Nada Boric", role: "Teacher", email: "nada@stellamaris.school.nz", group: ["marama"], className: "St Francis", yearLevel: "Year 3", sortOrder: 170 },
  { id: "michelle-kleingeld", name: "Michelle Kleingeld", role: "Teacher", email: "michelle@stellamaris.school.nz", group: ["ahi"], className: "St Peter", yearLevel: "Year 4", sortOrder: 210 },
  { id: "chantell-vermeulen", name: "Chantell Vermeulen", role: "Teacher", email: "chantell.vermeulen@stellamaris.school.nz", group: ["ahi"], className: "St John", yearLevel: "Year 4", sortOrder: 220 },
  { id: "becky-buckley", name: "Becky Buckley", role: "Teacher", email: "becky.buckley@stellamaris.school.nz", group: ["ahi"], className: "St Anthony", yearLevel: "Year 4", sortOrder: 230 },
  { id: "tina-hunt", name: "Tina Hunt", role: "Teacher", email: "tina@stellamaris.school.nz", group: ["ahi"], className: "St Augustine", yearLevel: "Year 5", sortOrder: 240 },
  { id: "natasha-kain", name: "Natasha Kain", role: "Teacher", email: "natasha@stellamaris.school.nz", group: ["ahi"], className: "St Dominic", yearLevel: "Year 5", sortOrder: 250 },
  { id: "karen-bessone", name: "Karen Bessone", role: "Teacher", email: "karen.bessone@stellamaris.school.nz", group: ["ahi"], className: "St Patrick", yearLevel: "Year 5", sortOrder: 260 },
  { id: "tracey-law", name: "Tracey Law", role: "Teacher", email: "tracey@stellamaris.school.nz", group: ["ahi"], className: "St Therese", yearLevel: "Year 6", isTeamLeader: true, sortOrder: 270 },
  { id: "phoebe-cunningham-tyler", name: "Phoebe Cunningham-Tyler", role: "Teacher", email: "phoebe@stellamaris.school.nz", group: ["ahi"], className: "St Joseph", yearLevel: "Year 6", sortOrder: 280 },
  { id: "steve-flemwell", name: "Steve Flemwell", role: "Property Manager", email: "stephen@stellamaris.school.nz", group: ["support"], sortOrder: 310 },
  { id: "kevin-kemble", name: "Kevin Kemble", role: "Caretaker", group: ["support"], sortOrder: 320 },
  ...[
    "Lorraine Budding",
    "Brooke Fowler",
    "Nicky Jordan",
    "Karen Lloyd",
    "Sarin Lork",
    "Sandy McCauley",
    "Brooke McKenzie",
    "Monica McKernan",
    "Lucian Moura",
    "Lauren Muriwai-Mumby",
    "Mel Shimwell",
    "Catherine White",
    "Lola Wilson",
    "Bec Wood",
  ].map((name, i) => ({
    id: name.toLowerCase().replace(/[^a-z]+/g, "-"),
    name,
    group: ["aide"],
    sortOrder: 400 + i,
  })),
];

function staffDoc(member) {
  return {
    _id: `staff-${member.id}`,
    _type: "staff",
    name: member.name,
    role: member.role,
    email: member.email,
    group: member.group,
    className: member.className,
    yearLevel: member.yearLevel,
    isTeamLeader: Boolean(member.isTeamLeader),
    showOnContact: Boolean(member.showOnContact),
    sortOrder: member.sortOrder,
  };
}

const aboutPageDoc = {
  _id: "aboutPage",
  _type: "aboutPage",
  heroSubtitle:
    "A state-integrated Catholic primary school in Silverdale for Years 1–6. Our school is founded on the Marian Values, and all we undertake is underpinned by them.",
  principalWelcome: [
    paragraph(
      "Dear Parent or Caregiver — thank you for your interest in Stella Maris Primary School. I welcome your inquiry and consideration of our school community as a place for your child's education.",
    ),
    paragraph(
      "Stella Maris has a strong academic focus and each child is encouraged to take responsibility for their learning, valuing knowledge, truth and faith, under the guidance of dedicated teachers and support staff. At Stella Maris we value the development of the whole person, integrating spiritual development, academic success, cultural prowess and awareness, and a high level of sporting participation and skill in the context of our Catholic tradition.",
    ),
    paragraph(
      "The Stella Maris community is based on family. This extended family consists of students, teachers, parents, and extended family joining together to form a community that is wholeheartedly committed to the education of our young people.",
    ),
    paragraph(
      "As a Catholic school, all we undertake is underpinned by Gospel and Marian Values. Our school is founded on the Marian Values and these values are explicit within our school environment. There is an expectation that the actions and behaviour of all in our school community are guided by these values.",
    ),
    paragraph(
      "We encourage and indeed expect that our students will become lifelong learners, each developing the Spirit of Stella Maris to take with them out into the workplace and adult life. You will find the Spirit of Stella Maris evident in our students and staff, our approach to learning, friendships, and achievement. Confidence, persistence, resilience, self-reliance are all guiding foundations for carving out a successful pathway through life. These attributes are encapsulated in Learner Capabilities and are reflected in the teaching and learning programme at Stella Maris.",
    ),
    paragraph(
      "Central to the mission of Stella Maris School is the promotion of excellence. Our commitment to our parents is to support, encourage, nurture, and challenge individual development for all our students and to provide a learning environment which meets their present and future needs.",
    ),
    paragraph("I look forward to welcoming you and your family into the Stella Maris community."),
  ],
  specialCharacter: [
    paragraph(
      "In using this title, we see Our Lady as our guide or leader, someone who could navigate the stars, who watches over us and leads us to Jesus. In following Jesus' way and living the Marian Values we shine for God.",
    ),
    paragraph(
      "We follow the Marian Values that are deeply rooted in the Gospels. These values are demonstrated by Mary, our Mother and guide. They lead us to a stronger relationship with Her Son, Jesus.",
    ),
    paragraph(
      "Our Religious Education curriculum is Tō Tātou Whakapono — Our Faith, finalised in 2021, covering Catholic education in Aotearoa New Zealand from Year 1 through to Year 13. It provides guidance for rich learning through four themes: God, The Good News, Our Story and Being Church. It carefully weaves together and scaffolds the heart of the Catholic faith so that this knowledge may connect with the lives of our students and whānau.",
    ),
  ],
  specialCharacterQuote:
    "Religious Education in Catholic schools “provides a foundation of knowledge which works alongside the whole school's Catholic Special Character, which helps form their understanding of what it means to be a disciple of Jesus and a member of the Catholic Church.”",
  specialCharacterQuoteCite: "Tō Tātou Whakapono — Our Faith, 2021",
  encounteringChrist: [
    { _key: "daily", title: "Daily", body: "Prayer in every class" },
    {
      _key: "fortnightly",
      title: "Fortnightly",
      body: "Class-led liturgies — a wonderful opportunity for whānau to join us.",
    },
    {
      _key: "parish",
      title: "With our parish",
      body: "Atrium & whole-school Masses. Children lead parts of the Mass, led by our parish priest.",
    },
    { _key: "assembly", title: "At assembly", body: "Special Character certificates" },
  ],
  ctaHeading: "Come and see learning in action",
  ctaBody: "Contact the office to arrange a visit, or start an enrolment enquiry.",
};

const communityPageDoc = {
  _id: "communityPage",
  _type: "communityPage",
  heroSubtitle:
    "Students, teachers, parents and extended family joining together, wholeheartedly committed to the education of our young people.",
  staffIntro:
    "Our senior leadership team, office, the Mārama and Ahi teaching teams, and the support staff who make our days run.",
  ptfaTitle: "PTFA",
  ptfaDescription:
    "Our PTFA brings whānau together — running events, fundraising for learning resources, and making sure new families feel at home. Everyone is welcome, whether you can give an hour a term or a whole Saturday.",
  boardTitle: "School board",
  boardDescription:
    "The board sets the strategic direction of the school alongside the principal, safeguards our special character, and is accountable for how the school's resources are used.",
  reportsIntro:
    "Published by the board for our community, as required by the Education and Training Act 2020.",
};

const enrolmentPageDoc = {
  _id: "enrolmentPage",
  _type: "enrolmentPage",
  heroSubtitle:
    "We'd love to meet you. Start with a look at our enrolment scheme, then talk to the office — enrolment here begins with a relationship, not a form.",
  valuePropositionTitle: "The whole child, in a Catholic tradition",
  valueProposition:
    "At Stella Maris we value the development of the whole person — integrating spiritual development, academic success, cultural prowess and awareness, and a high level of sporting participation and skill.",
  whyCards: [
    { _key: "academic", title: "A strong academic focus", body: "Structured literacy and maths, sequenced year by year, with clear reporting twice a year." },
    { _key: "values", title: "Founded on the Marian Values", body: "Faith, love, wisdom, belonging, guardianship and service, explicit in our environment every day." },
    { _key: "support", title: "Support for every learner", body: "A collaborative approach with our SENCo, teachers and whānau to reduce barriers to learning." },
    { _key: "family", title: "A community based on family", body: "Students, teachers, parents and extended family, committed together to our young people." },
  ],
  applicationSteps: [
    { _key: "scheme", title: "Read the enrolment scheme", body: "Our scheme sets out the home zone and the preference categories that apply to a state-integrated Catholic school." },
    { _key: "visit", title: "Visit us", body: "Come and see learning in action and meet our principal. Contact the office to arrange a time that suits." },
    { _key: "apply", title: "Submit your application", body: "Complete the enrolment application with your supporting documents. The office will confirm what's needed, including a preference certificate where it applies." },
  ],
  preferenceTitle: "Preference & non-preference places",
  preferenceBody:
    "As a state-integrated Catholic school, most of our places are preference places for children whose families have an established connection with the Catholic faith. A smaller number of non-preference places may also be available.\n\nA preference certificate is signed by a parish priest. If you're unsure whether your family qualifies, please ask us — we will walk you through it, and we welcome enquiries from all families.",
  feesTitle: "School fees",
  feesDescription:
    "We want cost to be clear from the start. Please confirm current amounts with the office before you apply.",
  feeRows: [
    { _key: "dues", title: "Attendance dues", body: "Set by the proprietor and compulsory for state-integrated schools. They fund the buildings and property, not teaching." },
    { _key: "curriculum", title: "Curriculum charges", body: "For specific activities such as trips, camp and swimming, charged as they arise." },
    { _key: "voluntary", title: "Voluntary contributions", body: "Genuinely voluntary — they help fund resources beyond what the school's operational grant covers." },
    { _key: "assist", title: "Financial assistance", body: "Cost should never be the reason a child misses out. Speak to the office in confidence about payment plans or assistance." },
    { _key: "kindo", title: "Paying through Kindo", body: "Dues, charges and permission slips are handled online through Kindo." },
  ],
  ctaHeading: "Still deciding? Ask us anything.",
  ctaBody:
    "Katherine and Colleen in the office are the best first call — they'll answer your questions or put you in touch with our principal.",
};

const absencesPageDoc = {
  _id: "absencesPage",
  _type: "absencesPage",
  heroSubtitle:
    "Please tell us before 9:00am on any day your child will be absent — for illness, appointments, or family reasons.",
  intro: "Three ways to report an absence: Hero app, phone, or email.",
  attendanceTitle: "Why every day matters",
  attendanceDescription:
    "Student attendance at school plays an important role in student progress and achievement. Lifting school attendance is a shared responsibility.",
};

const learningPageDoc = {
  _id: "learningPage",
  _type: "learningPage",
  heroSubtitle:
    "To support every student to attain their highest possible educational achievement and grow a love of lifelong learning in a safe, inclusive and supportive environment.",
  curriculumTitle: "Two curricula, woven together",
  curriculumIntro:
    "At Stella Maris we follow the New Zealand Curriculum for our learners. The curriculum focuses on sequenced, coherent knowledge and practices that reflect how each learning area helps students to understand, interpret, and contribute in the world.",
  religiousEducation:
    "As a Catholic school we also follow Tō Tātou Whakapono — Our Faith, the Catholic Religious Education curriculum. This provides guidance for rich learning about God, the Good News, our story and being Church, carefully weaving together the heart of the Catholic faith so that this knowledge may connect with the lives of our students and whānau.",
  programmesTitle: "Literacy and maths",
  programmes: [
    { _key: "llll", title: "Little Learners Love Literacy", years: "Years 0–3 · Reading & writing", body: "Liz Kane's programme for our youngest learners — one of the Structured Literacy options New Zealand schools began in 2025." },
    { _key: "code", title: "The Code", years: "Years 4–6 · Reading & writing", body: "Explicit teaching of reading and writing knowledge and skills, continuing the structured literacy pathway through the senior school." },
    { _key: "mnp", title: "Maths — No Problem!", years: "Years 1–6 · Maths & statistics", body: "A clear teaching sequence for the explicit teaching of the mathematics knowledge and skills that are foundational to being numerate." },
  ],
  environmentsTitle: "Responsive learning environments",
  environmentsBody:
    "Students learn best when they feel a sense of belonging, are valued, and are supported to succeed. Responsive learning environments promote engagement, wellbeing, and equitable access to learning across all learning areas.",
  assessmentIntro:
    "Parents receive a written report at mid-year and at the end of the year outlining their child's progress and achievement against the New Zealand Curriculum.",
  supportTitle: "Learning support",
  supportBody:
    "At Stella Maris Catholic Primary School, the board and staff ensure that every student is able to attain their highest possible standard in educational achievement and that the school is inclusive of, and caters for, students with differing needs.",
  attendanceNote:
    "Student attendance plays an important role in progress and achievement, and lifting attendance is a shared responsibility. The more often students attend school, the better they do, the happier they are, and the better they are set up for life.",
};

const staffPageDoc = {
  _id: "staffPage",
  _type: "staffPage",
  heroSubtitle: "The people who teach, support and lead our school community.",
  teams: [
    {
      _key: "marama",
      key: "marama",
      title: "Mārama Team",
      yearRange: "Years 0–3",
      meaning: "Mārama signifies the clarity and light that comes with new learning.",
    },
    {
      _key: "ahi",
      key: "ahi",
      title: "Ahi Team",
      yearRange: "Years 4–6",
      meaning: "Ahi symbolises the inner fire and passion for learning as students grow older.",
    },
  ],
};

const parishPageDoc = {
  _id: "parishPage",
  _type: "parishPage",
  heroSubtitle:
    "Stella Maris is part of the Hibiscus Coast Catholic community. Parish life enriches our school through liturgy, sacramental preparation, and opportunities to serve together.",
  sectionTitle: "School and parish",
  body: "Our parish priest leads Atrium Masses at school, with children taking parts in the liturgy, and whole-school Masses mark the liturgical events of the year. Class-led liturgies happen fortnightly and whānau are always welcome to join us.\n\nSacramental preparation — Reconciliation, First Communion and Confirmation — is run through the parish rather than the school, and the parish office is the place to start.",
};

function navigationDoc(handbookFile, financialFile) {
  return {
    _id: "navigation",
    _type: "navigation",
    footerTagline:
      "Stella Maris, Star of the Sea — we ask Our Lady to guide and watch over our school, this land surrounded by the sea.",
    primaryNavigation: [
      {
        _key: "our-school",
        variant: "group",
        groupLabel: "Our School",
        landingLink: siteRouteLink("Our School overview", "/about"),
        children: [
          { ...siteRouteLink("Principal's message", "/about", "principal"), _key: "principal" },
          { ...siteRouteLink("Values & special character", "/about", "character"), _key: "character" },
          { ...siteRouteLink("Our learning", "/about/our-learning"), _key: "learning" },
          { ...siteRouteLink("Parent information", "/about", "parent-information"), _key: "parent-info" },
          handbookFile
            ? { ...fileLink("Parent handbook", handbookFile), _key: "handbook" }
            : { ...siteRouteLink("Parent handbook", "/about", "parent-information"), _key: "handbook" },
          { ...siteRouteLink("School fees", "/about", "fees"), _key: "fees" },
          { ...siteRouteLink("Policies & ERO report", "/about", "parent-information"), _key: "policies" },
          { ...siteRouteLink("School app", "/about", "apps"), _key: "apps" },
        ],
      },
      {
        _key: "our-community",
        variant: "group",
        groupLabel: "Our Community",
        landingLink: siteRouteLink("Our Community overview", "/community"),
        children: [
          { ...siteRouteLink("Staff", "/community/staff"), _key: "staff" },
          { ...siteRouteLink("PTFA", "/community", "ptfa"), _key: "ptfa" },
          { ...siteRouteLink("School board", "/community", "board"), _key: "board" },
          { ...siteRouteLink("Plans & reports", "/community", "reports"), _key: "reports" },
          financialFile
            ? { ...fileLink("Financial statements", financialFile), _key: "financials" }
            : { ...siteRouteLink("Financial statements", "/community", "reports"), _key: "financials" },
          { ...siteRouteLink("Attendance management plan", "/absences", "plan"), _key: "plan" },
        ],
      },
      {
        _key: "enrolment",
        variant: "simple",
        link: siteRouteLink("Enrolment", "/enrolment"),
      },
      {
        _key: "absences",
        variant: "simple",
        link: siteRouteLink("Absences", "/absences"),
      },
      {
        _key: "contact",
        variant: "simple",
        link: siteRouteLink("Contact", "/contact"),
      },
      {
        _key: "parish",
        variant: "simple",
        link: siteRouteLink("Parish", "/parish"),
      },
    ],
    footerLinks: [
      { ...siteRouteLink("Our School", "/about"), _key: "f-about" },
      { ...siteRouteLink("Our Community", "/community"), _key: "f-community" },
      { ...siteRouteLink("Enrolment information", "/enrolment"), _key: "f-enrol" },
      { ...siteRouteLink("Absences", "/absences"), _key: "f-abs" },
      { ...siteRouteLink("Contact us", "/contact"), _key: "f-contact" },
      { ...siteRouteLink("Hibiscus Coast Parish", "/parish"), _key: "f-parish" },
    ],
  };
}

async function uploadPdf(filename, title) {
  const path = join(docsDir, filename);
  if (!existsSync(path)) {
    console.warn(`Missing PDF ${path}`);
    return null;
  }
  const asset = await client.assets.upload("file", createReadStream(path), {
    filename,
    contentType: "application/pdf",
  });
  return {
    _type: "file",
    asset: { _type: "reference", _ref: asset._id },
    title,
  };
}

function resourceDoc(id, title, placement, file, category = "general") {
  return {
    _id: `downloadableResource.${id}`,
    _type: "downloadableResource",
    title,
    category,
    placement,
    featured: true,
    publishedAt: "2026-01-01T00:00:00.000Z",
    ...(file ? { file } : {}),
  };
}

async function buildDocuments() {
  let handbookFile = null;
  let schemeFile = null;
  let financialFile = null;

  if (!exportOnly) {
    handbookFile = await uploadPdf(
      "Parent-Information-Handbook-2026.pdf",
      "Parent Information Handbook 2026",
    );
    schemeFile = await uploadPdf(
      "Stella-Maris-Enrolment-Scheme.pdf",
      "Stella Maris Enrolment Scheme",
    );
    financialFile = await uploadPdf(
      "Annual-Financial-Statements-2025.pdf",
      "Annual Financial Statements 2025",
    );
  }

  return [
    siteSettingsDoc,
    ...staffMembers.map(staffDoc),
    aboutPageDoc,
    communityPageDoc,
    enrolmentPageDoc,
    absencesPageDoc,
    learningPageDoc,
    staffPageDoc,
    parishPageDoc,
    resourceDoc("handbook", "Parent Information Handbook 2026", ["about", "enrolment", "footer"], handbookFile),
    resourceDoc("enrolment-scheme", "Stella Maris Enrolment Scheme", ["enrolment", "reports"], schemeFile, "enrolment"),
    resourceDoc("financials", "Annual Financial Statements 2025", ["reports"], financialFile),
    navigationDoc(handbookFile, financialFile),
  ];
}

const SETTINGS_URL_KEYS = [
  "heroAppUrl",
  "kindoUrl",
  "newsletterUrl",
  "termDatesUrl",
  "eroUrl",
  "calendarUrl",
  "policiesUrl",
  "absenceUrl",
  "facebookUrl",
  "parishUrl",
  "dioceseUrl",
];

async function withPreservedSettingsUrls(doc) {
  if (exportOnly || !client) return doc;
  const projection = SETTINGS_URL_KEYS.join(", ");
  const existing = await client.fetch(`*[_id == "siteSettings"][0]{${projection}}`);
  if (!existing) return doc;
  const merged = { ...doc };
  for (const key of SETTINGS_URL_KEYS) {
    if (existing[key]) merged[key] = existing[key];
  }
  return merged;
}

async function exportNdjson(docs) {
  const outDir = join(root, "..", "sanity", "import");
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "sitemap.ndjson");
  writeFileSync(outPath, `${docs.map((doc) => JSON.stringify(doc)).join("\n")}\n`, "utf8");
  console.log(`Wrote ${docs.length} documents to ${outPath}`);
}

async function seed() {
  const docs = await buildDocuments();
  if (exportOnly) {
    await exportNdjson(docs);
    return;
  }

  const settingsIndex = docs.findIndex((doc) => doc._id === "siteSettings");
  if (settingsIndex >= 0) {
    docs[settingsIndex] = await withPreservedSettingsUrls(docs[settingsIndex]);
  }

  const existingPages = await client.fetch(`*[_type == "page"]._id`);
  const tx = client.transaction();
  for (const id of existingPages) {
    tx.delete(id);
  }
  for (const doc of docs) {
    tx.createOrReplace(doc);
  }
  await tx.commit();
  console.log(`Seeded ${docs.length} documents to ${projectId}/${dataset}.`);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
