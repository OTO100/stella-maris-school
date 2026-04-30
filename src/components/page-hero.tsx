import Image from "next/image";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string | null;
  backgroundImageSrc?: string | null;
  backgroundImageAlt?: string;
};

export function PageHero({
  eyebrow,
  title,
  subtitle,
  backgroundImageSrc,
  backgroundImageAlt = "",
}: Props) {
  return (
    <header className="relative overflow-hidden border-b border-[var(--color-border)]">
      {backgroundImageSrc ? (
        <div className="absolute inset-0">
          <Image
            src={backgroundImageSrc}
            alt={backgroundImageAlt}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div
            className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand)]/92 via-[var(--color-brand)]/82 to-[var(--color-brand-muted)]/98"
            aria-hidden
          />
        </div>
      ) : (
        <div
          className="absolute inset-0 mesh-hero"
          aria-hidden
        />
      )}
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:py-20">
        {eyebrow ? (
          <p className="section-eyebrow text-[var(--color-gold-light)]">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-4 max-w-4xl font-display text-[clamp(2rem,4.5vw,3rem)] font-semibold leading-tight tracking-tight text-[var(--color-cream)]">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--color-cream)]/90">
            {subtitle}
          </p>
        ) : null}
      </div>
    </header>
  );
}
