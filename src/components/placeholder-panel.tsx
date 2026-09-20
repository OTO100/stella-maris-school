import { Eyebrow } from "@/components/eyebrow";

export function PlaceholderPanel({
  label = "To come",
  title,
  children,
  className = "",
}: {
  label?: string;
  title?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[16px] border border-dashed border-[var(--color-border-dashed)] bg-[var(--color-cream)] px-6 py-7 ${className}`}
    >
      <Eyebrow className="text-[var(--color-gold)]">{label}</Eyebrow>
      {title ? (
        <p className="mt-3 font-display text-[20px] leading-snug text-[var(--color-heading)]">
          {title}
        </p>
      ) : null}
      {children ? (
        <div className="mt-2 text-[15.5px] leading-[1.68] text-[var(--color-ink-muted)]">
          {children}
        </div>
      ) : null}
    </div>
  );
}
