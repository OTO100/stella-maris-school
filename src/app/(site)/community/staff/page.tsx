import Image from "next/image";
import type { Metadata } from "next";

import { PageHero } from "@/components/page-hero";
import { PAGE_META } from "@/lib/page-meta";
import { personInitials } from "@/lib/resources";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { STAFF_MEMBERS_QUERY, STAFF_PAGE_QUERY } from "@/sanity/lib/queries";

export const revalidate = 0;

export const metadata: Metadata = PAGE_META.staff;

type StaffMember = {
  name?: string | null;
  role?: string | null;
  email?: string | null;
  group?: string[] | null;
  className?: string | null;
  yearLevel?: string | null;
  isTeamLeader?: boolean | null;
  sortOrder?: number | null;
  photo?: {
    asset?: { _ref?: string } | null;
    alt?: string | null;
  } | null;
  photoUrl?: string | null;
};

function staffPhotoSrc(person: StaffMember) {
  if (person.photo?.asset?._ref) {
    const built = urlForImage(person.photo as never)
      ?.width(640)
      .height(800)
      .fit("crop")
      .auto("format")
      .url();
    if (built) return built;
  }
  return person.photoUrl ?? undefined;
}

const FALLBACK_STAFF: StaffMember[] = [
  { name: "Catherine Cyprian", role: "Principal", email: "principal@stellamaris.school.nz", group: ["slt"], sortOrder: 10 },
  { name: "Olwyn Hobman", role: "Associate Principal Years 4–6 · Curriculum Leader", email: "olwyn@stellamaris.school.nz", group: ["slt"], sortOrder: 20 },
  { name: "Mel Hogg", role: "Associate Principal Years 0–3 · SENCo", email: "melh@stellamaris.school.nz", group: ["slt", "marama"], sortOrder: 30 },
  { name: "Karl Hobman", role: "Director of Religious Studies", email: "karl@stellamaris.school.nz", group: ["slt", "marama"], className: "St Mary", yearLevel: "Year 2", sortOrder: 40 },
  { name: "Katherine Craig", role: "School Administrator", email: "achieve@stellamaris.school.nz", group: ["office"], sortOrder: 50 },
  { name: "Colleen Smith", role: "Office Administrator", email: "colleen@stellamaris.school.nz", group: ["office"], sortOrder: 60 },
  { name: "Isla MacDiarmid", email: "isla.macdiarmid@stellamaris.school.nz", group: ["marama"], className: "St Anne", yearLevel: "Year 1", sortOrder: 110 },
  { name: "Erica Mainwaring", email: "erica@stellamaris.school.nz", group: ["marama"], className: "St Benedict", yearLevel: "Year 1", sortOrder: 120 },
  { name: "Monica Allemann", email: "monica@stellamaris.school.nz", group: ["marama"], className: "St Clare", yearLevel: "Year 1", sortOrder: 130 },
  { name: "Jenny Bentley", email: "jenny@stellamaris.school.nz", group: ["marama"], className: "St Nicholas", yearLevel: "Year 2", sortOrder: 150 },
  { name: "Diana Pearson", email: "diana@stellamaris.school.nz", group: ["marama"], className: "St Lucy", yearLevel: "Year 3", isTeamLeader: true, sortOrder: 160 },
  { name: "Nada Boric", email: "nada@stellamaris.school.nz", group: ["marama"], className: "St Francis", yearLevel: "Year 3", sortOrder: 170 },
  { name: "Michelle Kleingeld", email: "michelle@stellamaris.school.nz", group: ["ahi"], className: "St Peter", yearLevel: "Year 4", sortOrder: 210 },
  { name: "Chantell Vermeulen", email: "chantell.vermeulen@stellamaris.school.nz", group: ["ahi"], className: "St John", yearLevel: "Year 4", sortOrder: 220 },
  { name: "Becky Buckley", email: "becky.buckley@stellamaris.school.nz", group: ["ahi"], className: "St Anthony", yearLevel: "Year 4", sortOrder: 230 },
  { name: "Tina Hunt", email: "tina@stellamaris.school.nz", group: ["ahi"], className: "St Augustine", yearLevel: "Year 5", sortOrder: 240 },
  { name: "Natasha Kain", email: "natasha@stellamaris.school.nz", group: ["ahi"], className: "St Dominic", yearLevel: "Year 5", sortOrder: 250 },
  { name: "Karen Bessone", email: "karen.bessone@stellamaris.school.nz", group: ["ahi"], className: "St Patrick", yearLevel: "Year 5", sortOrder: 260 },
  { name: "Tracey Law", email: "tracey@stellamaris.school.nz", group: ["ahi"], className: "St Therese", yearLevel: "Year 6", isTeamLeader: true, sortOrder: 270 },
  { name: "Phoebe Cunningham-Tyler", email: "phoebe@stellamaris.school.nz", group: ["ahi"], className: "St Joseph", yearLevel: "Year 6", sortOrder: 280 },
  { name: "Steve Flemwell", role: "Property Manager", email: "stephen@stellamaris.school.nz", group: ["support"], sortOrder: 310 },
  { name: "Kevin Kemble", role: "Caretaker", group: ["support"], sortOrder: 320 },
  ...[
    "Lorraine Budding",
    "Brooke Fowler",
    "Nicky Jordan",
    "Karen Lloyd",
    "Sarin Lork",
    "Sandy McCauley",
    "Brooke McKenzie",
    "Monica McKernan",
    "Lucian Moura",
    "Lauren Muriwai-Mumby",
    "Mel Shimwell",
    "Catherine White",
    "Lola Wilson",
    "Bec Wood",
  ].map((name, i) => ({ name, group: ["aide"], sortOrder: 400 + i })),
];

function byGroup(people: StaffMember[], group: string) {
  return people
    .filter((person) => person.group?.includes(group))
    .sort((a, b) => (a.sortOrder ?? 100) - (b.sortOrder ?? 100));
}

function TeamBlock({
  title,
  yearRange,
  meaning,
  leader,
  associate,
  roster,
}: {
  title: string;
  yearRange: string;
  meaning: string;
  leader?: string;
  associate?: string;
  roster: StaffMember[];
}) {
  return (
    <section className="border-b border-[var(--color-border)] bg-[var(--color-surface)] last:border-b-0 last:bg-[var(--color-cream)] [&:nth-of-type(even)]:bg-[var(--color-cream)]">
      <div className="page-wrap section-pad grid items-start gap-14 min-[901px]:grid-cols-[300px_1fr]">
        <div>
          <p className="text-[12px] font-semibold tracking-[0.16em] text-[var(--color-gold)] uppercase">
            {yearRange}
          </p>
          <h2 className="mt-3 text-[38px] leading-[1.1] text-[var(--color-brand)]">
            {title}
          </h2>
          <p className="mt-3.5 text-[16.5px] leading-[1.72] text-[var(--color-ink-muted)]">
            {meaning}
          </p>
          <div className="mt-[22px] border-t border-[var(--color-border)] pt-5 text-[15px] leading-[1.7] text-[var(--color-ink-muted)]">
            {leader ? (
              <p>
                <strong className="font-semibold text-[var(--color-heading)]">
                  Team Leader
                </strong>
                <br />
                {leader}
              </p>
            ) : null}
            {associate ? (
              <p className="mt-3">
                <strong className="font-semibold text-[var(--color-heading)]">
                  Associate Principal
                </strong>
                <br />
                {associate}
              </p>
            ) : null}
          </div>
        </div>
        <ul className="flex flex-col">
          {roster.map((person, index) => (
            <li
              key={person.name}
              className={`flex flex-wrap items-baseline justify-between gap-6 border-t border-[var(--color-border)] py-[18px] ${
                index === roster.length - 1 ? "border-b" : ""
              }`}
            >
              <span>
                <span className="block text-[19px] font-semibold text-[var(--color-heading)]">
                  {person.name}
                </span>
                {person.email ? (
                  <a href={`mailto:${person.email}`} className="mt-0.5 block break-all text-[14px]">
                    {person.email}
                  </a>
                ) : null}
              </span>
              <span className="flex items-center gap-2.5 whitespace-nowrap">
                {person.className ? (
                  <span className="font-display text-[19px] text-[var(--color-brand)]">
                    {person.className}
                  </span>
                ) : null}
                {person.yearLevel ? (
                  <span className="rounded-full bg-[var(--color-rose)] px-3 py-1 text-[13px] font-semibold text-[var(--color-brand-hover)]">
                    {person.yearLevel}
                  </span>
                ) : null}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default async function StaffPage() {
  let people: StaffMember[] = [];
  let pageCopy: {
    heroSubtitle?: string | null;
    teams?: Array<{
      key?: string | null;
      title?: string | null;
      yearRange?: string | null;
      meaning?: string | null;
    }> | null;
  } | null = null;

  try {
    const [staffResult, pageResult] = await Promise.all([
      client.withConfig({ useCdn: false }).fetch(STAFF_MEMBERS_QUERY),
      sanityFetch({ query: STAFF_PAGE_QUERY, stega: false }),
    ]);
    people = (staffResult as StaffMember[]) ?? [];
    pageCopy = pageResult.data;
  } catch {
    /* CMS unavailable */
  }

  const staff = people.length ? people : FALLBACK_STAFF;
  const slt = byGroup(staff, "slt");
  const office = byGroup(staff, "office");
  const marama = byGroup(staff, "marama").filter((person) => person.className);
  const ahi = byGroup(staff, "ahi").filter((person) => person.className);
  const support = byGroup(staff, "support");
  const aides = byGroup(staff, "aide");
  const teams = pageCopy?.teams ?? [];
  const maramaMeta = teams.find((team) => team.key === "marama");
  const ahiMeta = teams.find((team) => team.key === "ahi");

  return (
    <>
      <PageHero
        eyebrow="Our Community · Staff"
        title="Our people"
        subtitle={
          pageCopy?.heroSubtitle ??
          "The people who teach, support and lead our school community."
        }
      />

      <section className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="page-wrap section-pad">
          <p className="text-[12px] font-semibold tracking-[0.16em] text-[var(--color-gold)] uppercase">
            Senior leadership team
          </p>
          <h2 className="mt-3.5 text-[36px] leading-[1.12]">Leading our school</h2>
          <ul className="mt-9 grid gap-5 min-[621px]:grid-cols-2 min-[901px]:grid-cols-4">
            {slt.map((person) => {
              const photoUrl = staffPhotoSrc(person);
              return (
                <li
                  key={person.name}
                  className="flex flex-col overflow-hidden rounded-[20px] border border-[var(--color-border)] bg-[var(--color-cream)]"
                >
                  <div className="relative flex aspect-4/5 items-center justify-center overflow-hidden bg-[var(--color-cream-deep)]">
                    {photoUrl ? (
                      <Image
                        src={photoUrl}
                        alt={person.photo?.alt || person.name || ""}
                        fill
                        className="object-cover"
                        sizes="(min-width: 901px) 25vw, (min-width: 621px) 50vw, 100vw"
                      />
                    ) : (
                      <span className="font-display text-[44px] text-[rgba(108,20,44,.35)]">
                        {personInitials(person.name ?? "")}
                      </span>
                    )}
                  </div>
                  <div className="px-[22px] pt-[22px] pb-[26px]">
                    <h3 className="text-[22px] leading-[1.2]">{person.name}</h3>
                    <p className="mt-1.5 text-[14.5px] font-medium text-[var(--color-olive)]">
                      {person.role}
                    </p>
                    {person.email ? (
                      <a href={`mailto:${person.email}`} className="mt-3 block break-all text-[14px]">
                        {person.email}
                      </a>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="border-b border-[var(--color-border)] bg-[var(--color-cream-deep)]">
        <div className="page-wrap grid items-center gap-12 py-14 min-[901px]:grid-cols-[1fr_1.6fr]">
          <div>
            <p className="text-[12px] font-semibold tracking-[0.16em] text-[var(--color-gold)] uppercase">
              First point of contact
            </p>
            <h2 className="mt-3 text-[32px] leading-[1.15]">School office</h2>
          </div>
          <ul className="grid gap-4 min-[621px]:grid-cols-2">
            {office.map((person) => (
              <li
                key={person.name}
                className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-[22px]"
              >
                <h3 className="text-[20px] leading-[1.2]">{person.name}</h3>
                <p className="mt-1 text-[14.5px] font-medium text-[var(--color-olive)]">
                  {person.role}
                </p>
                {person.email ? (
                  <a href={`mailto:${person.email}`} className="mt-2.5 block break-all text-[14px]">
                    {person.email}
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <TeamBlock
        title={maramaMeta?.title ?? "Mārama Team"}
        yearRange={maramaMeta?.yearRange ?? "Years 0–3"}
        meaning={
          maramaMeta?.meaning ??
          "Mārama signifies the clarity and light that comes with new learning."
        }
        leader={marama.find((person) => person.isTeamLeader)?.name ?? "Diana Pearson"}
        associate="Mel Hogg"
        roster={marama}
      />
      <TeamBlock
        title={ahiMeta?.title ?? "Ahi Team"}
        yearRange={ahiMeta?.yearRange ?? "Years 4–6"}
        meaning={
          ahiMeta?.meaning ??
          "Ahi symbolises the inner fire and passion for learning as students grow older."
        }
        leader={ahi.find((person) => person.isTeamLeader)?.name ?? "Tracey Law"}
        associate="Olwyn Hobman"
        roster={ahi}
      />

      <section className="bg-[var(--color-surface)]">
        <div className="page-wrap section-pad grid items-start gap-14 min-[901px]:grid-cols-[300px_1fr]">
          <div>
            <p className="text-[12px] font-semibold tracking-[0.16em] text-[var(--color-gold)] uppercase">
              Alongside our teachers
            </p>
            <h2 className="mt-3 text-[38px] leading-[1.1] text-[var(--color-brand)]">
              Support staff
            </h2>
          </div>
          <div>
            <ul className="grid gap-4 min-[621px]:grid-cols-2">
              {support.map((person) => (
                <li
                  key={person.name}
                  className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-cream)] px-6 py-[22px]"
                >
                  <h3 className="text-[20px] leading-[1.2]">{person.name}</h3>
                  <p className="mt-1 text-[14.5px] font-medium text-[var(--color-olive)]">
                    {person.role}
                  </p>
                  {person.email ? (
                    <a href={`mailto:${person.email}`} className="mt-2.5 block break-all text-[14px]">
                      {person.email}
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
            <h3 className="mt-9 text-[24px] leading-[1.2]">Teacher aides</h3>
            <ul className="mt-[18px] flex flex-wrap gap-2.5">
              {aides.map((person) => (
                <li
                  key={person.name}
                  className="rounded-full border border-[var(--color-border)] bg-[var(--color-cream)] px-[18px] py-[9px] text-[15.5px] text-[var(--color-ink)]"
                >
                  {person.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
