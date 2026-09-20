import { readFileSync } from "node:fs";
import { join } from "node:path";

import type { CmsPageData } from "@/components/cms-page-view";
import type { LinkItemResolved } from "@/lib/nav-href";

type NdjsonPage = {
  _id: string;
  _type: string;
  title: string;
  slug?: { current?: string };
  excerpt?: string | null;
  layout?: string | null;
  lead?: string | null;
  hubCardsHeading?: string | null;
  hubCards?: Array<{
    title?: string | null;
    body?: string | null;
    link?: LinkItemResolved | null;
  }> | null;
  sections?: Array<{
    heading?: string | null;
    body?: unknown;
  }> | null;
  resources?: CmsPageData["resources"];
};

let cachedBySlug: Map<string, NdjsonPage> | null = null;

function loadPagesFromNdjson(): Map<string, NdjsonPage> {
  if (cachedBySlug) return cachedBySlug;
  const path = join(process.cwd(), "sanity/import/sitemap.ndjson");
  try {
    const raw = readFileSync(path, "utf8");
    const map = new Map<string, NdjsonPage>();
    for (const line of raw.split("\n")) {
      if (!line.trim()) continue;
      const doc = JSON.parse(line) as NdjsonPage;
      if (doc._type !== "page" || !doc.slug?.current) continue;
      map.set(doc.slug.current, doc);
    }
    cachedBySlug = map;
    return map;
  } catch {
    cachedBySlug = new Map();
    return cachedBySlug;
  }
}

export function innerPageSlugsFromFallback(): string[] {
  return [...loadPagesFromNdjson().keys()];
}

export function innerPageFromFallback(slug: string): CmsPageData | null {
  const doc = loadPagesFromNdjson().get(slug);
  if (!doc?.title) return null;
  return {
    title: doc.title,
    excerpt: doc.excerpt,
    lead: doc.lead,
    layout: doc.layout,
    hubCardsHeading: doc.hubCardsHeading,
    hubCards: doc.hubCards,
    sections: doc.sections,
    resources: doc.resources,
  };
}
