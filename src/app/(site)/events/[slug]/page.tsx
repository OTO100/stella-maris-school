import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/page-hero";
import { PortableTextBlock } from "@/components/portable-text";
import { sanityFetch } from "@/sanity/lib/live";
import { EVENT_BY_SLUG_QUERY, EVENT_SLUGS_QUERY } from "@/sanity/lib/queries";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

function formatWhen(iso: string | null | undefined) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleString("en-NZ", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

export async function generateStaticParams() {
  try {
    const { data } = await sanityFetch({
      query: EVENT_SLUGS_QUERY,
      stega: false,
    });
    return ((data ?? []) as string[]).map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  try {
    const { data } = await sanityFetch({
      query: EVENT_BY_SLUG_QUERY,
      params: { slug },
      stega: false,
    });
    if (!data?.title) return {};
    return {
      title: data.title,
      description: data.summary ?? undefined,
      openGraph: {
        title: data.title,
        description: data.summary ?? undefined,
        type: "article",
      },
    };
  } catch {
    return {};
  }
}

export default async function EventPage(props: Props) {
  const { slug } = await props.params;
  const { data } = await sanityFetch({
    query: EVENT_BY_SLUG_QUERY,
    params: { slug },
    stega: false,
  });

  if (!data?.title) notFound();

  const when = formatWhen(data.startAt);

  return (
    <article className="pb-16">
      <PageHero
        eyebrow="School event"
        title={data.title}
        subtitle={data.summary}
      />
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)] sm:p-8">
          <dl className="grid gap-5 sm:grid-cols-2">
            {when ? (
              <div>
                <dt className="section-eyebrow text-[var(--color-accent)]">
                  When
                </dt>
                <dd className="mt-2 text-sm font-semibold text-[var(--color-heading)]">
                  {when}
                </dd>
              </div>
            ) : null}
            {data.location ? (
              <div>
                <dt className="section-eyebrow text-[var(--color-accent)]">
                  Where
                </dt>
                <dd className="mt-2 text-sm font-semibold text-[var(--color-heading)]">
                  {data.location}
                </dd>
              </div>
            ) : null}
          </dl>
          {data.linkUrl ? (
            <a
              href={data.linkUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-8 inline-flex rounded-full bg-[var(--color-brand)] px-5 py-2.5 text-sm font-semibold text-[var(--color-cream)] hover:bg-[var(--color-brand-muted)]"
            >
              More information
            </a>
          ) : null}
        </div>

        {data.body ? (
          <div className="mt-10">
            <PortableTextBlock value={data.body} />
          </div>
        ) : (
          <p className="mt-10 text-[var(--color-ink-muted)]">
            Further details will be shared with whānau through the usual school channels.
          </p>
        )}

        <Link
          href="/news"
          className="mt-10 inline-flex text-sm font-semibold text-[var(--color-accent)] hover:underline"
        >
          Back to news & events
        </Link>
      </section>
    </article>
  );
}
