import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage } from "@/components/legal-page";
import { PAGE_META } from "@/lib/page-meta";

export const metadata: Metadata = PAGE_META.accessibility;

export default function AccessibilityPage() {
  return (
    <LegalPage eyebrow="Using this website" title="Accessibility">
      <p>
        We want this website to be usable by as many people as possible —
        including on a phone, with a keyboard, and with a screen reader. Pages
        use a skip-to-content link, labelled form fields, and colour contrast
        that meets WCAG 2.1 AA for body text.
      </p>
      <p>
        Some documents are PDFs supplied by the school. If a file is hard to
        use, or you need information in another format, the office will help.
      </p>
      <p>
        Tell us if something on the site is difficult to use. We will take it
        seriously and fix what we can.
      </p>
      <p>
        <Link href="/contact" className="font-semibold">
          Contact the office →
        </Link>
      </p>
    </LegalPage>
  );
}
