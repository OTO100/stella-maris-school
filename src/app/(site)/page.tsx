import Image from "next/image";
import Link from "next/link";
import { BookOpen, CalendarDays, Phone, Smartphone } from "lucide-react";

import { CTASection } from "@/components/cta-section";
import { PageHero } from "@/components/page-hero";
import { heroStoreLinks, KINDO_DESCRIPTION_FALLBACK } from "@/lib/app-links";
import { MARIAN_VALUES } from "@/lib/marian-values";
import { principalPhoto } from "@/lib/principal";
import { personInitials } from "@/lib/resources";
import {
  formatTermDate,
  isCurrentTerm,
  upcomingTerms,
  type TermDate,
} from "@/lib/term-dates";
import { keyDocument } from "@/lib/key-documents";
import { sanityFetch } from "@/sanity/lib/live";
import {
  COMMUNITY_PAGE_QUERY,
  SITE_SETTINGS_QUERY,
  STAFF_MEMBERS_QUERY,
} from "@/sanity/lib/queries";
import { sanityHeroImage } from "@/lib/inner-page-hero";

export const revalidate = 60;

export default async function HomePage() {
  let settings: Record<string, unknown> | null = null;
  let community: Record<string, unknown> | null = null;
  let staff: Array<{
    name?: string | null;
    role?: string | null;
    photo?: unknown;
  }> = [];
  try {
    const [result, communityResult, people] = await Promise.all([
      sanityFetch({ query: SITE_SETTINGS_QUERY, stega: false }),
      sanityFetch({ query: COMMUNITY_PAGE_QUERY, stega: false }),
      sanityFetch({ query: STAFF_MEMBERS_QUERY, stega: false }),
    ]);
    settings = result.data as Record<string, unknown> | null;
    community = communityResult.data as Record<string, unknown> | null;
    staff = (people.data as typeof staff) ?? [];
  } catch {
    /* CMS unavailable */
  }

  const schoolName =
    (settings?.schoolName as string | undefined) ??
    "Stella Maris Catholic Primary School";
  const heroImage = sanityHeroImage(
    settings?.homeHeroBackground,
    1400,
    1400,
  ) ?? {
    src: "/hero-home.webp",
    alt: schoolName,
  };
  const phone = (settings?.contactPhone as string | undefined) ?? "09 427 9189";
  const quote =
    (settings?.principalMessage as string | undefined) ??
    "The Stella Maris community is based on family. This extended family consists of students, teachers, parents, and extended family joining together to form a community that is wholeheartedly committed to the education of our young people.";

  const stores = heroStoreLinks(settings);
  const attendancePlanUrl = community?.attendancePlanUrl as string | undefined;
  const terms = upcomingTerms(settings?.termDates as TermDate[] | undefined, 2);
  const handbookDoc = keyDocument(settings, "handbook");

  // "Stella Maris Catholic Primary School" → large "Stella Maris" + smaller second line.
  const heroTitle =
    (settings?.homeHeroTitle as string | undefined) || schoolName;
  const titleMatch = heroTitle.match(/^(.*?)\s+(Catholic\b.*)$/);

  // Next term date for the hero: when the current term ends, or when the next one starts.
  const nextTerm = terms[0];
  const termNote = nextTerm
    ? isCurrentTerm(nextTerm)
      ? `Term ${nextTerm.term} ends ${formatTermDate(nextTerm.end!)}`
      : `Term ${nextTerm.term} starts ${formatTermDate(nextTerm.start!)}`
    : null;

  const quickLinks: Array<{
    href: string;
    label: string;
    short?: string;
    detail: string;
    icon: typeof Phone;
    download?: boolean;
  }> = [
    {
      href: "/absences",
      label: "Report an absence",
      short: "Absences",
      detail: "Phone or email by 9am",
      icon: Phone,
    },
    {
      href: "/about#apps",
      label: "School apps",
      detail: "Hero and Kindo",
      icon: Smartphone,
    },
    {
      href: "#term-dates",
      label: "Term dates",
      detail: "Every term at a glance",
      icon: CalendarDays,
    },
    {
      href: handbookDoc.url,
      label: "Parent handbook",
      short: "Handbook",
      detail: "Everything in one PDF",
      icon: BookOpen,
      download: true,
    },
  ];
  const principalImage = principalPhoto(staff, settings?.principalPhoto);

  const everyday = [
    {
      href: "/absences",
      title: "Report an absence",
      detail: "Phone or email",
      external: false,
    },
    {
      href: stores.appStore,
      title: "Hero app — App Store",
      detail: "Notices and learning updates for iPhone and iPad",
      external: true,
    },
    {
      href: stores.playStore,
      title: "Hero app — Google Play",
      detail: "Notices and learning updates for Android",
      external: true,
    },
    settings?.kindoUrl
      ? {
          href: settings.kindoUrl as string,
          title: "Kindo",
          detail:
            (settings.kindoDescription as string | undefined) ||
            KINDO_DESCRIPTION_FALLBACK,
          external: true,
        }
      : null,
    attendancePlanUrl
      ? {
          href: attendancePlanUrl,
          title: "Attendance Management Plan",
          detail: "How we support regular attendance",
          external: true,
          download: true,
        }
      : null,
    settings?.newsletterUrl || settings?.termDatesUrl
      ? {
          href: (settings.newsletterUrl || settings.termDatesUrl) as string,
          title: "Newsletters & term dates",
          detail: "What's coming up this term",
          external: true,
        }
      : null,
    {
      href: handbookDoc.url,
      title: handbookDoc.title,
      detail: "One document, everything in it",
      external: true,
      download: true,
    },
  ].filter(Boolean) as {
    href: string;
    title: string;
    detail: string;
    external: boolean;
    download?: boolean;
  }[];

  const explore = [
    {
      href: "/about",
      title: "Our School",
      body: "Principal's message, special character, values and parent information.",
    },
    {
      href: "/about/our-learning",
      title: "Our learning",
      body: "Curriculum, structured literacy and maths, assessment and support.",
    },
    {
      href: "/community",
      title: "Our Community",
      body: "Staff, PTFA, the school board, and our plans and reports.",
    },
    {
      href: "/parish",
      title: "Hibiscus Coast Parish",
      body: "Our parish connection, liturgy and sacramental programmes.",
    },
  ];

  return (
    <>
      <PageHero
        size="home"
        eyebrow={
          (settings?.homeHeroEyebrow as string | undefined) ??
          "Silverdale, Auckland · Years 1–6"
        }
        title={titleMatch ? titleMatch[1] : heroTitle}
        titleSuffix={titleMatch ? titleMatch[2] : null}
        subtitle={
          (settings?.homeHeroSubtitle as string | undefined) ??
          "We follow Jesus’ way and live the Marian Values — and in doing so, we shine for God."
        }
        layout="split"
        backgroundImageSrc={heroImage.src}
        backgroundImageAlt={heroImage.alt}
        actions={
          <>
            <Link href="/enrolment" className="btn-gold">
              Enrolment information <span aria-hidden>→</span>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 py-2 font-semibold text-[var(--color-cream)] hover:text-[var(--color-gold-light)]"
            >
              About our school <span aria-hidden>→</span>
            </Link>
          </>
        }
        footnote={
          termNote ? (
            <a
              href="#term-dates"
              className="inline-flex items-center gap-2.5 rounded-full border border-[rgb(250_248_245/0.28)] px-4 py-2 text-small text-[var(--color-cream)] hover:border-[var(--color-gold-light)] hover:text-[var(--color-cream)]"
            >
              <span
                aria-hidden
                className="size-2 rounded-full bg-[var(--color-gold-light)]"
              />
              {termNote}
            </a>
          ) : null
        }
      />

      <nav
        aria-label="Quick links for families"
        className="relative z-10 bg-[var(--color-surface)]"
      >
        <div className="page-wrap">
          <ul className="-mt-7 grid grid-cols-2 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-[0_18px_40px_-28px_rgb(108_20_44/0.45)] min-[901px]:-mt-9 min-[901px]:grid-cols-4">
            {quickLinks.map((item) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.label}
                  className="border-[var(--color-border)] max-[900px]:odd:border-r max-[900px]:[&:nth-child(-n+2)]:border-b min-[901px]:[&:not(:first-child)]:border-l"
                >
                  <a
                    href={item.href}
                    className="group flex h-full flex-col gap-3 p-4 text-[var(--color-heading)] transition-colors hover:bg-[var(--color-cream)] hover:text-[var(--color-brand)] min-[621px]:flex-row min-[621px]:items-center min-[901px]:px-6 min-[901px]:py-5"
                    {...(item.download
                      ? { target: "_blank", rel: "noreferrer noopener" }
                      : {})}
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-rose)] text-[var(--color-brand)]">
                      <Icon className="size-[18px]" aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-copy leading-[1.3] font-semibold">
                        {item.short ? (
                          <>
                            <span className="min-[621px]:hidden">
                              {item.short}
                            </span>
                            <span className="max-[620px]:hidden">
                              {item.label}
                            </span>
                          </>
                        ) : (
                          item.label
                        )}
                      </span>
                      <span className="mt-0.5 block text-small leading-[1.4] text-[var(--color-ink-muted)]">
                        {item.detail}
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      <section className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="page-wrap section-pad grid items-start gap-16 min-[901px]:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="text-eyebrow font-semibold tracking-[0.16em] text-[var(--color-gold)] uppercase">
              Haere mai
            </p>
            <h2 className="mt-3.5 text-h2 leading-[1.08] min-[621px]:text-[44px]">
              A community based on family
            </h2>
            <Link href="/about#principal" className="btn-brand mt-7">
              Read the principal's message <span aria-hidden>→</span>
            </Link>
          </div>
          <figure className="relative overflow-hidden rounded-[20px] border border-[var(--color-border)] border-l-4 border-l-[var(--color-gold)] bg-[var(--color-cream)] px-9 py-8 shadow-[0_18px_40px_-28px_rgba(108,20,44,.45)]">
            <span
              aria-hidden
              className="pointer-events-none absolute top-1.5 right-6 font-display text-[110px] leading-none text-[rgba(172,151,63,.16)] select-none"
            >
              ”
            </span>
            <blockquote className="relative font-sans text-h4 leading-[1.62] text-[var(--color-ink)] italic">
              {quote}
            </blockquote>
            <p className="mt-5 text-body leading-[1.65] text-[var(--color-ink-muted)]">
              We value the development of the whole person — integrating
              spiritual development, academic success, cultural awareness, and a
              high level of sporting participation, in the context of our
              Catholic tradition.
            </p>
            <figcaption className="mt-6 flex items-center gap-5 border-t border-[var(--color-border)] pt-5">
              {principalImage ? (
                <Image
                  src={principalImage.src}
                  alt={principalImage.alt}
                  width={224}
                  height={224}
                  className="size-28 shrink-0 rounded-full object-cover"
                />
              ) : (
                <span className="flex size-28 shrink-0 items-center justify-center rounded-full bg-[var(--color-cream-deep)] font-display text-h2sm text-[var(--color-brand)]">
                  {personInitials("Catherine Cyprian")}
                </span>
              )}
              <span>
                <span className="block text-copy font-semibold text-[var(--color-heading)]">
                  Catherine Cyprian
                </span>
                <span className="block text-small text-[var(--color-ink-muted)]">
                  Principal
                </span>
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="border-b border-[var(--color-border)] bg-[var(--color-cream-deep)]">
        <div className="page-wrap section-pad">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-eyebrow font-semibold tracking-[0.16em] text-[var(--color-gold)] uppercase">
                Ngā uara — our values
              </p>
              <h2 className="mt-3.5 text-h2 leading-[1.1]">
                The Marian Values
              </h2>
            </div>
            <Link
              href="/about#values"
              className="inline-flex items-center gap-1.5 text-copy font-semibold"
            >
              What each value means <span aria-hidden>→</span>
            </Link>
          </div>
          <ul className="mt-11 grid grid-cols-2 gap-x-4 gap-y-5 min-[621px]:grid-cols-3 min-[901px]:grid-cols-6">
            {MARIAN_VALUES.map((value) => (
              <li key={value.key}>
                <Link
                  href="/about#values"
                  className="card-lift flex flex-col items-center gap-3.5 rounded-[18px] border border-transparent px-3.5 py-[22px] text-center hover:border-[var(--color-border)] hover:bg-[var(--color-surface)]"
                >
                  <Image
                    src={value.badgeSrc}
                    alt=""
                    width={120}
                    height={120}
                    className="aspect-square w-full max-w-[120px] object-contain mix-blend-multiply"
                  />
                  <span>
                    <span className="block font-display text-h4 leading-[1.2] text-[var(--color-brand)]">
                      {value.name}
                    </span>
                    <span className="mt-1 block text-eyebrow font-semibold tracking-[0.14em] text-[var(--color-olive)] uppercase">
                      {value.englishName}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="page-wrap section-pad">
          <h2 className="text-h2 leading-[1.12]">Find your way around</h2>
          <ul className="mt-9 grid gap-4 min-[621px]:grid-cols-2 min-[901px]:grid-cols-4">
            {explore.map((card) => (
              <li key={card.href}>
                <Link
                  href={card.href}
                  className="card-lift flex h-full flex-col rounded-[18px] border border-[var(--color-border)] border-t-[3px] border-t-[var(--color-gold)] bg-[var(--color-cream)] px-7 py-7 shadow-[var(--shadow-card)] hover:bg-[#FFFDF9]"
                >
                  <span className="font-display text-h3 leading-[1.2] text-[var(--color-heading)]">
                    {card.title}
                  </span>
                  <span className="mt-2.5 text-copy leading-[1.65] text-[var(--color-ink-muted)]">
                    {card.body}
                  </span>
                  <span className="mt-auto pt-[18px] text-small font-semibold text-[var(--color-brand)]">
                    Explore →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-[var(--color-border)] bg-[var(--color-cream)]">
        <div className="page-wrap section-pad grid items-start gap-14 min-[901px]:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="text-eyebrow font-semibold tracking-[0.16em] text-[var(--color-gold)] uppercase">
              For current families
            </p>
            <h2 className="mt-3.5 text-h2 leading-[1.12]">Everyday links</h2>
            <p className="mt-4 text-copy leading-[1.65] text-[var(--color-ink-muted)]">
              Day-to-day notices and payments live in our apps. The handbook
              covers everything else.
            </p>
            {terms.length ? (
              <div
                id="term-dates"
                className="mt-8 scroll-mt-28 rounded-2xl border border-[var(--color-border)] border-t-[3px] border-t-[var(--color-gold)] bg-[var(--color-surface)] px-6 py-6"
              >
                <h3 className="font-display text-h3 leading-[1.2] text-[var(--color-heading)]">
                  Term dates
                </h3>
                <ul className="mt-4 flex flex-col gap-4">
                  {terms.map((t) => (
                    <li key={`${t.year}-${t.term}`}>
                      <p className="text-eyebrow font-semibold tracking-[0.16em] text-[var(--color-gold)] uppercase">
                        {t.year} · Term {t.term}
                        {isCurrentTerm(t) ? " · now" : ""}
                      </p>
                      <p className="mt-1 text-copy text-[var(--color-ink)]">
                        {formatTermDate(t.start!)} – {formatTermDate(t.end!)}
                      </p>
                      {t.note ? (
                        <p className="mt-0.5 text-small text-[var(--color-ink-muted)]">
                          {t.note}
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
          <ul className="flex flex-col gap-0.5">
            {everyday.map((item) => {
              const className =
                "group flex items-center justify-between gap-5 rounded-xl border-t border-[var(--color-border)] px-[18px] py-5 transition-[background,padding] duration-[180ms] ease hover:bg-[var(--color-surface)] hover:pl-7";
              const inner = (
                <>
                  <span>
                    <span className="block text-h4 font-semibold text-[var(--color-heading)]">
                      {item.title}
                    </span>
                    <span className="mt-0.5 block text-copy text-[var(--color-ink-muted)]">
                      {item.detail}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className="text-h4 text-[var(--color-brand)]"
                  >
                    {item.download ? "↓" : item.external ? "↗" : "→"}
                  </span>
                </>
              );
              return (
                <li key={item.title}>
                  {item.external ? (
                    <a
                      href={item.href}
                      className={className}
                      {...(item.href.startsWith("http")
                        ? { target: "_blank", rel: "noreferrer noopener" }
                        : {})}
                    >
                      {inner}
                    </a>
                  ) : (
                    <Link href={item.href} className={className}>
                      {inner}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <CTASection
        heading="Thinking about Stella Maris for your child?"
        body="We'd love to show you around. Start with our enrolment information, or simply give the office a call."
      >
        <Link href="/enrolment" className="btn-gold">
          Enrolment information <span aria-hidden>→</span>
        </Link>
        <a
          href={`tel:${phone.replace(/[^\d+]/g, "")}`}
          className="btn-outline-cream"
        >
          {phone}
        </a>
      </CTASection>
    </>
  );
}
