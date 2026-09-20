import Link from "next/link";
import type { Metadata } from "next";

import { PageHero } from "@/components/page-hero";
import { PlaceholderPanel } from "@/components/placeholder-panel";
import { StarMark } from "@/components/star-mark";
import { PAGE_META } from "@/lib/page-meta";
import { resourceFileUrl } from "@/lib/resources";
import { PUBLIC_DOCS } from "@/lib/sitemap-decisions";
import { sanityFetch } from "@/sanity/lib/live";
import {
  DOWNLOADABLE_RESOURCES_QUERY,
  ENROLMENT_PAGE_QUERY,
  SITE_SETTINGS_QUERY,
} from "@/sanity/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = PAGE_META.enrolment;

const WHY_FALLBACK = [
  { title: "A strong academic focus", body: "Structured literacy and maths, sequenced year by year, with clear reporting twice a year." },
  { title: "Founded on the Marian Values", body: "Faith, love, wisdom, belonging, guardianship and service, explicit in our environment every day." },
  { title: "Support for every learner", body: "A collaborative approach with our SENCo, teachers and whānau to reduce barriers to learning." },
  { title: "A community based on family", body: "Students, teachers, parents and extended family, committed together to our young people." },
];

const STEPS_FALLBACK = [
  { title: "Read the enrolment scheme", body: "Our scheme sets out the home zone and the preference categories that apply to a state-integrated Catholic school." },
  { title: "Visit us", body: "Come and see learning in action and meet our principal. Contact the office to arrange a time that suits." },
  { title: "Submit your application", body: "Complete the enrolment application with your supporting documents. The office will confirm what's needed, including a preference certificate where it applies." },
];

const FEE_FALLBACK = [
  { title: "Attendance dues", body: "Set by the proprietor and compulsory for state-integrated schools. They fund the buildings and property, not teaching." },
  { title: "Curriculum charges", body: "For specific activities such as trips, camp and swimming, charged as they arise." },
  { title: "Voluntary contributions", body: "Genuinely voluntary — they help fund resources beyond what the school's operational grant covers." },
  { title: "Financial assistance", body: "Cost should never be the reason a child misses out. Speak to the office in confidence about payment plans or assistance." },
  { title: "Paying through Kindo", body: "Dues, charges and permission slips are handled online through Kindo." },
];

export default async function EnrolmentPage() {
  let copy: Record<string, unknown> | null = null;
  let settings: Record<string, unknown> | null = null;
  let resources: Array<{
    title?: string | null;
    placement?: string[] | null;
    fileUrl?: string | null;
  }> = [];

  try {
    const [page, site, downloads] = await Promise.all([
      sanityFetch({ query: ENROLMENT_PAGE_QUERY, stega: false }),
      sanityFetch({ query: SITE_SETTINGS_QUERY, stega: false }),
      sanityFetch({ query: DOWNLOADABLE_RESOURCES_QUERY, stega: false }),
    ]);
    copy = page.data as Record<string, unknown> | null;
    settings = site.data as Record<string, unknown> | null;
    resources = (downloads.data as typeof resources) ?? [];
  } catch {
    /* CMS unavailable */
  }

  const scheme = resourceFileUrl(resources, "enrolment", PUBLIC_DOCS.enrolmentScheme, "enrolment");
  const handbook = resourceFileUrl(resources, "enrolment", PUBLIC_DOCS.handbook, "handbook");
  const phone = (settings?.contactPhone as string | undefined) ?? "09 427 9189";
  const email = (settings?.contactEmail as string | undefined) ?? "achieve@stellamaris.school.nz";
  const address = (settings?.contactAddress as string | undefined) ?? "50 Silverdale Street, Silverdale 0944";
  const why = (copy?.whyCards as typeof WHY_FALLBACK | undefined)?.filter((item) => item.title) ?? WHY_FALLBACK;
  const steps = (copy?.applicationSteps as typeof STEPS_FALLBACK | undefined)?.filter((item) => item.title) ?? STEPS_FALLBACK;
  const fees = (copy?.feeRows as typeof FEE_FALLBACK | undefined)?.filter((item) => item.title) ?? FEE_FALLBACK;

  return (
    <>
      <PageHero
        eyebrow="Enrolment information"
        title="Join the Stella Maris family"
        subtitle={
          (copy?.heroSubtitle as string | undefined) ??
          "We'd love to meet you. Start with a look at our enrolment scheme, then talk to the office — enrolment here begins with a relationship, not a form."
        }
        actions={
          <>
            <a href="#apply" className="btn-gold">
              How to apply <span aria-hidden>→</span>
            </a>
            <Link href="/contact" className="btn-outline-cream">
              Book a school tour
            </Link>
          </>
        }
      />

      <section className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="page-wrap section-pad grid items-start gap-14 min-[901px]:grid-cols-[1fr_1.35fr]">
          <div>
            <p className="text-[12px] font-semibold tracking-[0.16em] text-[var(--color-gold)] uppercase">
              Why families choose us
            </p>
            <h2 className="mt-3.5 text-[38px] leading-[1.12]">
              {(copy?.valuePropositionTitle as string | undefined) ??
                "The whole child, in a Catholic tradition"}
            </h2>
          </div>
          <div>
            <p className="max-w-[62ch] text-[18.5px] leading-[1.78] text-[var(--color-ink)]">
              {(copy?.valueProposition as string | undefined) ??
                "At Stella Maris we value the development of the whole person — integrating spiritual development, academic success, cultural prowess and awareness, and a high level of sporting participation and skill."}
            </p>
            <ul className="mt-8 grid gap-4 min-[621px]:grid-cols-2">
              {why.map((card) => (
                <li
                  key={card.title}
                  className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-cream)] px-[26px] py-6"
                >
                  <h3 className="text-[20px] leading-[1.25] text-[var(--color-brand)]">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-[15.5px] leading-[1.68] text-[var(--color-ink-muted)]">
                    {card.body}
                  </p>
                </li>
              ))}
            </ul>
            <Link href="/about#principal" className="mt-6 inline-flex items-center gap-2 text-[15.5px] font-semibold">
              Read the principal's message <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section
        id="apply"
        className="scroll-mt-28 border-b border-[var(--color-border)] bg-[var(--color-cream-deep)]"
      >
        <div className="page-wrap section-pad">
          <p className="text-[12px] font-semibold tracking-[0.16em] text-[var(--color-gold)] uppercase">
            Three steps
          </p>
          <h2 className="mt-3.5 text-[38px] leading-[1.12]">How to apply</h2>
          <ol className="mt-10 grid gap-5 min-[901px]:grid-cols-3">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="rounded-[20px] border border-[var(--color-border)] bg-[var(--color-surface)] px-[30px] py-8"
              >
                <span className="flex size-11 items-center justify-center rounded-full bg-[var(--color-brand)] font-display text-[21px] text-[var(--color-cream)]">
                  {index + 1}
                </span>
                <h3 className="mt-[18px] text-[24px] leading-[1.2]">{step.title}</h3>
                <p className="mt-2.5 text-base leading-[1.7] text-[var(--color-ink-muted)]">
                  {step.body}
                </p>
                {index === 0 ? (
                  <a href={scheme} className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-semibold">
                    Enrolment scheme PDF <span aria-hidden>↓</span>
                  </a>
                ) : null}
                {index === 1 ? (
                  <Link href="/contact" className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-semibold">
                    Arrange a visit <span aria-hidden>→</span>
                  </Link>
                ) : null}
                {index === 2 ? (
                  <a href={`mailto:${email}`} className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-semibold">
                    Request the forms <span aria-hidden>→</span>
                  </a>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="page-wrap section-pad grid items-start gap-14 min-[901px]:grid-cols-[1fr_1.35fr]">
          <div>
            <p className="text-[12px] font-semibold tracking-[0.16em] text-[var(--color-gold)] uppercase">
              State-integrated
            </p>
            <h2 className="mt-3.5 text-[36px] leading-[1.12]">
              {(copy?.preferenceTitle as string | undefined) ??
                "Preference & non-preference places"}
            </h2>
          </div>
          <div className="flex max-w-[62ch] flex-col gap-5 text-[17.5px] leading-[1.78] text-[var(--color-ink)]">
            {(
              (copy?.preferenceBody as string | undefined) ??
              "As a state-integrated Catholic school, most of our places are preference places for children whose families have an established connection with the Catholic faith. A smaller number of non-preference places may also be available.\n\nA preference certificate is signed by a parish priest. If you're unsure whether your family qualifies, please ask us — we will walk you through it, and we welcome enquiries from all families."
            )
              .split("\n\n")
              .map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            <PlaceholderPanel label="To confirm with SLT">
              Exact preference categories, current non-preference availability,
              and application closing dates.
            </PlaceholderPanel>
          </div>
        </div>
      </section>

      <section
        id="fees"
        className="scroll-mt-28 border-b border-[var(--color-border)] bg-[var(--color-cream)]"
      >
        <div className="page-wrap section-pad grid items-start gap-14 min-[901px]:grid-cols-[1fr_1.35fr]">
          <div>
            <p className="text-[12px] font-semibold tracking-[0.16em] text-[var(--color-gold)] uppercase">
              Costs
            </p>
            <h2 className="mt-3.5 text-[36px] leading-[1.12]">
              {(copy?.feesTitle as string | undefined) ?? "School fees"}
            </h2>
            <p className="mt-[18px] text-[16.5px] leading-[1.72] text-[var(--color-ink-muted)]">
              {(copy?.feesDescription as string | undefined) ??
                "We want cost to be clear from the start. Please confirm current amounts with the office before you apply."}
            </p>
          </div>
          <ul>
            {fees.map((row, index) => (
              <li
                key={row.title}
                className={`border-t border-[var(--color-border)] py-5 ${
                  index === fees.length - 1 ? "border-b" : ""
                }`}
              >
                <p className="text-[19px] font-semibold">{row.title}</p>
                <p className="mt-1.5 text-base leading-[1.7] text-[var(--color-ink-muted)]">
                  {row.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative overflow-hidden border-t-[6px] border-[var(--color-gold)] bg-[var(--color-brand-muted)] text-[var(--color-cream)]">
        <StarMark
          size={260}
          opacity={0.12}
          className="pointer-events-none absolute -bottom-20 -left-[60px]"
        />
        <div className="page-wrap relative grid items-center gap-14 py-[72px] min-[901px]:grid-cols-2">
          <div>
            <h2 className="text-[36px] leading-[1.12] text-[var(--color-cream)]">
              {(copy?.ctaHeading as string | undefined) ??
                "Still deciding? Ask us anything."}
            </h2>
            <p className="mt-4 max-w-[48ch] text-[17.5px] leading-[1.72] text-[rgba(250,248,245,.92)]">
              {(copy?.ctaBody as string | undefined) ??
                "Katherine and Colleen in the office are the best first call — they'll answer your questions or put you in touch with our principal."}
            </p>
            <ul className="mt-7 flex flex-col gap-3 text-[17px]">
              <li>
                <a
                  href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                  className="font-semibold text-[var(--color-gold-light)] hover:text-[var(--color-cream)]"
                >
                  {phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="break-all font-semibold text-[var(--color-gold-light)] hover:text-[var(--color-cream)]"
                >
                  {email}
                </a>
              </li>
              <li className="whitespace-pre-line text-[rgba(250,248,245,.86)]">
                {address}
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-3.5">
            <a
              href={scheme}
              className="flex items-center justify-between gap-5 rounded-2xl border border-[rgba(250,248,245,.28)] bg-[rgba(255,255,255,.08)] px-7 py-6 text-[var(--color-cream)] hover:bg-[rgba(255,255,255,.16)] hover:text-[var(--color-cream)]"
            >
              <span>
                <span className="block font-display text-[23px] leading-[1.2]">
                  Enrolment scheme
                </span>
                <span className="mt-1 block text-[14.5px] text-[rgba(250,248,245,.82)]">
                  PDF
                </span>
              </span>
              <span aria-hidden className="text-[22px]">
                ↓
              </span>
            </a>
            <a
              href={handbook}
              className="flex items-center justify-between gap-5 rounded-2xl border border-[rgba(250,248,245,.28)] bg-[rgba(255,255,255,.08)] px-7 py-6 text-[var(--color-cream)] hover:bg-[rgba(255,255,255,.16)] hover:text-[var(--color-cream)]"
            >
              <span>
                <span className="block font-display text-[23px] leading-[1.2]">
                  Parent Information Handbook 2026
                </span>
                <span className="mt-1 block text-[14.5px] text-[rgba(250,248,245,.82)]">
                  PDF · everything in one place
                </span>
              </span>
              <span aria-hidden className="text-[22px]">
                ↓
              </span>
            </a>
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2.5 rounded-2xl bg-[var(--color-gold)] px-7 py-[18px] text-[16.5px] font-semibold text-[var(--color-heading)] hover:bg-[var(--color-gold-muted)] hover:text-[var(--color-heading)]"
            >
              Book a school tour <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
