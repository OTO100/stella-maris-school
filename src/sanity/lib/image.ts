import { createImageUrlBuilder } from "@sanity/image-url";

import { dataset, projectId } from "@/sanity/lib/env";

const builder = createImageUrlBuilder({ projectId, dataset });

export function urlForImage(
  source: Parameters<ReturnType<typeof createImageUrlBuilder>["image"]>[0] | null | undefined,
) {
  if (!source) return null;
  return builder.image(source);
}
