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
        source: "/news-information",
        destination: "/",
        permanent: true,
      },
      {
        source: "/news-information/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/classroom-team-notices",
        destination: "/about/our-learning",
        permanent: true,
      },
      {
        source: "/classroom-team-notices/:path*",
        destination: "/about/our-learning",
        permanent: true,
      },
      {
        source: "/calendar",
        destination: "/",
        permanent: true,
      },
      {
        source: "/calendar/:path*",
        destination: "/",
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
        destination: "/community#ptfa",
        permanent: true,
      },
      {
        source: "/our-school",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/our-school/our-learning",
        destination: "/about/our-learning",
        permanent: true,
      },
      {
        source: "/our-school/:path*",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/our-community",
        destination: "/community",
        permanent: true,
      },
      {
        source: "/our-community/staff",
        destination: "/community/staff",
        permanent: true,
      },
      {
        source: "/our-community/:path*",
        destination: "/community",
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
      {
        source: "/learning",
        destination: "/about/our-learning",
        permanent: true,
      },
      {
        source: "/learning/:path*",
        destination: "/about/our-learning",
        permanent: true,
      },
      {
        source: "/enrol",
        destination: "/enrolment",
        permanent: true,
      },
      {
        source: "/enrol/:path*",
        destination: "/enrolment",
        permanent: true,
      },
      {
        source: "/absence",
        destination: "/absences",
        permanent: true,
      },
      {
        source: "/absence/:path*",
        destination: "/absences",
        permanent: true,
      },
      {
        source: "/hibiscus-coast-parish",
        destination: "/parish",
        permanent: true,
      },
      {
        source: "/hibiscus-coast-parish/:path*",
        destination: "/parish",
        permanent: true,
      },
      {
        source: "/news",
        destination: "/",
        permanent: true,
      },
      {
        source: "/news/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/resources",
        destination: "/community",
        permanent: true,
      },
      {
        source: "/resources/:path*",
        destination: "/community",
        permanent: true,
      },
      {
        source: "/events",
        destination: "/",
        permanent: true,
      },
      {
        source: "/events/:path*",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
