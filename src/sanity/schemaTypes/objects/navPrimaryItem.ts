import { defineField, defineType } from "sanity";

export const navPrimaryItem = defineType({
  name: "navPrimaryItem",
  title: "Primary nav item",
  type: "object",
  fields: [
    defineField({
      name: "variant",
      title: "Type",
      type: "string",
      initialValue: "simple",
      options: {
        list: [
          { title: "Single link", value: "simple" },
          { title: "Dropdown group", value: "group" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "linkItem",
      hidden: ({ parent }) => parent?.variant !== "simple",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { variant?: string };
          if (parent?.variant !== "simple") return true;
          if (!value) return "Add a link";
          return true;
        }),
    }),
    defineField({
      name: "groupLabel",
      title: "Group label",
      type: "string",
      description: "Shown on the bar; opens the submenu (e.g. Learning).",
      hidden: ({ parent }) => parent?.variant !== "group",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { variant?: string };
          if (parent?.variant !== "group") return true;
          if (!value?.trim()) return "Enter a label";
          return true;
        }),
    }),
    defineField({
      name: "landingLink",
      title: "Section overview link (optional)",
      type: "linkItem",
      description: "Optional “Overview” target for the section (e.g. /learning).",
      hidden: ({ parent }) => parent?.variant !== "group",
    }),
    defineField({
      name: "children",
      title: "Submenu links",
      type: "array",
      of: [{ type: "linkItem" }],
      hidden: ({ parent }) => parent?.variant !== "group",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { variant?: string };
          if (parent?.variant !== "group") return true;
          if (!value?.length) return "Add at least one submenu link";
          return true;
        }),
    }),
  ],
  preview: {
    select: { variant: "variant", groupLabel: "groupLabel", linkLabel: "link.label" },
    prepare({ variant, groupLabel, linkLabel }) {
      if (variant === "group") {
        return { title: groupLabel ?? "Group", subtitle: "Dropdown" };
      }
      return { title: linkLabel ?? "Link", subtitle: "Single link" };
    },
  },
});
