import { defineField, defineType } from "sanity";

import { SITE_ROUTE_OPTIONS } from "@/lib/site-routes";

const destinationList = [
  { title: "Site page (menu route)", value: "siteRoute" },
  { title: "CMS page (custom slug)", value: "cmsPage" },
  { title: "News post", value: "newsPost" },
  { title: "File download (PDF, etc.)", value: "file" },
  { title: "External URL", value: "external" },
] as const;

export const linkItem = defineType({
  name: "linkItem",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "linkDestination",
      title: "Links to",
      type: "string",
      initialValue: "siteRoute",
      options: {
        list: [...destinationList],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "siteRoute",
      title: "Page",
      type: "string",
      description: "Built-in site sections (no CMS page needed).",
      options: {
        list: SITE_ROUTE_OPTIONS.map(({ title, value }) => ({ title, value })),
        layout: "dropdown",
      },
      initialValue: "/about",
      hidden: ({ parent }) => parent?.linkDestination !== "siteRoute",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { linkDestination?: string };
          if (parent?.linkDestination !== "siteRoute") return true;
          if (!value) return "Select a page";
          return true;
        }),
    }),
    defineField({
      name: "page",
      title: "CMS page",
      type: "reference",
      to: [{ type: "page" }],
      hidden: ({ parent }) => parent?.linkDestination !== "cmsPage",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { linkDestination?: string };
          if (parent?.linkDestination !== "cmsPage") return true;
          if (!value) return "Select a page";
          return true;
        }),
    }),
    defineField({
      name: "newsPost",
      title: "News post",
      type: "reference",
      to: [{ type: "newsPost" }],
      hidden: ({ parent }) => parent?.linkDestination !== "newsPost",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { linkDestination?: string };
          if (parent?.linkDestination !== "newsPost") return true;
          if (!value) return "Select a news post";
          return true;
        }),
    }),
    defineField({
      name: "file",
      title: "File",
      type: "file",
      options: {
        accept: ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx",
      },
      hidden: ({ parent }) => parent?.linkDestination !== "file",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { linkDestination?: string };
          if (parent?.linkDestination !== "file") return true;
          if (!value) return "Upload a file";
          return true;
        }),
    }),
    defineField({
      name: "href",
      title: "URL",
      type: "string",
      description: "Full URL (https://…)",
      hidden: ({ parent }) => parent?.linkDestination !== "external",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { linkDestination?: string };
          if (parent?.linkDestination !== "external") return true;
          if (!value?.trim()) return "Enter a URL";
          return true;
        }),
    }),
    defineField({
      name: "openInNewTab",
      title: "Open in new tab",
      type: "boolean",
      initialValue: false,
      description:
        "For external links and downloads. Internal pages usually open in the same tab.",
    }),
  ],
  preview: {
    select: {
      title: "label",
      linkDestination: "linkDestination",
      siteRoute: "siteRoute",
      href: "href",
    },
    prepare({ title, linkDestination, siteRoute, href }) {
      const dest = linkDestination ?? "siteRoute";
      let subtitle = "";
      switch (dest) {
        case "siteRoute":
          subtitle = siteRoute ?? "Site route";
          break;
        case "cmsPage":
          subtitle = "CMS page";
          break;
        case "newsPost":
          subtitle = "News post";
          break;
        case "file":
          subtitle = "File";
          break;
        case "external":
          subtitle = href ?? "External";
          break;
        default:
          subtitle = String(dest);
      }
      return {
        title: title ?? "Link",
        subtitle,
      };
    },
  },
});
