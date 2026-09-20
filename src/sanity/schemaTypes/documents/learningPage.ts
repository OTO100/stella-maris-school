import { defineArrayMember, defineField, defineType } from "sanity";

export const learningPage = defineType({
  name: "learningPage",
  title: "Our learning page",
  type: "document",
  fields: [
    defineField({
      name: "heroSubtitle",
      title: "Hero subtitle",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "curriculumTitle",
      title: "Curriculum heading",
      type: "string",
    }),
    defineField({
      name: "curriculumIntro",
      title: "Curriculum intro",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "religiousEducation",
      title: "Religious education",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "programmesTitle",
      title: "Literacy and maths heading",
      type: "string",
    }),
    defineField({
      name: "programmes",
      title: "Programme cards",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", title: "Title" }),
            defineField({ name: "years", type: "string", title: "Years" }),
            defineField({
              name: "body",
              type: "text",
              title: "Description",
              rows: 4,
            }),
          ],
          preview: { select: { title: "title", subtitle: "years" } },
        }),
      ],
    }),
    defineField({
      name: "environmentsTitle",
      title: "Responsive environments heading",
      type: "string",
    }),
    defineField({
      name: "environmentsBody",
      title: "Responsive environments",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "assessmentIntro",
      title: "Assessment intro",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "supportTitle",
      title: "Learning support heading",
      type: "string",
    }),
    defineField({
      name: "supportBody",
      title: "Learning support",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "attendanceNote",
      title: "Attendance note",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    prepare() {
      return { title: "Our learning page copy" };
    },
  },
});
