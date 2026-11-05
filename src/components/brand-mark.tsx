import Image from "next/image";

export function BrandMark({
  className,
  priority,
  variant = "header",
}: {
  className?: string;
  priority?: boolean;
  variant?: "header" | "footer";
}) {
  const src =
    variant === "footer" ? "/logo-reversed.png" : "/logo-transparent.png";
  const height = variant === "footer" ? 56 : 62;
  // Source PNGs are 590×182.
  const width = Math.round(height * (590 / 182));

  return (
    <Image
      src={src}
      alt="Stella Maris Catholic Primary School"
      width={width}
      height={height}
      // Serve the original 590px PNG (sharp at 2×) instead of a re-encoded,
      // downscaled copy.
      unoptimized
      priority={priority}
      className={`object-contain object-left ${className ?? ""}`}
    />
  );
}
