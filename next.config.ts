import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/the-school",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/the-school/:path*",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/about-us",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/about-us/:path*",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/contact-us-2",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/contact-us-2/:path*",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/our-community",
        destination: "/community",
        permanent: true,
      },
      {
        source: "/our-community/:path*",
        destination: "/community",
        permanent: true,
      },
      {
        source: "/news-information",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/news-information/:path*",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/classroom-team-notices",
        destination: "/learning",
        permanent: true,
      },
      {
        source: "/classroom-team-notices/:path*",
        destination: "/learning",
        permanent: true,
      },
      {
        source: "/calendar",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/calendar/:path*",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/gallery",
        destination: "/community",
        permanent: true,
      },
      {
        source: "/gallery/:path*",
        destination: "/community",
        permanent: true,
      },
      {
        source: "/online-shop",
        destination: "/community",
        permanent: true,
      },
      {
        source: "/online-shop/:path*",
        destination: "/community",
        permanent: true,
      },
      {
        source: "/web-links",
        destination: "/community",
        permanent: true,
      },
      {
        source: "/web-links/:path*",
        destination: "/community",
        permanent: true,
      },
      {
        source: "/ptfa",
        destination: "/community",
        permanent: true,
      },
      {
        source: "/ptfa/:path*",
        destination: "/community",
        permanent: true,
      },
      {
        source: "/our-school",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/our-school/:path*",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/our-people",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/our-people/:path*",
        destination: "/about",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
