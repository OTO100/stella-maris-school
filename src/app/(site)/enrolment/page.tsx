import type { Metadata } from "next";
import Link from "next/link";

import { CTASection } from "@/components/cta-section";
import { PageHero } from "@/components/page-hero";
import { innerPageHeroBackground, type InnerPageHeroRow } from "@/lib/inner-page-hero";
import { sanityFetch } from "@/sanity/lib/live";
import { DOWNLOADABLE_RESOURCES_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Enrolment",
  description:
    "Places, timelines, zoning, tuition & attendance dues — clarity for enrolling families.",
};

const steps = [
  {
    title: "Explore & connect",
    body: "Read about our Catholic special character, visit our learning pages, and register interest with the office.",
  },
  {
    title: "Tour & conversations",
    body: "Meet the principal team, glimpse classrooms at work, and ask about support pathways for your child.",
  },
  {
    title: "Application paperwork",
    body: "Complete forms, supply verifying documents, and provide a Parish Priest reference if applicable for preference.",
  },
  {
    title: "Offer & onboarding",
    body: "Once a place aligns, accept and join Hero and newsletter onboarding so transitions feel smooth.",
  },
];

type ResourceRow = {
  _id: string;
  title: string | null;
  category: string | null;
  description: string | null;
  fileUrl: string | null;
  fileName: string | null;
};

export default async function EnrolmentPage() {
  let innerPageHeroes: InnerPageHeroRow[] | undefined;
  let contactEmail: string | null | undefined;
  let contactPhone: string | null | undefined;
  let policiesUrl: string | null | undefined;
  let enrolmentResources: ResourceRow[] = [];
  try {
    const [settingsResult, resourcesResult] = await Promise.all([
      sanityFetch({
        query: SITE_SETTINGS_QUERY,
        stega: false,
      }),
      sanityFetch({
        query: DOWNLOADABLE_RESOURCES_QUERY,
        stega: false,
      }),
    ]);
    innerPageHeroes = settingsResult.data?.innerPageHeroes as
      | InnerPageHeroRow[]
      | undefined;
    contactEmail = settingsResult.data?.contactEmail;
    contactPhone = settingsResult.data?.contactPhone;
    policiesUrl = settingsResult.data?.policiesUrl;
    enrolmentResources = ((resourcesResult.data ?? []) as ResourceRow[]).filter(
      (row) => row.category === "enrolment",
    );
  } catch {
    /* optional */
  }
  const banner = innerPageHeroBackground(innerPageHeroes, "enrolment");
  const enrolmentEmailHref = contactEmail
    ? `mailto:${contactEmail}?subject=${encodeURIComponent("Enrolment enquiry")}`
    : null;

  return (
    <article className="pb-16">
      <PageHero
        eyebrow="Become part of Stella Maris"
        title="Enrol now"
        subtitle="Clarity beats confusion — enrolment journeys should feel approachable, pastoral, and transparent."
        backgroundImageSrc={banner?.src}
        backgroundImageAlt={banner?.alt}
      />

      <div className="mx-auto max-w-6xl px-4 pt-12 sm:px-6 lg:pt-16">
        <div className="rounded-[var(--radius-hero)] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-[var(--shadow-card)] lg:p-10">
          <p className="section-eyebrow text-[var(--color-accent)]">
            Value proposition
          </p>
          <p className="mt-6 text-lg leading-relaxed text-[var(--color-ink-muted)]">
            Parents choose Stella Maris for purposeful teaching, unmistakable pastoral care,
            Gospel-centred formation, sporting and cultural richness, partnerships with parish,
            specialised support pathways, manageable class sizes, and transparent communication
            — anchored in manaakitanga.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex rounded-full bg-[var(--color-brand)] px-6 py-3 text-sm font-semibold text-[var(--color-cream)] hover:bg-[var(--color-brand-muted)]"
          >
            Email the office today
          </Link>
        </div>
      </div>

      <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-[var(--color-heading)] sm:text-3xl">
          Step-by-step enrolment
        </h2>
        <ol className="mt-10 space-y-6">
          {steps.map((s, idx) => (
            <li
              key={s.title}
              className="flex gap-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-cream)]/40 p-6"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)] font-display text-lg font-semibold text-[var(--color-cream)]">
                {idx + 1}
              </span>
              <div>
                <p className="font-display text-lg font-semibold text-[var(--color-heading)]">
                  {s.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-muted)]">
                  {s.body}
                </p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex text-sm font-semibold text-[var(--color-accent)] hover:underline"
                >
                  Need help here? Reach us
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section
        id="fees"
        className="mx-auto mt-16 max-w-6xl scroll-mt-24 px-4 sm:px-6"
      >
        <div className="rounded-[var(--radius-hero)] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-[var(--shadow-card)] lg:p-10">
          <p className="section-eyebrow text-[var(--color-accent)]">
            Single source of truth
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-[var(--color-heading)] sm:text-3xl">
            Fees & donations
          </h2>
          <p className="mt-5 max-w-3xl text-[var(--color-ink-muted)]">
            State-integrated attendance dues, curriculum charges, and voluntary contributions —
            keep the latest details in one place and confirm amounts with the office before
            submitting an application.
          </p>
          <dl className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-cream)]/50 p-5">
              <dt className="text-sm font-semibold text-[var(--color-heading)]">
                Attendance dues
              </dt>
              <dd className="mt-3 text-sm text-[var(--color-ink-muted)]">
                Contact the office — amounts change annually. Prefer automatic payments through
                your chosen channel.
              </dd>
            </div>
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-cream)]/50 p-5">
              <dt className="text-sm font-semibold text-[var(--color-heading)]">
                Voluntary donations
              </dt>
              <dd className="mt-3 text-sm text-[var(--color-ink-muted)]">
                Targets property and special character uplift — acknowledgement receipts issued
                per policy guidance.
              </dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            {enrolmentEmailHref ? (
              <a
                href={enrolmentEmailHref}
                className="inline-flex rounded-full border border-[var(--color-brand)] px-6 py-3 text-sm font-semibold text-[var(--color-brand)] hover:bg-[var(--color-brand)] hover:text-[var(--color-cream)]"
              >
                Request the latest fee sheet
              </a>
            ) : (
              <Link
                href="/contact"
                className="inline-flex rounded-full border border-[var(--color-brand)] px-6 py-3 text-sm font-semibold text-[var(--color-brand)] hover:bg-[var(--color-brand)] hover:text-[var(--color-cream)]"
              >
                Request the latest fee sheet
              </Link>
            )}
            {policiesUrl ? (
              <a
                href={policiesUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex rounded-full border border-[var(--color-border)] px-6 py-3 text-sm font-semibold text-[var(--color-heading)] hover:bg-[var(--color-cream)]"
              >
                View school policies
              </a>
            ) : null}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-[var(--color-heading)] sm:text-3xl">
          Application documents
        </h2>
        <p className="mt-4 max-w-3xl text-[var(--color-ink-muted)]">
          Start with the current enrolment resources, then contact the office to confirm
          preference requirements, timing, and any supporting documents.
        </p>
        {enrolmentResources.length ? (
          <ul className="mt-8 grid gap-5 md:grid-cols-2">
            {enrolmentResources.map((resource) => (
              <li
                key={resource._id}
                className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-cream)]/40 p-6"
              >
                <h3 className="font-display text-lg font-semibold text-[var(--color-heading)]">
                  {resource.title ?? "Enrolment document"}
                </h3>
                {resource.description ? (
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-muted)]">
                    {resource.description}
                  </p>
                ) : null}
                {resource.fileUrl ? (
                  <a
                    href={resource.fileUrl}
                    download={resource.fileName ?? undefined}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-5 inline-flex rounded-full bg-[var(--color-brand)] px-5 py-2.5 text-sm font-semibold text-[var(--color-cream)] hover:bg-[var(--color-brand-muted)]"
                  >
                    Download document
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-cream)]/40 p-6">
            <p className="text-sm leading-relaxed text-[var(--color-ink-muted)]">
              Enrolment packs are available from the office. We can send the right forms and
              explain what is needed for your child.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {enrolmentEmailHref ? (
                <a
                  href={enrolmentEmailHref}
                  className="inline-flex rounded-full bg-[var(--color-brand)] px-5 py-2.5 text-sm font-semibold text-[var(--color-cream)] hover:bg-[var(--color-brand-muted)]"
                >
                  Ask for an enrolment pack
                </a>
              ) : null}
              {contactPhone ? (
                <a
                  href={`tel:${contactPhone.replace(/\s/g, "")}`}
                  className="inline-flex rounded-full border border-[var(--color-border)] px-5 py-2.5 text-sm font-semibold text-[var(--color-heading)] hover:bg-[var(--color-cream)]"
                >
                  Call the office
                </a>
              ) : (
                <Link
                  href="/contact"
                  className="inline-flex rounded-full border border-[var(--color-border)] px-5 py-2.5 text-sm font-semibold text-[var(--color-heading)] hover:bg-[var(--color-cream)]"
                >
                  Contact the office
                </Link>
              )}
            </div>
          </div>
        )}
      </section>

      <div className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
        <CTASection
          eyebrow="Momentum"
          heading="Ready to enrol or still deciding?"
          body="Book a personalised tour and ask questions confidently — enrolment thrives on relationships."
          variant="brand"
        >
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex rounded-full bg-[var(--color-gold)] px-6 py-3 text-sm font-semibold text-[var(--color-heading)] hover:bg-[var(--color-cream)]"
            >
              Book a principal chat
            </Link>
            <Link
              href="/about"
              className="inline-flex rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-[var(--color-cream)] hover:bg-white/10"
            >
              Learn about our ethos
            </Link>
          </div>
        </CTASection>
      </div>
    </article>
  );
}
