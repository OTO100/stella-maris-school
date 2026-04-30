import Link from "next/link";

export type NewsTeaser = {
  _id: string;
  title: string | null;
  slug: string | null;
  publishedAt: string | null;
  excerpt: string | null;
};

function formatDate(iso: string | null) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-NZ", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export function NewsCardList({ items }: { items: NewsTeaser[] }) {
  const withSlug = items.filter((p): p is NewsTeaser & { slug: string } =>
    Boolean(p.slug),
  );
  if (!withSlug.length) return null;
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {withSlug.map((post, index) => (
        <li key={post._id}>
          <Link
            href={`/news/${post.slug}`}
            className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-card)] transition duration-300 hover:-translate-y-1 hover:border-[var(--color-gold)]/35 hover:shadow-[var(--shadow-card-hover)]"
          >
            <span
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-cream)] text-xs font-bold text-[var(--color-heading)] ring-1 ring-[var(--color-border)]"
              aria-hidden
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="flex flex-1 flex-col p-6 pt-14">
              <time
                dateTime={post.publishedAt ?? undefined}
                className="section-eyebrow-sm text-[var(--color-accent)]"
              >
                {formatDate(post.publishedAt)}
              </time>
              <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-[var(--color-heading)] group-hover:text-[var(--color-accent)]">
                {post.title}
              </h3>
              {post.excerpt ? (
                <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-[var(--color-ink-muted)]">
                  {post.excerpt}
                </p>
              ) : (
                <div className="flex-1" />
              )}
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-accent)]">
                Read article
                <span
                  aria-hidden
                  className="transition group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
