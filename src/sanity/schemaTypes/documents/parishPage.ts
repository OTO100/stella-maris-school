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
  ],
  preview: {
    prepare() {
      return { title: "Parish page copy" };
    },
  },
});
