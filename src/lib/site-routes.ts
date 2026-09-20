/** Fixed App Router paths editors can link to without a CMS page document. */
export const SITE_ROUTE_OPTIONS = [
  { title: "Home", value: "/" },
  { title: "Our School", value: "/about" },
  { title: "Our learning", value: "/about/our-learning" },
  { title: "Our Community", value: "/community" },
  { title: "Staff", value: "/community/staff" },
  { title: "Enrolment information", value: "/enrolment" },
  { title: "Absences", value: "/absences" },
  { title: "Contact us", value: "/contact" },
  { title: "Hibiscus Coast Parish", value: "/parish" },
  { title: "Privacy", value: "/privacy" },
  { title: "Accessibility", value: "/accessibility" },
] as const;

export type SiteRouteValue = (typeof SITE_ROUTE_OPTIONS)[number]["value"];

export function isKnownSiteRoute(
  value: string | null | undefined,
): value is SiteRouteValue {
  if (!value) return false;
  const path = value.split("#")[0];
  return SITE_ROUTE_OPTIONS.some((o) => o.value === path);
}
