import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/page-hero";
import { PlaceholderPanel } from "@/components/placeholder-panel";
import { PAGE_META } from "@/lib/page-meta";
import { sanityFetch } from "@/sanity/lib/live";
import { PARISH_PAGE_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = PAGE_META.parish;

function ExternalLinkCard({
  title,
  body,
  href,
  pendingLabel,
}: {
  title: string;
  body: string;
  href?: string | null;
  pendingLabel: string;
}) {
  const className =
    "flex h-full flex-col rounded-[18px] border border-[var(--color-border)] bg-[var(--color-surface)] px-7 py-7";
  const inner = (
    <>
      <span className="font-display text-[23px] leading-[1.25]">{title}</span>
      <span className="mt-2 text-[15px] leading-[1.65] text-[var(--color-ink-muted)]">
        {body}
      </span>
      {href ? (
        <span className="mt-auto pt-4 text-[14.5px] font-semibold text-[var(--color-brand)]">
          Visit website ↗
        </span>
      ) : (
        <span className="mt-auto pt-4 text-[14.5px] text-[var(--color-faint)]">
          {pendingLabel}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={`${className} card-lift hover:border-[var(--color-gold)]`}
        target="_blank"
        rel="noreferrer noopener"
      >
        {inner}
      </a>
    );
  }

  return <div className={className}>{inner}</div>;
}

const BODY_FALLBACK = [
  "Our parish priest leads Atrium Masses at school, with children taking parts in the liturgy, and whole-school Masses mark the liturgical events of the year. Class-led liturgies happen fortnightly and whānau are always welcome to join us.",
  "Sacramental preparation — Reconciliation, First Communion and Confirmation — is run through the parish rather than the school, and the parish office is the place to start.",
];

function paragraphs(text?: string | null) {
  const parts = text
    ?.split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);
  return parts?.length ? parts : BODY_FALLBACK;
}

export default async function ParishPage() {
  let copy: Record<string, unknown> | null = null;
  let parishUrl: string | null = null;
  let dioceseUrl: string | null = null;
  try {
    const [pageResult, settingsResult] = await Promise.all([
      sanityFetch({ query: PARISH_PAGE_QUERY, stega: false }),
      sanityFetch({ query: SITE_SETTINGS_QUERY, stega: false }),
    ]);
    copy = pageResult.data as Record<string, unknown> | null;
    const settings = settingsResult.data as Record<string, unknown> | null;
    parishUrl = (settings?.parishUrl as string | undefined) || null;
    dioceseUrl = (settings?.dioceseUrl as string | undefined) || null;
  } catch {
    /* CMS unavailable */
  }

  return (
    <>
      <PageHero
        eyebrow="Our parish"
        title="Hibiscus Coast Parish"
        subtitle={
          (copy?.heroSubtitle as string | undefined) ??
          "Stella Maris is part of the Hibiscus Coast Catholic community. Parish life enriches our school through liturgy, sacramental preparation, and opportunities to serve together."
        }
      />

      <section className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="page-wrap section-pad grid items-start gap-14 min-[901px]:grid-cols-[1fr_1.3fr]">
          <div>
            <p className="text-[12px] font-semibold tracking-[0.16em] text-[var(--color-gold)] uppercase">
              Together
            </p>
            <h2 className="mt-3.5 text-[36px] leading-[1.12]">
              {(copy?.sectionTitle as string | undefined) ?? "School and parish"}
            </h2>
          </div>
          <div className="flex max-w-[62ch] flex-col gap-5 text-[17.5px] leading-[1.78] text-[var(--color-ink)]">
            {paragraphs(copy?.body as string | undefined).map((part) => (
              <p key={part.slice(0, 48)}>{part}</p>
            ))}
            <PlaceholderPanel label="To come">
              A short parish statement approved by SLT, plus Mass times and the
              sacramental programme calendar.
            </PlaceholderPanel>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-cream)]">
        <div className="page-wrap py-[72px]">
          <h2 className="text-[30px] leading-[1.15]">Catholic & community links</h2>
          <ul className="mt-8 grid gap-4 min-[901px]:grid-cols-3">
            <li>
              <ExternalLinkCard
                title="Hibiscus Coast Parish"
                body="Mass times, sacramental programmes and parish news."
                href={parishUrl}
                pendingLabel="Parish website to come"
              />
            </li>
            <li>
              <ExternalLinkCard
                title="Catholic Diocese of Auckland"
                body="Our diocese and its schools."
                href={dioceseUrl}
                pendingLabel="Diocese link to come"
              />
            </li>
            <li>
              <Link
                href="/about#character"
                className="card-lift flex h-full flex-col rounded-[18px] border border-[var(--color-border)] bg-[var(--color-surface)] px-7 py-7 hover:border-[var(--color-gold)]"
              >
                <span className="font-display text-[23px] leading-[1.25]">
                  Our special character
                </span>
                <span className="mt-2 text-[15px] leading-[1.65] text-[var(--color-ink-muted)]">
                  How faith is lived day to day at Stella Maris.
                </span>
                <span className="mt-auto pt-4 text-[14.5px] font-semibold text-[var(--color-brand)]">
                  Read more →
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
