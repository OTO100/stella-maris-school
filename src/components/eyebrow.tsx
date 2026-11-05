export function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-eyebrow font-semibold uppercase tracking-[0.16em] text-[var(--color-gold)] ${className}`}
    >
      {children}
    </p>
  );
}
