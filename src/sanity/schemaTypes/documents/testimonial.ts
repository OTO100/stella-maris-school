import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  groups: [{ name: "content", title: "Quote", default: true }],
  fields: [
    defineField({
      name: "quote",
      title: "What they said",
      type: "text",
      rows: 6,
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "authorName",
      title: "Name",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "authorDetail",
      title: "Who they are",
      type: "string",
      group: "content",
      description: 'e.g. "Parent · Year 4"',
    }),
    defineField({
      name: "photo",
      title: "Photo (optional)",
      type: "image",
      group: "content",
      options: { hotspot: true },
    }),
    defineField({
      name: "published",
      title: "Show on website",
      type: "boolean",
      initialValue: true,
      group: "content",
    }),
    defineField({
      name: "sortOrder",
      title: "Order on homepage",
      type: "number",
      initialValue: 10,
      group: "content",
      description: "Lower numbers appear first",
    }),
  ],
  preview: {
    select: { title: "authorName", subtitle: "authorDetail", quote: "quote" },
    prepare({ title, subtitle, quote }) {
      const q = quote
        ? String(quote).replace(/\s+/g, " ").slice(0, 80).trim()
        : "";
      return {
        title: title ?? "Testimonial",
        subtitle:
          subtitle && q ? `${subtitle} · “${q}…”` : q ? `“${q}…”` : subtitle,
      };
    },
  },
});
