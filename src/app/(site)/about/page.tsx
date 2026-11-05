import Image from "next/image";
import Link from "next/link";
import {
  Bus,
  ClipboardCheck,
  Clock,
  FileText,
  Info,
  ShieldCheck,
  Smartphone,
  Wallet,
} from "lucide-react";
import type { Metadata } from "next";

import { CTASection } from "@/components/cta-section";
import { PageHero } from "@/components/page-hero";
import { PortableTextBlock } from "@/components/portable-text";
import { heroStoreLinks, KINDO_DESCRIPTION_FALLBACK } from "@/lib/app-links";
import { MARIAN_VALUES } from "@/lib/marian-values";
import { findPrincipal, principalPhoto } from "@/lib/principal";
import { keyDocument } from "@/lib/key-documents";
import { personInitials } from "@/lib/resources";
import { sharedLinkForCard, sharedLinkUrl } from "@/lib/shared-links";
import { urlForImage } from "@/sanity/lib/image";
import { PAGE_META } from "@/lib/page-meta";
import { sanityFetch } from "@/sanity/lib/live";
import {
  ABOUT_PAGE_QUERY,
  SITE_SETTINGS_QUERY,
  STAFF_MEMBERS_QUERY,
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

type InfoLink = {
  label: string;
  href: string;
  external?: boolean;
  download?: boolean;
};
type InfoCard = {
  id?: string;
  title: string;
  body: string;
  links: InfoLink[];
};

// Icon per parent-information card, by its anchor id.
const INFO_CARD_ICONS: Record<string, typeof Info> = {
  fees: Wallet,
  policies: FileText,
  ero: ClipboardCheck,
  apps: Smartphone,
  skids: Clock,
  buses: Bus,
  allergies: ShieldCheck,
};

function linkProps(link: InfoLink) {
  return link.external ? { target: "_blank", rel: "noreferrer noopener" } : {};
}

const OUR_LADY_CAPTION =
  "Madonna at Prayer — Giovanni Battista Salvi da Sassoferrato";

export default async function AboutPage() {
  let copy: Record<string, unknown> | null = null;
  let settings: Record<string, unknown> | null = null;
  let staff: Array<{
    name?: string | null;
    role?: string | null;
    email?: string | null;
    photo?: unknown;
  }> = [];

  try {
    const [about, site, people] = await Promise.all([
      sanityFetch({ query: ABOUT_PAGE_QUERY, stega: false }),
      sanityFetch({ query: SITE_SETTINGS_QUERY, stega: false }),
      sanityFetch({ query: STAFF_MEMBERS_QUERY, stega: false }),
    ]);
    copy = about.data as Record<string, unknown> | null;
    settings = site.data as Record<string, unknown> | null;
    staff = (people.data as typeof staff) ?? [];
  } catch {
    /* CMS unavailable */
  }

  const handbookDoc = keyDocument(settings, "handbook");
  const handbook = handbookDoc.url;
  const policiesUrl = settings?.policiesUrl as string | undefined;
  const eroUrl = settings?.eroUrl as string | undefined;
  const kindoUrl = settings?.kindoUrl as string | undefined;
  const stores = heroStoreLinks(settings);
  const principal = findPrincipal(staff);
  const principalName = principal?.name ?? "Catherine Cyprian";
  const principalImage = principalPhoto(staff, settings?.principalPhoto, 560);
  const ourLady = copy?.ourLadyImage as
    | { alt?: string | null; caption?: string | null }
    | undefined;
  const ourLadyUrl = ourLady
    ? urlForImage(ourLady as never)
        ?.width(640)
        .fit("max")
        .auto("format")
        .url()
    : null;
  const ourLadyCaption = ourLady?.caption || OUR_LADY_CAPTION;

  const fallbackCards: InfoCard[] = [
    {
      id: "fees",
      title: "School fees",
      body: "School fees are not paid through Kindo. They are paid online or at the school office. Current amounts are confirmed by the office.",
      links: [{ label: "Ask the office", href: "/contact" }],
    },
    {
      title: "School policies & procedures",
      body: "Our policies are maintained online in SchoolDocs and are always the current version.",
      links: policiesUrl
        ? [{ label: "Open SchoolDocs", href: policiesUrl, external: true }]
        : [],
    },
    {
      title: "ERO report",
      body: "Our latest Education Review Office report on the school's performance and next steps.",
      links: eroUrl
        ? [{ label: "Read the report", href: eroUrl, external: true }]
        : [],
    },
    {
      id: "apps",
      title: "School apps",
      body: `Hero is our app for notices, learning updates and reporting. Kindo is used for ${(
        (settings?.kindoDescription as string | undefined) ||
        KINDO_DESCRIPTION_FALLBACK
      ).toLowerCase()} — it is not used for school fees or permission slips.`,
      links: [
        {
          label: "Hero for iPhone & iPad",
          href: stores.appStore,
          external: true,
        },
        { label: "Hero for Android", href: stores.playStore, external: true },
        ...(kindoUrl
          ? [{ label: "Open Kindo", href: kindoUrl, external: true }]
          : []),
      ],
    },
    {
      id: "skids",
      title: "sKids before & after school care",
      body: "sKids runs before and after school care, and holiday care, from the school hall. Hours are 7:00am–8:30am and 2:45pm–6:00pm. Children need to be booked at least 24 hours in advance. For booking queries, phone 027 275 4377 during sKids hours.",
      links: [
        {
          label: "Book with sKids",
          href: "https://www.skids.co.nz/stellamaris",
          external: true,
        },
        { label: "Call 027 275 4377", href: "tel:+64272754377" },
      ],
    },
    {
      title: "Allergies & student safety",
      body: "Stella Maris is a nut-free school (no nuts or nut products) and a water-only school. Thank you for helping us keep every child safe.",
      links: [],
    },
    {
      id: "buses",
      title: "School buses",
      body: "Students can travel to and from school on bus routes run by Bayes Coachlines and Go Bus. Contact them directly about routes and charges.\n\nIf your child catches the bus on set days, please fill in a bus form, available from the school office.\n\nFor an occasional trip or a change to the usual schedule, call the office on 09 427 9189 before 2pm, or use the daily bus changes sheet at the office.\n\nThe bus bell rings at 2:40pm. Students meet in the school hall, where they are supervised and taken to their bus.",
      links: [
        {
          label: "Bayes Coachlines school services",
          href: "https://www.bayescoachlines.co.nz/schoolservices",
          external: true,
        },
        { label: "Bayes Coachlines: 09 426 5504", href: "tel:+6494265504" },
        { label: "Go Bus: 09 275 8811", href: "tel:+6492758811" },
        { label: "auckland@gobus.co.nz", href: "mailto:auckland@gobus.co.nz" },
      ],
    },
  ];
  const cmsCards = (
    copy?.parentInfoCards as
      | Array<{
          key?: string | null;
          title?: string | null;
          body?: string | null;
          links?: Array<{
            label?: string | null;
            sharedLink?: string | null;
            url?: string | null;
            fileUrl?: string | null;
          }> | null;
        }>
      | undefined
  )?.filter((card) => card.title);
  const infoCards: InfoCard[] = cmsCards?.length
    ? cmsCards.map((card) => {
        const links: InfoLink[] = (card.links ?? []).flatMap((link) => {
          const href =
            link.fileUrl ||
            sharedLinkUrl(link.sharedLink, settings) ||
            link.url ||
            "";
          return href && link.label
            ? [
                {
                  label: link.label,
                  href,
                  external: /^https?:/.test(href) || Boolean(link.fileUrl),
                },
              ]
            : [];
        });
        // Cards like "policies" / "ero" fall back to the shared Site settings
        // link, so they match the rest of the site without per-card setup.
        const shared = sharedLinkForCard(card.key);
        const sharedHref = shared
          ? sharedLinkUrl(shared.value, settings)
          : undefined;
        if (!links.length && shared && sharedHref) {
          links.push({ label: shared.label, href: sharedHref, external: true });
        }
        return {
          id: card.key || undefined,
          title: card.title!,
          body: card.body ?? "",
          links,
        };
      })
    : fallbackCards;
  const encountering =
    (
      copy?.encounteringChrist as
        | { title?: string; body?: string }[]
        | undefined
    )?.filter((item) => item.title) ?? ENCOUNTERING_FALLBACK;

  return (
    <>
      <PageHero
        eyebrow="Our School"
        title="Stella Maris"
        titleSuffix="Star of the Sea"
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
            <p className="text-eyebrow font-semibold tracking-[0.16em] text-[var(--color-gold)] uppercase">
              Welcome
            </p>
            <h2 className="mt-3.5 text-h2 leading-[1.1]">
              Principal's message
            </h2>
            {principalImage ? (
              <Image
                src={principalImage.src}
                alt={principalImage.alt}
                width={560}
                height={560}
                className="mt-6 aspect-square w-full max-w-[280px] rounded-2xl border border-[var(--color-border)] object-cover shadow-[var(--shadow-card)]"
                priority
              />
            ) : null}
            <div className="mt-6 flex items-center gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-cream)] px-5 py-[18px]">
              {principalImage ? null : (
                <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[var(--color-cream-deep)] font-display text-h3 text-[var(--color-brand)]">
                  {personInitials(principalName)}
                </span>
              )}
              <span>
                <span className="block text-base font-semibold text-[var(--color-heading)]">
                  {principalName}
                </span>
                <span className="block text-small text-[var(--color-ink-muted)]">
                  Principal
                </span>
                <a
                  href="mailto:principal@stellamaris.school.nz"
                  className="mt-0.5 block text-small"
                >
                  principal@stellamaris.school.nz
                </a>
              </span>
            </div>
          </div>
          <div className="flex max-w-[64ch] flex-col gap-5 text-body leading-[1.65] text-[var(--color-ink)]">
            {Array.isArray(copy?.principalWelcome) ? (
              <PortableTextBlock value={copy.principalWelcome} />
            ) : (
              <>
                <p className="font-display text-h3 leading-[1.6] text-[var(--color-heading)]">
                  {PRINCIPAL_FALLBACK[0]}
                </p>
                {PRINCIPAL_FALLBACK.slice(1).map((para) => (
                  <p key={para.slice(0, 40)}>{para}</p>
                ))}
                {/* Sign-off only for the built-in message; the CMS message carries its own. */}
                <p className="mt-2 font-sans text-h4 text-[var(--color-brand)] italic">
                  God Bless — Mā te Atua koe e manaaki
                </p>
                <p className="text-base text-[var(--color-ink-muted)]">
                  <strong className="font-semibold text-[var(--color-heading)]">
                    {principalName}
                  </strong>
                  <br />
                  Principal
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      <section
        id="character"
        className="scroll-mt-28 border-b border-[var(--color-border)] bg-[var(--color-cream)]"
      >
        <div className="page-wrap section-pad">
          {/* Painting beside the text so both columns carry similar weight. */}
          <div
            className={`grid items-center gap-12 ${
              ourLadyUrl
                ? "min-[901px]:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] min-[901px]:gap-16"
                : ""
            }`}
          >
            {ourLadyUrl ? (
              <figure className="order-2 mx-auto w-full max-w-[380px] min-[901px]:order-1 min-[901px]:mx-0">
                <Image
                  src={ourLadyUrl}
                  alt={ourLady?.alt || "Our Lady, Star of the Sea"}
                  width={640}
                  height={800}
                  sizes="(min-width: 901px) 380px, 90vw"
                  className="h-auto w-full rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-card)]"
                />
                <figcaption className="mt-3 text-small leading-[1.5] text-[var(--color-faint)] italic">
                  {ourLadyCaption}
                </figcaption>
              </figure>
            ) : null}
            <div className="order-1 max-w-[62ch] min-[901px]:order-2">
              <p className="text-eyebrow font-semibold tracking-[0.16em] text-[var(--color-gold)] uppercase">
                Special character
              </p>
              <h2 className="mt-3.5 text-h2 leading-[1.1]">
                Our name, our faith
              </h2>
              <p className="mt-5 text-h4 leading-[1.6] text-[var(--color-ink)]">
                Stella Maris, Star of the Sea, is one of the most ancient titles
                for Our Lady. The name was chosen to honour her and acknowledge
                her as our protector in Aotearoa, this land surrounded by the
                sea.
              </p>
              <div className="mt-5 flex flex-col gap-5 text-body leading-[1.65] text-[var(--color-ink-muted)]">
                {Array.isArray(copy?.specialCharacter) ? (
                  <PortableTextBlock value={copy.specialCharacter} />
                ) : (
                  CHARACTER_FALLBACK.map((para) => (
                    <p key={para.slice(0, 32)}>{para}</p>
                  ))
                )}
              </div>
              <blockquote className="mt-8 rounded-2xl border border-[var(--color-border)] border-l-4 border-l-[var(--color-gold)] bg-[var(--color-surface)] px-7 py-6 text-h4 leading-[1.65] text-[var(--color-ink)] italic">
                {(copy?.specialCharacterQuote as string | undefined) ??
                  "Religious Education in Catholic schools “provides a foundation of knowledge which works alongside the whole school's Catholic Special Character, which helps form their understanding of what it means to be a disciple of Jesus and a member of the Catholic Church.”"}
                <cite className="mt-3.5 block font-sans text-small font-semibold tracking-[0.04em] text-[var(--color-faint)] not-italic">
                  {(copy?.specialCharacterQuoteCite as string | undefined) ??
                    "Tō Tātou Whakapono — Our Faith, 2021"}
                </cite>
              </blockquote>
            </div>
          </div>
          <div className="mt-20 border-t border-[var(--color-border)] pt-14">
            <h3 className="text-h2sm tracking-[-0.015em]">
              Encountering Christ
            </h3>
            <p className="mt-3 max-w-[62ch] text-body leading-[1.65] text-[var(--color-ink-muted)]">
              Alongside the Religious Education lessons that occur most days, we
              provide our students with opportunities to encounter Christ.
            </p>
            <ul className="mt-7 grid gap-4 min-[621px]:grid-cols-2 min-[901px]:grid-cols-4">
              {encountering.map((item) => (
                <li
                  key={item.title}
                  className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-6"
                >
                  <p className="text-eyebrow font-semibold tracking-[0.16em] text-[var(--color-gold)] uppercase">
                    {item.title}
                  </p>
                  <p className="mt-2.5 font-display text-h4 leading-[1.3] text-[var(--color-heading)]">
                    {item.body?.split(" — ")[0] ?? item.body}
                  </p>
                  {(item as { extra?: string }).extra ||
                  item.body?.includes(" — ") ? (
                    <p className="mt-2 text-small leading-[1.6] text-[var(--color-ink-muted)]">
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
          <p className="text-eyebrow font-semibold tracking-[0.16em] text-[var(--color-gold)] uppercase">
            Ngā uara — our values
          </p>
          <h2 className="mt-3.5 text-h2 leading-[1.1]">The Marian Values</h2>
          <p className="mt-[18px] max-w-[62ch] text-body leading-[1.65] text-[var(--color-ink-muted)]">
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
                  <h3 className="text-h2sm leading-[1.2] text-[var(--color-brand)]">
                    {value.name}
                  </h3>
                  <p className="mt-0.5 text-eyebrow font-semibold tracking-[0.16em] text-[var(--color-olive)] uppercase">
                    {value.englishName}
                  </p>
                  <p className="mt-3.5 font-sans text-body leading-[1.55] text-[var(--color-ink)] italic">
                    “{value.scripture}”{" "}
                    <span className="font-sans text-small text-[var(--color-faint)] not-italic">
                      {value.scriptureReference}
                    </span>
                  </p>
                  <p className="mt-3.5 text-base leading-[1.65] text-[var(--color-ink-muted)]">
                    {value.essence}
                  </p>
                  <p className="mt-3.5 border-t border-[var(--color-border)] pt-3.5 text-copy text-[var(--color-brand)] italic">
                    {value.intercession}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-[var(--color-border)] bg-[var(--color-cream-deep)]">
        <div className="page-wrap grid items-center gap-14 py-14 min-[900px]:py-[72px] min-[901px]:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="text-eyebrow font-semibold tracking-[0.16em] text-[var(--color-gold)] uppercase">
              Our learning
            </p>
            <h2 className="mt-3.5 text-h2 leading-[1.12]">
              Structured teaching, sequenced year by year
            </h2>
            <Link href="/about/our-learning" className="btn-brand mt-[26px]">
              School programmes & curriculum <span aria-hidden>→</span>
            </Link>
          </div>
          <div>
            <p className="text-body leading-[1.65] text-[var(--color-ink)]">
              We follow the New Zealand Curriculum and, as a Catholic school,{" "}
              <em>Tō Tātou Whakapono — Our Faith</em>. Literacy is taught
              through Little Learners Love Literacy in Years 0–3 and The Code in
              Years 4–6; maths through Maths — No Problem!
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
                  className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-1.5 text-small font-medium text-[var(--color-ink-muted)]"
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
          {/* Intro on the left, handbook beside it, so the top row is balanced. */}
          <div className="grid items-end gap-8 min-[901px]:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] min-[901px]:gap-14">
            <div>
              <p className="text-eyebrow font-semibold tracking-[0.16em] text-[var(--color-gold)] uppercase">
                For current families
              </p>
              <h2 className="mt-3.5 text-h2 leading-[1.1]">
                Parent information
              </h2>
              <p className="mt-[18px] max-w-[56ch] text-body leading-[1.65] text-[var(--color-ink-muted)]">
                We keep one master Parent Information Handbook so there is a
                single, current source of everything families need — conduct,
                uniform and daily routines.
              </p>
            </div>
            <a
              href={handbook}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex flex-col rounded-[20px] bg-[var(--color-brand)] px-7 py-6 text-[var(--color-cream)] shadow-[0_18px_40px_-28px_rgb(108_20_44/0.6)] hover:bg-[var(--color-brand-hover)] hover:text-[var(--color-cream)]"
            >
              <span className="text-eyebrow font-semibold tracking-[0.16em] text-[var(--color-gold-light)] uppercase">
                Start here
              </span>
              <span className="mt-2 font-display text-h3 leading-[1.2]">
                {handbookDoc.title}
              </span>
              <span className="mt-4 flex items-center justify-between gap-4">
                <span className="text-small text-[rgba(250,248,245,.82)]">
                  PDF · everything in one place
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-gold)] px-5 py-2.5 text-small font-semibold whitespace-nowrap text-[var(--color-heading)]">
                  Download <span aria-hidden>↓</span>
                </span>
              </span>
            </a>
          </div>
          {/* Columns (not a grid) so cards of different lengths pack without gaps. */}
          <ul className="mt-10 gap-4 min-[621px]:columns-2 min-[901px]:columns-3">
            {infoCards.map((card) => {
              const Icon = (card.id && INFO_CARD_ICONS[card.id]) || Info;
              return (
                <li
                  key={card.title}
                  id={card.id}
                  className="mb-4 scroll-mt-28 break-inside-avoid rounded-2xl border border-[var(--color-border)] bg-white px-6 py-6"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-rose)] text-[var(--color-brand)]">
                      <Icon className="size-[17px]" aria-hidden />
                    </span>
                    <h3 className="text-h4 leading-[1.25]">{card.title}</h3>
                  </div>
                  <p className="mt-2.5 text-copy leading-[1.65] whitespace-pre-line text-[var(--color-ink-muted)]">
                    {card.body}
                  </p>
                  {card.links.length ? (
                    <div className="mt-3.5 flex flex-col gap-1.5">
                      {card.links.map((link) =>
                        link.href.startsWith("/") ? (
                          <Link
                            key={link.label}
                            href={link.href}
                            className="inline-flex items-center gap-1.5 text-small font-semibold"
                          >
                            {link.label} <span aria-hidden>→</span>
                          </Link>
                        ) : (
                          <a
                            key={link.label}
                            href={link.href}
                            className="inline-flex items-center gap-1.5 text-small font-semibold"
                            {...linkProps(link)}
                          >
                            {link.label}{" "}
                            <span aria-hidden>{link.external ? "↗" : "→"}</span>
                          </a>
                        ),
                      )}
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <CTASection
        heading={
          (copy?.ctaHeading as string | undefined) ??
          "Come and see learning in action"
        }
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
