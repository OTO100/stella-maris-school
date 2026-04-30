import { defineField, defineType } from "sanity";

import { INNER_PAGE_OPTIONS } from "@/lib/inner-page-hero";

export const innerPageHero = defineType({
  name: "innerPageHero",
  title: "Page banner",
  type: "object",
  fields: [
    defineField({
      name: "pageKey",
      title: "Page",
      type: "string",
      options: {
        list: [...INNER_PAGE_OPTIONS],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Background image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt text",
          description: "Short description for accessibility",
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { pageKey: "pageKey", media: "image" },
    prepare({ pageKey, media }) {
      const label =
        INNER_PAGE_OPTIONS.find((p) => p.value === pageKey)?.title ?? pageKey;
      return { title: label, subtitle: "Title banner background", media };
    },
  },
});
