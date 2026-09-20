export function Eyebrow({
  children,
  className = "",
  dash = true,
}: {
  children: React.ReactNode;
  className?: string;
  dash?: boolean;
}) {
  return (
    <p
      className={`flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--color-gold)] ${className}`}
    >
      {dash ? (
        <span
          aria-hidden
          className="block h-[2px] w-[34px] shrink-0 bg-[var(--color-gold)]"
        />
      ) : null}
      {children}
    </p>
  );
}
