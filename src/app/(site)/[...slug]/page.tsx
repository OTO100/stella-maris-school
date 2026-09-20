import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CmsPageView } from "@/components/cms-page-view";
import {
  innerPageFromFallback,
  innerPageSlugsFromFallback,
} from "@/lib/inner-page-fallback";
import { ogImageMetadata } from "@/lib/metadata-helpers";
import { pageHeroNavLabels } from "@/lib/page-hero-nav";
import { sanityFetch } from "@/sanity/lib/live";
import {
  PAGE_BY_SLUG_QUERY,
  PAGE_SLUGS_QUERY,
} from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string[] }> };

export async function generateStaticParams() {
  const slugSet = new Set<string>();
  try {
    const { data } = await sanityFetch({
      query: PAGE_SLUGS_QUERY,
      stega: false,
    });
    for (const slug of (data ?? []) as string[]) {
      slugSet.add(slug);
    }
  } catch {
    /* optional */
  }
  for (const slug of innerPageSlugsFromFallback()) {
    slugSet.add(slug);
  }
  return [...slugSet].map((s) => ({
    slug: s.split("/").filter(Boolean),
  }));
}

async function loadPage(fullSlug: string) {
  try {
    const { data } = await sanityFetch({
      query: PAGE_BY_SLUG_QUERY,
      params: { slug: fullSlug },
      stega: false,
    });
    if (data?.title) return data as Record<string, unknown>;
  } catch {
    /* fall through */
  }
  const fallback = innerPageFromFallback(fullSlug);
  if (!fallback) return null;
  return {
    title: fallback.title,
    excerpt: fallback.excerpt,
    lead: fallback.lead,
    layout: fallback.layout,
    hubCardsHeading: fallback.hubCardsHeading,
    hubCards: fallback.hubCards,
    sections: fallback.sections,
    resources: fallback.resources,
    heroImage: null,
  } satisfies Record<string, unknown>;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  const fullSlug = slug.join("/");
  const page = await loadPage(fullSlug);
  if (!page?.title) return {};
  const title = (page.seoTitle as string | undefined) ?? (page.title as string);
  const description =
    (page.seoDescription as string | undefined) ??
    (page.excerpt as string | undefined);
  const og =
    page.ogImage ?? (page.heroImage as Record<string, unknown> | undefined);
  return {
    title,
    description: description ?? undefined,
    openGraph: {
      title,
      description: description ?? undefined,
      images: ogImageMetadata(og),
    },
  };
}

export default async function DynamicPage(props: Props) {
  const { slug } = await props.params;
  const fullSlug = slug.join("/");
  const page = await loadPage(fullSlug);
  if (!page?.title) notFound();

  const hero = page.heroImage;
  const heroUrl = urlForImage(hero as never)
    ?.width(1600)
    .height(640)
    .fit("crop")
    .auto("format")
    .url();
  const heroAlt = (hero as { alt?: string } | undefined)?.alt ?? "";
  const pageTitle = page.title as string;
  const heroLabels = pageHeroNavLabels(`/${fullSlug}`, {
    fallbackTitle: pageTitle,
  });

  return (
    <CmsPageView
      page={{
        title: pageTitle,
        heroEyebrow: heroLabels.eyebrow,
        heroTitle: heroLabels.title,
        excerpt: page.excerpt as string | undefined,
        lead: page.lead as string | undefined,
        layout: page.layout as string | undefined,
        heroImageSrc: heroUrl,
        heroImageAlt: heroAlt,
        hubCardsHeading: page.hubCardsHeading as string | undefined,
        hubCards: page.hubCards as never,
        sections: page.sections as never,
        resources: page.resources as never,
      }}
    />
  );
}
