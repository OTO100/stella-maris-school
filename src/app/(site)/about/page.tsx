import type { Metadata } from "next";

import Link from "next/link";

import { CTASection } from "@/components/cta-section";
import { PageHero } from "@/components/page-hero";
import { StaffGrid, type StaffMemberDisplay } from "@/components/staff-grid";
import { defaultSchoolCopy } from "@/lib/default-copy";
import { innerPageHeroBackground, type InnerPageHeroRow } from "@/lib/inner-page-hero";
import { sanityFetch } from "@/sanity/lib/live";
import { SITE_SETTINGS_QUERY, STAFF_MEMBERS_QUERY } from "@/sanity/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "About",
  description:
    "Our Catholic special character, leadership, Board of Trustees, and staff.",
};

export default async function AboutPage() {
  let staffMembers: StaffMemberDisplay[] = [];
  let innerHeroes: InnerPageHeroRow[] | undefined;
  try {
    const [staffResult, settingsResult] = await Promise.all([
      sanityFetch({ query: STAFF_MEMBERS_QUERY, stega: false }),
      sanityFetch({ query: SITE_SETTINGS_QUERY, stega: false }),
    ]);
    staffMembers = (staffResult.data ?? []) as StaffMemberDisplay[];
    innerHeroes = settingsResult.data?.innerPageHeroes as typeof innerHeroes;
  } catch {
    /* optional */
  }

  const banner = innerPageHeroBackground(innerHeroes, "about");

  return (
    <article className="pb-16">
      <PageHero
        eyebrow="Our story"
        title="About Stella Maris"
        subtitle="A welcoming Catholic primary where children are known by name — supported to aim high and serve generously."
        backgroundImageSrc={banner?.src}
        backgroundImageAlt={banner?.alt}
      />

      <div className="mx-auto max-w-6xl px-4 pt-14 sm:px-6 lg:pt-16">
        <div className="prose prose-lg max-w-none text-[var(--color-ink-muted)]">
          <p className="text-lg leading-relaxed">
            We walk alongside families to nurture confident, compassionate
            learners — grounded in the Gospel and in strong relationships across
            our classrooms, parish, and community.
          </p>
          <p className="mt-6 leading-relaxed">
            This page introduces our special character, leadership, governance,
            and people at the heart of Stella Maris.
          </p>
        </div>
      </div>

      <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
        <div className="rounded-[var(--radius-hero)] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-[var(--shadow-card)] lg:p-12">
          <p className="section-eyebrow text-[var(--color-accent)]">
            Governance
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-[var(--color-heading)] sm:text-3xl">
            Board of Trustees
          </h2>
          <p className="mt-4 max-w-3xl text-[var(--color-ink-muted)]">
            The board sets strategic direction alongside the principal —
            safeguarding special character and ensuring stewardship of resources.
            Board meeting dates and summaries can be hosted here when ready.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex text-sm font-semibold text-[var(--color-accent)] hover:underline"
          >
            Contact the office about board enquiries
          </Link>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-[var(--color-heading)] sm:text-3xl">
          Principal&apos;s welcome
        </h2>
        <blockquote className="mt-6 border-l-4 border-[var(--color-gold)] pl-6 text-lg leading-relaxed text-[var(--color-ink-muted)]">
          {defaultSchoolCopy.principalMessagePreview}
        </blockquote>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-[var(--color-heading)] sm:text-3xl">
          Catholic special character
        </h2>
        <p className="mt-5 max-w-3xl whitespace-pre-wrap leading-relaxed text-[var(--color-ink-muted)]">
          {defaultSchoolCopy.specialCharacter}
        </p>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
        <div className="mb-10 flex flex-col justify-between gap-4 border-b border-[var(--color-border)] pb-8 sm:flex-row sm:items-end">
          <div>
            <p className="section-eyebrow text-[var(--color-accent)]">
              Our people
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-[var(--color-heading)] sm:text-3xl">
              Meet our team
            </h2>
            <p className="mt-3 max-w-xl text-[var(--color-ink-muted)]">
              Learn more about the teachers, leaders, and support team who know
              our learners by name.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex rounded-full bg-[var(--color-brand)] px-5 py-2.5 text-sm font-semibold text-[var(--color-cream)] transition hover:bg-[var(--color-gold)] hover:text-[var(--color-heading)]"
          >
            Contact the office
          </Link>
        </div>
        {staffMembers.length ? (
          <StaffGrid members={staffMembers} />
        ) : (
          <div className="rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-cream)]/40 px-6 py-12 text-center text-[var(--color-ink-muted)]">
            <p>
              Staff profiles will appear here soon. Contact the office if you
              need to reach a specific team member.
            </p>
          </div>
        )}
      </section>

      <div className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
        <CTASection
          eyebrow="Next steps"
          heading="Ready to see learning in action?"
          body="Book a tour or jump to enrolment information — we're here to answer your questions."
          variant="brand"
        >
          <div className="flex flex-wrap gap-3">
            <Link
              href="/enrolment"
              className="inline-flex rounded-full bg-[var(--color-gold)] px-6 py-3 text-sm font-semibold text-[var(--color-heading)] shadow-md transition hover:bg-[var(--color-cream)]"
            >
              Enrol now
            </Link>
            <Link
              href="/contact"
              className="inline-flex rounded-full border border-[var(--color-cream)]/40 px-6 py-3 text-sm font-semibold text-[var(--color-cream)] transition hover:bg-white/10"
            >
              Book a tour
            </Link>
          </div>
        </CTASection>
      </div>
    </article>
  );
}
