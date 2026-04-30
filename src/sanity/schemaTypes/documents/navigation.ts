import { defineField, defineType } from "sanity";

export const navigation = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    defineField({
      name: "primaryNavigation",
      title: "Primary navigation",
      description:
        "Top bar: single links and/or dropdown groups with submenu items.",
      type: "array",
      of: [{ type: "navPrimaryItem" }],
      validation: (Rule) =>
        Rule.min(1).warning("Add at least one primary nav item"),
    }),
    defineField({
      name: "footerLinks",
      title: "Footer links",
      type: "array",
      of: [{ type: "linkItem" }],
    }),
    defineField({
      name: "footerTagline",
      title: "Footer tagline",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    prepare() {
      return { title: "Navigation" };
    },
  },
});
