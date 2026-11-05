import { defineArrayMember, defineField, defineType } from "sanity";

export const enrolmentPage = defineType({
  name: "enrolmentPage",
  title: "Enrolment page",
  type: "document",
  fields: [
    defineField({
      name: "heroSubtitle",
      title: "Hero subtitle",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "valuePropositionTitle",
      title: "Why families choose us — heading",
      type: "string",
    }),
    defineField({
      name: "valueProposition",
      title: "Why families choose us — intro",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "whyCards",
      title: "Why cards",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", title: "Title" }),
            defineField({ name: "body", type: "text", title: "Body", rows: 3 }),
          ],
          preview: { select: { title: "title", subtitle: "body" } },
        }),
      ],
    }),
    defineField({
      name: "applicationSteps",
      title: "How to apply",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", title: "Title" }),
            defineField({ name: "body", type: "text", title: "Body", rows: 3 }),
          ],
          preview: { select: { title: "title", subtitle: "body" } },
        }),
      ],
    }),
    defineField({
      name: "preferenceTitle",
      title: "Preference heading",
      type: "string",
    }),
    defineField({
      name: "preferenceBody",
      title: "Preference and non-preference",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "feesTitle",
      title: "Fees section title",
      type: "string",
    }),
    defineField({
      name: "feesDescription",
      title: "Fees section intro",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "feeRows",
      title: "Fee categories",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", title: "Title" }),
            defineField({ name: "body", type: "text", title: "Body", rows: 2 }),
          ],
          preview: { select: { title: "title", subtitle: "body" } },
        }),
      ],
    }),
    defineField({
      name: "packTitle",
      title: "Enrolment pack heading",
      type: "string",
      initialValue: "Enrolment pack",
    }),
    defineField({
      name: "packIntro",
      title: "Enrolment pack intro",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "packFile",
      title: "Whole pack (single PDF)",
      type: "file",
      options: { accept: ".pdf" },
      description:
        "Optional. One PDF with every document in the pack, for the “Download the whole pack” button.",
    }),
    defineField({
      name: "packDocuments",
      title: "Documents in the pack",
      type: "array",
      description:
        "Pick from Resources / downloads, in the order parents should read them. Update a file once in Resources and it changes everywhere it is used.",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "downloadableResource" }],
        }),
      ],
    }),
    defineField({
      name: "ctaHeading",
      title: "Enquiry band heading",
      type: "string",
    }),
    defineField({
      name: "ctaBody",
      title: "Enquiry band text",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    prepare() {
      return { title: "Enrolment page copy" };
    },
  },
});
