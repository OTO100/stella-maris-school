"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import type { HomeCarouselSlide } from "@/lib/default-copy";
import { urlForImage } from "@/sanity/lib/image";

type Props = {
  slides: readonly HomeCarouselSlide[];
};

const gradientForIndex = (i: number) => {
  const gradients = [
    "from-[var(--color-brand)]/20 via-[var(--color-surface)] to-[var(--color-gold)]/15",
    "from-[var(--color-accent)]/25 via-[var(--color-cream)] to-[var(--color-brand)]/10",
    "from-[var(--color-cream-deep)] via-[var(--color-surface)] to-[var(--color-gold)]/20",
    "from-[var(--color-brand-soft)]/15 via-[var(--color-gold)]/10 to-[var(--color-surface)]",
  ];
  return gradients[i % gradients.length];
};

export function HomeHighlightCarousel({ slides }: Props) {
  const autoplayPlugin = useMemo(
    () =>
      Autoplay({
        delay: 5500,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
      }),
    [],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", duration: 22 },
    [autoplayPlugin],
  );

  const [selected, setSelected] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (i: number) => emblaApi?.scrollTo(i),
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    try {
      const plugin = (
        emblaApi.plugins() as Record<string, { stop?: () => void }> | undefined
      )?.autoplay;
      if (reduce && plugin?.stop) plugin.stop();
    } catch {
      /* optional */
    }
  }, [emblaApi]);

  if (!slides.length) return null;

  return (
    <section className="border-y border-[var(--color-border)] bg-[var(--color-surface)] py-14 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-eyebrow text-[var(--color-accent)]">
              Highlights
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-[var(--color-heading)] sm:text-3xl">
              Life at Stella Maris
            </h2>
            <p className="mt-2 max-w-xl text-[var(--color-ink-muted)]">
              Swipe or use the arrows to explore stories, celebrations, and
              moments from across our school.
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              type="button"
              onClick={scrollPrev}
              className="rounded-full border border-[var(--color-border)] bg-[var(--color-cream)] p-3 text-[var(--color-heading)] transition hover:bg-[var(--color-surface)] hover:border-[var(--color-gold)]/60"
              aria-label="Previous slide"
            >
              <Chevron direction="prev" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              className="rounded-full border border-[var(--color-border)] bg-[var(--color-cream)] p-3 text-[var(--color-heading)] transition hover:bg-[var(--color-surface)] hover:border-[var(--color-gold)]/60"
              aria-label="Next slide"
            >
              <Chevron direction="next" />
            </button>
          </div>
        </div>

        <div className="mt-10 overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 sm:gap-5">
            {slides.map((slide, index) => {
              const href = slide.href;
              const imageSrc = slide.image
                ? urlForImage(slide.image as never)
                    ?.width(720)
                    .height(420)
                    .fit("crop")
                    .auto("format")
                    .url()
                : null;
              const imageAlt = slide.image?.alt ?? "";
              const card = (
                <article className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-cream)]/50 shadow-[var(--shadow-card)] flex h-full min-h-[280px] flex-col sm:min-h-[300px]">
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt={imageAlt}
                      width={720}
                      height={420}
                      className="h-36 shrink-0 object-cover sm:h-40"
                      sizes="(max-width: 640px) 20rem, 22rem"
                    />
                  ) : (
                    <div
                      className={`h-36 shrink-0 bg-gradient-to-br ${gradientForIndex(index)} sm:h-40`}
                      aria-hidden
                    />
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl font-semibold leading-snug text-[var(--color-heading)]">
                      {slide.title}
                    </h3>
                    {slide.description ? (
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-ink-muted)]">
                        {slide.description}
                      </p>
                    ) : null}
                    {href ? (
                      <span className="mt-4 inline-flex text-sm font-semibold text-[var(--color-accent)]">
                        Learn more
                        <span aria-hidden className="ml-1">
                          →
                        </span>
                      </span>
                    ) : null}
                  </div>
                </article>
              );

              return (
                <div
                  key={slide.id}
                  className="min-w-0 shrink-0 grow-0 basis-[min(100%,20rem)] sm:basis-[min(100%,22rem)]"
                >
                  {href ? (
                    <Link href={href} className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2 rounded-2xl">
                      {card}
                    </Link>
                  ) : (
                    card
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div
          className="mt-6 flex flex-wrap justify-center gap-2"
          aria-label="Carousel pagination"
        >
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              aria-current={selected === i ? "true" : undefined}
              aria-label={`Go to slide ${i + 1}: ${slide.title}`}
              onClick={() => scrollTo(i)}
              className={`h-2.5 rounded-full transition ${
                selected === i
                  ? "bg-[var(--color-brand)] w-7"
                  : "w-2.5 bg-[var(--color-border)] hover:bg-[var(--color-accent)]/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Chevron({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      {direction === "prev" ? (
        <path d="M15 18l-6-6 6-6" />
      ) : (
        <path d="M9 18l6-6-6-6" />
      )}
    </svg>
  );
}
