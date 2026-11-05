import Image from "next/image";
import type { ReactNode } from "react";

import { Eyebrow } from "@/components/eyebrow";
import { StarMark } from "@/components/star-mark";

type Pill = {
  href: string;
  label: string;
};

type Props = {
  eyebrow?: string;
  title: string;
  /** Second, smaller line of the title (split layout), e.g. "Catholic Primary School". */
  titleSuffix?: string | null;
  subtitle?: string | null;
  backgroundImageSrc?: string | null;
  backgroundImageAlt?: string;
  size?: "default" | "home";
  layout?: "overlay" | "split";
  actions?: ReactNode;
  /** Small line under the actions (split layout), e.g. the next term date. */
  footnote?: ReactNode;
  pills?: Pill[];
};

export function PageHero({
  eyebrow,
  title,
  titleSuffix,
  subtitle,
  backgroundImageSrc,
  backgroundImageAlt = "",
  size = "default",
  layout = "overlay",
  actions,
  footnote,
  pills,
}: Props) {
  const isPhoto = Boolean(backgroundImageSrc);
  const isHome = size === "home";

  if (layout === "split" && isPhoto) {
    return (
      <section
        id="main"
        className="relative isolate overflow-hidden bg-[var(--color-brand)] text-[var(--color-cream)]"
      >
        <div className="grid min-[901px]:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
          <div className="relative aspect-[4/3] min-[901px]:order-2 min-[901px]:aspect-auto min-[901px]:min-h-[560px]">
            <Image
              src={backgroundImageSrc!}
              alt={backgroundImageAlt}
              fill
              className="object-cover"
              sizes="(min-width: 901px) 48vw, 100vw"
              priority
            />
          </div>
          <div className="relative flex items-center overflow-hidden bg-[var(--color-brand)] min-[901px]:order-1">
            <StarMark
              size={260}
              opacity={0.08}
              className="pointer-events-none absolute -bottom-16 -left-14"
            />
            <div className="relative w-full px-6 py-14 min-[621px]:px-10 min-[621px]:py-20 min-[901px]:ml-auto min-[901px]:max-w-[38rem] min-[901px]:px-12 min-[901px]:py-24">
              {eyebrow ? (
                <Eyebrow className="text-[var(--color-gold-light)]">
                  {eyebrow}
                </Eyebrow>
              ) : null}
              <h1 className="mt-[18px] max-w-[17ch] font-display text-[40px] leading-[1.03] font-semibold tracking-[-0.02em] text-[var(--color-cream)] min-[621px]:text-[56px] min-[1200px]:text-[62px]">
                {title}
                {titleSuffix ? (
                  <span className="mt-2 block text-[24px] leading-[1.15] font-medium tracking-[-0.01em] text-[var(--color-gold-light)] min-[621px]:text-[30px]">
                    {titleSuffix}
                  </span>
                ) : null}
              </h1>
              {subtitle ? (
                <p className="mt-6 max-w-[46ch] text-h4 leading-[1.65] text-[rgb(250_248_245/0.94)]">
                  {subtitle}
                </p>
              ) : null}
              {actions ? (
                <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3.5">
                  {actions}
                </div>
              ) : null}
              {footnote ? <div className="mt-8">{footnote}</div> : null}
            </div>
          </div>
        </div>
        <div className="hero-gold-rule relative" aria-hidden />
      </section>
    );
  }

  return (
    <section
      id="main"
      className="relative isolate overflow-hidden text-[var(--color-cream)]"
    >
      {isPhoto ? (
        <>
          <Image
            src={backgroundImageSrc!}
            alt={backgroundImageAlt}
            fill
            className="-z-20 object-cover"
            sizes="100vw"
            priority
          />
          <div
            className="absolute inset-0 -z-10"
            style={{
              background: isHome
                ? "linear-gradient(105deg, rgba(78,14,32,.94) 0%, rgba(108,20,44,.86) 46%, rgba(108,20,44,.55) 100%)"
                : "linear-gradient(100deg, rgba(78,14,32,.94) 0%, rgba(108,20,44,.82) 55%, rgba(108,20,44,.58) 100%)",
            }}
            aria-hidden
          />
          <StarMark
            size={isHome ? 340 : 320}
            opacity={0.13}
            className="pointer-events-none absolute -top-20 -right-[70px] -z-10"
          />
          <StarMark
            size={isHome ? 150 : 140}
            opacity={0.1}
            className="pointer-events-none absolute right-[250px] -bottom-[70px] -z-10"
          />
        </>
      ) : (
        <>
          <div
            className="absolute inset-0 -z-10 bg-[var(--color-brand)]"
            aria-hidden
          />
          {/* Same star as the home hero, bottom-left. */}
          <StarMark
            size={260}
            opacity={0.08}
            className="pointer-events-none absolute -bottom-16 -left-14 -z-10"
          />
        </>
      )}
      {/* Type, spacing and controls match the home hero's text column. */}
      <div
        className={`page-wrap relative ${
          isHome
            ? "py-16 min-[621px]:py-24"
            : "py-14 min-[621px]:py-20 min-[901px]:py-24"
        }`}
      >
        {eyebrow ? (
          <Eyebrow className="text-[var(--color-gold-light)]">
            {eyebrow}
          </Eyebrow>
        ) : null}
        <h1 className="mt-[18px] max-w-[17ch] font-display text-[40px] leading-[1.03] font-semibold tracking-[-0.02em] text-[var(--color-cream)] min-[621px]:text-[56px] min-[1200px]:text-[62px]">
          {title}
          {titleSuffix ? (
            <span className="mt-2 block text-[24px] leading-[1.15] font-medium tracking-[-0.01em] text-[var(--color-gold-light)] min-[621px]:text-[30px]">
              {titleSuffix}
            </span>
          ) : null}
        </h1>
        {subtitle ? (
          <p className="mt-6 max-w-[52ch] text-h4 leading-[1.65] text-[rgb(250_248_245/0.94)]">
            {subtitle}
          </p>
        ) : null}
        {actions ? (
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3.5">
            {actions}
          </div>
        ) : null}
        {pills?.length ? (
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {pills.map((pill) => (
              <li key={pill.href}>
                <a
                  href={pill.href}
                  className="inline-flex items-center rounded-full border border-[rgb(250_248_245/0.28)] px-4 py-2 text-small text-[var(--color-cream)] hover:border-[var(--color-gold-light)] hover:text-[var(--color-cream)]"
                >
                  {pill.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
        {footnote ? <div className="mt-8">{footnote}</div> : null}
      </div>
      <div className="hero-gold-rule relative" aria-hidden />
    </section>
  );
}
