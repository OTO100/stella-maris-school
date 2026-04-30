import type { SchemaTypeDefinition } from "sanity";

import { downloadableResource } from "@/sanity/schemaTypes/documents/downloadableResource";
import { event } from "@/sanity/schemaTypes/documents/event";
import { navigation } from "@/sanity/schemaTypes/documents/navigation";
import { newsPost } from "@/sanity/schemaTypes/documents/newsPost";
import { page } from "@/sanity/schemaTypes/documents/page";
import { siteSettings } from "@/sanity/schemaTypes/documents/siteSettings";
import { staff } from "@/sanity/schemaTypes/documents/staff";
import { testimonial } from "@/sanity/schemaTypes/documents/testimonial";
import { blockContent } from "@/sanity/schemaTypes/objects/blockContent";
import { homeHighlightSlide } from "@/sanity/schemaTypes/objects/homeHighlightSlide";
import { innerPageHero } from "@/sanity/schemaTypes/objects/innerPageHero";
import { linkItem } from "@/sanity/schemaTypes/objects/linkItem";
import { navPrimaryItem } from "@/sanity/schemaTypes/objects/navPrimaryItem";

export const schemaTypes: SchemaTypeDefinition[] = [
  blockContent,
  homeHighlightSlide,
  innerPageHero,
  linkItem,
  navPrimaryItem,
  siteSettings,
  navigation,
  downloadableResource,
  page,
  newsPost,
  event,
  staff,
  testimonial,
];
