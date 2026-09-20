import type { Metadata } from "next";
import Link from "next/link";

import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";
import { PAGE_META } from "@/lib/page-meta";
import { sanityFetch } from "@/sanity/lib/live";
import { SITE_SETTINGS_QUERY, STAFF_MEMBERS_QUERY } from "@/sanity/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = PAGE_META.contact;

type StaffMember = {
  name?: string | null;
  role?: string | null;
  email?: string | null;
  showOnContact?: boolean | null;
  sortOrder?: number | null;
};

const CONTACT_FALLBACK: StaffMember[] = [
  { name: "Katherine Craig", role: "School Administrator", showOnContact: true, sortOrder: 50 },
  { name: "Colleen Smith", role: "Office Administrator", email: "colleen@stellamaris.school.nz", showOnContact: true, sortOrder: 60 },
  { name: "Catherine Cyprian", role: "Principal", email: "principal@stellamaris.school.nz", showOnContact: true, sortOrder: 10 },
  { name: "Mel Hogg", role: "Learning support · SENCo", email: "melh@stellamaris.school.nz", showOnContact: true, sortOrder: 30 },
];

export default async function ContactPage() {
  let settings: Record<string, unknown> | null = null;
  let staff: StaffMember[] = [];
  try {
    const [site, people] = await Promise.all([
      sanityFetch({ query: SITE_SETTINGS_QUERY, stega: false }),
      sanityFetch({ query: STAFF_MEMBERS_QUERY, stega: false }),
    ]);
    settings = site.data as Record<string, unknown> | null;
    staff = (people.data as StaffMember[]) ?? [];
  } catch {
    /* CMS unavailable */
  }

  const who = (staff.filter((person) => person.showOnContact).length
    ? staff.filter((person) => person.showOnContact)
    : CONTACT_FALLBACK
  ).sort((a, b) => (a.sortOrder ?? 100) - (b.sortOrder ?? 100));

  const address =
    (settings?.contactAddress as string | undefined) ??
    "50 Silverdale Street\nSilverdale 0944, Auckland";
  const phone = (settings?.contactPhone as string | undefined) ?? "09 427 9189";
  const email =
    (settings?.contactEmail as string | undefined) ?? "achieve@stellamaris.school.nz";
  const hours =
    (settings?.officeHours as string | undefined) ?? "8:00am – 3:30pm, term time";

  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Get in touch"
        subtitle="Our office team is the best first call for anything — enrolment, absences, accounts, or a question about your child's day."
      />

      <section className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="page-wrap section-pad grid items-start gap-14 min-[901px]:grid-cols-2">
          <div>
            <h2 className="text-[32px] leading-[1.15]">
              Stella Maris Catholic Primary School
            </h2>
            <ul className="mt-7">
              <li className="border-t border-[var(--color-border)] py-[18px]">
                <p className="text-[11.5px] font-semibold tracking-[0.16em] text-[var(--color-gold)] uppercase">
                  Address
                </p>
                <p className="mt-1.5 whitespace-pre-line text-[18px] text-[var(--color-heading)]">
                  {address}
                </p>
              </li>
              <li className="border-t border-[var(--color-border)] py-[18px]">
                <p className="text-[11.5px] font-semibold tracking-[0.16em] text-[var(--color-gold)] uppercase">
                  Phone
                </p>
                <a
                  href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                  className="mt-1.5 block text-[19px] font-semibold"
                >
                  {phone}
                </a>
              </li>
              <li className="border-t border-[var(--color-border)] py-[18px]">
                <p className="text-[11.5px] font-semibold tracking-[0.16em] text-[var(--color-gold)] uppercase">
                  Email
                </p>
                <a href={`mailto:${email}`} className="mt-1.5 block break-all text-[18px] font-semibold">
                  {email}
                </a>
              </li>
              <li className="border-y border-[var(--color-border)] py-[18px]">
                <p className="text-[11.5px] font-semibold tracking-[0.16em] text-[var(--color-gold)] uppercase">
                  Office hours
                </p>
                <p className="mt-1.5 text-[18px] text-[var(--color-heading)]">{hours}</p>
              </li>
            </ul>
            <h3 className="mt-10 text-[24px] leading-[1.2]">Who to ask</h3>
            <ul className="mt-[18px] grid gap-3.5 min-[621px]:grid-cols-2">
              {who.map((person) => (
                <li
                  key={person.name}
                  className="rounded-[14px] border border-[var(--color-border)] bg-[var(--color-cream)] px-[22px] py-5"
                >
                  <p className="text-[17px] font-semibold">{person.name}</p>
                  <p className="mt-1 text-[14px] text-[var(--color-olive)]">
                    {person.role}
                  </p>
                  {person.email ? (
                    <a href={`mailto:${person.email}`} className="mt-2 block break-all text-[13.5px]">
                      {person.email}
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>

          <ContactForm officeEmail={email} />
        </div>
      </section>

      <section className="bg-[var(--color-cream-deep)]">
        <div className="page-wrap flex flex-wrap items-center justify-between gap-6 py-14">
          <p className="text-[18px] text-[var(--color-ink)]">
            Reporting an absence instead?
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/absences" className="btn-outline-surface">
              Absences
            </Link>
            <Link href="/enrolment" className="btn-brand">
              Enrolment
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
