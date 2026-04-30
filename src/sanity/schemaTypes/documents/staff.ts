import { defineField, defineType } from "sanity";

export const staff = defineType({
  name: "staff",
  title: "Staff member",
  type: "document",
  groups: [{ name: "content", title: "Profile", default: true }],
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      group: "content",
      description: "e.g. Teacher — Year 3",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt text",
        }),
      ],
    }),
    defineField({
      name: "bio",
      title: "Short bio",
      type: "text",
      rows: 5,
      group: "content",
      description: "Optional — shown on profiles",
    }),
    defineField({
      name: "sortOrder",
      title: "Order on page",
      type: "number",
      group: "content",
      description: "Lower numbers appear first",
      initialValue: 100,
      validation: (Rule) => Rule.integer().min(0),
    }),
  ],
  orderings: [
    {
      title: "Manual order",
      name: "sortOrderAsc",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
    {
      title: "Name",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "photo",
    },
  },
});
