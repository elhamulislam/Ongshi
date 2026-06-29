import { isSanityConfigured } from "@/sanity/env";
import { sanityFetch } from "@/sanity/lib/live";
import { HOME_PAGE_QUERY, HOME_PARTNERS_QUERY } from "@/sanity/queries/homePage";
import { SITE_SETTINGS_QUERY } from "@/sanity/queries/siteSettings";
import {
  fallbackHomePage,
  fallbackPartners,
  fallbackSiteSettings,
  type HeroSlide,
  type HomePageData,
  type SiteSettingsData,
} from "@/lib/fallbacks/home";
import { getDonateUrl } from "@/lib/donation";

type HomePageQueryResult = {
  heroSlides?: HeroSlide[] | null;
  heroHeadline?: string | null;
  heroSubtext?: string | null;
  heroPrimaryCta?: { label?: string | null; url?: string | null } | null;
  heroSecondaryCta?: { label?: string | null; url?: string | null } | null;
  sponsorshipHook?: HomePageData["sponsorshipHook"] | null;
  featuredPrograms?: HomePageData["featuredPrograms"] | null;
  featuredStats?: HomePageData["featuredStats"] | null;
  featuredStories?: HomePageData["featuredStories"] | null;
};

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
    return resolveHomeCtas(fallbackHomePage, donation);
  }

  try {
    const { data } = await sanityFetch({
      query: HOME_PAGE_QUERY,
      perspective: "published",
      stega: false,
    });

    const page = data as HomePageQueryResult | null;

    if (!page?.heroSlides?.length) {
      return resolveHomeCtas(fallbackHomePage, donation);
    }

    const donateUrl = getDonateUrl(donation);

    return resolveHomeCtas(
      {
        heroSlides: page.heroSlides,
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
          headline:
            page.sponsorshipHook?.headline ?? fallbackHomePage.sponsorshipHook.headline,
          text: page.sponsorshipHook?.text ?? fallbackHomePage.sponsorshipHook.text,
          ctaLabel:
            page.sponsorshipHook?.ctaLabel ?? fallbackHomePage.sponsorshipHook.ctaLabel,
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
  } catch {
    return resolveHomeCtas(fallbackHomePage, donation);
  }
}

function resolveHomeCtas(
  page: HomePageData,
  donation?: SiteSettingsData["donation"],
): HomePageData {
  const donateUrl = getDonateUrl(donation);
  return {
    ...page,
    heroPrimaryCta: {
      ...page.heroPrimaryCta,
      url: page.heroPrimaryCta.url || donateUrl,
    },
  };
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
