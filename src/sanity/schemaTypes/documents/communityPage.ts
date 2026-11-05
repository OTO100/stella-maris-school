import { defineArrayMember, defineField, defineType } from "sanity";

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
      rows: 6,
      description: "Leave an empty line between paragraphs.",
    }),
    defineField({
      name: "boardMembers",
      title: "Board members",
      type: "array",
      description: "Shown in the order listed here.",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "role",
              title: "Role",
              type: "string",
              description: "Optional, e.g. Presiding Member.",
            }),
          ],
          preview: { select: { title: "name", subtitle: "role" } },
        }),
      ],
    }),
    defineField({
      name: "ptfaHelpText",
      title: "PTFA “get in touch” link text",
      type: "string",
      description: "Defaults to “Get in touch about helping”. Emails the PTFA address in Site settings.",
    }),
    defineField({
      name: "boardMinutesText",
      title: "Board meeting minutes text",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "boardMeetingText",
      title: "Board meeting attendance text",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "strategicPlanFile",
      title: "Strategic and Annual Plan",
      type: "file",
      options: { accept: ".pdf,.doc,.docx" },
    }),
    defineField({
      name: "attendancePlanFile",
      title: "Attendance Management Plan",
      type: "file",
      options: { accept: ".pdf,.doc,.docx" },
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
