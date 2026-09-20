import { defineField, defineType } from "sanity";

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
