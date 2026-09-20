import { createImageUrlBuilder } from "@sanity/image-url";

import { dataset, projectId } from "@/sanity/lib/env";

const builder = createImageUrlBuilder({ projectId, dataset });

export function urlForImage(
  source: Parameters<ReturnType<typeof createImageUrlBuilder>["image"]>[0] | null | undefined,
) {
  if (!source) return null;
  const asset = (source as { asset?: { _ref?: string; url?: string } | null })
    .asset;
  if (typeof source === "object" && source && !asset?._ref && !asset?.url) {
    return null;
  }
  try {
    return builder.image(source);
  } catch {
    return null;
  }
}
