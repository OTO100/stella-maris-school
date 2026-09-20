import { defineField, defineType } from "sanity";

const STAFF_GROUPS = [
  { title: "Senior leadership team", value: "slt" },
  { title: "School office", value: "office" },
  { title: "Mārama Team — Years 0–3", value: "marama" },
  { title: "Ahi Team — Years 4–6", value: "ahi" },
  { title: "Support staff", value: "support" },
  { title: "Teacher aide", value: "aide" },
  { title: "School board", value: "board" },
  { title: "PTFA", value: "ptfa" },
];

function groupsOf(document: { group?: string[] } | undefined) {
  return document?.group ?? [];
}

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
      description: "e.g. Principal, Teacher — optional for teacher aides",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: "group",
      title: "Groups",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
      initialValue: ["marama"],
      options: { list: STAFF_GROUPS },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "className",
      title: "Class",
      type: "string",
      group: "content",
      description: "Saint name, e.g. St Lucy",
      hidden: ({ document }) =>
        !groupsOf(document as { group?: string[] }).some((g) =>
          ["marama", "ahi"].includes(g),
        ),
    }),
    defineField({
      name: "yearLevel",
      title: "Year level",
      type: "string",
      group: "content",
      options: {
        list: ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5", "Year 6"],
      },
      hidden: ({ document }) =>
        !groupsOf(document as { group?: string[] }).some((g) =>
          ["marama", "ahi"].includes(g),
        ),
    }),
    defineField({
      name: "isTeamLeader",
      title: "Team leader",
      type: "boolean",
      group: "content",
      initialValue: false,
    }),
    defineField({
      name: "showOnContact",
      title: "Show on Contact page",
      type: "boolean",
      group: "content",
      initialValue: false,
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
    }),
    defineField({
      name: "sortOrder",
      title: "Order on page",
      type: "number",
      group: "content",
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
