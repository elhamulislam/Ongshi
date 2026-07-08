import type { SchemaTypeDefinition } from "sanity";

import { campaign } from "./campaign";
import { donatePage } from "./donatePage";
import { homePage } from "./homePage";
import { impactStat } from "./impactStat";
import { blockContent } from "./objects/blockContent";
import { cta } from "./objects/cta";
import { donation } from "./objects/donation";
import { heroSlide } from "./objects/heroSlide";
import { imageWithAlt } from "./objects/imageWithAlt";
import { newsletter } from "./objects/newsletter";
import { seo } from "./objects/seo";
import { social } from "./objects/social";
import { sponsorshipHook } from "./objects/sponsorshipHook";
import { sponsorshipTier } from "./objects/sponsorshipTier";
import { page } from "./page";
import { partner } from "./partner";
import { program } from "./program";
import { siteSettings } from "./siteSettings";
import { story } from "./story";
import { teamMember } from "./teamMember";
import { aboutPage } from "./aboutPage";
import { gallery } from "./gallery";
import { getInvolvedPage } from "./getInvolvedPage";
import { youthPage } from "./youthPage";
import { galleryImage } from "./objects/galleryImage";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Objects
    blockContent,
    cta,
    donation,
    heroSlide,
    imageWithAlt,
    galleryImage,
    newsletter,
    seo,
    social,
    sponsorshipHook,
    sponsorshipTier,
    // Documents
    program,
    campaign,
    story,
    impactStat,
    partner,
    teamMember,
    siteSettings,
    homePage,
    donatePage,
    youthPage,
    getInvolvedPage,
    aboutPage,
    gallery,
    page,
  ],
};
