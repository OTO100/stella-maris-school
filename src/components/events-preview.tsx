import Link from "next/link";

export type EventPreviewItem = {
  _id: string;
  title: string;
  slug?: string | null;
  startAt?: string | null;
  location?: string | null;
  summary?: string | null;
  linkUrl?: string | null;
};

type Props = {
  events: EventPreviewItem[];
  emptyMessage?: string;
};

function formatWhen(iso: string | null | undefined) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleString("en-NZ", {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

export function EventsPreview({
  events,
  emptyMessage = "Upcoming dates will be shared here and in Hero.",
}: Props) {
  if (!events.length) {
    return (
      <div className="rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-cream)]/40 px-6 py-10 text-center text-[var(--color-ink-muted)]">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((e) => (
        <li key={e._id}>
          <article className="flex h-full flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-card)]">
            <p className="section-eyebrow text-[var(--color-accent)]">
              {formatWhen(e.startAt ?? undefined)}
            </p>
            <h3 className="mt-2 font-display text-lg font-semibold text-[var(--color-heading)]">
              {e.title}
            </h3>
            {e.location ? (
              <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
                {e.location}
              </p>
            ) : null}
            {e.summary ? (
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-ink-muted)]">
                {e.summary}
              </p>
            ) : null}
            {e.slug ? (
              <Link
                href={`/events/${e.slug}`}
                className="mt-4 inline-flex text-sm font-semibold text-[var(--color-accent)] hover:underline"
              >
                Event details
              </Link>
            ) : e.linkUrl ? (
              <a
                href={e.linkUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-4 inline-flex text-sm font-semibold text-[var(--color-accent)] hover:underline"
              >
                More info
              </a>
            ) : (
              <Link
                href="/community"
                className="mt-4 inline-flex text-sm font-semibold text-[var(--color-accent)] hover:underline"
              >
                Community
              </Link>
            )}
          </article>
        </li>
      ))}
    </ul>
  );
}
