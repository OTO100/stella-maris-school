import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { HomeHighlightCarousel } from "@/components/home-highlight-carousel";
import { EventsPreview, type EventPreviewItem } from "@/components/events-preview";
import { JsonLd } from "@/components/json-ld";
import { NewsCardList } from "@/components/news-cards";
import {
  TestimonialCards,
  type TestimonialItem,
} from "@/components/testimonial-cards";
import { defaultSchoolCopy, type HomeCarouselSlide } from "@/lib/default-copy";
import { sanityHeroImage } from "@/lib/inner-page-hero";
import type { LinkItemResolved } from "@/lib/nav-href";
import { resolveLinkItem } from "@/lib/nav-href";
import { ogImageMetadata } from "@/lib/metadata-helpers";
import { sanityFetch } from "@/sanity/lib/live";
import {
  HOME_NEWS_QUERY,
  HOME_TESTIMONIALS_QUERY,
  SITE_SETTINGS_QUERY,
  UPCOMING_EVENTS_QUERY,
} from "@/sanity/lib/queries";

const fallback = {
  schoolName: "Stella Maris Catholic Primary School",
  tagline: defaultSchoolCopy.tagline,
  intro: defaultSchoolCopy.intro,
};

type CmsHomeHighlightRow = {
  _key?: string;
  title?: string | null;
  description?: string | null;
  published?: boolean | null;
  link?: LinkItemResolved | null;
  image?: HomeCarouselSlide["image"];
};

type HomeStat = {
  key: string;
  label: string;
  value: string;
};

type CmsHomeStatRow = {
  _key?: string;
  label?: string | null;
  value?: string | null;
};

const fallbackHomeStats: HomeStat[] = [
  { key: "years", label: "Years", value: "1 – 6" },
  { key: "catholic-school", label: "Catholic school", value: "State integrated" },
  { key: "students", label: "Students", value: "Co-educational" },
  { key: "community", label: "Community", value: "Silverdale" },
];

function homeStatsFromSanity(rows: unknown): HomeStat[] | null {
  if (!Array.isArray(rows) || rows.length === 0) return null;
  const stats = (rows as CmsHomeStatRow[])
    .map((row, index) => {
      const label = row.label?.trim();
      const value = row.value?.trim();
      if (!label || !value) return null;
      return {
        key: row._key ?? `${label}-${index}`,
        label,
        value,
      };
    })
    .filter((row): row is HomeStat => Boolean(row));
  return stats.length > 0 ? stats : null;
}

function homeHighlightSlidesFromSanity(rows: unknown): HomeCarouselSlide[] | null {
  if (!Array.isArray(rows) || rows.length === 0) return null;
  const out: HomeCarouselSlide[] = [];
  for (const raw of rows as CmsHomeHighlightRow[]) {
    if (raw.published === false) continue;
    const title = raw.title?.trim();
    const key = raw._key;
    if (!title || !key) continue;
    const resolved = resolveLinkItem(raw.link ?? undefined);
    const slide: HomeCarouselSlide = {
      id: key,
      title,
      description: raw.description?.trim() || undefined,
      href: resolved?.href,
      image: raw.image,
    };
    out.push(slide);
  }
  return out.length > 0 ? out : null;
}

type FallbackHeroCta = {
  href: string;
  label: string;
  external?: boolean;
};

function dedupeFallbackHeroCtas(rows: FallbackHeroCta[]): FallbackHeroCta[] {
  const seen = new Set<string>();
  const out: FallbackHeroCta[] = [];
  for (const row of rows) {
    const key = row.href.trim();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(row);
  }
  return out;
}

function fallbackHeroCtasFromSettings(settings: Record<string, unknown> | null): FallbackHeroCta[] {
  const absenceUrl = settings?.absenceUrl as string | undefined;
  const newsletterUrl = settings?.newsletterUrl as string | undefined;
  const heroAppUrl = settings?.heroAppUrl as string | undefined;

  const rows: FallbackHeroCta[] = [
    { href: "/enrolment", label: "Enrol now" },
    { href: "/news", label: "News & events" },
    { href: "/contact", label: "Contact us" },
    ...(absenceUrl?.trim()
      ? [{ href: absenceUrl.trim(), label: "Report absence", external: true }]
      : []),
    { href: "/resources", label: "Resources" },
    ...(heroAppUrl?.trim()
      ? [{ href: heroAppUrl.trim(), label: "Hero app", external: true }]
      : []),
    ...(newsletterUrl?.trim()
      ? [{ href: newsletterUrl.trim(), label: "Newsletter", external: true }]
      : []),
  ];

  return dedupeFallbackHeroCtas(rows);
}

const fallbackTestimonials: TestimonialItem[] = [
  {
    quote:
      "Our children feel safe and stretched — teachers know them by name and celebrate small wins alongside big goals.",
    authorName: "Whānau voice",
    authorDetail: "Parent · Years 4 & 6",
  },
  {
    quote:
      "Faith isn’t bolted on; it’s woven through how we greet each other, solve problems, and look after our community.",
    authorName: "Alumni supporter",
    authorDetail: "Former board member",
  },
  {
    quote:
      "The school communicates clearly and kindly. We always know where to go for help or the next step.",
    authorName: "New family",
    authorDetail: "Started in Year 2",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { data } = await sanityFetch({
      query: SITE_SETTINGS_QUERY,
      stega: false,
    });
    if (!data) return {};
    const title = data.schoolName ?? fallback.schoolName;
    const description =
      data.defaultSeoDescription ?? data.tagline ?? fallback.tagline;
    return {
      title: { absolute: title },
      description,
      openGraph: {
        title,
        description: description ?? undefined,
        images: ogImageMetadata(data.defaultOgImage),
      },
    };
  } catch {
    return {};
  }
}

export default async function HomePage() {
  let settings: Record<string, unknown> | null = null;
  let newsItems: import("@/components/news-cards").NewsTeaser[] = [];
  let upcomingEvents: EventPreviewItem[] = [];
  let cmsTestimonials: TestimonialItem[] = [];

  try {
    const [settingsResult, newsResult, eventsResult, testimonialResult] =
      await Promise.all([
        sanityFetch({ query: SITE_SETTINGS_QUERY, stega: false }),
        sanityFetch({ query: HOME_NEWS_QUERY, stega: false }),
        sanityFetch({ query: UPCOMING_EVENTS_QUERY, stega: false }),
        sanityFetch({ query: HOME_TESTIMONIALS_QUERY, stega: false }),
      ]);
    settings = settingsResult.data as Record<string, unknown> | null;
    newsItems = (newsResult.data ??
      []) as import("@/components/news-cards").NewsTeaser[];
    upcomingEvents = (eventsResult.data ?? []) as EventPreviewItem[];
    cmsTestimonials = (testimonialResult.data ?? []) as TestimonialItem[];
  } catch {
    /* fallbacks */
  }

  const schoolName =
    (settings?.schoolName as string | undefined) ?? fallback.schoolName;
  const tagline =
    (settings?.tagline as string | undefined) ?? defaultSchoolCopy.tagline;
  const intro =
    (settings?.intro as string | undefined) ?? defaultSchoolCopy.intro;
  const eyebrow =
    (settings?.homeHeroEyebrow as string | undefined) ??
    defaultSchoolCopy.homeHeroEyebrow;
  const heroTitle =
    (settings?.homeHeroTitle as string | undefined) ?? schoolName;
  const heroSubtitle =
    (settings?.homeHeroSubtitle as string | undefined) ??
    defaultSchoolCopy.homeHeroSubtitle;
  const principalMessage =
    (settings?.principalMessage as string | undefined) ??
    defaultSchoolCopy.principalMessagePreview;
  const homeStats = homeStatsFromSanity(settings?.homeStats) ?? fallbackHomeStats;
  const siteUrl =
    (settings?.siteUrl as string | undefined) ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "";

  const homeCtas = settings?.homeCtas as LinkItemResolved[] | undefined;
  const fallbackHeroCtas = fallbackHeroCtasFromSettings(settings);

  const testimonialItems =
    cmsTestimonials.length > 0 ? cmsTestimonials : fallbackTestimonials;

  const homeHeroBg = sanityHeroImage(settings?.homeHeroBackground, 2400, 1200);
  const principalPhoto = sanityHeroImage(settings?.principalPhoto, 480, 600);

  const highlightSlides =
    homeHighlightSlidesFromSanity(settings?.homeHighlightSlides) ??
    defaultSchoolCopy.homeCarouselSlides;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "School",
    name: schoolName,
    description:
      (settings?.defaultSeoDescription as string | undefined) ?? tagline,
    url: siteUrl || undefined,
    address: settings?.contactAddress
      ? {
          "@type": "PostalAddress",
          streetAddress: settings.contactAddress,
        }
      : undefined,
    telephone: (settings?.contactPhone as string | undefined) || undefined,
    email: (settings?.contactEmail as string | undefined) || undefined,
  };

  const heroCtaClassName = (index: number) =>
    index === 0
      ? "inline-flex items-center rounded-full bg-[var(--color-gold)] px-5 py-2.5 text-sm font-semibold text-[var(--color-heading)] shadow-lg shadow-black/15 transition hover:bg-[var(--color-cream)]"
      : "inline-flex items-center rounded-full border border-white/35 bg-white/5 px-5 py-2.5 text-sm font-semibold text-[var(--color-cream)] backdrop-blur-sm transition hover:bg-white/12";

  return (
    <>
      <JsonLd data={jsonLd} />
      <section className="relative isolate overflow-hidden text-[var(--color-cream)]">
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src={
              homeHeroBg?.src ??
              "/fadf7482-5f50-4195-b975-60119e33e4c8.webp"
            }
            alt={homeHeroBg?.alt ?? ""}
            priority
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div
            className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand)]/92 via-[var(--color-brand)]/78 to-[var(--color-brand-muted)]/94"
            aria-hidden
          />
        </div>
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold-light)] sm:text-sm">
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-4xl font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.08] tracking-tight">
            {heroTitle}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-cream)]/88 sm:text-xl">
            {heroSubtitle}
          </p>
          {homeCtas?.length ? (
            <ul className="mt-10 flex flex-wrap gap-3">
              {homeCtas.map((item, i) => {
                const resolved = resolveLinkItem(item);
                if (!resolved) return null;
                const { href, label, useAnchor, openInNewTab } = resolved;
                return (
                  <li key={`${href}-${i}`}>
                    {useAnchor ? (
                      <a
                        href={href}
                        {...(openInNewTab
                          ? { target: "_blank", rel: "noreferrer noopener" }
                          : {})}
                        className={heroCtaClassName(i)}
                      >
                        {label}
                      </a>
                    ) : (
                      <Link
                        href={href}
                        className={heroCtaClassName(i)}
                      >
                        {label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <ul className="mt-10 flex flex-wrap gap-3">
              {fallbackHeroCtas.map((cta, i) => (
                <li key={`${cta.href}-${cta.label}`}>
                  {cta.external ? (
                    <a
                      href={cta.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className={heroCtaClassName(i)}
                    >
                      {cta.label}
                    </a>
                  ) : (
                    <Link href={cta.href} className={heroCtaClassName(i)}>
                      {cta.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="relative z-10 border-t border-white/15 bg-[var(--color-brand-muted)]/80 backdrop-blur-sm">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 px-4 py-8 sm:px-6 md:grid-cols-4 md:gap-x-8 md:gap-y-6 lg:gap-x-10">
            {homeStats.map((s) => (
              <div key={s.key} className="text-center sm:text-left">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-gold-light)]">
                  {s.label}
                </p>
                <p className="mt-2 font-display text-lg font-semibold leading-snug tracking-tight text-[var(--color-cream)] sm:text-xl">
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--color-border)] bg-[var(--color-surface)] py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                Haere mai
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[var(--color-heading)]">
                Welcome to our school
              </h2>
              <p className="mt-5 max-w-prose text-lg leading-relaxed text-[var(--color-ink-muted)]">
                {intro}
              </p>
            </div>
            <div>
              <div className="relative overflow-hidden rounded-2xl border-l-4 border-[var(--color-gold)] bg-[var(--color-cream)]/70 shadow-[var(--shadow-card)]">
                <div
                  className={
                    principalPhoto
                      ? "flex flex-col items-center gap-5 p-5 sm:flex-row sm:items-start sm:gap-6 sm:p-6 md:gap-7 md:p-7"
                      : "px-6 py-6 sm:px-8 sm:py-7"
                  }
                >
                  {principalPhoto ? (
                    <figure className="relative aspect-[3/4] w-[6.5rem] shrink-0 overflow-hidden rounded-xl bg-[var(--color-surface)]/80 shadow-[inset_0_0_0_1px_rgb(231_224_212/0.9)] sm:w-[7rem] md:w-[7.25rem]">
                      <Image
                        src={principalPhoto.src}
                        alt={
                          principalPhoto.alt?.trim() ||
                          `Principal, ${schoolName}`
                        }
                        fill
                        sizes="(max-width: 640px) 104px, 116px"
                        className="object-cover object-top"
                      />
                    </figure>
                  ) : null}
                  <div
                    className={
                      principalPhoto
                        ? "relative min-w-0 flex-1 sm:pt-0.5"
                        : "relative"
                    }
                  >
                    <span
                      className="pointer-events-none absolute left-0 top-0 font-display text-[clamp(2.5rem,5vw,3.25rem)] leading-none text-[var(--color-gold)]/16 select-none sm:-left-0.5"
                      aria-hidden
                    >
                      &ldquo;
                    </span>
                    <p className="relative text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                      From the principal
                    </p>
                    <blockquote className="relative mt-3 text-base italic leading-relaxed text-[var(--color-ink-muted)]">
                      {principalMessage}
                    </blockquote>
                  </div>
                </div>
              </div>
              <Link
                href="/about"
                className="mt-8 inline-flex shrink-0 items-center gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-cream)]/50 px-5 py-2.5 text-sm font-semibold text-[var(--color-heading)] transition hover:border-[var(--color-gold)]/50 hover:bg-[var(--color-cream)]"
              >
                Read more about our school
                <span aria-hidden className="ml-0.5">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--color-border)] bg-[var(--color-surface)] py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-6 border-b border-[var(--color-border)] pb-8 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent)]">
                Calendar
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[var(--color-heading)]">
                Upcoming events
              </h2>
              <p className="mt-3 max-w-xl text-[var(--color-ink-muted)]">
                Key dates for assemblies, liturgies, and community moments.
              </p>
            </div>
            <Link
              href="/community"
              className="inline-flex shrink-0 rounded-full border border-[var(--color-border)] bg-[var(--color-cream)]/50 px-5 py-2.5 text-sm font-semibold text-[var(--color-heading)] transition hover:border-[var(--color-gold)]/50"
            >
              All events info
              <span aria-hidden className="ml-1">
                →
              </span>
            </Link>
          </div>
          <div className="mt-12">
            <EventsPreview events={upcomingEvents} />
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--color-border)] bg-[var(--color-cream-deep)]/40 py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-6 border-b border-[var(--color-border)] pb-8 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent)]">
                Updates
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[var(--color-heading)]">
                Latest news
              </h2>
              <p className="mt-3 max-w-xl text-[var(--color-ink-muted)]">
                Notices, celebrations, and reminders for our community.
              </p>
            </div>
            <Link
              href="/news"
              className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-cream)]/50 px-5 py-2.5 text-sm font-semibold text-[var(--color-heading)] transition hover:border-[var(--color-gold)]/50 hover:bg-[var(--color-surface)]"
            >
              All news
              <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="mt-12">
            <NewsCardList items={newsItems} />
            {!newsItems.length ? (
              <div className="rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-cream)]/40 px-6 py-12 text-center">
                <p className="text-[var(--color-ink-muted)]">
                  {defaultSchoolCopy.newsEmpty}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <HomeHighlightCarousel slides={highlightSlides} />

      <section className="border-y border-[var(--color-border)] bg-[var(--color-cream-deep)]/35 py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent)]">
              Voices
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[var(--color-heading)]">
              What families say
            </h2>
            <p className="mt-4 text-[var(--color-ink-muted)]">
              Reflections from whānau and supporters who know our school
              community.
            </p>
          </div>
          <div className="mt-12">
            <TestimonialCards items={testimonialItems} />
          </div>
        </div>
      </section>
    </>
  );
}
