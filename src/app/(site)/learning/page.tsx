import type { Metadata } from "next";
import Link from "next/link";

import { CardGrid } from "@/components/card-grid";
import { CTASection } from "@/components/cta-section";
import { PageHero } from "@/components/page-hero";
import { innerPageHeroBackground, type InnerPageHeroRow } from "@/lib/inner-page-hero";
import { sanityFetch } from "@/sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Learning",
  description:
    "NZ Curriculum, Religious Education, structured literacy and inclusive support.",
};

export default async function LearningPage() {
  let innerPageHeroes: InnerPageHeroRow[] | undefined;
  try {
    const { data } = await sanityFetch({
      query: SITE_SETTINGS_QUERY,
      stega: false,
    });
    innerPageHeroes = data?.innerPageHeroes as InnerPageHeroRow[] | undefined;
  } catch {
    /* optional */
  }
  const banner = innerPageHeroBackground(innerPageHeroes, "learning");

  return (
    <article className="pb-16">
      <PageHero
        eyebrow="Teaching & learning"
        title="Learning at Stella Maris"
        subtitle="Clear teaching, joyful classrooms, and high expectations grounded in pastoral care."
        backgroundImageSrc={banner?.src}
        backgroundImageAlt={banner?.alt}
      />

      <div className="mx-auto max-w-6xl px-4 pt-14 sm:px-6 lg:pt-16">
        <p className="max-w-3xl text-lg leading-relaxed text-[var(--color-ink-muted)]">
          Teachers design learning that balances challenge with scaffolding —
          weaving Catholic values through everyday routines, intentional
          modelling, and opportunities to inquire and collaborate.
        </p>
      </div>

      <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-[var(--color-heading)]">
          Curriculum overview
        </h2>
        <div className="mt-10">
          <CardGrid
            columns={3}
            items={[
              {
                title: "The New Zealand Curriculum",
                body: "Teaching reading, writing, maths, inquiry, wellbeing, PE, arts, and digital fluency aligned to learner needs.",
              },
              {
                title: "Religious education",
                body: "Opportunities to explore faith stories, sacramental themes, scripture, prayer, and service through age-appropriate learning.",
              },
              {
                title: "Inclusive practice",
                body: "Targeted support, adaptations, partnerships with specialists, and whānau-informed planning.",
              },
            ]}
          />
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="section-eyebrow text-[var(--color-accent)]">
              Highlights
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-[var(--color-heading)] sm:text-3xl">
              What you’ll notice in classrooms
            </h2>
            <ul className="mt-6 space-y-4 text-[var(--color-ink-muted)]">
              <li>Explicit teaching in phonics/literacy and structured maths pathways</li>
              <li>Responsive teaching based on formative assessment evidence</li>
              <li>Faith integrated into topics, virtues, restorative practice</li>
            </ul>
          </div>
          <div className="rounded-[var(--radius-hero)] border border-[var(--color-border)] bg-[var(--color-cream-deep)] p-8">
            <div
              className="aspect-video rounded-xl bg-gradient-to-br from-[var(--color-brand)]/15 via-[var(--color-surface)] to-[var(--color-gold)]/20"
              role="presentation"
              aria-hidden
            />
            <p className="mt-4 text-sm text-[var(--color-ink-muted)]">
              Placeholder photo — showcase student learning in action once you
              have approved imagery from your classrooms.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
        <CTASection
          eyebrow="Visit us"
          heading="See learning for yourself"
          body="Speak with classroom teams and visit spaces where your child will thrive."
          variant="surface"
        >
          <div className="flex flex-wrap gap-3">
            <Link
              href="/enrolment"
              className="inline-flex rounded-full bg-[var(--color-brand)] px-6 py-3 text-sm font-semibold text-[var(--color-cream)] hover:bg-[var(--color-brand-muted)]"
            >
              Start enrolment
            </Link>
            <Link
              href="/contact"
              className="inline-flex rounded-full border border-[var(--color-border)] bg-[var(--color-cream)] px-6 py-3 text-sm font-semibold text-[var(--color-heading)] hover:bg-[var(--color-surface)]"
            >
              Book a conversation
            </Link>
          </div>
        </CTASection>
      </div>
    </article>
  );
}
