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
      name: "ourLadyImage",
      title: "Our Lady image",
      type: "image",
      description: "Shown under the Special character heading.",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Alt text" }),
        defineField({
          name: "caption",
          type: "string",
          title: "Caption",
          description:
            "Defaults to “Madonna at Prayer — Giovanni Battista Salvi da Sassoferrato”.",
        }),
      ],
    }),
    defineField({
      name: "parentInfoCards",
      title: "Parent information cards",
      type: "array",
      description:
        "Cards under “Parent information”. If empty, the built-in defaults are used.",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "key",
              title: "Anchor id",
              type: "string",
              description: "Optional, e.g. fees or apps (used for #links).",
            }),
            defineField({
              name: "title",
              type: "string",
              title: "Title",
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: "body", type: "text", title: "Text", rows: 4 }),
            defineField({
              name: "links",
              type: "array",
              title: "Links",
              of: [
                defineArrayMember({
                  type: "object",
                  fields: [
                    defineField({
                      name: "label",
                      type: "string",
                      title: "Link label",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "url",
                      type: "string",
                      title: "URL",
                      description: "A full https:// address or a /page path.",
                    }),
                    defineField({
                      name: "file",
                      type: "file",
                      title: "Or an uploaded file",
                      description: "Used instead of the URL when set.",
                    }),
                  ],
                  preview: { select: { title: "label", subtitle: "url" } },
                }),
              ],
            }),
          ],
          preview: { select: { title: "title", subtitle: "body" } },
        }),
      ],
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
