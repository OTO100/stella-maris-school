import { defineField, defineType } from "sanity";

export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  groups: [{ name: "content", title: "Details", default: true }],
  fields: [
    defineField({
      name: "title",
      title: "Event title",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "startAt",
      title: "Date and time",
      type: "datetime",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      group: "content",
      description: "e.g. School hall",
    }),
    defineField({
      name: "summary",
      title: "Short description",
      type: "text",
      rows: 3,
      group: "content",
      description: "Shown in lists — keep brief",
    }),
    defineField({
      name: "body",
      title: "Event details",
      type: "blockContent",
      group: "content",
      description:
        "Optional page content for whānau who need more context, instructions, or links.",
    }),
    defineField({
      name: "linkUrl",
      title: "More info link (optional)",
      type: "url",
      group: "content",
      description: "Opens in a new tab",
    }),
  ],
  preview: {
    select: { title: "title", date: "startAt", slug: "slug.current" },
    prepare({ title, date, slug }) {
      const d = date
        ? new Date(date).toLocaleString("en-NZ", {
            dateStyle: "medium",
            timeStyle: "short",
          })
        : "";
      return {
        title: title ?? "Event",
        subtitle: [d, slug ? `/events/${slug}` : ""].filter(Boolean).join(" · "),
      };
    },
  },
});
