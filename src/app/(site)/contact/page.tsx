import type { Metadata } from "next";
import Link from "next/link";

import { CTASection } from "@/components/cta-section";
import { PageHero } from "@/components/page-hero";
import { innerPageHeroBackground, type InnerPageHeroRow } from "@/lib/inner-page-hero";
import { sanityFetch } from "@/sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Contact",
  description: "Phone, email, address, Hero app, absentee reporting, and map.",
};

export default async function ContactPage() {
  let settings: {
    contactAddress?: string | null;
    contactEmail?: string | null;
    contactPhone?: string | null;
    officeHours?: string | null;
    absenceUrl?: string | null;
    heroAppUrl?: string | null;
    innerPageHeroes?: InnerPageHeroRow[] | null;
  } | null = null;

  try {
    const { data } = await sanityFetch({
      query: SITE_SETTINGS_QUERY,
      stega: false,
    });
    settings = data ?? null;
  } catch {
    settings = null;
  }

  const address = settings?.contactAddress;
  const email = settings?.contactEmail;
  const phone = settings?.contactPhone;
  const hours = settings?.officeHours;
  const absenceUrl = settings?.absenceUrl;
  const heroAppUrl = settings?.heroAppUrl;
  const banner = innerPageHeroBackground(settings?.innerPageHeroes ?? undefined, "contact");
  const mapHref = address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
    : null;
  const enquiryHref = email
    ? `mailto:${email}?subject=${encodeURIComponent("Website enquiry")}`
    : null;
  const enrolmentHref = email
    ? `mailto:${email}?subject=${encodeURIComponent("Enrolment enquiry")}`
    : null;

  return (
    <article className="pb-16">
      <PageHero
        eyebrow="We're listening"
        title="Contact us"
        subtitle="Office hours and channels tuned for enrolment enquiries and family support."
        backgroundImageSrc={banner?.src}
        backgroundImageAlt={banner?.alt}
      />

      <section className="mx-auto mt-14 max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-[var(--radius-hero)] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-[var(--shadow-card)]">
            <h2 className="font-display text-xl font-semibold text-[var(--color-heading)]">
              Office details
            </h2>
            <ul className="mt-6 space-y-4 text-[var(--color-ink-muted)]">
              {address ? (
                <li className="whitespace-pre-line leading-relaxed">{address}</li>
              ) : (
                <li>Silverdale, Auckland</li>
              )}
              {phone ? (
                <li>
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="font-semibold text-[var(--color-heading)] underline decoration-[var(--color-gold)]/50 underline-offset-2 hover:decoration-[var(--color-gold)]"
                  >
                    {phone}
                  </a>
                </li>
              ) : null}
              {email ? (
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="font-semibold text-[var(--color-heading)] underline decoration-[var(--color-gold)]/50 underline-offset-2 hover:decoration-[var(--color-gold)]"
                  >
                    {email}
                  </a>
                </li>
              ) : null}
              {hours ? (
                <li>
                  <span className="font-semibold text-[var(--color-heading)]">
                    Office hours:&nbsp;
                  </span>
                  {hours}
                </li>
              ) : (
                <li>Office hours are available by phone or email.</li>
              )}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              {absenceUrl ? (
                <a
                  href={absenceUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex rounded-full bg-[var(--color-brand)] px-6 py-3 text-sm font-semibold text-[var(--color-cream)] hover:bg-[var(--color-brand-muted)]"
                >
                  Report absence
                </a>
              ) : (
                <p className="text-sm text-[var(--color-ink-muted)]">
                  Contact the office directly for absence reporting details.
                </p>
              )}
              {heroAppUrl ? (
                <a
                  href={heroAppUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex rounded-full border border-[var(--color-border)] px-6 py-3 text-sm font-semibold text-[var(--color-heading)] hover:bg-[var(--color-cream)]"
                >
                  Open Hero
                </a>
              ) : null}
            </div>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-[var(--color-heading)]">
              Visit us
            </h2>
            <div className="mt-6 aspect-video overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-cream-deep)]">
              <div
                className="flex h-full w-full flex-col justify-end bg-[linear-gradient(135deg,var(--color-cream-deep),var(--color-gold)_15%)] p-6"
                aria-hidden={true}
              >
                <p className="text-sm text-[var(--color-ink-muted)]">
                  Stella Maris Catholic Primary School, Silverdale.
                </p>
              </div>
            </div>
            {mapHref ? (
              <a
                href={mapHref}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-5 inline-flex rounded-full border border-[var(--color-brand)] px-5 py-2.5 text-sm font-semibold text-[var(--color-brand)] hover:bg-[var(--color-brand)] hover:text-[var(--color-cream)]"
              >
                Open directions
              </a>
            ) : null}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-[var(--color-heading)] sm:text-3xl">
          Choose the right next step
        </h2>
        <p className="mt-4 max-w-3xl text-[var(--color-ink-muted)]">
          The office can help route enrolment questions, day-to-day admin, absence reporting,
          and pastoral support to the right person.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <article className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-cream)]/50 p-6">
            <h3 className="font-display text-lg font-semibold text-[var(--color-heading)]">
              Enrolment questions
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-muted)]">
              Ask about visits, preference documents, year-level availability, or transition
              support.
            </p>
            {enrolmentHref ? (
              <a
                href={enrolmentHref}
                className="mt-5 inline-flex text-sm font-semibold text-[var(--color-accent)] hover:underline"
              >
                Email enrolment enquiry
              </a>
            ) : (
              <Link
                href="/enrolment"
                className="mt-5 inline-flex text-sm font-semibold text-[var(--color-accent)] hover:underline"
              >
                View enrolment steps
              </Link>
            )}
          </article>
          <article className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-cream)]/50 p-6">
            <h3 className="font-display text-lg font-semibold text-[var(--color-heading)]">
              General office help
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-muted)]">
              For notices, accounts, documents, or who to speak with, start with the school office.
            </p>
            {enquiryHref ? (
              <a
                href={enquiryHref}
                className="mt-5 inline-flex text-sm font-semibold text-[var(--color-accent)] hover:underline"
              >
                Email the office
              </a>
            ) : phone ? (
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="mt-5 inline-flex text-sm font-semibold text-[var(--color-accent)] hover:underline"
              >
                Phone the office
              </a>
            ) : null}
          </article>
          <article className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-cream)]/50 p-6">
            <h3 className="font-display text-lg font-semibold text-[var(--color-heading)]">
              Absences and urgent updates
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-muted)]">
              Use the absence channel for daily attendance so messages reach the office quickly.
            </p>
            {absenceUrl ? (
              <a
                href={absenceUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-5 inline-flex text-sm font-semibold text-[var(--color-accent)] hover:underline"
              >
                Report an absence
              </a>
            ) : (
              <Link
                href="/resources"
                className="mt-5 inline-flex text-sm font-semibold text-[var(--color-accent)] hover:underline"
              >
                View family resources
              </Link>
            )}
          </article>
        </div>
      </section>

      <div className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
        <CTASection
          eyebrow="Momentum"
          heading="Still navigating enrolment choices?"
          body="Families often want to clarify zones, timelines, and pastoral support — conversations welcome."
          variant="surface"
        >
          <Link
            href="/enrolment"
            className="inline-flex rounded-full bg-[var(--color-brand)] px-6 py-3 text-sm font-semibold text-[var(--color-cream)] hover:bg-[var(--color-brand-muted)]"
          >
            Enrolment roadmap
          </Link>
        </CTASection>
      </div>
    </article>
  );
}
