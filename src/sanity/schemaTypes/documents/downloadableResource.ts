import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const downloadableResource = defineType({
  name: "downloadableResource",
  title: "Resource / download",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      initialValue: "general",
      options: {
        list: [
          { title: "ERO report", value: "ero" },
          { title: "Policy", value: "policy" },
          { title: "Enrolment form", value: "enrolment" },
          { title: "Newsletter", value: "newsletter" },
          { title: "General", value: "general" },
        ],
        layout: "dropdown",
      },
    }),
    defineField({
      name: "publishedAt",
      title: "Published",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "file",
      title: "File",
      type: "file",
      options: {
        accept: ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Show at the top of the Resources page.",
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: "Published date (newest)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      category: "category",
      publishedAt: "publishedAt",
    },
    prepare({ title, category, publishedAt }) {
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString("en-NZ")
        : "";
      return {
        title: title ?? "Resource",
        subtitle: [category, date].filter(Boolean).join(" · "),
      };
    },
  },
});
