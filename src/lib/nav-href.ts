import { isKnownSiteRoute } from "@/lib/site-routes";

/**
 * Resolved link item shape from Sanity (supports legacy linkType + page).
 */
export type LinkItemResolved = {
  label: string | null;
  /** New model */
  linkDestination?: string | null;
  siteRoute?: string | null;
  /** Legacy internal */
  linkType?: string | null;
  pageSlug?: string | null;
  newsSlug?: string | null;
  fileUrl?: string | null;
  href?: string | null;
  openInNewTab?: boolean | null;
};

export type ResolvedLink = {
  href: string;
  label: string;
  /** Use <a> (external URL, CDN file, mailto, etc.) vs Next.js <Link> for in-app routes */
  useAnchor: boolean;
  openInNewTab: boolean;
};

function normalizeHref(raw: string | null | undefined): string | null {
  if (!raw?.trim()) return null;
  const t = raw.trim();
  return t;
}

function isProbablyExternalAbsolute(href: string): boolean {
  return /^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith("//");
}

/** Internal routes we render with Next <Link> — path must start with / and not be scheme-relative */
function isSameSiteAppPath(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}

/**
 * Canonical resolution for nav, CTAs, and anywhere linkItem is used.
 */
export function resolveLinkItem(
  item: LinkItemResolved | null | undefined,
): ResolvedLink | null {
  if (!item?.label?.trim()) return null;

  const label = item.label.trim();
  const tab = Boolean(item.openInNewTab);

  const dest = item.linkDestination;
  const legacyExternal = item.linkType === "external";
  const legacyInternal = item.linkType === "internal";

  // --- New linkDestination model ---
  if (dest === "siteRoute") {
    const path = normalizeHref(item.siteRoute ?? undefined);
    if (!path || !isKnownSiteRoute(path)) return null;
    return {
      href: path,
      label,
      useAnchor: false,
      openInNewTab: tab,
    };
  }
  if (dest === "cmsPage") {
    const slug = item.pageSlug?.trim();
    if (!slug) return null;
    return {
      href: `/${slug}`,
      label,
      useAnchor: false,
      openInNewTab: tab,
    };
  }
  if (dest === "newsPost") {
    const slug = item.newsSlug?.trim();
    if (!slug) return null;
    return {
      href: `/news/${slug}`,
      label,
      useAnchor: false,
      openInNewTab: tab,
    };
  }
  if (dest === "file") {
    const url = normalizeHref(item.fileUrl ?? undefined);
    if (!url) return null;
    return {
      href: url,
      label,
      useAnchor: true,
      openInNewTab: tab,
    };
  }
  if (dest === "external") {
    const url = normalizeHref(item.href ?? undefined);
    if (!url) return null;
    const useAnchor = isProbablyExternalAbsolute(url) || !isSameSiteAppPath(url);
    return {
      href: url,
      label,
      useAnchor,
      openInNewTab: tab,
    };
  }

  // --- Legacy: linkType + page / href ---
  if (legacyExternal) {
    const url = normalizeHref(item.href ?? undefined);
    if (!url) return null;
    const useAnchor = isProbablyExternalAbsolute(url) || !isSameSiteAppPath(url);
    return {
      href: url,
      label,
      useAnchor,
      openInNewTab: tab,
    };
  }
  if (legacyInternal && item.pageSlug) {
    const slug = item.pageSlug.trim();
    return {
      href: `/${slug}`,
      label,
      useAnchor: false,
      openInNewTab: tab,
    };
  }

  return null;
}

/** @deprecated Prefer resolveLinkItem */
export function hrefFromLinkItem(item: LinkItemResolved | null | undefined) {
  return resolveLinkItem(item)?.href ?? null;
}

export type NavLink = ResolvedLink;

/** Raw primary nav row from GROQ (primaryNavigation array). */
export type NavPrimaryItemRaw = {
  _key?: string;
  variant?: string | null;
  link?: LinkItemResolved | null;
  groupLabel?: string | null;
  landingLink?: LinkItemResolved | null;
  children?: LinkItemResolved[] | null;
};

export type ResolvedNavPrimaryItem =
  | { kind: "simple"; key: string; link: ResolvedLink }
  | {
      kind: "group";
      key: string;
      groupLabel: string;
      landing?: ResolvedLink;
      children: ResolvedLink[];
    };

export function resolvePrimaryNavigation(
  nav:
    | {
        primaryNavigation?: NavPrimaryItemRaw[] | null;
      }
    | null
    | undefined,
): ResolvedNavPrimaryItem[] {
  const rows = nav?.primaryNavigation;
  if (!rows?.length) return [];

  const out: ResolvedNavPrimaryItem[] = [];
  rows.forEach((item, i) => {
    const key = item._key ?? `pn-${i}`;
    if (item.variant === "simple") {
      const link = resolveLinkItem(item.link ?? undefined);
      if (link) out.push({ kind: "simple", key, link });
      return;
    }
    if (item.variant === "group") {
      const groupLabel = item.groupLabel?.trim();
      if (!groupLabel) return;
      const landing = item.landingLink
        ? resolveLinkItem(item.landingLink) ?? undefined
        : undefined;
      const children = (item.children ?? [])
        .map((c) => resolveLinkItem(c))
        .filter((x): x is ResolvedLink => Boolean(x));
      if (!children.length) return;
      out.push(
        landing
          ? { kind: "group", key, groupLabel, landing, children }
          : { kind: "group", key, groupLabel, children },
      );
    }
  });
  return out;
}

export function defaultPrimaryNavigation(): ResolvedNavPrimaryItem[] {
  const mk = (
    key: string,
    href: string,
    label: string,
  ): ResolvedNavPrimaryItem => ({
    kind: "simple",
    key,
    link: {
      href,
      label,
      useAnchor: false,
      openInNewTab: false,
    },
  });
  return [
    mk("fb-home", "/", "Home"),
    mk("fb-about", "/about", "About"),
    mk("fb-learning", "/learning", "Learning"),
    mk("fb-community", "/community", "Community"),
    mk("fb-enrolment", "/enrolment", "Enrolment"),
    mk("fb-contact", "/contact", "Contact"),
  ];
}

export function resolveNavLinks(
  items: LinkItemResolved[] | null | undefined,
): NavLink[] {
  if (!items?.length) return [];
  const out: NavLink[] = [];
  for (const item of items) {
    const resolved = resolveLinkItem(item);
    if (resolved) out.push(resolved);
  }
  return out;
}
