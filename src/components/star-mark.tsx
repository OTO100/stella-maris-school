type Props = {
  size?: number | string;
  opacity?: number;
  className?: string;
};

const STAR_PATH =
  "M50 0 L61.3 22.7 L79 21 L77.3 38.7 L100 50 L77.3 61.3 L79 79 L61.3 77.3 L50 100 L38.7 77.3 L21 79 L22.7 61.3 L0 50 L22.7 38.7 L21 21 L38.7 22.7Z";

export function StarMark({ size = 140, opacity = 0.1, className }: Props) {
  const dimension = typeof size === "number" ? `${size}px` : size;
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      className={className}
      style={{
        width: dimension,
        height: "auto",
        fill: "#DFCB7E",
        stroke: "none",
        opacity,
      }}
    >
      <path d={STAR_PATH} />
    </svg>
  );
}
