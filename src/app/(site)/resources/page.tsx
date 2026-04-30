import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/page-hero";
import { innerPageHeroBackground, type InnerPageHeroRow } from "@/lib/inner-page-hero";
import { sanityFetch } from "@/sanity/lib/live";
import { DOWNLOADABLE_RESOURCES_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Resources & downloads",
  description:
    "Policies, reports, enrolment documents, and other downloads for Stella Maris whānau.",
};

const CATEGORY_LABEL: Record<string, string> = {
  ero: "ERO report",
  policy: "Policy",
  enrolment: "Enrolment form",
  newsletter: "Newsletter",
  general: "General",
};

export const revalidate = 60;

type ResourceRow = {
  _id: string;
  title: string | null;
  category: string | null;
  publishedAt: string | null;
  description: string | null;
  featured?: boolean | null;
  fileUrl: string | null;
  fileName: string | null;
};

export default async function ResourcesPage() {
  let rows: ResourceRow[] = [];
  let innerPageHeroes: InnerPageHeroRow[] | undefined;

  try {
    const [resourcesResult, settingsResult] = await Promise.all([
      sanityFetch({
        query: DOWNLOADABLE_RESOURCES_QUERY,
        stega: false,
      }),
      sanityFetch({ query: SITE_SETTINGS_QUERY, stega: false }),
    ]);
    rows = (resourcesResult.data ?? []) as ResourceRow[];
    innerPageHeroes = settingsResult.data?.innerPageHeroes as
      | InnerPageHeroRow[]
      | undefined;
  } catch {
    /* CMS unavailable */
  }

  const banner = innerPageHeroBackground(innerPageHeroes, "resources");

  return (
    <>
      <PageHero
        eyebrow="Whānau"
        title="Resources & downloads"
        subtitle="Letters, policies, reporting documents, and other files published for our community."
        backgroundImageSrc={banner?.src}
        backgroundImageAlt={banner?.alt}
      />
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
        {!rows.length ? (
          <p className="text-[var(--color-ink-muted)]">
            Documents will be published here as they become available. For a
            specific form, policy, or report,{" "}
            <Link
              href="/contact"
              className="font-semibold text-[var(--color-accent)] underline underline-offset-2 hover:text-[var(--color-brand)]"
            >
              contact the office
            </Link>
            .
          </p>
        ) : (
          <ul className="flex flex-col gap-4">
            {rows.map((r) => {
              const cat = r.category
                ? CATEGORY_LABEL[r.category] ?? r.category
                : "General";
              const date =
                r.publishedAt &&
                !Number.isNaN(Date.parse(r.publishedAt))
                  ? new Date(r.publishedAt).toLocaleDateString("en-NZ")
                  : null;
              return (
                <li
                  key={r._id}
                  className="rounded-[var(--radius-hero)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)]"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="section-eyebrow text-[var(--color-accent)]">
                        {cat}
                        {date ? ` · ${date}` : ""}
                        {r.featured ? " · Featured" : ""}
                      </p>
                      <h2 className="mt-2 font-display text-xl font-semibold text-[var(--color-heading)]">
                        {r.title ?? "Untitled"}
                      </h2>
                      {r.description ? (
                        <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-muted)]">
                          {r.description}
                        </p>
                      ) : null}
                    </div>
                    {r.fileUrl ? (
                      <a
                        href={r.fileUrl}
                        download={r.fileName ?? undefined}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="mt-4 inline-flex shrink-0 justify-center rounded-full bg-[var(--color-brand)] px-5 py-2.5 text-sm font-semibold text-[var(--color-cream)] transition hover:bg-[var(--color-brand-muted)] sm:mt-0"
                      >
                        Download
                      </a>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </>
  );
}
