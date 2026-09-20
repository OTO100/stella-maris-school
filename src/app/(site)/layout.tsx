import { SiteAlert } from "@/components/site-alert";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { isSiteAlertActive, siteAlertDismissKey } from "@/lib/site-alert";
import { PUBLIC_DOCS } from "@/lib/sitemap-decisions";
import {
  defaultPrimaryNavigation,
  resolvePrimaryNavigation,
  type NavPrimaryItemRaw,
} from "@/lib/nav-href";
import { sanityFetch } from "@/sanity/lib/live";
import { NAVIGATION_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";

export const revalidate = 60;

const fallbackSchoolName = "Stella Maris Catholic Primary School";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let navigation: {
    primaryNavigation?: NavPrimaryItemRaw[] | null;
    footerTagline?: string | null;
  } | null = null;

  let settings: Record<string, unknown> | null = null;

  try {
    const [navResult, settingsResult] = await Promise.all([
      sanityFetch({ query: NAVIGATION_QUERY, stega: false }),
      sanityFetch({ query: SITE_SETTINGS_QUERY, stega: false }),
    ]);
    navigation = navResult.data;
    settings = settingsResult.data as Record<string, unknown> | null;
  } catch {
    /* CMS unavailable */
  }

  const schoolName =
    (settings?.schoolName as string | undefined) ?? fallbackSchoolName;

  let primaryNav = resolvePrimaryNavigation(navigation);
  const cmsNavHasGroups = navigation?.primaryNavigation?.some(
    (item) => item.variant === "group",
  );
  const resolvedNavHasGroups = primaryNav.some((item) => item.kind === "group");
  if (!primaryNav.length || (cmsNavHasGroups && !resolvedNavHasGroups)) {
    primaryNav = defaultPrimaryNavigation();
  }

  const alertFields = settings as import("@/lib/site-alert").SiteSettingsAlertFields | null;
  const showAlert = alertFields ? isSiteAlertActive(alertFields) : false;

  return (
    <>
      {showAlert && settings ? (
        <SiteAlert
          severity={
            (settings.alertSeverity as "info" | "warning" | "critical") ??
            "info"
          }
          title={(settings.alertTitle as string | null) ?? null}
          message={(settings.alertMessage as string | null) ?? null}
          linkLabel={(settings.alertLinkLabel as string | null) ?? null}
          linkUrl={(settings.alertLinkUrl as string | null) ?? null}
          dismissKey={siteAlertDismissKey(alertFields!)}
        />
      ) : null}
      <SiteHeader
        schoolName={schoolName}
        primaryNav={primaryNav}
        links={{
          phone: (settings?.contactPhone as string | null) ?? null,
          email: (settings?.contactEmail as string | null) ?? null,
          heroAppUrl: (settings?.heroAppUrl as string | null) ?? null,
          newsletterUrl: (settings?.newsletterUrl as string | null) ?? null,
          termDatesUrl: (settings?.termDatesUrl as string | null) ?? null,
        }}
      />
      <div className="flex flex-1 flex-col">{children}</div>
      <SiteFooter
        schoolName={schoolName}
        tagline={(navigation?.footerTagline as string | null) ?? null}
        contact={{
          address: (settings?.contactAddress as string | null) ?? null,
          email: (settings?.contactEmail as string | null) ?? null,
          phone: (settings?.contactPhone as string | null) ?? null,
          hours: (settings?.officeHours as string | null) ?? null,
        }}
        familyLinks={{
          heroAppUrl: (settings?.heroAppUrl as string | null) ?? null,
          kindoUrl: (settings?.kindoUrl as string | null) ?? null,
          newsletterUrl: (settings?.newsletterUrl as string | null) ?? null,
          policiesUrl: (settings?.policiesUrl as string | null) ?? null,
          handbookUrl: PUBLIC_DOCS.handbook,
        }}
      />
    </>
  );
}
