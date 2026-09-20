import type { StructureResolver } from "sanity/structure";

const ORDERED_DOCUMENT_TYPES = [
  "downloadableResource",
  "staff",
] as const;

const STATIC_PAGE_SINGLETONS = [
  { id: "aboutPage", title: "Our School copy", schema: "aboutPage" },
  { id: "learningPage", title: "Our learning copy", schema: "learningPage" },
  { id: "communityPage", title: "Our Community copy", schema: "communityPage" },
  { id: "staffPage", title: "Staff page copy", schema: "staffPage" },
  { id: "enrolmentPage", title: "Enrolment page copy", schema: "enrolmentPage" },
  { id: "absencesPage", title: "Absences page copy", schema: "absencesPage" },
  { id: "parishPage", title: "Parish page copy", schema: "parishPage" },
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
      S.divider(),
      S.listItem()
        .title("Page copy (main sections)")
        .child(
          S.list()
            .title("Page copy")
            .items(
              STATIC_PAGE_SINGLETONS.map((row) =>
                S.listItem()
                  .title(row.title)
                  .id(`${row.id}Singleton`)
                  .child(
                    S.document()
                      .schemaType(row.schema)
                      .documentId(row.id)
                      .title(row.title),
                  ),
              ),
            ),
        ),
      S.documentTypeListItem("downloadableResource").title(
        "Reports & downloads",
      ),
      S.documentTypeListItem("staff").title("Staff"),
      ...S.documentTypeListItems().filter(
        (item) =>
          ![
            "siteSettings",
            "navigation",
            "aboutPage",
            "communityPage",
            "enrolmentPage",
            "absencesPage",
            "learningPage",
            "staffPage",
            "parishPage",
            "newsPost",
            "event",
            "testimonial",
            "page",
            ...ORDERED_DOCUMENT_TYPES,
          ].includes(item.getId() ?? ""),
      ),
    ]);
