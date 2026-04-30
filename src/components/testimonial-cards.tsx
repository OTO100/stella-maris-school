import Image from "next/image";

import { urlForImage } from "@/sanity/lib/image";

export type TestimonialItem = {
  _id?: string;
  quote: string;
  authorName: string;
  authorDetail?: string | null;
  photo?: {
    asset?: { _ref?: string };
    _type?: string;
  } | null;
};

type Props = {
  items: TestimonialItem[];
};

export function TestimonialCards({ items }: Props) {
  if (!items.length) return null;

  return (
    <div>
      <p className="section-eyebrow mb-3 text-[var(--color-ink-muted)] sm:hidden">
        Swipe to read more
      </p>
      <div className="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:overflow-visible sm:px-0">
        <ul className="flex min-w-min gap-4 sm:grid sm:min-w-0 sm:grid-cols-3 sm:gap-6">
          {items.map((t, idx) => {
            const id = t._id ?? `${t.authorName}-${idx}`;
            const img = t.photo
              ? urlForImage(t.photo as never)
                  ?.width(200)
                  .height(200)
                  .fit("crop")
                  .auto("format")
                  .url()
              : undefined;
            return (
              <li
                key={id}
                className="flex w-[min(100vw-3rem,20rem)] shrink-0 flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)] sm:w-auto"
              >
                <span className="text-4xl leading-none text-[var(--color-gold)]/40" aria-hidden>
                  “
                </span>
                <blockquote className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-ink)]">
                  {t.quote}
                </blockquote>
                <footer className="mt-6 flex items-center gap-3 border-t border-[var(--color-border)]/80 pt-4">
                  {img ? (
                    <Image
                      src={img}
                      alt=""
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-cream-deep)] font-display text-lg font-semibold text-[var(--color-brand)]">
                      {t.authorName.slice(0, 1)}
                    </span>
                  )}
                  <div>
                    <cite className="block text-sm font-semibold not-italic text-[var(--color-heading)]">
                      {t.authorName}
                    </cite>
                    {t.authorDetail ? (
                      <span className="block text-xs text-[var(--color-ink-muted)]">
                        {t.authorDetail}
                      </span>
                    ) : null}
                  </div>
                </footer>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
