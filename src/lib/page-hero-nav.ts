import {
  defaultPrimaryNavigation,
  type ResolvedNavPrimaryItem,
} from "@/lib/nav-href";

export type PageHeroNavLabels = {
  eyebrow?: string;
  title: string;
};

function normalizePath(path: string): string {
  const base = path.split(/[?#]/)[0] ?? path;
  if (base === "/" || !base) return "/";
  return base.replace(/\/$/, "") || "/";
}

/** Drop a leading group name from submenu labels, e.g. "Our School overview" → "Overview". */
function submenuTitle(groupLabel: string, linkLabel: string): string {
  const trimmed = linkLabel.trim();
  if (!trimmed) return groupLabel;
  if (trimmed.toLowerCase() === groupLabel.toLowerCase()) return trimmed;
  if (trimmed.toLowerCase().startsWith(groupLabel.toLowerCase())) {
    const rest = trimmed.slice(groupLabel.length).trim();
    if (rest) return rest.charAt(0).toUpperCase() + rest.slice(1);
  }
  return trimmed;
}

function labelsForGroupLink(
  groupLabel: string,
  link: { href: string; label: string },
): PageHeroNavLabels {
  return {
    eyebrow: groupLabel,
    title: submenuTitle(groupLabel, link.label),
  };
}

export function pageHeroNavLabels(
  path: string,
  options?: {
    nav?: ResolvedNavPrimaryItem[];
    fallbackTitle?: string;
  },
): PageHeroNavLabels {
  const href = normalizePath(path);
  const nav = options?.nav ?? defaultPrimaryNavigation();
  const fallbackTitle = options?.fallbackTitle?.trim();

  for (const item of nav) {
    if (item.kind === "group") {
      if (item.landing && normalizePath(item.landing.href) === href) {
        return labelsForGroupLink(item.groupLabel, item.landing);
      }
      for (const child of item.children) {
        if (normalizePath(child.href) === href) {
          return labelsForGroupLink(item.groupLabel, child);
        }
      }
    }

    if (item.kind === "simple" && normalizePath(item.link.href) === href) {
      return { title: fallbackTitle ?? item.link.label };
    }
  }

  if (href.startsWith("/our-school/")) {
    return {
      eyebrow: "Our School",
      title: fallbackTitle ?? "Page",
    };
  }
  if (href.startsWith("/our-community/")) {
    return {
      eyebrow: "Our Community",
      title: fallbackTitle ?? "Page",
    };
  }

  return { title: fallbackTitle ?? "Page" };
}
