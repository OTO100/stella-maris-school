/**
 * SLT content defaults adopted for the CMS-driven sitemap restructure.
 * Update these when leadership confirms different choices.
 */
export const sitemapDecisions = {
  parentHandbook: {
    format: "pdf-download" as const,
    singleSource: true,
    publicPath: "/docs/Parent-Information-Handbook-2026.pdf",
    note: "One master handbook document linked from Enrolment, Our School, and Parent Information.",
  },
  facebook: {
    showOnWebsite: false,
    note: "Comms via Hero/app; Facebook link omitted until SLT confirms Stella Parents & Friends only.",
  },
  ourLearning: {
    placement: "nested-under-our-school" as const,
    landingSlug: "about/our-learning",
    note: "Our Learning stays under Our School; depth-3+ topics are on-page links, not nav dropdowns.",
  },
  linkOut: {
    policies: "siteSettings.policiesUrl",
    absenceForm: "siteSettings.absenceUrl",
    heroApp: "siteSettings.heroAppUrl",
    newsletter: "siteSettings.newsletterUrl",
    kindo: "siteSettings.kindoUrl",
    termDates: "siteSettings.termDatesUrl",
    ero: "siteSettings.eroUrl",
    calendar: "siteSettings.calendarUrl",
    parish: "parish page + external parish URL",
    financialStatements: "downloadableResource or /docs/Annual-Financial-Statements-2025.pdf",
  },
  landingRoutes: {
    ourSchool: "/about",
    ourCommunity: "/community",
    enrolment: "/enrolment",
    absences: "/absences",
    contact: "/contact",
    parish: "/parish",
    ourLearning: "/about/our-learning",
    staff: "/community/staff",
  },
} as const;

export const PUBLIC_DOCS = {
  handbook: "/docs/Parent-Information-Handbook-2026.pdf",
  enrolmentScheme: "/docs/Stella-Maris-Enrolment-Scheme.pdf",
  financials: "/docs/Annual-Financial-Statements-2025.pdf",
} as const;
