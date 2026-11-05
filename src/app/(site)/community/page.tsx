import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { PageHero } from "@/components/page-hero";
import { BOARD_EMAIL_FALLBACK, PTFA_EMAIL_FALLBACK } from "@/lib/app-links";
import { personInitials, resourceFileUrl } from "@/lib/resources";
import { urlForImage } from "@/sanity/lib/image";
import { PUBLIC_DOCS } from "@/lib/sitemap-decisions";
import { PAGE_META } from "@/lib/page-meta";
import { sanityFetch } from "@/sanity/lib/live";
import {
  COMMUNITY_PAGE_QUERY,
  DOWNLOADABLE_RESOURCES_QUERY,
  SITE_SETTINGS_QUERY,
  STAFF_MEMBERS_QUERY,
} from "@/sanity/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = PAGE_META.community;

type StaffMember = {
  name?: string | null;
  role?: string | null;
  email?: string | null;
  group?: string[] | null;
  sortOrder?: number | null;
  photo?: { asset?: { _ref?: string } | null; alt?: string | null } | null;
  photoUrl?: string | null;
};

function avatarSrc(person: StaffMember) {
  if (person.photo?.asset?._ref) {
    const built = urlForImage(person.photo as never)
      ?.width(160)
      .height(160)
      .fit("crop")
      .auto("format")
      .url();
    if (built) return built;
  }
  return person.photoUrl ?? undefined;
}

const SLT_FALLBACK: StaffMember[] = [
  {
    name: "Catherine Cyprian",
    role: "Principal",
    email: "principal@stellamaris.school.nz",
    group: ["slt"],
    sortOrder: 10,
  },
  {
    name: "Karl Hobman",
    role: "Director of Religious Studies",
    email: "karl@stellamaris.school.nz",
    group: ["slt"],
    sortOrder: 40,
  },
  {
    name: "Olwyn Hobman",
    role: "Associate Principal Years 4–6",
    email: "olwyn@stellamaris.school.nz",
    group: ["slt"],
    sortOrder: 20,
  },
  {
    name: "Mel Hogg",
    role: "Associate Principal Years 0–3 · SENCo",
    email: "melh@stellamaris.school.nz",
    group: ["slt"],
    sortOrder: 30,
  },
];

export default async function CommunityPage() {
  let copy: Record<string, unknown> | null = null;
  let settings: Record<string, unknown> | null = null;
  let staff: StaffMember[] = [];
  let resources: Array<{
    title?: string | null;
    placement?: string[] | null;
    fileUrl?: string | null;
  }> = [];

  try {
    const [page, site, people, downloads] = await Promise.all([
      sanityFetch({ query: COMMUNITY_PAGE_QUERY, stega: false }),
      sanityFetch({ query: SITE_SETTINGS_QUERY, stega: false }),
      sanityFetch({ query: STAFF_MEMBERS_QUERY, stega: false }),
      sanityFetch({ query: DOWNLOADABLE_RESOURCES_QUERY, stega: false }),
    ]);
    copy = page.data as Record<string, unknown> | null;
    settings = site.data as Record<string, unknown> | null;
    staff = (people.data as StaffMember[]) ?? [];
    resources = (downloads.data as typeof resources) ?? [];
  } catch {
    /* CMS unavailable */
  }

  const boardMembers = (
    (copy?.boardMembers as Array<{
      _key?: string;
      name?: string | null;
      role?: string | null;
    }> | null) ?? []
  ).filter((member) => member?.name);
  const slt = (staff.length ? staff : SLT_FALLBACK)
    .filter((person) => person.group?.includes("slt"))
    .sort((a, b) => (a.sortOrder ?? 100) - (b.sortOrder ?? 100))
    .slice(0, 4);
  const preview = slt.length ? slt : SLT_FALLBACK;

  const financials = resourceFileUrl(
    resources,
    "reports",
    PUBLIC_DOCS.financials,
    "financial",
  );
  const scheme = resourceFileUrl(
    resources,
    "reports",
    PUBLIC_DOCS.enrolmentScheme,
    "enrolment",
  );
  const policiesUrl = settings?.policiesUrl as string | undefined;
  const eroUrl = settings?.eroUrl as string | undefined;
  const ptfaEmail =
    (settings?.ptfaEmail as string | undefined) || PTFA_EMAIL_FALLBACK;
  const boardEmail =
    (settings?.boardEmail as string | undefined) || BOARD_EMAIL_FALLBACK;
  const strategicPlanUrl = copy?.strategicPlanUrl as string | undefined;
  const attendancePlanUrl = copy?.attendancePlanUrl as string | undefined;

  return (
    <>
      <PageHero
        eyebrow="Our Community"
        title="A community based on family"
        subtitle={
          (copy?.heroSubtitle as string | undefined) ??
          "Students, teachers, parents and extended family joining together, wholeheartedly committed to the education of our young people."
        }
      />

      <section
        id="staff"
        className="scroll-mt-28 border-b border-[var(--color-border)] bg-[var(--color-surface)]"
      >
        <div className="page-wrap section-pad grid items-center gap-14 min-[901px]:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="text-eyebrow font-semibold tracking-[0.16em] text-[var(--color-gold)] uppercase">
              The people here
            </p>
            <h2 className="mt-3.5 text-h2 leading-[1.12]">Staff</h2>
            <p className="mt-[18px] text-body leading-[1.65] text-[var(--color-ink-muted)]">
              {(copy?.staffIntro as string | undefined) ??
                "Our senior leadership team, office, the Mārama and Ahi teaching teams, and the support staff who make our days run."}
            </p>
            <Link href="/community/staff" className="btn-brand mt-[26px]">
              Meet the staff <span aria-hidden>→</span>
            </Link>
          </div>
          <ul className="grid gap-4 min-[621px]:grid-cols-2">
            {preview.map((person) => (
              <li
                key={person.name}
                className="flex flex-col gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-cream)] px-[26px] py-6"
              >
                <span className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--color-cream-deep)] ring-1 ring-[var(--color-border)]">
                  {avatarSrc(person) ? (
                    <Image
                      src={avatarSrc(person)!}
                      alt={person.photo?.alt || person.name || ""}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  ) : (
                    <span className="font-display text-body text-[rgba(108,20,44,.45)]">
                      {personInitials(person.name ?? "")}
                    </span>
                  )}
                </span>
                <div className="min-w-0">
                  <h3 className="text-h4 leading-[1.2]">{person.name}</h3>
                  <p className="mt-1 text-small font-medium text-[var(--color-olive)]">
                    {person.role}
                  </p>
                  {person.email ? (
                    <a
                      href={`mailto:${person.email}`}
                      className="mt-2.5 block break-all text-small"
                    >
                      {person.email}
                    </a>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="ptfa"
        className="scroll-mt-28 border-b border-[var(--color-border)] bg-[var(--color-cream-deep)]"
      >
        <div className="page-wrap section-pad grid items-start gap-14 min-[901px]:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="text-eyebrow font-semibold tracking-[0.16em] text-[var(--color-gold)] uppercase">
              Parents, teachers & friends
            </p>
            <h2 className="mt-3.5 text-h2 leading-[1.12]">
              {(copy?.ptfaTitle as string | undefined) ?? "PTFA"}
            </h2>
          </div>
          <div>
            <p className="max-w-[60ch] text-body leading-[1.65] text-[var(--color-ink)]">
              {(copy?.ptfaDescription as string | undefined) ??
                "Our PTFA brings whānau together — running events, fundraising for learning resources, and making sure new families feel at home. Everyone is welcome, whether you can give an hour a term or a whole Saturday."}
            </p>
            <a
              href={`mailto:${ptfaEmail}`}
              className="mt-[22px] inline-flex items-center gap-2 text-copy font-semibold"
            >
              {(copy?.ptfaHelpText as string | undefined) ??
                "Get in touch about helping"}{" "}
              <span aria-hidden>→</span>
            </a>
            <p className="mt-1.5 text-small text-[var(--color-ink-muted)]">
              {ptfaEmail}
            </p>
          </div>
        </div>
      </section>

      <section
        id="board"
        className="scroll-mt-28 border-b border-[var(--color-border)] bg-[var(--color-surface)]"
      >
        <div className="page-wrap section-pad grid items-start gap-14 min-[901px]:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="text-eyebrow font-semibold tracking-[0.16em] text-[var(--color-gold)] uppercase">
              Governance
            </p>
            <h2 className="mt-3.5 text-h2 leading-[1.12]">
              {(copy?.boardTitle as string | undefined) ?? "School board"}
            </h2>
            <p className="mt-[18px] text-body leading-[1.65] whitespace-pre-line text-[var(--color-ink-muted)]">
              {(copy?.boardDescription as string | undefined) ??
                "The board sets the strategic direction of the school alongside the principal, safeguards our special character, and is accountable for how the school's resources are used."}
            </p>
          </div>
          <div>
            {boardMembers.length ? (
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-cream)] px-[26px] py-6">
                <h3 className="text-h4 leading-[1.2]">Board members</h3>
                <ul className="mt-4 grid gap-x-8 gap-y-2.5 min-[621px]:grid-cols-2">
                  {boardMembers.map((member) => (
                    <li
                      key={member._key ?? member.name}
                      className="text-copy leading-[1.5]"
                    >
                      <span className="font-semibold text-[var(--color-heading)]">
                        {member.name}
                      </span>
                      {member.role ? (
                        <span className="block text-small text-[var(--color-olive)]">
                          {member.role}
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <ul className="mt-6">
              <li className="border-t border-[var(--color-border)] py-[18px]">
                <p className="text-body font-semibold">Meeting minutes</p>
                <p className="mt-1.5 text-copy leading-[1.65] text-[var(--color-ink-muted)]">
                  {(copy?.boardMinutesText as string | undefined) ??
                    "Email the Board for a copy of board minutes —"}{" "}
                  <a href={`mailto:${boardEmail}`}>{boardEmail}</a>
                </p>
              </li>
              <li className="border-y border-[var(--color-border)] py-[18px]">
                <p className="text-body font-semibold">
                  Attendance at meetings
                </p>
                <p className="mt-1.5 text-copy leading-[1.65] text-[var(--color-ink-muted)]">
                  {(copy?.boardMeetingText as string | undefined) ??
                    "Board meetings are open to the public. To attend a meeting, or with any queries for the Board, please email"}{" "}
                  <a href={`mailto:${boardEmail}`}>{boardEmail}</a>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section id="reports" className="scroll-mt-28 bg-[var(--color-cream)]">
        <div className="page-wrap section-pad">
          <p className="text-eyebrow font-semibold tracking-[0.16em] text-[var(--color-gold)] uppercase">
            Accountability
          </p>
          <h2 className="mt-3.5 text-h2 leading-[1.12]">
            Plans, reports & policies
          </h2>
          <p className="mt-4 max-w-[62ch] text-body leading-[1.65] text-[var(--color-ink-muted)]">
            {(copy?.reportsIntro as string | undefined) ??
              "Published by the board for our community, as required by the Education and Training Act 2020."}
          </p>
          <ul className="mt-9 grid gap-4 min-[621px]:grid-cols-2 min-[901px]:grid-cols-3">
            <li>
              <a
                href={financials}
                className="card-lift flex h-full flex-col rounded-[18px] border border-[var(--color-border)] border-t-[3px] border-t-[var(--color-gold)] bg-[var(--color-surface)] px-7 py-7 shadow-[var(--shadow-card)]"
              >
                <span className="font-display text-h3 leading-[1.22]">
                  Annual Financial Statements 2025
                </span>
                <span className="mt-auto pt-[18px] text-small font-semibold text-[var(--color-brand)]">
                  Download PDF ↓
                </span>
              </a>
            </li>
            <li>
              <a
                href={scheme}
                className="card-lift flex h-full flex-col rounded-[18px] border border-[var(--color-border)] border-t-[3px] border-t-[var(--color-gold)] bg-[var(--color-surface)] px-7 py-7 shadow-[var(--shadow-card)]"
              >
                <span className="font-display text-h3 leading-[1.22]">
                  Enrolment scheme
                </span>
                <span className="mt-auto pt-[18px] text-small font-semibold text-[var(--color-brand)]">
                  Download PDF ↓
                </span>
              </a>
            </li>
            {policiesUrl ? (
              <li>
                <a
                  href={policiesUrl}
                  className="card-lift flex h-full flex-col rounded-[18px] border border-[var(--color-border)] border-t-[3px] border-t-[var(--color-gold)] bg-[var(--color-surface)] px-7 py-7 shadow-[var(--shadow-card)]"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <span className="font-display text-h3 leading-[1.22]">
                    School policies & procedures
                  </span>
                  <span className="mt-2.5 text-copy leading-[1.65] text-[var(--color-ink-muted)]">
                    Maintained online in SchoolDocs.
                  </span>
                  <span className="mt-auto pt-[18px] text-small font-semibold text-[var(--color-brand)]">
                    Open SchoolDocs ↗
                  </span>
                </a>
              </li>
            ) : null}
            {strategicPlanUrl ? (
              <li>
                <a
                  href={strategicPlanUrl}
                  className="card-lift flex h-full flex-col rounded-[18px] border border-[var(--color-border)] border-t-[3px] border-t-[var(--color-gold)] bg-[var(--color-surface)] px-7 py-7 shadow-[var(--shadow-card)]"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <span className="font-display text-h3 leading-[1.22]">
                    Strategic &amp; annual plan
                  </span>
                  <span className="mt-auto pt-[18px] text-small font-semibold text-[var(--color-brand)]">
                    Download ↓
                  </span>
                </a>
              </li>
            ) : null}
            {attendancePlanUrl ? (
              <li>
                <a
                  href={attendancePlanUrl}
                  className="card-lift flex h-full flex-col rounded-[18px] border border-[var(--color-border)] border-t-[3px] border-t-[var(--color-gold)] bg-[var(--color-surface)] px-7 py-7 shadow-[var(--shadow-card)]"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <span className="font-display text-h3 leading-[1.22]">
                    Attendance management plan
                  </span>
                  <span className="mt-auto pt-[18px] text-small font-semibold text-[var(--color-brand)]">
                    Download ↓
                  </span>
                </a>
              </li>
            ) : null}
            {eroUrl ? (
              <li>
                <a
                  href={eroUrl}
                  className="card-lift flex h-full flex-col rounded-[18px] border border-[var(--color-border)] border-t-[3px] border-t-[var(--color-gold)] bg-[var(--color-surface)] px-7 py-7 shadow-[var(--shadow-card)]"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <span className="font-display text-h3 leading-[1.22]">
                    ERO report
                  </span>
                  <span className="mt-auto pt-[18px] text-small font-semibold text-[var(--color-brand)]">
                    Read the report ↗
                  </span>
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </section>
    </>
  );
}
