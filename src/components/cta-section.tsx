import type { ReactNode } from "react";

import { StarMark } from "@/components/star-mark";

type Props = {
  heading: string;
  body?: string | null;
  eyebrow?: string;
  variant?: "brand" | "surface";
  children?: ReactNode;
  className?: string;
};

export function CTASection({
  heading,
  body,
  children,
  className = "",
  variant = "brand",
}: Props) {
  if (variant === "surface") {
    return (
      <section
        className={`rounded-[20px] border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-10 sm:px-10 ${className}`}
      >
        <h2 className="font-display text-[32px] leading-[1.12] font-semibold tracking-[-0.02em]">
          {heading}
        </h2>
        {body ? (
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
            {body}
          </p>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </section>
    );
  }

  return (
    <section
      className={`relative overflow-hidden border-t-[6px] border-[var(--color-gold)] bg-[var(--color-brand-muted)] text-[var(--color-cream)] ${className}`}
    >
      <StarMark
        size={220}
        opacity={0.12}
        className="pointer-events-none absolute -bottom-10 -left-8"
      />
      <div className="page-wrap relative flex flex-col items-start justify-between gap-8 py-16 min-[901px]:flex-row min-[901px]:items-center">
        <div>
          <h2 className="max-w-[18ch] font-display text-[32px] leading-[1.12] font-semibold tracking-[-0.02em] text-[var(--color-cream)] min-[621px]:text-[40px]">
            {heading}
          </h2>
          {body ? (
            <p className="mt-3 max-w-[52ch] text-[17px] leading-[1.7] text-[rgba(250,248,245,.92)]">
              {body}
            </p>
          ) : null}
        </div>
        {children ? (
          <div className="flex flex-wrap gap-3.5">{children}</div>
        ) : null}
      </div>
    </section>
  );
}
