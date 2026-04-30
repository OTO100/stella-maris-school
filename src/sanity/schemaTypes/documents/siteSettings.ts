import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "branding", title: "Branding", default: true },
    { name: "home", title: "Homepage" },
    { name: "pageBanners", title: "Page banners" },
    { name: "contact", title: "Contact & social" },
    { name: "alert", title: "Site alert" },
    { name: "seo", title: "SEO defaults" },
  ],
  fields: [
    defineField({
      name: "schoolName",
      title: "School name",
      type: "string",
      group: "branding",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      group: "branding",
    }),
    defineField({
      name: "intro",
      title: "Homepage introduction",
      type: "text",
      rows: 4,
      group: "home",
    }),
    defineField({
      name: "homeStats",
      title: "Homepage facts",
      type: "array",
      group: "home",
      description:
        "Short proof points shown below the home hero, such as year levels or location.",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "value",
              title: "Value",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "value", subtitle: "label" },
          },
        }),
      ],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: "principalMessage",
      title: "Principal message preview",
      type: "text",
      rows: 4,
      group: "home",
      description: "Short quote-style message shown on the home page.",
    }),
    defineField({
      name: "principalPhoto",
      title: "Principal photo",
      type: "image",
      group: "home",
      description: "Portrait shown next to the principal message on the home page.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt text",
          description: "Brief description for screen readers (e.g. name and role)",
        }),
      ],
    }),
    defineField({
      name: "homeHeroEyebrow",
      title: "Home hero eyebrow",
      type: "string",
      group: "home",
      description: "Small line above the main headline (e.g. “Catholic primary”)",
    }),
    defineField({
      name: "homeHeroTitle",
      title: "Home hero headline",
      type: "string",
      group: "home",
      description: "Leave empty to use the school name",
    }),
    defineField({
      name: "homeHeroSubtitle",
      title: "Home hero subtitle",
      type: "text",
      rows: 2,
      group: "home",
    }),
    defineField({
      name: "homeCtas",
      title: "Homepage quick links",
      type: "array",
      group: "home",
      of: [{ type: "linkItem" }],
    }),
    defineField({
      name: "homeHighlightSlides",
      title: "Home highlight carousel",
      type: "array",
      group: "home",
      description:
        "Cards in the “Life at Stella Maris” carousel. Order here is the slide order. If this list is empty, the site uses built-in default slides.",
      of: [{ type: "homeHighlightSlide" }],
    }),
    defineField({
      name: "homeHeroBackground",
      title: "Home hero background",
      type: "image",
      group: "home",
      description:
        "Full-bleed image behind the home headline. Leave empty to use the built-in default.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt text",
          description: "Brief description for screen readers",
        }),
      ],
    }),
    defineField({
      name: "innerPageHeroes",
      title: "Inner page title banners",
      type: "array",
      group: "pageBanners",
      description:
        "Optional background photos behind section titles (About, Learning, etc.). A heavy brand tint is applied on the site.",
      of: [{ type: "innerPageHero" }],
      validation: (Rule) =>
        Rule.custom((rows) => {
          const keys =
            (rows as { pageKey?: string }[] | undefined)
              ?.map((r) => r.pageKey)
              .filter((k): k is string => Boolean(k)) ?? [];
          const seen = new Set<string>();
          for (const k of keys) {
            if (seen.has(k)) {
              return `Each page can only have one banner image. Duplicate: ${k}`;
            }
            seen.add(k);
          }
          return true;
        }),
    }),
    defineField({
      name: "specialCharacterSummary",
      title: "Special character summary",
      type: "text",
      rows: 4,
      group: "home",
      description: "Short Catholic special character snippet for the home page",
    }),
    defineField({
      name: "contactAddress",
      title: "Address",
      type: "text",
      rows: 3,
      group: "contact",
    }),
    defineField({
      name: "contactEmail",
      title: "Email",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "contactPhone",
      title: "Phone",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "officeHours",
      title: "Office hours",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "facebookUrl",
      title: "Facebook URL",
      type: "url",
      group: "contact",
    }),
    defineField({
      name: "heroAppUrl",
      title: "Hero / app URL",
      type: "url",
      group: "contact",
      description: "Link to Hero or your school app",
    }),
    defineField({
      name: "absenceUrl",
      title: "Report absence URL",
      type: "url",
      group: "contact",
      description:
        "Where whānau report absences (e.g. Hero app). Shown in the header and contact page.",
    }),
    defineField({
      name: "newsletterUrl",
      title: "Newsletter signup URL",
      type: "url",
      group: "contact",
    }),
    defineField({
      name: "policiesUrl",
      title: "Policies (SchoolDocs or similar)",
      type: "url",
      group: "contact",
    }),
    defineField({
      name: "alertEnabled",
      title: "Show site alert",
      type: "boolean",
      group: "alert",
      initialValue: false,
    }),
    defineField({
      name: "alertSeverity",
      title: "Alert severity",
      type: "string",
      group: "alert",
      initialValue: "info",
      options: {
        list: [
          { title: "Information", value: "info" },
          { title: "Warning", value: "warning" },
          { title: "Critical", value: "critical" },
        ],
      },
      hidden: ({ document }) => !document?.alertEnabled,
    }),
    defineField({
      name: "alertTitle",
      title: "Alert title",
      type: "string",
      group: "alert",
      hidden: ({ document }) => !document?.alertEnabled,
    }),
    defineField({
      name: "alertMessage",
      title: "Alert message",
      type: "text",
      rows: 4,
      group: "alert",
      hidden: ({ document }) => !document?.alertEnabled,
    }),
    defineField({
      name: "alertLinkLabel",
      title: "Alert link label",
      type: "string",
      group: "alert",
      hidden: ({ document }) => !document?.alertEnabled,
    }),
    defineField({
      name: "alertLinkUrl",
      title: "Alert link URL",
      type: "url",
      group: "alert",
      hidden: ({ document }) => !document?.alertEnabled,
    }),
    defineField({
      name: "alertStart",
      title: "Show from",
      type: "datetime",
      group: "alert",
      hidden: ({ document }) => !document?.alertEnabled,
    }),
    defineField({
      name: "alertEnd",
      title: "Show until",
      type: "datetime",
      group: "alert",
      hidden: ({ document }) => !document?.alertEnabled,
    }),
    defineField({
      name: "defaultSeoDescription",
      title: "Default site description",
      type: "text",
      rows: 3,
      group: "seo",
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "defaultOgImage",
      title: "Default social share image",
      type: "image",
      group: "seo",
      options: { hotspot: true },
    }),
    defineField({
      name: "siteUrl",
      title: "Public site URL",
      type: "url",
      group: "seo",
      description:
        "Canonical site URL (e.g. https://www.stellamaris.school.nz). Used for metadata and JSON-LD.",
      validation: (Rule) =>
        Rule.uri({ scheme: ["http", "https"] }).warning(
          "Set this for correct Open Graph URLs",
        ),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site settings" };
    },
  },
});
