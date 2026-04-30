import { defineQuery } from "next-sanity";

const linkItemFields = /* groq */ `
  label,
  linkDestination,
  linkType,
  siteRoute,
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
    innerPageHeroes[]{ pageKey, image },
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
    footerLinks[]{${linkItemFields}},
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
    excerpt,
    heroImage,
    body,
    seoTitle,
    seoDescription,
    ogImage
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
    publishedAt,
    description,
    featured,
    "fileUrl": file.asset->url,
    "fileName": file.asset->originalFilename
  }
`);

export const STAFF_MEMBERS_QUERY = defineQuery(`
  *[_type == "staff"] | order(sortOrder asc, name asc)[0...12]{
    _id,
    name,
    role,
    bio,
    photo
  }
`);
