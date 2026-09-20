import Link from "next/link";
import type { Metadata } from "next";

import { PageHero } from "@/components/page-hero";
import { ASSESSMENT_DESCRIPTORS } from "@/lib/assessment-descriptors";
import { PAGE_META } from "@/lib/page-meta";
import { sanityFetch } from "@/sanity/lib/live";
import { LEARNING_PAGE_QUERY } from "@/sanity/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = PAGE_META.learning;

const PROGRAMME_FALLBACK = [
  {
    years: "Years 0–3 · Reading & writing",
    title: "Little Learners Love Literacy",
    body: "Liz Kane's programme for our youngest learners — one of the Structured Literacy options New Zealand schools began in 2025.",
  },
  {
    years: "Years 4–6 · Reading & writing",
    title: "The Code",
    body: "Explicit teaching of reading and writing knowledge and skills, continuing the structured literacy pathway through the senior school.",
  },
  {
    years: "Years 1–6 · Maths & statistics",
    title: "Maths — No Problem!",
    body: "A clear teaching sequence for the explicit teaching of the mathematics knowledge and skills that are foundational to being numerate.",
  },
];

const ROADMAP = [
  "Religious education",
  "Te Ao Māori & Te Tiriti o Waitangi",
  "Sports",
  "The arts — music, art, drama",
  "E-learning & digital technology",
  "Student wellbeing",
  "EOTC — trips, swimming, camp",
  "Shine Challenge",
  "Stella Stars",
];

export default async function LearningPage() {
  let copy: Record<string, unknown> | null = null;
  try {
    const result = await sanityFetch({ query: LEARNING_PAGE_QUERY, stega: false });
    copy = result.data as Record<string, unknown> | null;
  } catch {
    /* CMS unavailable */
  }

  const programmes =
    (copy?.programmes as typeof PROGRAMME_FALLBACK | undefined)?.filter(
      (item) => item.title,
    ) ?? PROGRAMME_FALLBACK;

  return (
    <>
      <PageHero
        eyebrow="Our School · Our learning"
        title="School programmes & curriculum"
        subtitle={
          (copy?.heroSubtitle as string | undefined) ??
          "To support every student to attain their highest possible educational achievement and grow a love of lifelong learning in a safe, inclusive and supportive environment."
        }
      />

      <section className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="page-wrap section-pad grid items-start gap-16 min-[901px]:grid-cols-[1fr_1.45fr]">
          <div>
            <p className="text-[12px] font-semibold tracking-[0.16em] text-[var(--color-gold)] uppercase">
              What we teach
            </p>
            <h2 className="mt-3.5 text-[38px] leading-[1.12]">
              {(copy?.curriculumTitle as string | undefined) ??
                "Two curricula, woven together"}
            </h2>
          </div>
          <div className="flex max-w-[64ch] flex-col gap-5 text-[17.5px] leading-[1.78] text-[var(--color-ink)]">
            <p>
              {(copy?.curriculumIntro as string | undefined) ??
                "At Stella Maris we follow the New Zealand Curriculum for our learners. The curriculum focuses on sequenced, coherent knowledge and practices that reflect how each learning area helps students to understand, interpret, and contribute in the world."}
            </p>
            <p>
              {(copy?.religiousEducation as string | undefined) ??
                "As a Catholic school we also follow Tō Tātou Whakapono — Our Faith, the Catholic Religious Education curriculum. This provides guidance for rich learning about God, the Good News, our story and being Church, carefully weaving together the heart of the Catholic faith so that this knowledge may connect with the lives of our students and whānau."}
            </p>
            <p>
              The knowledge in the seven learning areas of the New Zealand
              Curriculum is carefully selected for the New Zealand context. It
              includes national and global content, including knowledge that
              reflects te ao Māori, our place in the Pacific, and our
              multicultural society.
            </p>
            <p>
              The curriculum is laid out in deliberate, year-by-year teaching
              sequences within and across learning areas. Each step builds on
              what has come before, allowing students to revisit key ideas and
              deepen their understanding over time — so we can identify and
              respond to learning needs before knowledge gaps compound.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--color-border)] bg-[var(--color-cream)]">
        <div className="page-wrap section-pad">
          <p className="text-[12px] font-semibold tracking-[0.16em] text-[var(--color-gold)] uppercase">
            Foundations
          </p>
          <h2 className="mt-3.5 text-[38px] leading-[1.12]">
            {(copy?.programmesTitle as string | undefined) ?? "Literacy and maths"}
          </h2>
          <p className="mt-[18px] max-w-[66ch] text-[17.5px] leading-[1.78] text-[var(--color-ink-muted)]">
            Developing students' literacy and maths knowledge and skills
            provides them with capabilities that are critical for communication,
            creativity, participating in society, and being lifelong learners.
          </p>
          <ul className="mt-10 grid gap-5 min-[901px]:grid-cols-3">
            {programmes.map((item) => (
              <li
                key={item.title}
                className="rounded-[20px] border border-[var(--color-border)] border-t-[3px] border-t-[var(--color-gold)] bg-[var(--color-surface)] px-[30px] py-8"
              >
                <p className="text-[11.5px] font-semibold tracking-[0.16em] text-[var(--color-gold)] uppercase">
                  {item.years}
                </p>
                <h3 className="mt-3 text-[25px] leading-[1.22] text-[var(--color-brand)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-[1.72] text-[var(--color-ink-muted)]">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-7 max-w-[72ch] text-[16.5px] leading-[1.75] text-[var(--color-ink-muted)]">
            Reading, writing and vocabulary development are also embedded across
            all learning areas, so students apply that knowledge everywhere they
            learn.
          </p>
        </div>
      </section>

      <section className="border-b border-[var(--color-border)] bg-[var(--color-cream-deep)]">
        <div className="page-wrap section-pad grid items-start gap-16 min-[901px]:grid-cols-[1fr_1.45fr]">
          <div>
            <p className="text-[12px] font-semibold tracking-[0.16em] text-[var(--color-gold)] uppercase">
              In the classroom
            </p>
            <h2 className="mt-3.5 text-[38px] leading-[1.12]">
              {(copy?.environmentsTitle as string | undefined) ??
                "Responsive learning environments"}
            </h2>
          </div>
          <div className="flex max-w-[64ch] flex-col gap-5 text-[17.5px] leading-[1.78] text-[var(--color-ink)]">
            <p>
              {(copy?.environmentsBody as string | undefined) ??
                "Students learn best when they feel a sense of belonging, are valued, and are supported to succeed. Responsive learning environments promote engagement, wellbeing, and equitable access to learning across all learning areas."}
            </p>
            <p>
              Teachers play a key role by recognising and responding to
              students' interests, needs, and ways of learning in everyday
              teaching. They also make sure that teaching and learning is
              non-sexist, non-racist, and non-discriminatory.
            </p>
            <p>
              Year-by-year teaching sequences set out clearly what students need
              to know and be able to do. That clarity supports teachers to
              design environments where every student can access rich,
              challenging content, and to plan teaching, learning and assessment
              that supports all students to progress and achieve personal
              excellence.
            </p>
          </div>
        </div>
      </section>

      <section
        id="assessment"
        className="scroll-mt-28 border-b border-[var(--color-border)] bg-[var(--color-surface)]"
      >
        <div className="page-wrap section-pad">
          <div className="grid items-start gap-16 min-[901px]:grid-cols-[1fr_1.45fr]">
            <div>
              <p className="text-[12px] font-semibold tracking-[0.16em] text-[var(--color-gold)] uppercase">
                Progress
              </p>
              <h2 className="mt-3.5 text-[38px] leading-[1.12]">
                Assessment & reporting
              </h2>
              <p className="mt-5 rounded-2xl border border-[var(--color-border)] border-l-4 border-l-[var(--color-gold)] bg-[var(--color-cream)] px-[22px] py-5 text-[16.5px] leading-[1.7] text-[var(--color-ink)]">
                {(copy?.assessmentIntro as string | undefined) ??
                  "Parents receive a written report at mid-year and at the end of the year outlining their child's progress and achievement against the New Zealand Curriculum."}
              </p>
            </div>
            <div className="flex max-w-[64ch] flex-col gap-5 text-[17.5px] leading-[1.78] text-[var(--color-ink)]">
              <p>
                Teachers actively assess student progress in relation to the
                year-by-year teaching sequences of all learning areas, using
                effective assessment practices. Progress markers describe the
                level of proficiency expected at the end of each year of
                learning in reading, writing, and maths — proficiency at the end
                of each year signals readiness to engage in the next year of
                learning.
              </p>
              <p>
                To ensure consistency in how teachers make and communicate
                informed decisions about progress, Stella Maris uses common
                progress descriptors for each student.
              </p>
            </div>
          </div>
          <ul className="mt-11 flex flex-col gap-0.5">
            {ASSESSMENT_DESCRIPTORS.map((row, index) => (
              <li
                key={row.label}
                className={`grid gap-7 border-t border-[var(--color-border)] py-[22px] min-[621px]:grid-cols-[200px_1fr] ${
                  index === ASSESSMENT_DESCRIPTORS.length - 1 ? "border-b" : ""
                }`}
              >
                <p className="font-display text-[22px] text-[var(--color-brand)]">
                  {row.label}
                </p>
                <p className="text-[16.5px] leading-[1.7] text-[var(--color-ink-muted)]">
                  {row.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="support"
        className="scroll-mt-28 border-b border-[var(--color-border)] bg-[var(--color-cream)]"
      >
        <div className="page-wrap section-pad grid items-start gap-16 min-[901px]:grid-cols-[1fr_1.45fr]">
          <div>
            <p className="text-[12px] font-semibold tracking-[0.16em] text-[var(--color-gold)] uppercase">
              Every learner
            </p>
            <h2 className="mt-3.5 text-[38px] leading-[1.12]">
              {(copy?.supportTitle as string | undefined) ?? "Learning support"}
            </h2>
            <p className="mt-5 text-base leading-[1.7] text-[var(--color-ink-muted)]">
              Our SENCo, Mel Hogg, coordinates learning support alongside
              classroom teachers and whānau.
            </p>
            <a
              href="mailto:melh@stellamaris.school.nz"
              className="mt-3.5 inline-flex items-center gap-1.5 text-[15px] font-semibold"
            >
              melh@stellamaris.school.nz <span aria-hidden>→</span>
            </a>
          </div>
          <div className="flex max-w-[64ch] flex-col gap-5 text-[17.5px] leading-[1.78] text-[var(--color-ink)]">
            <p>
              {(copy?.supportBody as string | undefined) ??
                "At Stella Maris Catholic Primary School, the board and staff ensure that every student is able to attain their highest possible standard in educational achievement and that the school is inclusive of, and caters for, students with differing needs."}
            </p>
            <p>
              We have high aspirations for every student, reduce barriers to
              education, and support all students to develop sound skills in
              literacy and numeracy.
            </p>
            <p>
              We provide learning support for students who may have a range of
              individual learning support needs. We take a collaborative
              approach and involve the student, their parents and caregivers,
              and others as needed, to best support the student.
            </p>
            <p className="text-[14.5px] text-[var(--color-faint)]">
              Education and Training Act 2020, s 127(1)(a), (c)
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--color-border)] bg-[var(--color-cream-deep)]">
        <div className="page-wrap flex flex-wrap items-center justify-between gap-8 py-14">
          <p className="max-w-[70ch] text-[17.5px] leading-[1.75] text-[var(--color-ink)]">
            {(copy?.attendanceNote as string | undefined) ??
              "Student attendance plays an important role in progress and achievement, and lifting attendance is a shared responsibility. The more often students attend school, the better they do, the happier they are, and the better they are set up for life."}
          </p>
          <Link href="/absences" className="btn-outline-surface whitespace-nowrap">
            Absences & attendance <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      <section className="bg-[var(--color-surface)]">
        <div className="page-wrap py-[72px]">
          <p className="text-[12px] font-semibold tracking-[0.16em] text-[var(--color-gold)] uppercase">
            Growing this section
          </p>
          <h2 className="mt-3.5 text-[34px] leading-[1.15]">
            More of our learning, coming through the year
          </h2>
          <p className="mt-4 max-w-[64ch] text-[17px] leading-[1.75] text-[var(--color-ink-muted)]">
            We'll add these as content and photography come together — each
            becomes a section on this page rather than a new page in the menu.
          </p>
          <ul className="mt-8 grid gap-x-8 min-[621px]:grid-cols-2 min-[901px]:grid-cols-3">
            {ROADMAP.map((item) => (
              <li
                key={item}
                className="border-t border-[var(--color-border)] py-[15px] text-[16.5px] text-[var(--color-ink-muted)]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
