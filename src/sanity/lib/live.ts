import { defineLive } from "next-sanity/live";

import { client } from "@/sanity/lib/client";
import { apiVersion } from "@/sanity/lib/env";

const serverToken = process.env.SANITY_API_READ_TOKEN;
const browserToken = process.env.SANITY_API_READ_TOKEN;

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({ apiVersion }),
  serverToken: serverToken || false,
  browserToken: browserToken || false,
  // Live events only refresh pages while someone has the site open, so also
  // re-check Sanity every 60 seconds. Otherwise edits published in Studio can
  // stay hidden on the live site until the next deploy.
  fetchOptions: { revalidate: 60 },
});
