import { defineField, defineType } from "sanity";

export const pageSection = defineType({
  name: "pageSection",
  title: "Content section",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Section heading",
      type: "string",
      description: "Optional — leave empty for a text-only block",
    }),
    defineField({
      name: "body",
      title: "Section text",
      type: "simpleBlockContent",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return {
        title: title?.trim() || "Text section",
      };
    },
  },
});
