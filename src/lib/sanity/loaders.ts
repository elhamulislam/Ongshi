import { isSanityConfigured } from "@/sanity/env";
import { sanityFetch } from "@/sanity/lib/live";
import { serverClient } from "@/sanity/lib/serverClient";
import { DONATE_PAGE_QUERY } from "@/sanity/queries/donatePage";
import { HOME_PAGE_QUERY, HOME_PARTNERS_QUERY } from "@/sanity/queries/homePage";
import {
  PROGRAM_BY_SLUG_QUERY,
  PROGRAMS_INDEX_QUERY,
} from "@/sanity/queries/program";
import { SITE_SETTINGS_QUERY } from "@/sanity/queries/siteSettings";
import { YOUTH_PAGE_QUERY } from "@/sanity/queries/youthPage";
import {
  fallbackDonatePage,
  type DonatePageData,
} from "@/lib/fallbacks/donate";
import {
  fallbackHomePage,
  fallbackPartners,
  fallbackSiteSettings,
  type HeroSlide,
  type HomePageData,
  type SiteSettingsData,
} from "@/lib/fallbacks/home";
import {
  fallbackPrograms,
  getFallbackProgram,
  type ProgramCard,
  type ProgramData,
} from "@/lib/fallbacks/program";
import { getGeneralDonateUrl } from "@/lib/donation";
import { resolveHomePageData } from "@/lib/sanity/resolveHomePage";
import type { YouthPageData } from "@/lib/sanity/youthPage";

type HomePageQueryResult = {
  heroSlides?: Array<{
    statValue?: string | null;
    statLabel?: string | null;
    imageUrl?: string | null;
    imageAlt?: string | null;
  }> | null;
  heroHeadline?: string | null;
  heroSubtext?: string | null;
  heroPrimaryCta?: { label?: string | null; url?: string | null } | null;
  heroSecondaryCta?: { label?: string | null; url?: string | null } | null;
  sponsorshipHook?: HomePageData["sponsorshipHook"] | null;
  featuredPrograms?: HomePageData["featuredPrograms"] | null;
  featuredStats?: HomePageData["featuredStats"] | null;
  featuredStories?: HomePageData["featuredStories"] | null;
};

function mapHeroSlides(
  slides: NonNullable<HomePageQueryResult["heroSlides"]>,
): HeroSlide[] {
  return slides
    .filter((slide) => slide.imageUrl && slide.statValue && slide.statLabel)
    .map((slide) => ({
      imageUrl: slide.imageUrl!,
      imageAlt: slide.imageAlt ?? "",
      statValue: slide.statValue!,
      statLabel: slide.statLabel!,
    }));
}

function mapHomePageQuery(
  page: HomePageQueryResult,
  donation?: SiteSettingsData["donation"],
): HomePageData | null {
  if (!page.heroSlides?.length) {
    return null;
  }

  const heroSlides = mapHeroSlides(page.heroSlides);
  if (!heroSlides.length) {
    return null;
  }

  const donateUrl = getGeneralDonateUrl(donation);

  return resolveHomePageData(
    {
      heroSlides,
      heroHeadline: page.heroHeadline ?? fallbackHomePage.heroHeadline,
      heroSubtext: page.heroSubtext ?? fallbackHomePage.heroSubtext,
      heroPrimaryCta: {
        label: page.heroPrimaryCta?.label ?? fallbackHomePage.heroPrimaryCta.label,
        url: page.heroPrimaryCta?.url ?? donateUrl,
      },
      heroSecondaryCta: {
        label: page.heroSecondaryCta?.label ?? fallbackHomePage.heroSecondaryCta.label,
        url: page.heroSecondaryCta?.url ?? fallbackHomePage.heroSecondaryCta.url,
      },
      sponsorshipHook: {
        headline: page.sponsorshipHook?.headline ?? fallbackHomePage.sponsorshipHook.headline,
        text: page.sponsorshipHook?.text ?? fallbackHomePage.sponsorshipHook.text,
        ctaLabel: page.sponsorshipHook?.ctaLabel ?? fallbackHomePage.sponsorshipHook.ctaLabel,
      },
      featuredPrograms:
        page.featuredPrograms && page.featuredPrograms.length > 0
          ? page.featuredPrograms
          : fallbackHomePage.featuredPrograms,
      featuredStats:
        page.featuredStats && page.featuredStats.length > 0
          ? page.featuredStats
          : fallbackHomePage.featuredStats,
      featuredStories:
        page.featuredStories && page.featuredStories.length > 0
          ? page.featuredStories
          : fallbackHomePage.featuredStories,
    },
    donation,
  );
}

export async function getSiteSettings(): Promise<SiteSettingsData> {
  if (!isSanityConfigured) {
    return fallbackSiteSettings;
  }

  try {
    const { data } = await sanityFetch({
      query: SITE_SETTINGS_QUERY,
      perspective: "published",
      stega: false,
    });
    return (data as SiteSettingsData | null) ?? fallbackSiteSettings;
  } catch {
    return fallbackSiteSettings;
  }
}

export async function getHomePageData(
  donation?: SiteSettingsData["donation"],
): Promise<HomePageData> {
  if (!isSanityConfigured) {
    return resolveHomePageData(fallbackHomePage, donation);
  }

  try {
    const { data } = await sanityFetch({
      query: HOME_PAGE_QUERY,
      perspective: "published",
      stega: false,
    });

    const mapped = mapHomePageQuery((data as HomePageQueryResult | null) ?? {}, donation);
    if (mapped) {
      return mapped;
    }
  } catch {
    // fall through to local fallback when CMS is empty or unreachable
  }

  return resolveHomePageData(fallbackHomePage, donation);
}

export async function getPartners(): Promise<
  Array<{ _id: string; name: string; website?: string | null }>
> {
  if (!isSanityConfigured) {
    return fallbackPartners;
  }

  try {
    const { data } = await sanityFetch({
      query: HOME_PARTNERS_QUERY,
      perspective: "published",
      stega: false,
    });
    const partners = data as Array<{ _id: string; name: string; website?: string | null }> | null;
    return partners?.length ? partners : fallbackPartners;
  } catch {
    return fallbackPartners;
  }
}

function mapProgramData(raw: ProgramData | null): ProgramData | null {
  if (!raw?.slug || !raw.title || !raw.heroImageUrl) {
    return null;
  }

  return {
    ...raw,
    heroImageAlt: raw.heroImageAlt ?? raw.title,
    impactStats: raw.impactStats ?? [],
    gallery: raw.gallery ?? [],
    relatedStories: raw.relatedStories ?? [],
  };
}

export async function getProgramBySlug(slug: string): Promise<ProgramData | null> {
  if (!isSanityConfigured) {
    return getFallbackProgram(slug);
  }

  try {
    const { data } = await sanityFetch({
      query: PROGRAM_BY_SLUG_QUERY,
      params: { slug },
      perspective: "published",
      stega: false,
    });
    return mapProgramData(data as ProgramData | null);
  } catch {
    return null;
  }
}

type DonatePageQueryResult = {
  headline?: string | null;
  whyGive?: string | null;
  whereYourMoneyGoes?: string | null;
  featuredStats?: DonatePageData["featuredStats"] | null;
  seo?: DonatePageData["seo"];
};

function mapDonatePageQuery(page: DonatePageQueryResult | null): DonatePageData | null {
  if (!page?.headline || !page?.whyGive) {
    return null;
  }

  return {
    headline: page.headline,
    whyGive: page.whyGive,
    whereYourMoneyGoes: page.whereYourMoneyGoes,
    featuredStats: page.featuredStats ?? [],
    seo: page.seo,
  };
}

export async function getDonatePageData(): Promise<DonatePageData> {
  if (!isSanityConfigured) {
    return fallbackDonatePage;
  }

  try {
    const { data } = await sanityFetch({
      query: DONATE_PAGE_QUERY,
      perspective: "published",
      stega: false,
    });
    const mapped = mapDonatePageQuery(data as DonatePageQueryResult | null);
    if (mapped) {
      return mapped;
    }
  } catch {
    // fall through when CMS is empty or unreachable
  }

  return fallbackDonatePage;
}

type YouthPageQueryResult = {
  headline?: string | null;
  intro?: string | null;
  whyJoin?: string | null;
  joinHeadline?: string | null;
  joinText?: string | null;
  joinFormUrl?: string | null;
  seo?: YouthPageData["seo"];
};

function mapYouthPageQuery(page: YouthPageQueryResult | null): YouthPageData | null {
  if (!page?.headline || !page?.intro) {
    return null;
  }

  return {
    headline: page.headline,
    intro: page.intro,
    whyJoin: page.whyJoin,
    joinHeadline: page.joinHeadline,
    joinText: page.joinText,
    joinFormUrl: page.joinFormUrl,
    seo: page.seo,
  };
}

export async function getYouthPageData(): Promise<YouthPageData | null> {
  if (!isSanityConfigured || !serverClient) {
    return null;
  }

  try {
    const data = await serverClient.fetch(YOUTH_PAGE_QUERY);
    return mapYouthPageQuery(data as YouthPageQueryResult | null);
  } catch {
    return null;
  }
}

export async function getProgramsIndex(): Promise<ProgramCard[]> {
  if (!isSanityConfigured) {
    return fallbackPrograms;
  }

  try {
    const { data } = await sanityFetch({
      query: PROGRAMS_INDEX_QUERY,
      perspective: "published",
      stega: false,
    });
    const programs = (data as ProgramCard[] | null) ?? [];
    return programs.filter(
      (program) =>
        program.slug &&
        program.title &&
        program.summary &&
        program.pillar &&
        program.imageUrl,
    );
  } catch {
    return [];
  }
}
