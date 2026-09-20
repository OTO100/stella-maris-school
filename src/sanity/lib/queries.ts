import { defineQuery } from "next-sanity";

const linkItemFields = /* groq */ `
  label,
  linkDestination,
  linkType,
  siteRoute,
  anchor,
  href,
  openInNewTab,
  "pageSlug": page->slug.current,
  "newsSlug": newsPost->slug.current,
  "fileUrl": file.asset->url
`;

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings" && _id == "siteSettings"][0]{
    _id,
    _updatedAt,
    schoolName,
    tagline,
    intro,
    homeStats[]{_key, label, value},
    principalMessage,
    principalPhoto,
    homeHeroEyebrow,
    homeHeroTitle,
    homeHeroSubtitle,
    homeCtas[]{${linkItemFields}},
    homeHighlightSlides[]{_key, title, description, published, image, link{${linkItemFields}}},
    homeHeroBackground,
    specialCharacterSummary,
    contactAddress,
    contactEmail,
    contactPhone,
    officeHours,
    facebookUrl,
    heroAppUrl,
    absenceUrl,
    newsletterUrl,
    policiesUrl,
    kindoUrl,
    termDatesUrl,
    eroUrl,
    calendarUrl,
    parishUrl,
    dioceseUrl,
    alertEnabled,
    alertSeverity,
    alertTitle,
    alertMessage,
    alertLinkLabel,
    alertLinkUrl,
    alertStart,
    alertEnd,
    defaultSeoDescription,
    defaultOgImage,
    siteUrl
  }
`);

export const NAVIGATION_QUERY = defineQuery(`
  *[_type == "navigation" && _id == "navigation"][0]{
    primaryNavigation[]{
      _key,
      variant,
      link{${linkItemFields}},
      groupLabel,
      landingLink{${linkItemFields}},
      children[]{${linkItemFields}}
    },
    footerTagline
  }
`);

export const PAGE_SLUGS_QUERY = defineQuery(`
  *[_type == "page" && defined(slug.current)].slug.current
`);

export const PAGE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    _updatedAt,
    title,
    slug,
    layout,
    excerpt,
    lead,
    heroImage,
    hubCardsHeading,
    hubCards[]{
      title,
      body,
      link{${linkItemFields}}
    },
    sections[]{
      heading,
      body
    },
    resources[]{
      label,
      description,
      url,
      "fileUrl": file.asset->url,
      "fileName": file.asset->originalFilename
    },
    seoTitle,
    seoDescription,
    ogImage
  }
`);

export const ABOUT_PAGE_QUERY = defineQuery(`
  *[_type == "aboutPage" && _id == "aboutPage"][0]{
    heroSubtitle,
    principalWelcome,
    specialCharacter,
    specialCharacterQuote,
    specialCharacterQuoteCite,
    encounteringChrist[]{_key, title, body},
    ctaHeading,
    ctaBody
  }
`);

export const COMMUNITY_PAGE_QUERY = defineQuery(`
  *[_type == "communityPage" && _id == "communityPage"][0]{
    heroSubtitle,
    staffIntro,
    ptfaTitle,
    ptfaDescription,
    boardTitle,
    boardDescription,
    reportsIntro
  }
`);

export const ENROLMENT_PAGE_QUERY = defineQuery(`
  *[_type == "enrolmentPage" && _id == "enrolmentPage"][0]{
    heroSubtitle,
    valuePropositionTitle,
    valueProposition,
    whyCards[]{_key, title, body},
    applicationSteps[]{_key, title, body},
    preferenceTitle,
    preferenceBody,
    feesTitle,
    feesDescription,
    feeRows[]{_key, title, body},
    ctaHeading,
    ctaBody
  }
`);

export const LEARNING_PAGE_QUERY = defineQuery(`
  *[_type == "learningPage" && _id == "learningPage"][0]{
    heroSubtitle,
    curriculumTitle,
    curriculumIntro,
    religiousEducation,
    programmesTitle,
    programmes[]{_key, title, years, body},
    environmentsTitle,
    environmentsBody,
    assessmentIntro,
    supportTitle,
    supportBody,
    attendanceNote
  }
`);

export const STAFF_PAGE_QUERY = defineQuery(`
  *[_type == "staffPage" && _id == "staffPage"][0]{
    heroSubtitle,
    teams[]{_key, key, title, yearRange, meaning}
  }
`);

export const ABSENCES_PAGE_QUERY = defineQuery(`
  *[_type == "absencesPage" && _id == "absencesPage"][0]{
    heroSubtitle,
    intro,
    attendanceTitle,
    attendanceDescription,
    ctaHeading,
    ctaBody
  }
`);

export const PARISH_PAGE_QUERY = defineQuery(`
  *[_type == "parishPage" && _id == "parishPage"][0]{
    heroSubtitle,
    sectionTitle,
    body
  }
`);

export const NEWS_POSTS_LIST_QUERY = defineQuery(`
  *[_type == "newsPost"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    heroImage
  }
`);

export const NEWS_POST_SLUGS_QUERY = defineQuery(`
  *[_type == "newsPost" && defined(slug.current)].slug.current
`);

export const NEWS_POST_BY_SLUG_QUERY = defineQuery(`
  *[_type == "newsPost" && slug.current == $slug][0]{
    _id,
    _updatedAt,
    title,
    slug,
    publishedAt,
    excerpt,
    heroImage,
    body,
    seoTitle,
    seoDescription,
    ogImage
  }
`);

export const HOME_NEWS_QUERY = defineQuery(`
  *[_type == "newsPost"] | order(publishedAt desc)[0...3]{
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt
  }
`);

export const UPCOMING_EVENTS_QUERY = defineQuery(`
  *[_type == "event" && startAt >= now()] | order(startAt asc)[0...3]{
    _id,
    title,
    "slug": slug.current,
    startAt,
    location,
    summary,
    linkUrl
  }
`);

export const EVENT_SLUGS_QUERY = defineQuery(`
  *[_type == "event" && defined(slug.current)].slug.current
`);

export const EVENT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "event" && slug.current == $slug][0]{
    _id,
    _updatedAt,
    title,
    "slug": slug.current,
    startAt,
    location,
    summary,
    body,
    linkUrl
  }
`);

export const HOME_TESTIMONIALS_QUERY = defineQuery(`
  *[_type == "testimonial" && published == true] | order(sortOrder asc, _createdAt desc)[0...3]{
    _id,
    quote,
    authorName,
    authorDetail,
    photo,
    sortOrder
  }
`);

export const DOWNLOADABLE_RESOURCES_QUERY = defineQuery(`
  *[_type == "downloadableResource"] | order(featured desc, publishedAt desc) {
    _id,
    title,
    category,
    placement,
    publishedAt,
    description,
    featured,
    "fileUrl": file.asset->url,
    "fileName": file.asset->originalFilename
  }
`);

export const STAFF_MEMBERS_QUERY = defineQuery(`
  *[_type == "staff"] | order(sortOrder asc, name asc){
    _id,
    name,
    role,
    email,
    group,
    className,
    yearLevel,
    isTeamLeader,
    showOnContact,
    bio,
    photo,
    "photoUrl": photo.asset->url,
    sortOrder
  }
`);
