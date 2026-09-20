/** Editorial fallbacks when Sanity fields are empty — replace via Studio when ready. */
export type HomeCarouselSlide = {
  id: string;
  title: string;
  description?: string;
  href?: string;
  image?: {
    asset?: { _ref?: string };
    _type?: string;
    alt?: string;
  } | null;
};

export const defaultSchoolCopy = {
  tagline:
    "A welcoming Catholic primary school in Silverdale — state integrated, co-educational, nurturing curious minds and faithful hearts.",
  intro:
    "Nau mai, haere mai. At Stella Maris Catholic Primary School we walk alongside whānau to grow confident, kind young people. Our learners are encouraged to aim high, serve others, and take pride in who they are — grounded in Gospel values, strong teaching, and a close-knit community.",
  specialCharacter:
    "Our Catholic special character is lived every day: in prayer and liturgy, religious education, and the way we treat one another. We strive to be a place where tamariki experience the love of God through caring relationships, clear expectations, and opportunities to lead and serve.",
  homeHeroEyebrow: "Silverdale, Auckland · Years 1–6",
  homeHeroTitle: "Stella Maris Catholic Primary School",
  homeHeroSubtitle:
    "We follow Jesus' way and live the Marian Values — and in doing so, we shine for God.",
  whenuaAcknowledgement:
    "We honour Te Tiriti o Waitangi and acknowledge the mana whenua of this rohe. We are committed to partnership, protection, and participation in our learning community.",
  newsEmpty:
    "We post regular updates for whānau here. Check back soon, or connect through Hero and our school newsletter for day-to-day news.",
  principalMessagePreview:
    "Thank you for your interest in Stella Maris. Our community is based on family — students, teachers, parents, and whānau joining together, wholeheartedly committed to our young people's education. We combine strong learning with spiritual formation, culture, and sport, underpinned by Gospel and Marian values, so each child can grow in confidence, resilience, and care for others. I look forward to welcoming you and your family.",
  homeCarouselSlides: [
    {
      id: "learning",
      title: "Learning that lifts every child",
      description:
        "Structured literacy, inquiry, and inclusive support — grounded in the Marian Values.",
      href: "/about/our-learning",
    },
    {
      id: "community",
      title: "A community you can feel",
      description:
        "Parish links, PTFA moments, and events that bring whānau together across the year.",
      href: "/community",
    },
    {
      id: "enrolment",
      title: "Begin your enrolment journey",
      description:
        "Clear steps, honest conversations, and a warm welcome for new families.",
      href: "/enrolment",
    },
    {
      id: "faith",
      title: "Faith in everyday life",
      description:
        "Prayer, liturgy, and religious education shape how we learn and treat one another.",
      href: "/about",
    },
  ] satisfies HomeCarouselSlide[],
} as const;
