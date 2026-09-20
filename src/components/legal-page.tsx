import type { ReactNode } from "react";

import { PageHero } from "@/components/page-hero";

export function LegalPage({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} />
      <section className="bg-[var(--color-surface)]">
        <div className="page-wrap section-pad flex max-w-[62ch] flex-col gap-5 text-[17.5px] leading-[1.78] text-[var(--color-ink)]">
          {children}
        </div>
      </section>
    </>
  );
}
