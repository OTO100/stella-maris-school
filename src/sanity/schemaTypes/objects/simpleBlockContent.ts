import { defineArrayMember, defineType } from "sanity";

/** Constrained rich text for static page sections — paragraphs, lists, links, bold only. */
export const simpleBlockContent = defineType({
  name: "simpleBlockContent",
  title: "Text",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [{ title: "Normal", value: "normal" }],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Number", value: "number" },
      ],
      marks: {
        decorators: [{ title: "Strong", value: "strong" }],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              {
                name: "href",
                type: "url",
                title: "URL",
                validation: (Rule) => Rule.uri({ allowRelative: true }),
              },
            ],
          },
        ],
      },
    }),
  ],
});
