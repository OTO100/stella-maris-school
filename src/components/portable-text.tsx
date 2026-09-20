import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";

import { CardGrid, type CardGridItem } from "@/components/card-grid";
import { resolveLinkItem, type LinkItemResolved } from "@/lib/nav-href";
import { urlForImage } from "@/sanity/lib/image";

type ImageBlockValue = {
  _type?: string;
  asset?: unknown;
  alt?: string;
};

type SectionLinksBlockValue = {
  _type?: "sectionLinks";
  heading?: string | null;
  columns?: number | null;
  cards?: Array<{
    title?: string | null;
    body?: string | null;
    link?: LinkItemResolved | null;
  }> | null;
};

function sectionLinksToGridItems(
  block: SectionLinksBlockValue | undefined,
): CardGridItem[] {
  if (!block?.cards?.length) return [];
  const items: CardGridItem[] = [];
  for (const card of block.cards) {
    const title = card.title?.trim();
    if (!title) continue;
    const resolved = resolveLinkItem(card.link ?? undefined);
    items.push({
      title,
      body: card.body?.trim() || null,
      href: resolved?.href ?? null,
      linkLabel: resolved?.label ?? "Learn more",
    });
  }
  return items;
}

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-10 scroll-mt-24 text-2xl font-semibold tracking-tight text-[var(--color-ink)] first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 scroll-mt-24 text-xl font-semibold tracking-tight text-[var(--color-ink)]">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[var(--color-gold)] pl-4 text-lg italic text-[var(--color-ink-muted)]">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="mt-4 leading-relaxed text-[var(--color-ink-muted)] first:mt-0">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-4 list-disc space-y-2 pl-6 text-[var(--color-ink-muted)]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-4 list-decimal space-y-2 pl-6 text-[var(--color-ink-muted)]">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href;
      if (!href) return <>{children}</>;
      const external = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          className="font-medium text-[var(--color-accent)] underline decoration-[var(--color-gold-light)] underline-offset-2 hover:text-[var(--color-brand)]"
          {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => (
      <strong className="font-semibold text-[var(--color-ink)]">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
  },
  types: {
    image: ({ value }: { value?: ImageBlockValue }) => {
      const img = urlForImage(value as never);
      if (!img) return null;
      const url = img.width(1200).height(800).fit("max").auto("format").url();
      return (
        <figure className="my-8">
          <Image
            src={url}
            alt={(value?.alt as string) || ""}
            width={1200}
            height={800}
            className="h-auto w-full rounded-xl border border-[var(--color-border)] object-cover"
            sizes="(max-width: 768px) 100vw, 720px"
          />
        </figure>
      );
    },
    sectionLinks: ({ value }: { value?: SectionLinksBlockValue }) => {
      const items = sectionLinksToGridItems(value);
      if (!items.length) return null;
      const columns = (value?.columns === 2 || value?.columns === 4
        ? value.columns
        : 3) as 2 | 3 | 4;
      return (
        <div className="my-10">
          {value?.heading?.trim() ? (
            <h2 className="mb-6 font-display text-2xl font-semibold tracking-tight text-[var(--color-heading)]">
              {value.heading.trim()}
            </h2>
          ) : null}
          <CardGrid items={items} columns={columns} />
        </div>
      );
    },
  },
};

export function PortableTextBlock({
  value,
}: {
  value: unknown;
}) {
  if (!value || !Array.isArray(value)) return null;
  return (
    <div className="prose-portable max-w-none">
      <PortableText value={value} components={components} />
    </div>
  );
}
