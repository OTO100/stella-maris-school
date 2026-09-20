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
import { hubCard } from "@/sanity/schemaTypes/objects/hubCard";
import { linkItem } from "@/sanity/schemaTypes/objects/linkItem";
import { navPrimaryItem } from "@/sanity/schemaTypes/objects/navPrimaryItem";
import { pageResource } from "@/sanity/schemaTypes/objects/pageResource";
import { pageSection } from "@/sanity/schemaTypes/objects/pageSection";
import { sectionLinks } from "@/sanity/schemaTypes/objects/sectionLinks";
import { simpleBlockContent } from "@/sanity/schemaTypes/objects/simpleBlockContent";
import { aboutPage } from "@/sanity/schemaTypes/documents/aboutPage";
import { absencesPage } from "@/sanity/schemaTypes/documents/absencesPage";
import { communityPage } from "@/sanity/schemaTypes/documents/communityPage";
import { enrolmentPage } from "@/sanity/schemaTypes/documents/enrolmentPage";
import { learningPage } from "@/sanity/schemaTypes/documents/learningPage";
import { parishPage } from "@/sanity/schemaTypes/documents/parishPage";
import { staffPage } from "@/sanity/schemaTypes/documents/staffPage";

export const schemaTypes: SchemaTypeDefinition[] = [
  simpleBlockContent,
  blockContent,
  homeHighlightSlide,
  linkItem,
  navPrimaryItem,
  sectionLinks,
  hubCard,
  pageSection,
  pageResource,
  siteSettings,
  navigation,
  aboutPage,
  communityPage,
  enrolmentPage,
  absencesPage,
  learningPage,
  parishPage,
  staffPage,
  downloadableResource,
  page,
  newsPost,
  event,
  staff,
  testimonial,
];
