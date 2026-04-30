import type { Metadata } from "next";

import type { EventPreviewItem } from "@/components/events-preview";
import { EventsPreview } from "@/components/events-preview";
import { NewsCardList } from "@/components/news-cards";
import { PageHero } from "@/components/page-hero";
import { defaultSchoolCopy } from "@/lib/default-copy";
import { innerPageHeroBackground, type InnerPageHeroRow } from "@/lib/inner-page-hero";
import { sanityFetch } from "@/sanity/lib/live";
import { NEWS_POSTS_LIST_QUERY, SITE_SETTINGS_QUERY, UPCOMING_EVENTS_QUERY } from "@/sanity/lib/queries";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  let school = "Stella Maris Catholic Primary School";
  try {
    const { data } = await sanityFetch({
      query: SITE_SETTINGS_QUERY,
      stega: false,
    });
    if (data?.schoolName) school = data.schoolName;
  } catch {
    /* */
  }
  return {
    title: "News & events",
    description: `News and updates from ${school}`,
  };
}

export default async function NewsIndexPage() {
  let posts: import("@/components/news-cards").NewsTeaser[] = [];
  let upcomingEvents: EventPreviewItem[] = [];
  let innerPageHeroes: InnerPageHeroRow[] | undefined;
  try {
    const [newsResult, settingsResult, eventsResult] = await Promise.all([
      sanityFetch({
        query: NEWS_POSTS_LIST_QUERY,
        stega: false,
      }),
      sanityFetch({
        query: SITE_SETTINGS_QUERY,
        stega: false,
      }),
      sanityFetch({
        query: UPCOMING_EVENTS_QUERY,
        stega: false,
      }),
    ]);
    posts = (newsResult.data ?? []) as import("@/components/news-cards").NewsTeaser[];
    upcomingEvents = (eventsResult.data ?? []) as EventPreviewItem[];
    innerPageHeroes = settingsResult.data?.innerPageHeroes as
      | InnerPageHeroRow[]
      | undefined;
  } catch {
    /* */
  }

  const banner = innerPageHeroBackground(innerPageHeroes, "news");

  return (
    <div>
      <PageHero
        eyebrow="Whānau updates"
        title="News & events"
        subtitle="Stories, reminders, and key dates for our school community."
        backgroundImageSrc={banner?.src}
        backgroundImageAlt={banner?.alt}
      />
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-16">
        <section>
          <div className="mb-8 flex flex-col justify-between gap-4 border-b border-[var(--color-border)] pb-6 sm:flex-row sm:items-end">
            <div>
              <p className="section-eyebrow text-[var(--color-accent)]">
                Calendar
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-[var(--color-heading)]">
                Upcoming events
              </h2>
            </div>
          </div>
          <EventsPreview
            events={upcomingEvents}
            emptyMessage="Upcoming dates will be shared here, through Hero, and in the school newsletter."
          />
        </section>

        <section className="mt-16">
          <div className="mb-8 flex flex-col justify-between gap-4 border-b border-[var(--color-border)] pb-6 sm:flex-row sm:items-end">
            <div>
              <p className="section-eyebrow text-[var(--color-accent)]">
                Updates
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-[var(--color-heading)]">
                Latest news
              </h2>
            </div>
          </div>
          <NewsCardList items={posts} />
        </section>
        {!posts.length ? (
          <div className="rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-cream)]/50 px-6 py-14 text-center">
            <p className="text-[var(--color-ink-muted)]">
              {defaultSchoolCopy.newsEmpty}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
