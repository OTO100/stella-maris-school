import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { PortableTextBlock } from "@/components/portable-text";
import { ogImageMetadata } from "@/lib/metadata-helpers";
import { sanityFetch } from "@/sanity/lib/live";
import {
  NEWS_POST_BY_SLUG_QUERY,
  NEWS_POST_SLUGS_QUERY,
} from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  try {
    const { data } = await sanityFetch({
      query: NEWS_POST_SLUGS_QUERY,
      stega: false,
    });
    const slugs = (data ?? []) as string[];
    return slugs.filter(Boolean).map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  try {
    const { data } = await sanityFetch({
      query: NEWS_POST_BY_SLUG_QUERY,
      params: { slug },
      stega: false,
    });
    if (!data?.title) return {};
    const title = (data.seoTitle as string | undefined) ?? data.title;
    const description =
      (data.seoDescription as string | undefined) ??
      (data.excerpt as string | undefined);
    const og =
      data.ogImage ??
      (data.heroImage as Record<string, unknown> | undefined);
    return {
      title,
      description: description ?? undefined,
      openGraph: {
        title,
        description: description ?? undefined,
        type: "article",
        publishedTime: data.publishedAt as string | undefined,
        images: ogImageMetadata(og),
      },
    };
  } catch {
    return {};
  }
}

function formatDate(iso: string | null | undefined) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-NZ", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export default async function NewsPostPage(props: Props) {
  const { slug } = await props.params;

  let post: Record<string, unknown> | null = null;
  try {
    const { data } = await sanityFetch({
      query: NEWS_POST_BY_SLUG_QUERY,
      params: { slug },
      stega: false,
    });
    post = data as Record<string, unknown> | null;
  } catch {
    notFound();
  }

  if (!post?.title) notFound();

  const hero = post.heroImage;
  const heroUrl = urlForImage(hero as never)
    ?.width(1200)
    .height(600)
    .fit("crop")
    .auto("format")
    .url();
  const heroAlt = (hero as { alt?: string } | undefined)?.alt ?? "";

  return (
    <article>
      <div className="border-b border-[var(--color-border)] bg-[var(--color-cream-deep)]/40">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:max-w-4xl lg:py-14">
          <header>
            <time
              dateTime={(post.publishedAt as string) ?? undefined}
                className="section-eyebrow-sm text-[var(--color-accent)]"
            >
              {formatDate(post.publishedAt as string)}
            </time>
            <div className="mt-4 h-1 w-12 rounded-full bg-[var(--color-gold)]" />
            <h1 className="mt-6 font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight tracking-tight text-[var(--color-heading)]">
              {post.title as string}
            </h1>
            {post.excerpt ? (
              <p className="mt-5 text-lg leading-relaxed text-[var(--color-ink-muted)]">
                {post.excerpt as string}
              </p>
            ) : null}
          </header>
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-4xl">
        {heroUrl ? (
          <figure className="-mt-4 overflow-hidden rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-card)] sm:-mt-5">
            <Image
              src={heroUrl}
              alt={heroAlt}
              width={1200}
              height={600}
              className="h-auto w-full object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 720px"
            />
          </figure>
        ) : null}
        <div className="py-12 lg:py-16">
          <PortableTextBlock value={post.body} />
        </div>
      </div>
    </article>
  );
}
