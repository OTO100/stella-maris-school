export function personInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

type Resource = {
  title?: string | null;
  placement?: string[] | null;
  fileUrl?: string | null;
};

export function resourceFileUrl(
  resources: Resource[] | null | undefined,
  placement: string,
  fallback: string,
  titleIncludes?: string,
) {
  const match = resources?.find((resource) => {
    if (!resource.fileUrl) return false;
    if (!resource.placement?.includes(placement)) return false;
    if (!titleIncludes) return true;
    return resource.title?.toLowerCase().includes(titleIncludes.toLowerCase());
  });
  return match?.fileUrl || fallback;
}
