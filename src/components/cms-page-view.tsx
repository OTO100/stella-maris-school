import { CardGrid } from "@/components/card-grid";
import { PageHero } from "@/components/page-hero";
import { PortableTextBlock } from "@/components/portable-text";
import { PageIntro, Section, SectionHeading } from "@/components/section";
import { resolveLinkItem, type LinkItemResolved } from "@/lib/nav-href";

export type CmsPageResource = {
  label?: string | null;
  description?: string | null;
  url?: string | null;
  fileUrl?: string | null;
  fileName?: string | null;
};

export type CmsPageSection = {
  heading?: string | null;
  body?: unknown;
};

export type CmsPageHubCard = {
  title?: string | null;
  body?: string | null;
  link?: LinkItemResolved | null;
};

export type CmsPageData = {
  title: string;
  heroEyebrow?: string | null;
  heroTitle?: string | null;
  excerpt?: string | null;
  lead?: string | null;
  layout?: string | null;
  heroImageSrc?: string | null;
  heroImageAlt?: string;
  hubCardsHeading?: string | null;
  hubCards?: CmsPageHubCard[] | null;
  sections?: CmsPageSection[] | null;
  resources?: CmsPageResource[] | null;
};

function hubCardsToGrid(cards: CmsPageHubCard[] | null | undefined) {
  if (!cards?.length) return [];
  const items = [];
  for (const card of cards) {
    const title = card.title?.trim();
    if (!title) continue;
    const resolved = resolveLinkItem(card.link ?? undefined);
    items.push({
      title,
      body: card.body?.trim() || null,
      href: resolved?.href ?? null,
      linkLabel: resolved?.label ?? "Learn more",
    });
  }
  return items;
}

export function CmsPageView({ page }: { page: CmsPageData }) {
  const layout = page.layout === "hub" ? "hub" : "content";
  const hubItems = hubCardsToGrid(page.hubCards);
  const eyebrow = page.heroEyebrow?.trim() || undefined;
  const title = page.heroTitle?.trim() || page.title;

  return (
    <article className="pb-16">
      <PageHero
        eyebrow={eyebrow}
        title={title}
        subtitle={page.excerpt ?? null}
        backgroundImageSrc={page.heroImageSrc}
        backgroundImageAlt={page.heroImageAlt ?? ""}
      />

      {page.lead?.trim() ? (
        <PageIntro>
          <p className="prose-portable max-w-3xl text-lg">{page.lead.trim()}</p>
        </PageIntro>
      ) : null}

      {layout === "hub" ? (
        <Section variant={page.lead?.trim() ? "default" : "wash-alt"}>
          {page.hubCardsHeading?.trim() ? (
            <SectionHeading title={page.hubCardsHeading.trim()} />
          ) : (
            <SectionHeading title="Explore" />
          )}
          <div className="mt-10">
            <CardGrid columns={3} items={hubItems} />
          </div>
        </Section>
      ) : (
        <>
          {(page.sections ?? []).map((section, index) => {
            const heading = section.heading?.trim();
            return (
              <Section
                key={heading ?? `section-${index}`}
                variant={index % 2 === 1 ? "wash-alt" : "default"}
              >
                {heading ? <SectionHeading title={heading} /> : null}
                <div className={heading ? "mt-6" : ""}>
                  <PortableTextBlock value={section.body} />
                </div>
              </Section>
            );
          })}

          {page.resources?.length ? (
            <Section variant="wash">
              <SectionHeading title="Downloads & links" />
              <ul className="mt-8 grid gap-4 md:grid-cols-2">
                {page.resources.map((resource, index) => {
                  const label = resource.label?.trim();
                  if (!label) return null;
                  const href = resource.fileUrl ?? resource.url ?? null;
                  return (
                    <li
                      key={`${label}-${index}`}
                      className="card-surface rounded-2xl p-6"
                    >
                      <h3 className="font-display text-lg font-semibold text-[var(--color-heading)]">
                        {label}
                      </h3>
                      {resource.description?.trim() ? (
                        <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
                          {resource.description.trim()}
                        </p>
                      ) : null}
                      {href ? (
                        <a
                          href={href}
                          className="btn-brand mt-4"
                          {...(resource.fileUrl
                            ? {
                                download: resource.fileName ?? undefined,
                                target: "_blank",
                                rel: "noreferrer noopener",
                              }
                            : resource.url
                              ? {
                                  target: "_blank",
                                  rel: "noreferrer noopener",
                                }
                              : {})}
                        >
                          {resource.fileUrl ? "Download" : "Open link"}
                        </a>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </Section>
          ) : null}
        </>
      )}
    </article>
  );
}
