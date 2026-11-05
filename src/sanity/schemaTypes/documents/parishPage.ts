import { defineField, defineType } from "sanity";

export const parishPage = defineType({
  name: "parishPage",
  title: "Parish page",
  type: "document",
  fields: [
    defineField({
      name: "heroSubtitle",
      title: "Hero subtitle",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "sectionTitle",
      title: "School and parish heading",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "School and parish text",
      type: "text",
      rows: 8,
      description: "Separate paragraphs with a blank line.",
    }),
    defineField({
      name: "massTimes",
      title: "Mass times",
      type: "text",
      rows: 5,
      description: "One line per Mass.",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Parish page copy" };
    },
  },
});
