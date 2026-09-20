import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage } from "@/components/legal-page";
import { PAGE_META } from "@/lib/page-meta";

export const metadata: Metadata = PAGE_META.privacy;

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="Your information" title="Privacy">
      <p>
        Stella Maris Catholic Primary School collects personal information so we
        can enrol students, communicate with whānau, and run the school. That
        includes names, contact details, health information where it is needed
        for a child's safety, and records of learning.
      </p>
      <p>
        We use school systems such as the Hero app and Kindo to share notices,
        attendance and payments. Those services have their own privacy
        statements. We do not sell personal information.
      </p>
      <p>
        If you would like to know what information we hold, or to ask for a
        correction, email the office. For a complaint about privacy, contact us
        first — we will treat it confidentially.
      </p>
      <p>
        <Link href="/contact" className="font-semibold">
          Contact the office →
        </Link>
      </p>
    </LegalPage>
  );
}
