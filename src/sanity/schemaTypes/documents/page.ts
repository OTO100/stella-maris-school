import { defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "layout",
      title: "Page type",
      type: "string",
      group: "content",
      initialValue: "content",
      options: {
        list: [
          { title: "Content page", value: "content" },
          { title: "Hub page (card grid)", value: "hub" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt text",
        }),
      ],
    }),
    defineField({
      name: "excerpt",
      title: "Subtitle",
      type: "text",
      rows: 3,
      group: "content",
      description: "Shown under the page title in the hero banner",
    }),
    defineField({
      name: "lead",
      title: "Introduction",
      type: "text",
      rows: 4,
      group: "content",
      description: "Short intro paragraph below the hero",
    }),
    defineField({
      name: "hubCardsHeading",
      title: "Card grid heading",
      type: "string",
      group: "content",
      hidden: ({ document }) => document?.layout !== "hub",
    }),
    defineField({
      name: "hubCards",
      title: "Topic cards",
      type: "array",
      group: "content",
      of: [{ type: "hubCard" }],
      hidden: ({ document }) => document?.layout !== "hub",
    }),
    defineField({
      name: "sections",
      title: "Content sections",
      type: "array",
      group: "content",
      of: [{ type: "pageSection" }],
      hidden: ({ document }) => document?.layout !== "content",
    }),
    defineField({
      name: "resources",
      title: "Downloads & links",
      type: "array",
      group: "content",
      of: [{ type: "pageResource" }],
      hidden: ({ document }) => document?.layout !== "content",
    }),
    defineField({
      name: "seoTitle",
      title: "SEO title",
      type: "string",
      group: "seo",
      description: "Overrides the page title in browser tab and search",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "text",
      rows: 3,
      group: "seo",
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "ogImage",
      title: "Social share image",
      type: "image",
      group: "seo",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "title", slug: "slug.current", layout: "layout" },
    prepare({ title, slug, layout }) {
      const typeLabel = layout === "hub" ? "Hub" : "Content";
      return {
        title: title ?? "Untitled",
        subtitle: slug ? `/${slug} · ${typeLabel}` : typeLabel,
      };
    },
  },
});
