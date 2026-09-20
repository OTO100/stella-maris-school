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
  const width = Math.round(height * (280 / 84));

  return (
    <Image
      src={src}
      alt="Stella Maris Catholic Primary School"
      width={width}
      height={height}
      sizes={`${height + 20}px`}
      priority={priority}
      className={`object-contain object-left ${className ?? ""}`}
    />
  );
}
