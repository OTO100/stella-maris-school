import { defineField, defineType } from "sanity";

export const communityPage = defineType({
  name: "communityPage",
  title: "Community page",
  type: "document",
  fields: [
    defineField({
      name: "heroSubtitle",
      title: "Hero subtitle",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "staffIntro",
      title: "Staff section intro",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "ptfaTitle",
      title: "PTFA section title",
      type: "string",
    }),
    defineField({
      name: "ptfaDescription",
      title: "PTFA section text",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "boardTitle",
      title: "School board title",
      type: "string",
    }),
    defineField({
      name: "boardDescription",
      title: "School board text",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "reportsIntro",
      title: "Plans and reports intro",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    prepare() {
      return { title: "Community page copy" };
    },
  },
});
