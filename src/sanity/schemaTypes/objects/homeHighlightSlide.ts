import { defineField, defineType } from "sanity";

export const homeHighlightSlide = defineType({
  name: "homeHighlightSlide",
  title: "Home highlight slide",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      description:
        "Optional photo for this highlight card. Leave empty to use the fallback colour treatment.",
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
      name: "published",
      title: "Published",
      type: "boolean",
      description: "Turn off to hide this slide without deleting it.",
      initialValue: true,
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "linkItem",
      validation: (Rule) => Rule.required(),
      description:
        "Where the card links to. The site shows “Learn more” on the card; use Label for accessible link text (e.g. include this slide’s title).",
    }),
  ],
  preview: {
    select: { title: "title", published: "published" },
    prepare({ title, published }) {
      return {
        title: title ?? "Slide",
        subtitle: published === false ? "Hidden" : undefined,
      };
    },
  },
});
