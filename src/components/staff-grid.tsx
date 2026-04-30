import Image from "next/image";

import { urlForImage } from "@/sanity/lib/image";

export type StaffMemberDisplay = {
  _id: string;
  name: string;
  role: string;
  bio?: string | null;
  photo?: {
    asset?: { _ref?: string };
    alt?: string;
  } | null;
};

type Props = {
  members: StaffMemberDisplay[];
};

export function StaffGrid({ members }: Props) {
  if (!members.length) return null;

  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((m) => {
        const src = m.photo
          ? urlForImage(m.photo as never)
              ?.width(400)
              .height(400)
              .fit("crop")
              .auto("format")
              .url()
          : undefined;
        const alt =
          (m.photo as { alt?: string } | undefined)?.alt ??
          `${m.name} — ${m.role}`;
        return (
          <li key={m._id}>
            <article className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-card)]">
              {src ? (
                <div className="aspect-square w-full bg-[var(--color-cream-deep)]">
                  <Image
                    src={src}
                    alt={alt}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              ) : (
                <div className="flex aspect-square w-full items-center justify-center bg-[var(--color-cream-deep)] font-display text-4xl font-semibold text-[var(--color-brand-muted)]">
                  {m.name.slice(0, 1)}
                </div>
              )}
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold text-[var(--color-heading)]">
                  {m.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-[var(--color-accent)]">
                  {m.role}
                </p>
                {m.bio ? (
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-muted)]">
                    {m.bio}
                  </p>
                ) : null}
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
