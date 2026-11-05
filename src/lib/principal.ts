import { urlForImage } from "@/sanity/lib/image";

type StaffLike = {
  name?: string | null;
  role?: string | null;
  email?: string | null;
  photo?: unknown;
  photoUrl?: string | null;
};

export function findPrincipal(staff: StaffLike[] | null | undefined) {
  return staff?.find((person) => person.role?.trim().toLowerCase() === "principal") ?? null;
}

export function principalPhoto(
  staff: StaffLike[] | null | undefined,
  fallbackImage?: unknown,
  size = 320,
): { src: string; alt: string } | null {
  const principal = findPrincipal(staff);
  const source = principal?.photo ?? fallbackImage;
  if (!source) return null;
  const url = urlForImage(source as never)
    ?.width(size)
    .height(size)
    .fit("crop")
    .auto("format")
    .url();
  if (!url) return null;
  const alt =
    (source as { alt?: string | null }).alt ||
    `${principal?.name ?? "Principal"}, Principal`;
  return { src: url, alt };
}
