import type { StructureResolver } from "sanity/structure";

const ORDERED_DOCUMENT_TYPES = [
  "newsPost",
  "downloadableResource",
  "event",
  "staff",
  "testimonial",
  "page",
] as const;

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site settings")
        .id("siteSettingsSingleton")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Site settings"),
        ),
      S.listItem()
        .title("Navigation")
        .id("navigationSingleton")
        .child(
          S.document()
            .schemaType("navigation")
            .documentId("navigation")
            .title("Navigation"),
        ),
      S.documentTypeListItem("newsPost").title("News"),
      S.documentTypeListItem("downloadableResource").title(
        "Reports & downloads",
      ),
      S.documentTypeListItem("event").title("Events"),
      S.documentTypeListItem("staff").title("Staff"),
      S.documentTypeListItem("testimonial").title("Testimonials"),
      S.divider(),
      S.documentTypeListItem("page").title("CMS pages (advanced)"),
      ...S.documentTypeListItems().filter(
        (item) =>
          ![
            "siteSettings",
            "navigation",
            ...ORDERED_DOCUMENT_TYPES,
          ].includes(item.getId() ?? ""),
      ),
    ]);
