import Image from "next/image";

/** Official Stella Maris Catholic Primary School wordmark (see `public/stella-maris-logo.png`). */
export function BrandMark({
  className,
  priority,
}: {
  className?: string;
  /** Set true in the site header for faster LCP. */
  priority?: boolean;
}) {
  return (
    <Image
      src="/stella-maris-logo.png"
      alt=""
      width={280}
      height={84}
      sizes="(max-width: 640px) 140px, 180px"
      priority={priority}
      className={`object-contain object-left ${className ?? ""}`}
    />
  );
}
