import { defineArrayMember, defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  fields: [
    defineField({
      name: "heroSubtitle",
      title: "Hero subtitle",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "principalWelcome",
      title: "Principal's message",
      type: "blockContent",
      description: "Full principal's message shown on Our School.",
    }),
    defineField({
      name: "specialCharacter",
      title: "Catholic special character",
      type: "blockContent",
    }),
    defineField({
      name: "specialCharacterQuote",
      title: "Special character pull quote",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "specialCharacterQuoteCite",
      title: "Pull quote citation",
      type: "string",
    }),
    defineField({
      name: "encounteringChrist",
      title: "Encountering Christ",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", title: "Title" }),
            defineField({
              name: "body",
              type: "text",
              title: "Description",
              rows: 3,
            }),
          ],
          preview: { select: { title: "title", subtitle: "body" } },
        }),
      ],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: "ctaHeading",
      title: "Bottom CTA heading",
      type: "string",
    }),
    defineField({
      name: "ctaBody",
      title: "Bottom CTA text",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    prepare() {
      return { title: "About page copy" };
    },
  },
});
