import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  heading: string;
  body?: string | null;
  variant?: "brand" | "surface";
  children?: ReactNode;
  className?: string;
};

export function CTASection({
  eyebrow,
  heading,
  body,
  variant = "brand",
  children,
  className = "",
}: Props) {
  const wrap =
    variant === "brand"
      ? "bg-[var(--color-brand)] text-[var(--color-cream)]"
      : "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-heading)]";
  const sub =
    variant === "brand"
      ? "text-[var(--color-cream)]/85"
      : "text-[var(--color-ink-muted)]";
  const eyebrowCls =
    variant === "brand"
      ? "text-[var(--color-gold-light)]"
      : "text-[var(--color-accent)]";

  return (
    <section className={`${wrap} rounded-[var(--radius-hero)] px-6 py-10 sm:px-10 sm:py-12 ${className}`}>
      {eyebrow ? (
        <p className={`section-eyebrow ${eyebrowCls}`}>
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
        {heading}
      </h2>
      {body ? (
        <p className={`mt-4 max-w-2xl text-sm leading-relaxed sm:text-base ${sub}`}>
          {body}
        </p>
      ) : null}
      {children ? <div className="mt-8">{children}</div> : null}
    </section>
  );
}
