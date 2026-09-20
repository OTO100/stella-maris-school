import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { CTASection } from "@/components/cta-section";
import { PageHero } from "@/components/page-hero";
import { PortableTextBlock } from "@/components/portable-text";
import { MARIAN_VALUES } from "@/lib/marian-values";
import { personInitials, resourceFileUrl } from "@/lib/resources";
import { PUBLIC_DOCS } from "@/lib/sitemap-decisions";
import { PAGE_META } from "@/lib/page-meta";
import { sanityFetch } from "@/sanity/lib/live";
import {
  ABOUT_PAGE_QUERY,
  DOWNLOADABLE_RESOURCES_QUERY,
  SITE_SETTINGS_QUERY,
} from "@/sanity/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = PAGE_META.about;

const PRINCIPAL_FALLBACK = [
  "Dear Parent or Caregiver — thank you for your interest in Stella Maris Primary School. I welcome your inquiry and consideration of our school community as a place for your child's education.",
  "Stella Maris has a strong academic focus and each child is encouraged to take responsibility for their learning, valuing knowledge, truth and faith, under the guidance of dedicated teachers and support staff. At Stella Maris we value the development of the whole person, integrating spiritual development, academic success, cultural prowess and awareness, and a high level of sporting participation and skill in the context of our Catholic tradition.",
  "The Stella Maris community is based on family. This extended family consists of students, teachers, parents, and extended family joining together to form a community that is wholeheartedly committed to the education of our young people.",
  "As a Catholic school, all we undertake is underpinned by Gospel and Marian Values. Our school is founded on the Marian Values and these values are explicit within our school environment. There is an expectation that the actions and behaviour of all in our school community are guided by these values.",
  "We encourage and indeed expect that our students will become lifelong learners, each developing the Spirit of Stella Maris to take with them out into the workplace and adult life. You will find the Spirit of Stella Maris evident in our students and staff, our approach to learning, friendships, and achievement. Confidence, persistence, resilience, self-reliance are all guiding foundations for carving out a successful pathway through life. These attributes are encapsulated in Learner Capabilities and are reflected in the teaching and learning programme at Stella Maris.",
  "Central to the mission of Stella Maris School is the promotion of excellence. Our commitment to our parents is to support, encourage, nurture, and challenge individual development for all our students and to provide a learning environment which meets their present and future needs.",
  "I look forward to welcoming you and your family into the Stella Maris community.",
];

const CHARACTER_FALLBACK = [
  "In using this title, we see Our Lady as our guide or leader, someone who could navigate the stars, who watches over us and leads us to Jesus. In following Jesus' way and living the Marian Values we shine for God.",
  "We follow the Marian Values that are deeply rooted in the Gospels. These values are demonstrated by Mary, our Mother and guide. They lead us to a stronger relationship with Her Son, Jesus.",
  "Our Religious Education curriculum is Tō Tātou Whakapono — Our Faith, finalised in 2021, covering Catholic education in Aotearoa New Zealand from Year 1 through to Year 13. It provides guidance for rich learning through four themes: God, The Good News, Our Story and Being Church. It carefully weaves together and scaffolds the heart of the Catholic faith so that this knowledge may connect with the lives of our students and whānau.",
];

const ENCOUNTERING_FALLBACK = [
  { title: "Daily", body: "Prayer in every class" },
  {
    title: "Fortnightly",
    body: "Class-led liturgies",
    extra: "A wonderful opportunity for whānau to join us.",
  },
  {
    title: "With our parish",
    body: "Atrium & whole-school Masses",
    extra: "Children lead parts of the Mass, led by our parish priest.",
  },
  { title: "At assembly", body: "Special Character certificates" },
];

export default async function AboutPage() {
  let copy: Record<string, unknown> | null = null;
  let settings: Record<string, unknown> | null = null;
  let resources: Array<{
    title?: string | null;
    placement?: string[] | null;
    fileUrl?: string | null;
  }> = [];

  try {
    const [about, site, downloads] = await Promise.all([
      sanityFetch({ query: ABOUT_PAGE_QUERY, stega: false }),
      sanityFetch({ query: SITE_SETTINGS_QUERY, stega: false }),
      sanityFetch({ query: DOWNLOADABLE_RESOURCES_QUERY, stega: false }),
    ]);
    copy = about.data as Record<string, unknown> | null;
    settings = site.data as Record<string, unknown> | null;
    resources = (downloads.data as typeof resources) ?? [];
  } catch {
    /* CMS unavailable */
  }

  const handbook = resourceFileUrl(resources, "about", PUBLIC_DOCS.handbook, "handbook");
  const policiesUrl = settings?.policiesUrl as string | undefined;
  const eroUrl = settings?.eroUrl as string | undefined;
  const heroAppUrl = settings?.heroAppUrl as string | undefined;
  const kindoUrl = settings?.kindoUrl as string | undefined;
  const encountering =
    (copy?.encounteringChrist as { title?: string; body?: string }[] | undefined)?.filter(
      (item) => item.title,
    ) ?? ENCOUNTERING_FALLBACK;

  return (
    <>
      <PageHero
        eyebrow="Our School"
        title="Stella Maris — Star of the Sea"
        subtitle={
          (copy?.heroSubtitle as string | undefined) ??
          "A state-integrated Catholic primary school in Silverdale for Years 1–6. Our school is founded on the Marian Values, and all we undertake is underpinned by them."
        }
        pills={[
          { href: "#principal", label: "Principal's message" },
          { href: "#character", label: "Values & special character" },
          { href: "/about/our-learning", label: "Our learning" },
          { href: "#parent-information", label: "Parent information" },
        ]}
      />

      <section
        id="principal"
        className="scroll-mt-28 border-b border-[var(--color-border)] bg-[var(--color-surface)]"
      >
        <div className="page-wrap section-pad grid items-start gap-16 min-[901px]:grid-cols-[1fr_1.45fr]">
          <div className="min-[901px]:sticky min-[901px]:top-24">
            <p className="text-[12px] font-semibold tracking-[0.16em] text-[var(--color-gold)] uppercase">
              Welcome
            </p>
            <h2 className="mt-3.5 text-[40px] leading-[1.1]">Principal's message</h2>
            <div className="mt-6 flex items-center gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-cream)] px-5 py-[18px]">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[var(--color-cream-deep)] font-display text-[22px] text-[var(--color-brand)]">
                {personInitials("Catherine Cyprian")}
              </span>
              <span>
                <span className="block text-base font-semibold text-[var(--color-heading)]">
                  Catherine Cyprian
                </span>
                <span className="block text-[14px] text-[var(--color-ink-muted)]">
                  Principal
                </span>
                <a
                  href="mailto:principal@stellamaris.school.nz"
                  className="mt-0.5 block text-[13.5px]"
                >
                  principal@stellamaris.school.nz
                </a>
              </span>
            </div>
          </div>
          <div className="flex max-w-[64ch] flex-col gap-5 text-[17.5px] leading-[1.78] text-[var(--color-ink)]">
            {Array.isArray(copy?.principalWelcome) ? (
              <PortableTextBlock value={copy.principalWelcome} />
            ) : (
              <>
                <p className="font-display text-[22px] leading-[1.6] text-[var(--color-heading)]">
                  {PRINCIPAL_FALLBACK[0]}
                </p>
                {PRINCIPAL_FALLBACK.slice(1).map((para) => (
                  <p key={para.slice(0, 40)}>{para}</p>
                ))}
              </>
            )}
            <p className="mt-2 font-sans text-[20px] text-[var(--color-brand)] italic">
              God Bless — Mā te Atua koe e manaaki
            </p>
            <p className="text-base text-[var(--color-ink-muted)]">
              <strong className="font-semibold text-[var(--color-heading)]">
                Catherine Cyprian
              </strong>
              <br />
              Principal
            </p>
          </div>
        </div>
      </section>

      <section
        id="character"
        className="scroll-mt-28 border-b border-[var(--color-border)] bg-[var(--color-cream)]"
      >
        <div className="page-wrap section-pad">
          <div className="grid items-start gap-16 min-[901px]:grid-cols-[1fr_1.45fr]">
            <div>
              <p className="text-[12px] font-semibold tracking-[0.16em] text-[var(--color-gold)] uppercase">
                Special character
              </p>
              <h2 className="mt-3.5 text-[40px] leading-[1.1]">Our name, our faith</h2>
              <p className="mt-5 text-[17px] leading-[1.75] text-[var(--color-ink-muted)]">
                Stella Maris, Star of the Sea, is one of the most ancient titles
                for Our Lady. The name was chosen to honour her and acknowledge
                her as our protector in Aotearoa, this land surrounded by the
                sea.
              </p>
            </div>
            <div className="flex max-w-[64ch] flex-col gap-5 text-[17.5px] leading-[1.78] text-[var(--color-ink)]">
              {Array.isArray(copy?.specialCharacter) ? (
                <PortableTextBlock value={copy.specialCharacter} />
              ) : (
                CHARACTER_FALLBACK.map((para) => <p key={para.slice(0, 32)}>{para}</p>)
              )}
              <blockquote className="rounded-2xl border border-[var(--color-border)] border-l-4 border-l-[var(--color-gold)] bg-[var(--color-surface)] px-7 py-6 text-[19px] leading-[1.65] italic">
                {(copy?.specialCharacterQuote as string | undefined) ??
                  'Religious Education in Catholic schools “provides a foundation of knowledge which works alongside the whole school\'s Catholic Special Character, which helps form their understanding of what it means to be a disciple of Jesus and a member of the Catholic Church.”'}
                <cite className="mt-3.5 block font-sans text-[13.5px] font-semibold tracking-[0.04em] text-[var(--color-faint)] not-italic">
                  {(copy?.specialCharacterQuoteCite as string | undefined) ??
                    "Tō Tātou Whakapono — Our Faith, 2021"}
                </cite>
              </blockquote>
            </div>
          </div>
          <div className="mt-16">
            <h3 className="text-[28px] tracking-[-0.015em]">Encountering Christ</h3>
            <p className="mt-3 max-w-[62ch] text-[17px] leading-[1.75] text-[var(--color-ink-muted)]">
              Alongside the Religious Education lessons that occur most days, we
              provide our students with opportunities to encounter Christ.
            </p>
            <ul className="mt-7 grid gap-4 min-[621px]:grid-cols-2 min-[901px]:grid-cols-4">
              {encountering.map((item) => (
                <li
                  key={item.title}
                  className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-6"
                >
                  <p className="text-[11.5px] font-semibold tracking-[0.16em] text-[var(--color-gold)] uppercase">
                    {item.title}
                  </p>
                  <p className="mt-2.5 font-display text-[21px] leading-[1.3] text-[var(--color-heading)]">
                    {item.body?.split(" — ")[0] ?? item.body}
                  </p>
                  {(item as { extra?: string }).extra || item.body?.includes(" — ") ? (
                    <p className="mt-2 text-[14.5px] leading-[1.6] text-[var(--color-ink-muted)]">
                      {(item as { extra?: string }).extra ??
                        item.body?.split(" — ").slice(1).join(" — ")}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        id="values"
        className="scroll-mt-28 border-b border-[var(--color-border)] bg-[var(--color-surface)]"
      >
        <div className="page-wrap section-pad">
          <p className="text-[12px] font-semibold tracking-[0.16em] text-[var(--color-gold)] uppercase">
            Ngā uara — our values
          </p>
          <h2 className="mt-3.5 text-[40px] leading-[1.1]">The Marian Values</h2>
          <p className="mt-[18px] max-w-[62ch] text-[17.5px] leading-[1.75] text-[var(--color-ink-muted)]">
            There is an expectation that the actions and behaviour of everyone
            in our school community is guided by these six values.
          </p>
          <ul className="mt-11 grid gap-[22px] min-[901px]:grid-cols-2">
            {MARIAN_VALUES.map((value) => (
              <li
                key={value.key}
                className="grid gap-6 rounded-[20px] border border-[var(--color-border)] bg-[var(--color-cream)] px-[30px] py-[30px] min-[621px]:grid-cols-[96px_1fr]"
              >
                <Image
                  src={value.badgeSrc}
                  alt=""
                  width={96}
                  height={96}
                  className="size-24 object-contain mix-blend-multiply"
                />
                <div>
                  <h3 className="text-[27px] leading-[1.2] text-[var(--color-brand)]">
                    {value.name}
                  </h3>
                  <p className="mt-0.5 text-[12px] font-semibold tracking-[0.16em] text-[var(--color-olive)] uppercase">
                    {value.englishName}
                  </p>
                  <p className="mt-3.5 font-sans text-[17.5px] leading-[1.55] text-[var(--color-ink)] italic">
                    “{value.scripture}”{" "}
                    <span className="font-sans text-[13.5px] text-[var(--color-faint)] not-italic">
                      {value.scriptureReference}
                    </span>
                  </p>
                  <p className="mt-3.5 text-base leading-[1.72] text-[var(--color-ink-muted)]">
                    {value.essence}
                  </p>
                  <p className="mt-3.5 border-t border-[var(--color-border)] pt-3.5 text-[15px] text-[var(--color-brand)] italic">
                    {value.intercession}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-[var(--color-border)] bg-[var(--color-cream-deep)]">
        <div className="page-wrap grid items-center gap-14 py-[72px] min-[901px]:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="text-[12px] font-semibold tracking-[0.16em] text-[var(--color-gold)] uppercase">
              Our learning
            </p>
            <h2 className="mt-3.5 text-[38px] leading-[1.12]">
              Structured teaching, sequenced year by year
            </h2>
            <Link href="/about/our-learning" className="btn-brand mt-[26px]">
              School programmes & curriculum <span aria-hidden>→</span>
            </Link>
          </div>
          <div>
            <p className="text-[17.5px] leading-[1.78] text-[var(--color-ink)]">
              We follow the New Zealand Curriculum and, as a Catholic school,{" "}
              <em>Tō Tātou Whakapono — Our Faith</em>. Literacy is taught through
              Little Learners Love Literacy in Years 0–3 and The Code in Years
              4–6; maths through Maths — No Problem!
            </p>
            <ul className="mt-[22px] flex flex-wrap gap-2">
              {[
                "Structured literacy",
                "Structured maths",
                "Religious education",
                "Assessment & reporting",
                "Learning support",
              ].map((label) => (
                <li
                  key={label}
                  className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-1.5 text-[14px] font-medium text-[var(--color-ink-muted)]"
                >
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        id="parent-information"
        className="scroll-mt-28 bg-[var(--color-surface)]"
      >
        <div className="page-wrap section-pad">
          <p className="text-[12px] font-semibold tracking-[0.16em] text-[var(--color-gold)] uppercase">
            For current families
          </p>
          <h2 className="mt-3.5 text-[40px] leading-[1.1]">Parent information</h2>
          <p className="mt-[18px] max-w-[62ch] text-[17.5px] leading-[1.75] text-[var(--color-ink-muted)]">
            We keep one master Parent Information Handbook so there is a single,
            current source of everything families need — conduct, allergies,
            buses, SKIDS, uniform and daily routines.
          </p>
          <a
            href={handbook}
            className="mt-8 flex flex-wrap items-center justify-between gap-6 rounded-[20px] bg-[var(--color-brand)] px-8 py-7 text-[var(--color-cream)] hover:bg-[var(--color-brand-hover)] hover:text-[var(--color-cream)]"
          >
            <span>
              <span className="block text-[11.5px] font-semibold tracking-[0.16em] text-[var(--color-gold-light)] uppercase">
                Start here
              </span>
              <span className="mt-2 block font-display text-[28px] leading-[1.2]">
                Parent Information Handbook 2026
              </span>
              <span className="mt-1.5 block text-[15px] text-[rgba(250,248,245,.88)]">
                PDF · everything in one place
              </span>
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-gold)] px-[26px] py-[13px] text-[15.5px] font-semibold whitespace-nowrap text-[var(--color-heading)]">
              Download <span aria-hidden>↓</span>
            </span>
          </a>
          <ul className="mt-9 grid gap-4 min-[621px]:grid-cols-2 min-[901px]:grid-cols-3">
            <li
              id="fees"
              className="scroll-mt-28 rounded-2xl border border-[var(--color-border)] bg-[var(--color-cream)] px-[26px] py-[26px]"
            >
              <h3 className="text-[21px] leading-[1.25]">School fees</h3>
              <p className="mt-2.5 text-[15.5px] leading-[1.68] text-[var(--color-ink-muted)]">
                Attendance dues, curriculum charges and voluntary contributions,
                plus financial assistance and how to pay through Kindo. Current
                amounts are confirmed by the office.
              </p>
              <Link href="/contact" className="mt-3.5 inline-flex items-center gap-1.5 text-[14.5px] font-semibold">
                Ask the office <span aria-hidden>→</span>
              </Link>
            </li>
            <li className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-cream)] px-[26px] py-[26px]">
              <h3 className="text-[21px] leading-[1.25]">School policies & procedures</h3>
              <p className="mt-2.5 text-[15.5px] leading-[1.68] text-[var(--color-ink-muted)]">
                Our policies are maintained online in SchoolDocs and are always
                the current version.
              </p>
              {policiesUrl ? (
                <a
                  href={policiesUrl}
                  className="mt-3.5 inline-flex items-center gap-1.5 text-[14.5px] font-semibold"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Open SchoolDocs <span aria-hidden>↗</span>
                </a>
              ) : (
                <p className="mt-3.5 text-[14.5px] text-[var(--color-faint)]">
                  SchoolDocs link to come
                </p>
              )}
            </li>
            <li className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-cream)] px-[26px] py-[26px]">
              <h3 className="text-[21px] leading-[1.25]">ERO report</h3>
              <p className="mt-2.5 text-[15.5px] leading-[1.68] text-[var(--color-ink-muted)]">
                Our latest Education Review Office report on the school's
                performance and next steps.
              </p>
              {eroUrl ? (
                <a
                  href={eroUrl}
                  className="mt-3.5 inline-flex items-center gap-1.5 text-[14.5px] font-semibold"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Read the report <span aria-hidden>↗</span>
                </a>
              ) : (
                <p className="mt-3.5 text-[14.5px] text-[var(--color-faint)]">
                  ERO link to come
                </p>
              )}
            </li>
            <li
              id="apps"
              className="scroll-mt-28 rounded-2xl border border-[var(--color-border)] bg-[var(--color-cream)] px-[26px] py-[26px]"
            >
              <h3 className="text-[21px] leading-[1.25]">School apps</h3>
              <p className="mt-2.5 text-[15.5px] leading-[1.68] text-[var(--color-ink-muted)]">
                Hero for notices, absences and reporting. Kindo for payments and
                permission slips. Download links and setup help.
              </p>
              {heroAppUrl || kindoUrl ? (
                <a
                  href={heroAppUrl || kindoUrl}
                  className="mt-3.5 inline-flex items-center gap-1.5 text-[14.5px] font-semibold"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Get set up <span aria-hidden>→</span>
                </a>
              ) : (
                <p className="mt-3.5 text-[14.5px] text-[var(--color-faint)]">
                  App links to come
                </p>
              )}
            </li>
            <li className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-cream)] px-[26px] py-[26px]">
              <h3 className="text-[21px] leading-[1.25]">Buses & SKIDS</h3>
              <p className="mt-2.5 text-[15.5px] leading-[1.68] text-[var(--color-ink-muted)]">
                Transport routes and eligibility, and before- and after-school
                care on site with SKIDS.
              </p>
              <a href={handbook} className="mt-3.5 inline-flex items-center gap-1.5 text-[14.5px] font-semibold">
                See the handbook <span aria-hidden>↓</span>
              </a>
            </li>
            <li className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-cream)] px-[26px] py-[26px]">
              <h3 className="text-[21px] leading-[1.25]">Allergies & student safety</h3>
              <p className="mt-2.5 text-[15.5px] leading-[1.68] text-[var(--color-ink-muted)]">
                How we keep learners with allergies safe, and what we ask of
                families.
              </p>
              <a href={handbook} className="mt-3.5 inline-flex items-center gap-1.5 text-[14.5px] font-semibold">
                See the handbook <span aria-hidden>↓</span>
              </a>
            </li>
          </ul>
        </div>
      </section>

      <CTASection
        heading={(copy?.ctaHeading as string | undefined) ?? "Come and see learning in action"}
        body={
          (copy?.ctaBody as string | undefined) ??
          "Contact the office to arrange a visit, or start an enrolment enquiry."
        }
      >
        <Link href="/enrolment" className="btn-gold">
          Enrolment information <span aria-hidden>→</span>
        </Link>
        <Link href="/contact" className="btn-outline-cream">
          Contact us
        </Link>
      </CTASection>
    </>
  );
}
