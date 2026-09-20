import { defineArrayMember, defineField, defineType } from "sanity";

export const staffPage = defineType({
  name: "staffPage",
  title: "Staff page",
  type: "document",
  fields: [
    defineField({
      name: "heroSubtitle",
      title: "Hero subtitle",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "teams",
      title: "Teaching teams",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "key",
              title: "Team",
              type: "string",
              options: {
                list: [
                  { title: "Mārama", value: "marama" },
                  { title: "Ahi", value: "ahi" },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              description: 'e.g. "Mārama Team"',
            }),
            defineField({
              name: "yearRange",
              title: "Year range",
              type: "string",
              description: 'e.g. "Years 0–3"',
            }),
            defineField({
              name: "meaning",
              title: "Meaning",
              type: "text",
              rows: 2,
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "yearRange" },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Staff page copy" };
    },
  },
});
