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
  subtitle?: string | null;
  backgroundImageSrc?: string | null;
  backgroundImageAlt?: string;
  size?: "default" | "home";
  actions?: ReactNode;
  pills?: Pill[];
};

export function PageHero({
  eyebrow,
  title,
  subtitle,
  backgroundImageSrc,
  backgroundImageAlt = "",
  size = "default",
  actions,
  pills,
}: Props) {
  const isPhoto = Boolean(backgroundImageSrc);
  const isHome = size === "home";

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
          <div className="absolute inset-0 -z-10 bg-[var(--color-brand)]" aria-hidden />
          <StarMark
            size={320}
            opacity={0.07}
            className="pointer-events-none absolute -top-16 -right-16 -z-10"
          />
          <StarMark
            size={140}
            opacity={0.06}
            className="pointer-events-none absolute bottom-8 left-1/3 -z-10"
          />
        </>
      )}
      <div
        className={`page-wrap relative ${
          isHome ? "py-16 min-[621px]:py-24" : "py-16 min-[621px]:py-[72px]"
        }`}
      >
        {eyebrow ? (
          <Eyebrow className="text-[var(--color-gold-light)]">
            {eyebrow}
          </Eyebrow>
        ) : null}
        <h1
          className={`mt-[18px] font-display font-semibold tracking-[-0.02em] text-[var(--color-cream)] ${
            isHome
              ? "max-w-[17ch] text-[44px] leading-[1.03] min-[621px]:text-[70px]"
              : "max-w-[18ch] text-[42px] leading-[1.06] min-[621px]:text-[56px]"
          }`}
        >
          {title}
        </h1>
        {subtitle ? (
          <p
            className={`mt-6 max-w-[50ch] text-[19px] leading-[1.68] text-[rgb(250_248_245/0.94)] ${
              isHome ? "min-[621px]:text-[19.5px]" : ""
            }`}
          >
            {subtitle}
          </p>
        ) : null}
        {actions ? (
          <div className="mt-9 flex flex-wrap gap-3.5">{actions}</div>
        ) : null}
        {pills?.length ? (
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {pills.map((pill) => (
              <li key={pill.href}>
                <a
                  href={pill.href}
                  className="inline-flex rounded-full border border-[rgb(250_248_245/0.35)] px-4 py-2 text-[13.5px] font-semibold text-[var(--color-cream)] hover:border-[var(--color-gold-light)] hover:text-[var(--color-gold-light)]"
                >
                  {pill.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <div className="hero-gold-rule relative" aria-hidden />
    </section>
  );
}
