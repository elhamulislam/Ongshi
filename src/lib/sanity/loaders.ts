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
import { STORIES_INDEX_QUERY, STORY_BY_SLUG_QUERY } from "@/sanity/queries/story";
import { TEAM_MEMBERS_QUERY } from "@/sanity/queries/teamMember";
import { ABOUT_PAGE_QUERY } from "@/sanity/queries/aboutPage";
import { CAMPAIGN_BY_SLUG_QUERY, EVENTS_PAST_QUERY, EVENTS_UPCOMING_QUERY } from "@/sanity/queries/campaign";
import { GET_INVOLVED_PAGE_QUERY } from "@/sanity/queries/getInvolvedPage";
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
import type { StoryCard, StoryData } from "@/lib/sanity/story";
import type { AboutPageData } from "@/lib/sanity/aboutPage";
import type { EventCard, EventData, EventsIndexData } from "@/lib/sanity/events";
import type { GetInvolvedPageData } from "@/lib/sanity/getInvolvedPage";
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

type GetInvolvedPageQueryResult = {
  headline?: string | null;
  intro?: string | null;
  detail?: string | null;
  volunteerHeadline?: string | null;
  volunteerText?: string | null;
  volunteerFormUrl?: string | null;
  newsletterHeadline?: string | null;
  newsletterText?: string | null;
  seo?: GetInvolvedPageData["seo"];
};

function mapGetInvolvedPageQuery(
  page: GetInvolvedPageQueryResult | null,
): GetInvolvedPageData | null {
  if (!page?.headline || !page?.intro) {
    return null;
  }

  return {
    headline: page.headline,
    intro: page.intro,
    detail: page.detail,
    volunteerHeadline: page.volunteerHeadline,
    volunteerText: page.volunteerText,
    volunteerFormUrl: page.volunteerFormUrl,
    newsletterHeadline: page.newsletterHeadline,
    newsletterText: page.newsletterText,
    seo: page.seo,
  };
}

function mapStoryCard(raw: StoryCard): StoryCard | null {
  if (!raw.slug || !raw.title || !raw.publishedAt) {
    return null;
  }

  return raw;
}

export async function getStoriesIndex(tag?: string): Promise<StoryCard[]> {
  if (!isSanityConfigured || !serverClient) {
    return [];
  }

  try {
    const data = await serverClient.fetch(STORIES_INDEX_QUERY, { tag: tag ?? null });
    const stories = (data as StoryCard[] | null) ?? [];
    return stories
      .map(mapStoryCard)
      .filter((story): story is StoryCard => story !== null);
  } catch {
    return [];
  }
}

type StoryQueryResult = {
  _id?: string | null;
  title?: string | null;
  slug?: string | null;
  publishedAt?: string | null;
  tags?: string[] | null;
  coverImageUrl?: string | null;
  coverImageAlt?: string | null;
  body?: StoryData["body"];
  about?: {
    _type?: string | null;
    title?: string | null;
    slug?: string | null;
  } | null;
  seo?: StoryData["seo"];
};

function mapStoryQuery(raw: StoryQueryResult | null): StoryData | null {
  if (!raw?._id || !raw.slug || !raw.title || !raw.publishedAt || !raw.body?.length) {
    return null;
  }

  const about =
    raw.about?._type && raw.about.title && raw.about.slug
      ? raw.about._type === "program" || raw.about._type === "campaign"
        ? {
            _type: raw.about._type,
            title: raw.about.title,
            slug: raw.about.slug,
          }
        : null
      : null;

  return {
    _id: raw._id,
    title: raw.title,
    slug: raw.slug,
    publishedAt: raw.publishedAt,
    tags: raw.tags,
    coverImageUrl: raw.coverImageUrl,
    coverImageAlt: raw.coverImageAlt,
    body: raw.body,
    about,
    seo: raw.seo,
  };
}

export async function getStoryBySlug(slug: string): Promise<StoryData | null> {
  if (!isSanityConfigured || !serverClient) {
    return null;
  }

  try {
    const data = await serverClient.fetch(STORY_BY_SLUG_QUERY, { slug });
    return mapStoryQuery(data as StoryQueryResult | null);
  } catch {
    return null;
  }
}

type AboutPageQueryResult = {
  headline?: string | null;
  intro?: string | null;
  mission?: string | null;
  impactStats?: Array<{ value?: string | null; label?: string | null }> | null;
  transparencyStatement?: string | null;
  annualReports?: Array<{ label?: string | null; url?: string | null }> | null;
  seo?: AboutPageData["seo"];
};

function mapAboutPageQuery(page: AboutPageQueryResult | null): AboutPageData | null {
  if (!page?.headline || !page?.intro) {
    return null;
  }

  const impactStats =
    page.impactStats
      ?.filter((stat) => stat.value && stat.label)
      .map((stat) => ({
        value: stat.value!,
        label: stat.label!,
      })) ?? [];

  const annualReports =
    page.annualReports
      ?.filter((report) => report.label && report.url)
      .map((report) => ({
        label: report.label!,
        url: report.url!,
      })) ?? [];

  return {
    headline: page.headline,
    intro: page.intro,
    mission: page.mission,
    impactStats,
    transparencyStatement: page.transparencyStatement,
    annualReports,
    seo: page.seo,
  };
}

function mapEventCard(raw: EventCard): EventCard | null {
  if (!raw.slug || !raw.title || !raw.startDate) {
    return null;
  }

  return raw;
}

export async function getEventsIndex(): Promise<EventsIndexData> {
  if (!isSanityConfigured || !serverClient) {
    return { upcoming: [], past: [] };
  }

  try {
    const [upcomingRaw, pastRaw] = await Promise.all([
      serverClient.fetch(EVENTS_UPCOMING_QUERY),
      serverClient.fetch(EVENTS_PAST_QUERY),
    ]);

    const upcoming =
      ((upcomingRaw as EventCard[] | null) ?? [])
        .map(mapEventCard)
        .filter((event): event is EventCard => event !== null) ?? [];
    const past =
      ((pastRaw as EventCard[] | null) ?? [])
        .map(mapEventCard)
        .filter((event): event is EventCard => event !== null) ?? [];

    return { upcoming, past };
  } catch {
    return { upcoming: [], past: [] };
  }
}

type EventQueryResult = {
  _id?: string | null;
  title?: string | null;
  slug?: string | null;
  category?: string | null;
  summary?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  location?: string | null;
  status?: string | null;
  heroImageUrl?: string | null;
  heroImageAlt?: string | null;
  details?: EventData["details"];
  outcome?: string | null;
  ctaType?: string | null;
  ctaUrl?: string | null;
  supportsProgramSlug?: string | null;
  gallery?: Array<{ imageUrl?: string | null; imageAlt?: string | null }> | null;
  seo?: EventData["seo"];
};

function mapEventQuery(raw: EventQueryResult | null): EventData | null {
  if (!raw?._id || !raw.slug || !raw.title || !raw.summary || !raw.startDate || !raw.category) {
    return null;
  }

  const gallery =
    raw.gallery
      ?.filter((image) => image.imageUrl)
      .map((image) => ({
        imageUrl: image.imageUrl!,
        imageAlt: image.imageAlt ?? "",
      })) ?? [];

  return {
    _id: raw._id,
    title: raw.title,
    slug: raw.slug,
    category: raw.category,
    summary: raw.summary,
    startDate: raw.startDate,
    endDate: raw.endDate,
    location: raw.location,
    status: raw.status,
    heroImageUrl: raw.heroImageUrl,
    heroImageAlt: raw.heroImageAlt,
    details: raw.details,
    outcome: raw.outcome,
    ctaType: raw.ctaType,
    ctaUrl: raw.ctaUrl,
    supportsProgramSlug: raw.supportsProgramSlug,
    gallery,
    seo: raw.seo,
  };
}

export async function getEventBySlug(slug: string): Promise<EventData | null> {
  if (!isSanityConfigured || !serverClient) {
    return null;
  }

  try {
    const data = await serverClient.fetch(CAMPAIGN_BY_SLUG_QUERY, { slug });
    return mapEventQuery(data as EventQueryResult | null);
  } catch {
    return null;
  }
}

export async function getAboutPageData(): Promise<AboutPageData | null> {
  if (!isSanityConfigured || !serverClient) {
    return null;
  }

  try {
    const data = await serverClient.fetch(ABOUT_PAGE_QUERY);
    return mapAboutPageQuery(data as AboutPageQueryResult | null);
  } catch {
    return null;
  }
}

type TeamMemberQueryResult = {
  _id: string;
  name?: string | null;
  role?: string | null;
  photoUrl?: string | null;
  photoAlt?: string | null;
};

export async function getTeamMembers(): Promise<
  Array<{
    _id: string;
    name: string;
    role?: string | null;
    photoUrl?: string | null;
    photoAlt?: string | null;
  }>
> {
  if (!isSanityConfigured || !serverClient) {
    return [];
  }

  try {
    const data = await serverClient.fetch(TEAM_MEMBERS_QUERY);
    const members = (data as TeamMemberQueryResult[] | null) ?? [];
    return members
      .filter((member) => member.name && member._id)
      .map((member) => ({
        _id: member._id,
        name: member.name!,
        role: member.role,
        photoUrl: member.photoUrl,
        photoAlt: member.photoAlt,
      }));
  } catch {
    return [];
  }
}

type PartnerWithLogo = {
  _id: string;
  name: string;
  website?: string | null;
  logoUrl?: string | null;
  logoAlt?: string | null;
};

export async function getPartnersWithLogos(): Promise<PartnerWithLogo[]> {
  if (!isSanityConfigured || !serverClient) {
    return [];
  }

  try {
    const data = await serverClient.fetch(HOME_PARTNERS_QUERY);
    const partners = (data as PartnerWithLogo[] | null) ?? [];
    return partners.filter((partner) => partner.name && partner.logoUrl);
  } catch {
    return [];
  }
}

export async function getGetInvolvedPageData(): Promise<GetInvolvedPageData | null> {
  if (!isSanityConfigured || !serverClient) {
    return null;
  }

  try {
    const data = await serverClient.fetch(GET_INVOLVED_PAGE_QUERY);
    return mapGetInvolvedPageQuery(data as GetInvolvedPageQueryResult | null);
  } catch {
    return null;
  }
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
