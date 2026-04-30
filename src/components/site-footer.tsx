import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";
import { defaultSchoolCopy } from "@/lib/default-copy";

import type { NavLink } from "@/lib/nav-href";

export function SiteFooter({
  schoolName,
  footerLinks,
  tagline,
  contact,
  policiesUrl,
  facebookUrl,
}: {
  schoolName: string;
  footerLinks: NavLink[];
  tagline: string | null;
  contact: {
    address: string | null;
    email: string | null;
    phone: string | null;
    hours: string | null;
  };
  policiesUrl: string | null;
  facebookUrl?: string | null;
}) {
  const showStudio =
    process.env.NEXT_PUBLIC_SHOW_STUDIO_FOOTER !== "false";

  return (
    <footer className="mt-auto border-t-4 border-[var(--color-gold-light)] bg-[var(--color-brand)] text-[var(--color-cream)]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <p className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-[var(--color-cream)]/85">
          {defaultSchoolCopy.whenuaAcknowledgement}
        </p>
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="flex items-start gap-3">
              <BrandMark className="h-11 w-auto max-w-[14rem] shrink-0 opacity-90" />
              <div>
                <p className="font-display text-lg font-semibold leading-snug">
                  {schoolName}
                </p>
                {tagline ? (
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-cream)]/80">
                    {tagline}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
          <div className="lg:col-span-3">
            <p className="section-eyebrow text-[var(--color-gold-light)]">
              Contact
            </p>
            <ul className="mt-4 space-y-2 text-sm text-[var(--color-cream)]/90">
              {contact.address ? (
                <li className="whitespace-pre-line leading-relaxed">
                  {contact.address}
                </li>
              ) : null}
              {contact.phone ? (
                <li>
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="rounded underline decoration-[var(--color-gold)]/50 underline-offset-2 hover:decoration-[var(--color-gold)]"
                  >
                    {contact.phone}
                  </a>
                </li>
              ) : null}
              {contact.email ? (
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="rounded underline decoration-[var(--color-gold)]/50 underline-offset-2 hover:decoration-[var(--color-gold)]"
                  >
                    {contact.email}
                  </a>
                </li>
              ) : null}
              {contact.hours ? (
                <li className="text-[var(--color-cream)]/80">{contact.hours}</li>
              ) : null}
            </ul>
          </div>
          <div
            className={
              facebookUrl ? "lg:col-span-3" : "lg:col-span-5"
            }
          >
            <p className="section-eyebrow text-[var(--color-gold-light)]">
              Quick links
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {footerLinks.map((item) => (
                <li key={`${item.href}-footer`}>
                {item.useAnchor ? (
                  <a
                    href={item.href}
                    {...(item.openInNewTab
                      ? { target: "_blank", rel: "noreferrer noopener" }
                      : {})}
                      className="rounded text-[var(--color-cream)]/90 underline decoration-transparent underline-offset-2 hover:decoration-[var(--color-gold)]"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="rounded text-[var(--color-cream)]/90 underline decoration-transparent underline-offset-2 hover:decoration-[var(--color-gold)]"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
              {policiesUrl ? (
                <li>
                  <a
                    href={policiesUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="rounded text-[var(--color-cream)]/90 underline decoration-transparent underline-offset-2 hover:decoration-[var(--color-gold)]"
                  >
                    Policies
                  </a>
                </li>
              ) : null}
              <li>
                <Link
                  href="/news"
                  className="rounded text-[var(--color-cream)]/90 underline decoration-transparent underline-offset-2 hover:decoration-[var(--color-gold)]"
                >
                  News
                </Link>
              </li>
            </ul>
          </div>
          {facebookUrl ? (
            <div className="lg:col-span-2">
              <p className="section-eyebrow text-[var(--color-gold-light)]">
                Social
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <a
                    href={facebookUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="rounded text-[var(--color-cream)]/90 underline decoration-transparent underline-offset-2 hover:decoration-[var(--color-gold)]"
                  >
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          ) : null}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-[var(--color-cream)]/55 sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} {schoolName}</p>
          {showStudio ? (
            <Link
              href="/studio"
              className="rounded text-[var(--color-cream)]/45 hover:text-[var(--color-cream)]/75"
            >
              Content editors
            </Link>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
