/** Fixed App Router paths editors can link to without a CMS page document. */
export const SITE_ROUTE_OPTIONS = [
  { title: "Home", value: "/" },
  { title: "About", value: "/about" },
  { title: "Learning", value: "/learning" },
  { title: "Community", value: "/community" },
  { title: "Enrolment", value: "/enrolment" },
  { title: "News", value: "/news" },
  { title: "Resources & downloads", value: "/resources" },
  { title: "Contact", value: "/contact" },
] as const;

export type SiteRouteValue = (typeof SITE_ROUTE_OPTIONS)[number]["value"];

export function isKnownSiteRoute(value: string | null | undefined): value is SiteRouteValue {
  if (!value) return false;
  return SITE_ROUTE_OPTIONS.some((o) => o.value === value);
}
