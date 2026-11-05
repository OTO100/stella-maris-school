import { heroStoreLinks } from "@/lib/app-links";

type Settings = Record<string, unknown> | null | undefined;

/**
 * Links that live once in Site settings and can be reused by any card,
 * so the same destination (e.g. SchoolDocs) is edited in one place.
 * `cardKey` lets a parent-info card with that anchor id pick it up automatically.
 */
export const SHARED_LINK_OPTIONS = [
  { value: "policies", title: "School policies (SchoolDocs)", label: "Open SchoolDocs", cardKey: "policies" },
  { value: "ero", title: "ERO report", label: "Read the report", cardKey: "ero" },
  { value: "kindo", title: "Kindo", label: "Open Kindo" },
  { value: "heroAppStore", title: "Hero app — App Store", label: "Hero for iPhone & iPad" },
  { value: "heroPlayStore", title: "Hero app — Google Play", label: "Hero for Android" },
  { value: "newsletter", title: "Newsletter", label: "Read the newsletter" },
  { value: "calendar", title: "School calendar", label: "Open the calendar" },
  { value: "termDates", title: "Term dates", label: "Term dates" },
  { value: "parish", title: "Hibiscus Coast Parish website", label: "Visit the parish website" },
  { value: "diocese", title: "Catholic Diocese of Auckland website", label: "Visit the diocese website" },
] as const;

export type SharedLinkKey = (typeof SHARED_LINK_OPTIONS)[number]["value"];

export function sharedLinkUrl(key: string | null | undefined, settings: Settings) {
  if (!key) return undefined;
  const get = (field: string) => (settings?.[field] as string | undefined) || undefined;
  const stores = heroStoreLinks(settings);
  const map: Record<SharedLinkKey, string | undefined> = {
    policies: get("policiesUrl"),
    ero: get("eroUrl"),
    kindo: get("kindoUrl"),
    heroAppStore: stores.appStore,
    heroPlayStore: stores.playStore,
    newsletter: get("newsletterUrl"),
    calendar: get("calendarUrl"),
    termDates: get("termDatesUrl"),
    parish: get("parishUrl"),
    diocese: get("dioceseUrl"),
  };
  return map[key as SharedLinkKey];
}

export function sharedLinkForCard(cardKey: string | null | undefined) {
  return SHARED_LINK_OPTIONS.find((o) => "cardKey" in o && o.cardKey === cardKey);
}
