import type { ReactNode } from "react";

type SectionVariant = "default" | "wash" | "wash-alt" | "surface" | "cream";

const variantClasses: Record<SectionVariant, string> = {
  default: "",
  wash: "section-wash",
  "wash-alt": "section-wash-alt",
  surface: "border-y border-[var(--color-border)] bg-[var(--color-surface)]",
  cream: "border-y border-[var(--color-border)] bg-[var(--color-cream-deep)]/40",
};

type SectionProps = {
  children: ReactNode;
  className?: string;
  variant?: SectionVariant;
  id?: string;
  padded?: boolean;
};

export function Section({
  children,
  className = "",
  variant = "default",
  id,
  padded = true,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`${padded ? "section-pad" : ""} ${variantClasses[variant]} ${className}`.trim()}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">{children}</div>
    </section>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string | null;
  className?: string;
  action?: ReactNode;
  bordered?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className = "",
  action,
  bordered = false,
}: SectionHeadingProps) {
  return (
    <div
      className={`flex flex-col justify-between gap-4 sm:flex-row sm:items-end ${
        bordered ? "border-b border-[var(--color-border)] pb-8" : ""
      } ${className}`.trim()}
    >
      <div>
        {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
        <h2 className="mt-3 font-display text-display-md font-semibold leading-tight tracking-tight text-[var(--color-heading)]">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 max-w-xl text-[var(--color-ink-muted)]">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

type PageIntroProps = {
  children: ReactNode;
  className?: string;
};

export function PageIntro({ children, className = "" }: PageIntroProps) {
  return (
    <div
      className={`mx-auto max-w-6xl px-4 pt-14 sm:px-6 lg:pt-16 ${className}`.trim()}
    >
      {children}
    </div>
  );
}
