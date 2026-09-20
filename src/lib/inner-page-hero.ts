import { urlForImage } from "@/sanity/lib/image";

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
