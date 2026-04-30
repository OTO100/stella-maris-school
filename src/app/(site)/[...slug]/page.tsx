import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/page-hero";
import { PortableTextBlock } from "@/components/portable-text";
import { ogImageMetadata } from "@/lib/metadata-helpers";
import { sanityFetch } from "@/sanity/lib/live";
import {
  PAGE_BY_SLUG_QUERY,
  PAGE_SLUGS_QUERY,
} from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string[] }> };

export async function generateStaticParams() {
  try {
    const { data } = await sanityFetch({
      query: PAGE_SLUGS_QUERY,
      stega: false,
    });
    const slugs = (data ?? []) as string[];
    return slugs.map((s) => ({
      slug: s.split("/").filter(Boolean),
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  const fullSlug = slug.join("/");
  try {
    const { data } = await sanityFetch({
      query: PAGE_BY_SLUG_QUERY,
      params: { slug: fullSlug },
      stega: false,
    });
    if (!data?.title) return {};
    const title = (data.seoTitle as string | undefined) ?? data.title;
    const description =
      (data.seoDescription as string | undefined) ??
      (data.excerpt as string | undefined);
    const og =
      data.ogImage ?? (data.heroImage as Record<string, unknown> | undefined);
    return {
      title,
      description: description ?? undefined,
      openGraph: {
        title,
        description: description ?? undefined,
        images: ogImageMetadata(og),
      },
    };
  } catch {
    return {};
  }
}

export default async function DynamicPage(props: Props) {
  const { slug } = await props.params;
  const fullSlug = slug.join("/");

  let page: Record<string, unknown> | null = null;
  try {
    const { data } = await sanityFetch({
      query: PAGE_BY_SLUG_QUERY,
      params: { slug: fullSlug },
      stega: false,
    });
    page = data as Record<string, unknown> | null;
  } catch {
    notFound();
  }

  if (!page?.title) notFound();

  const title = page.title as string;
  const hero = page.heroImage;
  const heroUrl = urlForImage(hero as never)
    ?.width(1600)
    .height(640)
    .fit("crop")
    .auto("format")
    .url();
  const heroAlt = (hero as { alt?: string } | undefined)?.alt ?? "";

  return (
    <article>
      <PageHero
        eyebrow="Stella Maris"
        title={title}
        subtitle={(page.excerpt as string | undefined) ?? null}
        backgroundImageSrc={heroUrl}
        backgroundImageAlt={heroAlt}
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-4xl">
        <div className="py-12 lg:py-16">
          <PortableTextBlock value={page.body} />
        </div>
      </div>
    </article>
  );
}
