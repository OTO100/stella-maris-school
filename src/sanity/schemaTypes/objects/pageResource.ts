import { defineField, defineType } from "sanity";

export const pageResource = defineType({
  name: "pageResource",
  title: "Download or link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "file",
      title: "File (PDF, etc.)",
      type: "file",
      options: {
        accept: ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx",
      },
    }),
    defineField({
      name: "url",
      title: "External URL",
      type: "url",
      description: "Use instead of a file upload for external links",
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "description" },
  },
});
