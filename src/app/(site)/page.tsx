import Image from "next/image";
import Link from "next/link";

import { CTASection } from "@/components/cta-section";
import { PageHero } from "@/components/page-hero";
import { MARIAN_VALUES } from "@/lib/marian-values";
import { personInitials } from "@/lib/resources";
import { PUBLIC_DOCS } from "@/lib/sitemap-decisions";
import { sanityFetch } from "@/sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import { sanityHeroImage } from "@/lib/inner-page-hero";

export const revalidate = 60;

export default async function HomePage() {
  let settings: Record<string, unknown> | null = null;
  try {
    const result = await sanityFetch({ query: SITE_SETTINGS_QUERY, stega: false });
    settings = result.data as Record<string, unknown> | null;
  } catch {
    /* CMS unavailable */
  }

  const schoolName =
    (settings?.schoolName as string | undefined) ??
    "Stella Maris Catholic Primary School";
  const heroImage = sanityHeroImage(settings?.homeHeroBackground) ?? {
    src: "/hero-home.webp",
    alt: schoolName,
  };
  const phone = (settings?.contactPhone as string | undefined) ?? "09 427 9189";
  const quote =
    (settings?.principalMessage as string | undefined) ??
    "The Stella Maris community is based on family. This extended family consists of students, teachers, parents, and extended family joining together to form a community that is wholeheartedly committed to the education of our young people.";

  const everyday = [
    {
      href: "/absences",
      title: "Report an absence",
      detail: "Hero app, phone or email",
      external: false,
    },
    settings?.heroAppUrl
      ? {
          href: settings.heroAppUrl as string,
          title: "Hero app",
          detail: "Notices, attendance and reports",
          external: true,
        }
      : null,
    settings?.kindoUrl
      ? {
          href: settings.kindoUrl as string,
          title: "Kindo",
          detail: "Payments and permission slips",
          external: true,
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
      href: PUBLIC_DOCS.handbook,
      title: "Parent Information Handbook 2026",
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
        title={(settings?.homeHeroTitle as string | undefined) ?? schoolName}
        subtitle={
          (settings?.homeHeroSubtitle as string | undefined) ??
          "We follow Jesus' way and live the Marian Values — and in doing so, we shine for God."
        }
        backgroundImageSrc={heroImage.src}
        backgroundImageAlt={heroImage.alt}
        actions={
          <>
            <Link href="/enrolment" className="btn-gold">
              Enrolment information <span aria-hidden>→</span>
            </Link>
            <Link href="/about" className="btn-outline-cream">
              About our school
            </Link>
          </>
        }
      />

      <section className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="page-wrap section-pad grid items-start gap-16 min-[901px]:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="text-[12px] font-semibold tracking-[0.16em] text-[var(--color-gold)] uppercase">
              Haere mai
            </p>
            <h2 className="mt-3.5 text-[36px] leading-[1.08] min-[621px]:text-[44px]">
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
            <blockquote className="relative font-sans text-[21px] leading-[1.62] text-[var(--color-ink)] italic">
              {quote}
            </blockquote>
            <p className="mt-5 text-[17px] leading-[1.72] text-[var(--color-ink-muted)]">
              We value the development of the whole person — integrating
              spiritual development, academic success, cultural awareness, and a
              high level of sporting participation, in the context of our
              Catholic tradition.
            </p>
            <figcaption className="mt-6 flex items-center gap-3.5 border-t border-[var(--color-border)] pt-5">
              <span className="flex size-12 items-center justify-center rounded-full bg-[var(--color-cream-deep)] font-display text-[18px] text-[var(--color-brand)]">
                {personInitials("Catherine Cyprian")}
              </span>
              <span>
                <span className="block text-[15.5px] font-semibold text-[var(--color-heading)]">
                  Catherine Cyprian
                </span>
                <span className="block text-[13.5px] text-[var(--color-ink-muted)]">
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
              <p className="text-[12px] font-semibold tracking-[0.16em] text-[var(--color-gold)] uppercase">
                Ngā uara — our values
              </p>
              <h2 className="mt-3.5 text-[40px] leading-[1.1]">The Marian Values</h2>
            </div>
            <Link
              href="/about#values"
              className="inline-flex items-center gap-1.5 text-[15.5px] font-semibold"
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
                    <span className="block font-display text-[20px] leading-[1.2] text-[var(--color-brand)]">
                      {value.name}
                    </span>
                    <span className="mt-1 block text-[11.5px] font-semibold tracking-[0.14em] text-[var(--color-olive)] uppercase">
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
          <h2 className="text-[36px] leading-[1.12]">Find your way around</h2>
          <ul className="mt-9 grid gap-4 min-[621px]:grid-cols-2 min-[901px]:grid-cols-4">
            {explore.map((card) => (
              <li key={card.href}>
                <Link
                  href={card.href}
                  className="card-lift flex h-full flex-col rounded-[18px] border border-[var(--color-border)] border-t-[3px] border-t-[var(--color-gold)] bg-[var(--color-cream)] px-7 py-7 shadow-[var(--shadow-card)] hover:bg-[#FFFDF9]"
                >
                  <span className="font-display text-[25px] leading-[1.2] text-[var(--color-heading)]">
                    {card.title}
                  </span>
                  <span className="mt-2.5 text-[15.5px] leading-[1.65] text-[var(--color-ink-muted)]">
                    {card.body}
                  </span>
                  <span className="mt-auto pt-[18px] text-[14.5px] font-semibold text-[var(--color-brand)]">
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
            <p className="text-[12px] font-semibold tracking-[0.16em] text-[var(--color-gold)] uppercase">
              For current families
            </p>
            <h2 className="mt-3.5 text-[36px] leading-[1.12]">Everyday links</h2>
            <p className="mt-4 text-[16.5px] leading-[1.72] text-[var(--color-ink-muted)]">
              Day-to-day notices and payments live in our apps. The handbook
              covers everything else.
            </p>
          </div>
          <ul className="flex flex-col gap-0.5">
            {everyday.map((item) => {
              const className =
                "group flex items-center justify-between gap-5 rounded-xl border-t border-[var(--color-border)] px-[18px] py-5 transition-[background,padding] duration-[180ms] ease hover:bg-[var(--color-surface)] hover:pl-7";
              const inner = (
                <>
                  <span>
                    <span className="block text-[19px] font-semibold text-[var(--color-heading)]">
                      {item.title}
                    </span>
                    <span className="mt-0.5 block text-[15px] text-[var(--color-ink-muted)]">
                      {item.detail}
                    </span>
                  </span>
                  <span aria-hidden className="text-[19px] text-[var(--color-brand)]">
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
        <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="btn-outline-cream">
          {phone}
        </a>
      </CTASection>
    </>
  );
}
