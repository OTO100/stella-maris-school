import { defaultSchoolCopy } from "@/lib/default-copy";

export const aboutPageFallback = {
  heroSubtitle:
    "A welcoming Catholic primary where children are known by name — supported to aim high and serve generously.",
  intro: `We walk alongside families to nurture confident, compassionate learners — grounded in the Gospel and in strong relationships across our classrooms, parish, and community.

This section introduces our special character, leadership, governance, learning programmes, and practical information for whānau.`,
  boardEyebrow: "Governance",
  boardTitle: "Board of Trustees",
  boardDescription:
    "The board sets strategic direction alongside the principal — safeguarding special character and ensuring stewardship of resources. Board meeting dates and summaries can be hosted here when ready.",
  principalWelcome: defaultSchoolCopy.principalMessagePreview,
  specialCharacter: defaultSchoolCopy.specialCharacter,
  ctaHeading: "Ready to see learning in action?",
  ctaBody:
    "Book a tour or jump to enrolment information — we're here to answer your questions.",
} as const;

export const communityPageFallback = {
  heroSubtitle:
    "Partnerships with parish, PTFA, coaches, helpers, and fundraisers — everyone pitching in strengthens our learners.",
  parishTitle: "Parish & voluntary groups",
  parishDescription:
    "Celebrate liturgy together, organise hospitality, support sacramental programmes — your parish connection enriches our school life.",
  ptfaTitle: "PTFA & fundraising",
  ptfaDescription:
    "Volunteers coordinate events — second-hand uniform swaps, quizzes, working bees — channelling energy into learner resources and joyous school memories.",
  uniformTitle: "Uniform",
  uniformDescription:
    "Outfit students with tidy, sun-safe attire that signals belonging — supplier links and sizing guidance can anchor here alongside second-hand exchanges coordinated by helpers.",
  snapshotsDescription:
    "Use joyful photography within sections rather than maintaining a lone gallery page — authenticity beats polish.",
  ctaHeading: "Want to connect with our community?",
  ctaBody:
    "Reach the office for PTFA, parish links, volunteering, and event information.",
} as const;

export const enrolmentPageFallback = {
  heroSubtitle:
    "Clarity beats confusion — enrolment journeys should feel approachable, pastoral, and transparent.",
  valuePropositionTitle: "Why families choose Stella Maris",
  valueProposition:
    "Parents choose Stella Maris for purposeful teaching, unmistakable pastoral care, Gospel-centred formation, sporting and cultural richness, partnerships with parish, specialised support pathways, manageable class sizes, and transparent communication — anchored in manaakitanga.",
  feesTitle: "Fees & donations",
  feesDescription:
    "State-integrated attendance dues, curriculum charges, and voluntary contributions — keep the latest details in one place and confirm amounts with the office before submitting an application.",
  documentsIntro:
    "Start with the current enrolment resources, then contact the office to confirm preference requirements, timing, and any supporting documents.",
  ctaHeading: "Ready to enrol or still deciding?",
  ctaBody:
    "Book a personalised tour and ask questions confidently — enrolment thrives on relationships.",
} as const;

export const absencesPageFallback = {
  heroSubtitle:
    "Clear processes help us keep learners safe and support regular attendance.",
  intro:
    "Please let us know when your child will be away — whether for illness, appointments, or family reasons. Timely communication helps teachers plan learning and ensures we can follow up on unexplained absences with care.",
  attendanceTitle: "Attendance expectations",
  attendanceDescription:
    "Regular attendance supports learning, wellbeing, and belonging. We work alongside whānau when patterns of absence need attention, following our attendance management plan and Ministry of Education guidance.",
  ctaHeading: "Questions about attendance?",
  ctaBody:
    "Contact the office for absence reporting, appointments, or support with attendance patterns.",
} as const;

export function pickCopy<T extends Record<string, string>>(
  cms: Partial<T> | null | undefined,
  fallback: T,
): T {
  const out = { ...fallback };
  if (!cms) return out;
  for (const key of Object.keys(fallback) as (keyof T)[]) {
    const value = cms[key];
    if (typeof value === "string" && value.trim()) {
      out[key] = value.trim() as T[keyof T];
    }
  }
  return out;
}
