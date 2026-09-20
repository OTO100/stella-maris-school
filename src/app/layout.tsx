import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { Gabarito, Work_Sans } from "next/font/google";
import { VisualEditing } from "next-sanity/visual-editing";

import { ogImageMetadata } from "@/lib/metadata-helpers";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";

import "./globals.css";

const gabarito = Gabarito({
  variable: "--font-gabarito",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const fallbackTitle = "Stella Maris Catholic Primary School";

export async function generateMetadata(): Promise<Metadata> {
  let siteUrl: string | undefined =
    process.env.NEXT_PUBLIC_SITE_URL || undefined;
  let description =
    "Stella Maris Catholic Primary School — faith, learning, and community.";
  let title = fallbackTitle;
  let ogImages: { url: string; width: number; height: number; alt?: string }[] =
    [];

  try {
    const result = await sanityFetch({
      query: SITE_SETTINGS_QUERY,
      stega: false,
    });
    const data = result.data;
    if (data?.schoolName) title = data.schoolName;
    if (data?.defaultSeoDescription) description = data.defaultSeoDescription;
    if (data?.siteUrl) siteUrl = data.siteUrl;
    if (data?.defaultOgImage) {
      ogImages = ogImageMetadata(data.defaultOgImage) as typeof ogImages;
    }
  } catch {
    /* use fallbacks */
  }

  return {
    metadataBase: siteUrl ? new URL(siteUrl) : undefined,
    title: {
      default: title,
      template: `%s · ${title}`,
    },
    description,
    openGraph: {
      type: "website",
      siteName: title,
      description,
      ...(ogImages.length ? { images: ogImages } : {}),
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${gabarito.variable} ${workSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {children}
        <SanityLive />
        {(await draftMode()).isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}
