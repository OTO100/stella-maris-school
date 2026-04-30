import type { Metadata } from "next";
import Link from "next/link";

import type { EventPreviewItem } from "@/components/events-preview";
import { EventsPreview } from "@/components/events-preview";
import { PageHero } from "@/components/page-hero";
import { innerPageHeroBackground, type InnerPageHeroRow } from "@/lib/inner-page-hero";
import { sanityFetch } from "@/sanity/lib/live";
import { SITE_SETTINGS_QUERY, UPCOMING_EVENTS_QUERY } from "@/sanity/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Community",
  description:
    "PTFA, events, uniform, partnerships, and how whānau get involved.",
};

export default async function CommunityPage() {
  let facebookUrl: string | undefined;
  let upcomingEvents: EventPreviewItem[] = [];
  let innerPageHeroes: InnerPageHeroRow[] | undefined;
  try {
    const [settingsResult, eventsResult] = await Promise.all([
      sanityFetch({ query: SITE_SETTINGS_QUERY, stega: false }),
      sanityFetch({ query: UPCOMING_EVENTS_QUERY, stega: false }),
    ]);
    facebookUrl = settingsResult.data?.facebookUrl as string | undefined;
    upcomingEvents = (eventsResult.data ?? []) as EventPreviewItem[];
    innerPageHeroes = settingsResult.data?.innerPageHeroes as
      | InnerPageHeroRow[]
      | undefined;
  } catch {
    /* optional */
  }

  const banner = innerPageHeroBackground(innerPageHeroes, "community");

  return (
    <article className="pb-16">
      <PageHero
        eyebrow="Whānau connections"
        title="Community"
        subtitle="Partnerships with parish, PTFA, coaches, helpers, and fundraisers — everyone pitching in strengthens our learners."
        backgroundImageSrc={banner?.src}
        backgroundImageAlt={banner?.alt}
      />

      <section className="mx-auto mt-14 max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="order-2 overflow-hidden rounded-[var(--radius-hero)] border border-[var(--color-border)] bg-[var(--color-cream-deep)] lg:order-1">
            <div
              className="aspect-[4/3] bg-gradient-to-bl from-[var(--color-accent)]/25 to-[var(--color-brand)]/10"
              role="img"
              aria-label="Students and whānau gathering at a school event"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-[var(--color-heading)] sm:text-3xl">
              Parish & voluntary groups
            </h2>
            <p className="mt-5 leading-relaxed text-[var(--color-ink-muted)]">
              Celebrate liturgy together, organise hospitality, support sacramental
              programmes — your parish connection enriches our school life.
            </p>
            {facebookUrl ? (
              <a
                href={facebookUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-6 inline-flex rounded-full bg-[var(--color-brand)] px-6 py-3 text-sm font-semibold text-[var(--color-cream)] hover:bg-[var(--color-brand-muted)]"
              >
                Facebook updates
              </a>
            ) : (
              <p className="mt-6 text-sm text-[var(--color-ink-muted)]">
                Contact the office for the latest community group updates.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-[var(--color-heading)] sm:text-3xl">
          PTFA & fundraising
        </h2>
        <p className="mt-5 max-w-3xl leading-relaxed text-[var(--color-ink-muted)]">
          Volunteers coordinate events — second-hand uniform swaps, quizzes,
          working bees — channelling energy into learner resources and joyous
          school memories.
        </p>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-[var(--color-heading)] sm:text-3xl">
          Uniform
        </h2>
        <p className="mt-5 max-w-3xl leading-relaxed text-[var(--color-ink-muted)]">
          Outfit students with tidy, sun-safe attire that signals belonging —
          supplier links and sizing guidance can anchor here alongside second-hand
          exchanges coordinated by helpers.
        </p>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
        <div className="mb-10 border-b border-[var(--color-border)] pb-8">
          <p className="section-eyebrow text-[var(--color-accent)]">
            Moments that matter
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-[var(--color-heading)] sm:text-3xl">
            School life snapshots
          </h2>
          <p className="mt-4 max-w-3xl text-[var(--color-ink-muted)]">
            Use joyful photography within sections rather than maintaining a lone
            gallery page — authenticity beats polish.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {["Culture", "Sport", "Service"].map((title) => (
            <figure
              key={title}
              className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-card)]"
            >
              <div
                className="aspect-[4/5] bg-gradient-to-t from-[var(--color-heading)]/5 via-[var(--color-cream)] to-[var(--color-gold)]/10"
                role="presentation"
                aria-hidden
              />
              <figcaption className="p-4 text-center text-sm font-semibold text-[var(--color-heading)]">
                {title}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
        <div className="mb-10 flex flex-col justify-between gap-4 border-b border-[var(--color-border)] pb-8 sm:flex-row sm:items-end">
          <div>
            <p className="section-eyebrow text-[var(--color-accent)]">
              Upcoming
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-[var(--color-heading)] sm:text-3xl">
              Featured events
            </h2>
          </div>
          <Link
            href="/news"
            className="inline-flex text-sm font-semibold text-[var(--color-accent)] hover:underline"
          >
            See news & calendars
          </Link>
        </div>
        <EventsPreview events={upcomingEvents} />
      </section>

      <div className="mx-auto mt-16 max-w-6xl px-4 text-center sm:px-6">
        <Link
          href="/contact"
          className="inline-flex rounded-full bg-[var(--color-brand)] px-8 py-3 text-sm font-semibold text-[var(--color-cream)] hover:bg-[var(--color-brand-muted)]"
        >
          Reach the office
        </Link>
      </div>
    </article>
  );
}
