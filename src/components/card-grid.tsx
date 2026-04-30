import Link from "next/link";
import type { ReactNode } from "react";

export type CardGridItem = {
  title: string;
  body?: string | null;
  href?: string | null;
  linkLabel?: string;
  icon?: ReactNode;
};

type Props = {
  items: CardGridItem[];
  columns?: 2 | 3 | 4;
};

export function CardGrid({ items, columns = 3 }: Props) {
  const grid =
    columns === 2
      ? "sm:grid-cols-2"
      : columns === 4
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <ul className={`grid gap-4 ${grid}`}>
      {items.map((item) => (
        <li key={item.title}>
          {item.href ? (
            <Link
              href={item.href}
              className="group flex h-full flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--color-gold)]/40 hover:shadow-[var(--shadow-card-hover)]"
            >
              <CardInner item={item} />
            </Link>
          ) : (
            <div className="flex h-full flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)]">
              <CardInner item={item} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

function CardInner({ item }: { item: CardGridItem }) {
  return (
    <>
      {item.icon ? (
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-brand)] text-[var(--color-cream)] transition group-hover:bg-[var(--color-gold)] group-hover:text-[var(--color-heading)]">
          {item.icon}
        </span>
      ) : null}
      <h3
        className={`font-display text-lg font-semibold text-[var(--color-heading)] group-hover:text-[var(--color-accent)] ${item.icon ? "mt-4" : ""}`}
      >
        {item.title}
      </h3>
      {item.body ? (
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-muted)]">
          {item.body}
        </p>
      ) : null}
      {item.href && item.linkLabel ? (
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-accent)]">
          {item.linkLabel}
          <span aria-hidden className="transition group-hover:translate-x-0.5">
            →
          </span>
        </span>
      ) : null}
    </>
  );
}
