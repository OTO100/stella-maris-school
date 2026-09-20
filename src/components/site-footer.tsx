import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";
import { PUBLIC_DOCS } from "@/lib/sitemap-decisions";

export type SiteFooterLinks = {
  heroAppUrl?: string | null;
  kindoUrl?: string | null;
  newsletterUrl?: string | null;
  policiesUrl?: string | null;
  handbookUrl?: string | null;
};

export function SiteFooter({
  schoolName,
  tagline,
  contact,
  familyLinks,
}: {
  schoolName: string;
  tagline?: string | null;
  contact: {
    address: string | null;
    email: string | null;
    phone: string | null;
    hours: string | null;
  };
  familyLinks?: SiteFooterLinks;
}) {
  const address = contact.address?.trim() || "50 Silverdale Street\nSilverdale 0944";
  const phone = contact.phone?.trim() || "09 427 9189";
  const email = contact.email?.trim() || "achieve@stellamaris.school.nz";
  const handbook = familyLinks?.handbookUrl || PUBLIC_DOCS.handbook;
  const linkClass =
    "text-[rgba(250,248,245,.92)] transition-colors hover:text-[#FAF8F5]";
  const mutedLink =
    "text-[rgba(250,248,245,.72)] transition-colors hover:text-[#FAF8F5]";

  const pages = [
    { href: "/about", label: "Our School" },
    { href: "/community", label: "Our Community" },
    { href: "/enrolment", label: "Enrolment information" },
    { href: "/absences", label: "Absences" },
    { href: "/contact", label: "Contact us" },
    { href: "/parish", label: "Hibiscus Coast Parish" },
  ];

  const family = [
    { href: handbook, label: "Parent handbook", external: true },
    familyLinks?.heroAppUrl
      ? { href: familyLinks.heroAppUrl, label: "Hero app", external: true }
      : null,
    familyLinks?.kindoUrl
      ? { href: familyLinks.kindoUrl, label: "Kindo payments", external: true }
      : null,
    familyLinks?.newsletterUrl
      ? { href: familyLinks.newsletterUrl, label: "Newsletters", external: true }
      : null,
    familyLinks?.policiesUrl
      ? { href: familyLinks.policiesUrl, label: "School policies", external: true }
      : null,
  ].filter(Boolean) as { href: string; label: string; external?: boolean }[];

  return (
    <footer className="mt-auto border-t-4 border-[var(--color-gold-muted)] bg-[var(--color-brand)] text-[var(--color-cream)]">
      <div className="page-wrap pt-14 pb-10">
        <p className="mx-auto max-w-[70ch] text-center text-[14px] leading-[1.7] text-[rgba(250,248,245,.86)]">
          {tagline?.trim() ||
            "Stella Maris, Star of the Sea — we ask Our Lady to guide and watch over our school, this land surrounded by the sea."}
        </p>
        <div className="mt-[52px] grid grid-cols-1 gap-10 min-[561px]:grid-cols-2 min-[861px]:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <BrandMark variant="footer" className="h-14 w-auto" />
            <p className="mt-[18px] max-w-[34ch] text-[14px] leading-[1.7] text-[rgba(250,248,245,.86)]">
              A Catholic primary school in Silverdale — state integrated,
              co-educational, Years 1–6.
            </p>
          </div>
          <div>
            <p className="text-[11.5px] font-semibold tracking-[0.16em] text-[var(--color-gold-light)] uppercase">
              Contact
            </p>
            <ul className="mt-4 flex flex-col gap-2.5 text-[14px] text-[rgba(250,248,245,.92)]">
              <li className="whitespace-pre-line">{address}</li>
              <li>
                <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className={linkClass}>
                  {phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${email}`} className={linkClass}>
                  {email}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-[11.5px] font-semibold tracking-[0.16em] text-[var(--color-gold-light)] uppercase">
              Pages
            </p>
            <ul className="mt-4 flex flex-col gap-2.5 text-[14px]">
              {pages.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11.5px] font-semibold tracking-[0.16em] text-[var(--color-gold-light)] uppercase">
              For families
            </p>
            <ul className="mt-4 flex flex-col gap-2.5 text-[14px]">
              {family.map((item) => (
                <li key={item.label}>
                  {item.external ? (
                    <a
                      href={item.href}
                      className={linkClass}
                      {...(item.href.startsWith("http")
                        ? { target: "_blank", rel: "noreferrer noopener" }
                        : {})}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-[rgb(255_255_255/0.14)]">
        <div className="page-wrap flex flex-wrap items-center justify-between gap-x-7 gap-y-4 py-5 text-[13.5px] text-[rgba(250,248,245,.72)]">
          <p>
            © {new Date().getFullYear()} {schoolName}
          </p>
          <ul className="flex flex-wrap items-center gap-5">
            <li>
              <Link href="/privacy" className={mutedLink}>
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/accessibility" className={mutedLink}>
                Accessibility
              </Link>
            </li>
            <li>
              <Link href="/contact#message" className={mutedLink}>
                Complaints
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
