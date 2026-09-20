import { defineArrayMember, defineField, defineType } from "sanity";

export const sectionLinks = defineType({
  name: "sectionLinks",
  title: "Section links",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      description: "Optional heading above the card grid",
    }),
    defineField({
      name: "columns",
      title: "Columns",
      type: "number",
      initialValue: 3,
      options: {
        list: [
          { title: "2 columns", value: 2 },
          { title: "3 columns", value: 3 },
          { title: "4 columns", value: 4 },
        ],
        layout: "radio",
        direction: "horizontal",
      },
    }),
    defineField({
      name: "cards",
      title: "Cards",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "sectionLinkCard",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "body",
              title: "Description",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "link",
              title: "Link",
              type: "linkItem",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "body" },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: { title: "heading", cards: "cards" },
    prepare({ title, cards }) {
      const count = Array.isArray(cards) ? cards.length : 0;
      return {
        title: title?.trim() || "Section links",
        subtitle: `${count} card${count === 1 ? "" : "s"}`,
      };
    },
  },
});
