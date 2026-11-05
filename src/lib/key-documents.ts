import { PUBLIC_DOCS } from "@/lib/sitemap-decisions";

type Settings = Record<string, unknown> | null | undefined;

const DEFAULT_TITLES = {
  handbook: "Parent Information Handbook",
  financials: "Annual Financial Statements",
  enrolmentScheme: "Enrolment scheme",
} as const;

export type KeyDocument = keyof typeof DEFAULT_TITLES;

/**
 * The handbook, financial statements and enrolment scheme are each one
 * document in Sanity, picked under Site settings → Key documents. Every page
 * links to it from here, so a new year's file is uploaded once.
 * The /public/docs copies are only used if Sanity has nothing set.
 */
export function keyDocument(settings: Settings, key: KeyDocument) {
  const doc = settings?.[key] as { title?: string | null; url?: string | null } | null | undefined;
  return {
    url: doc?.url || PUBLIC_DOCS[key],
    title: doc?.title || DEFAULT_TITLES[key],
  };
}
