import type { Metadata } from "next";

import { urlForImage } from "@/sanity/lib/image";

export function ogImageMetadata(
  image: unknown,
  alt?: string | null,
): NonNullable<Metadata["openGraph"]>["images"] {
  const b = urlForImage(image as never);
  if (!b) return [];
  const url = b.width(1200).height(630).fit("crop").auto("format").url();
  return [{ url, width: 1200, height: 630, alt: alt ?? undefined }];
}
