import { urlForImage } from "@/sanity/lib/image";

export const INNER_PAGE_OPTIONS = [
  { title: "About", value: "about" },
  { title: "Learning", value: "learning" },
  { title: "Community", value: "community" },
  { title: "Contact", value: "contact" },
  { title: "Enrolment", value: "enrolment" },
  { title: "Resources & downloads", value: "resources" },
  { title: "News & events (index)", value: "news" },
] as const;

export type InnerPageKey = (typeof INNER_PAGE_OPTIONS)[number]["value"];

export type InnerPageHeroRow = {
  pageKey?: string | null;
  image?: unknown;
};

export function innerPageHeroBackground(
  rows: InnerPageHeroRow[] | null | undefined,
  pageKey: InnerPageKey,
): { src: string; alt: string } | null {
  const row = rows?.find((r) => r.pageKey === pageKey);
  if (!row?.image) return null;
  const alt = (row.image as { alt?: string | null }).alt ?? "";
  const url = urlForImage(row.image as never)
    ?.width(1920)
    .height(720)
    .fit("crop")
    .auto("format")
    .url();
  if (!url) return null;
  return { src: url, alt };
}

export function sanityHeroImage(
  image: unknown,
  width = 1920,
  height = 1080,
): { src: string; alt: string } | null {
  if (!image) return null;
  const alt = (image as { alt?: string | null }).alt ?? "";
  const url = urlForImage(image as never)
    ?.width(width)
    .height(height)
    .fit("crop")
    .auto("format")
    .url();
  if (!url) return null;
  return { src: url, alt };
}
