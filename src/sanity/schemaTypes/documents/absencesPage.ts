import { defineArrayMember, defineField, defineType } from "sanity";

export const absencesPage = defineType({
  name: "absencesPage",
  title: "Absences page",
  type: "document",
  fields: [
    defineField({
      name: "heroSubtitle",
      title: "Hero subtitle",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "intro",
      title: "Introduction",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "methodsTitle",
      title: "Ways to report heading",
      type: "string",
      description: "Defaults to “Two ways to report an absence”.",
    }),
    defineField({
      name: "whatToTell",
      title: "What to tell us (checklist)",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "attendanceTitle",
      title: "Attendance section title",
      type: "string",
    }),
    defineField({
      name: "attendanceDescription",
      title: "Attendance section text",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "attendanceBody",
      title: "Attendance section body",
      type: "blockContent",
      description: "Replaces the built-in paragraphs under the attendance heading.",
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
      return { title: "Absences page copy" };
    },
  },
});
