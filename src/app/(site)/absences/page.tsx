import Link from "next/link";
import type { Metadata } from "next";

import { PageHero } from "@/components/page-hero";
import { PlaceholderPanel } from "@/components/placeholder-panel";
import { PAGE_META } from "@/lib/page-meta";
import { sanityFetch } from "@/sanity/lib/live";
import { ABSENCES_PAGE_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = PAGE_META.absences;

export default async function AbsencesPage() {
  let copy: Record<string, unknown> | null = null;
  let settings: Record<string, unknown> | null = null;
  try {
    const [page, site] = await Promise.all([
      sanityFetch({ query: ABSENCES_PAGE_QUERY, stega: false }),
      sanityFetch({ query: SITE_SETTINGS_QUERY, stega: false }),
    ]);
    copy = page.data as Record<string, unknown> | null;
    settings = site.data as Record<string, unknown> | null;
  } catch {
    /* CMS unavailable */
  }

  const phone = (settings?.contactPhone as string | undefined) ?? "09 427 9189";
  const email = (settings?.contactEmail as string | undefined) ?? "achieve@stellamaris.school.nz";
  const hours = (settings?.officeHours as string | undefined) ?? "8:00am – 3:30pm";
  const heroAppUrl = settings?.heroAppUrl as string | undefined;

  return (
    <>
      <PageHero
        eyebrow="Absences"
        title="Let us know your child is away"
        subtitle={
          (copy?.heroSubtitle as string | undefined) ??
          "Please tell us before 9:00am on any day your child will be absent — for illness, appointments, or family reasons."
        }
      />

      <section className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="page-wrap section-pad">
          <h2 className="text-[36px] leading-[1.12]">Three ways to report an absence</h2>
          <ul className="mt-9 grid gap-5 min-[901px]:grid-cols-3">
            <li>
              {heroAppUrl ? (
                <a
                  href={heroAppUrl}
                  className="flex h-full flex-col rounded-[20px] bg-[var(--color-brand)] px-[30px] py-8 text-[var(--color-cream)] hover:bg-[var(--color-brand-hover)] hover:text-[var(--color-cream)]"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <span className="text-[11.5px] font-semibold tracking-[0.16em] text-[var(--color-gold-light)] uppercase">
                    Fastest
                  </span>
                  <span className="mt-3 font-display text-[28px] leading-[1.2]">
                    In the Hero app
                  </span>
                  <span className="mt-2.5 text-base leading-[1.68] text-[rgba(250,248,245,.9)]">
                    Log the absence yourself, any time of day or night.
                  </span>
                  <span className="mt-auto pt-5 text-[15px] font-semibold text-[var(--color-gold-light)]">
                    Open Hero ↗
                  </span>
                </a>
              ) : (
                <div className="flex h-full flex-col rounded-[20px] bg-[var(--color-brand)] px-[30px] py-8 text-[var(--color-cream)]">
                  <span className="text-[11.5px] font-semibold tracking-[0.16em] text-[var(--color-gold-light)] uppercase">
                    Fastest
                  </span>
                  <span className="mt-3 font-display text-[28px] leading-[1.2]">
                    In the Hero app
                  </span>
                  <span className="mt-2.5 text-base leading-[1.68] text-[rgba(250,248,245,.9)]">
                    Log the absence yourself, any time of day or night.
                  </span>
                  <span className="mt-auto pt-5 text-[15px] font-semibold text-[var(--color-gold-light)]">
                    Hero app link to come
                  </span>
                </div>
              )}
            </li>
            <li className="flex flex-col rounded-[20px] border border-[var(--color-border)] bg-[var(--color-cream)] px-[30px] py-8">
              <span className="text-[11.5px] font-semibold tracking-[0.16em] text-[var(--color-gold)] uppercase">
                Before 9:00am
              </span>
              <span className="mt-3 font-display text-[28px] leading-[1.2]">
                Phone the office
              </span>
              <a
                href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                className="mt-2.5 text-[19px] font-semibold"
              >
                {phone}
              </a>
              <span className="mt-auto pt-5 text-[15px] text-[var(--color-ink-muted)]">
                Office open {hours}
              </span>
            </li>
            <li className="flex flex-col rounded-[20px] border border-[var(--color-border)] bg-[var(--color-cream)] px-[30px] py-8">
              <span className="text-[11.5px] font-semibold tracking-[0.16em] text-[var(--color-gold)] uppercase">
                Anytime
              </span>
              <span className="mt-3 font-display text-[28px] leading-[1.2]">
                Email the office
              </span>
              <a href={`mailto:${email}`} className="mt-2.5 break-all text-[16.5px] font-semibold">
                {email}
              </a>
              <span className="mt-auto pt-5 text-[15px] text-[var(--color-ink-muted)]">
                Include your child's name, class and the reason.
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section className="border-b border-[var(--color-border)] bg-[var(--color-cream-deep)]">
        <div className="page-wrap grid items-start gap-14 py-16 min-[901px]:grid-cols-[1fr_1.35fr]">
          <div>
            <p className="text-[12px] font-semibold tracking-[0.16em] text-[var(--color-gold)] uppercase">
              Helpful detail
            </p>
            <h2 className="mt-3.5 text-[34px] leading-[1.15]">What to tell us</h2>
          </div>
          <ul>
            {[
              "Your child's full name and class",
              "The date or dates they will be away",
              "The reason — illness, appointment, bereavement, family travel",
              "For appointments during the day, the pick-up and return times",
            ].map((item, index) => (
              <li
                key={item}
                className={`border-t border-[#D6CCBA] py-[18px] text-[17px] text-[var(--color-ink)] ${
                  index === 3 ? "border-b" : ""
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="plan" className="scroll-mt-28 bg-[var(--color-surface)]">
        <div className="page-wrap section-pad grid items-start gap-14 min-[901px]:grid-cols-[1fr_1.35fr]">
          <div>
            <p className="text-[12px] font-semibold tracking-[0.16em] text-[var(--color-gold)] uppercase">
              Attendance
            </p>
            <h2 className="mt-3.5 text-[36px] leading-[1.12]">
              {(copy?.attendanceTitle as string | undefined) ??
                "Why every day matters"}
            </h2>
            <PlaceholderPanel className="mt-[26px]" label="To upload">
              Our attendance management plan will be published here.
            </PlaceholderPanel>
          </div>
          <div className="flex max-w-[62ch] flex-col gap-5 text-[17.5px] leading-[1.78] text-[var(--color-ink)]">
            <p>
              {(copy?.attendanceDescription as string | undefined) ??
                "Student attendance at school plays an important role in student progress and achievement. Lifting school attendance is a shared responsibility."}
            </p>
            <p>
              Parents, families and whānau working with teachers is key to
              helping young people stay engaged and motivated at school, which
              is important to help young people achieve their goals.
            </p>
            <p className="font-display text-[22px] leading-[1.55] text-[var(--color-brand)] italic">
              The more often students attend school, the better they do at
              school, the happier they are, and the better they are set up for
              life.
            </p>
            <p>
              If a pattern of absence needs attention, we'll work alongside you
              with care, following our attendance management plan and Ministry
              of Education guidance.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
