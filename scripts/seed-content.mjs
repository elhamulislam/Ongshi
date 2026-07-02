/**
 * Seeds Sanity with homepage content matching the current site.
 *
 * Requires in .env.local:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_WRITE_TOKEN  (Editor token from sanity.io/manage)
 *
 * Run: npm run seed:sanity
 */
import { createClient } from "@sanity/client";
import { randomBytes } from "node:crypto";
import { readFileSync } from "node:fs";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(import.meta.url), "..", "..");

function loadEnvLocal() {
  try {
    const raw = readFileSync(join(root, ".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    // .env.local optional if vars are already exported
  }
}

loadEnvLocal();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in .env.local",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-02-01",
  token,
  useCdn: false,
});

function key() {
  return randomBytes(6).toString("hex");
}

function block(text, style = "normal") {
  return {
    _type: "block",
    _key: key(),
    style,
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks: [] }],
  };
}

function heading(text) {
  return block(text, "h2");
}

async function seedPublishedAndDraft(doc) {
  await client.createOrReplace(doc);
  await client.createOrReplace({
    ...doc,
    _id: `drafts.${doc._id}`,
  });
}

async function uploadImage(relativePath, alt) {
  const filePath = join(root, "public", relativePath);
  const buffer = readFileSync(filePath);
  const asset = await client.assets.upload("image", buffer, {
    filename: basename(relativePath),
  });
  return {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
    alt,
  };
}

const ZEFFY_GENERAL = "https://www.zeffy.com/en-US/donation-form/ongshi-general";
const ZEFFY_EYE = "https://www.zeffy.com/en-US/donation-form/ongshi-sponsor-an-eye";
const ZEFFY_CHILD = "https://www.zeffy.com/en-US/donation-form/ongshi-sponsor-a-child";
const ZEFFY_VILLAGE = "https://www.zeffy.com/en-US/donation-form/ongshi-sponsor-a-village";
const ZEFFY_CERVICAL = "https://www.zeffy.com/en-US/donation-form/ongshi-cervical-cancer";

async function seed() {
  console.log("Uploading images…");

  const images = {
    heroGlasses: await uploadImage(
      "images/hero-glasses.jpg",
      "An Ongshi volunteer fits glasses for an elderly man at an eye camp",
    ),
    youth: await uploadImage(
      "images/youth-volunteers.jpg",
      "Ongshi youth volunteers and families with donation boxes in Austin, Texas",
    ),
    rebuild: await uploadImage(
      "images/rebuild-frame.jpg",
      "A home being rebuilt on a bamboo frame after flooding in Bangladesh",
    ),
    eyeCamp: await uploadImage(
      "images/eye-camp.jpg",
      "A clinician examines a patient's eyes at an Ongshi eye camp",
    ),
    rebuildRoof: await uploadImage(
      "images/rebuild-roof.jpg",
      "A man fits a new metal roof onto a home being rebuilt after flooding",
    ),
  };

  console.log("Creating impact stats…");

  const impactStats = [
    {
      _id: "impactStat-surgeries",
      _type: "impactStat",
      value: "156",
      label: "cataract surgeries funded in 2025",
      showOnHome: true,
      order: 1,
    },
    {
      _id: "impactStat-projects",
      _type: "impactStat",
      value: "15+",
      label: "projects across two countries",
      showOnHome: true,
      order: 2,
    },
    {
      _id: "impactStat-child",
      _type: "impactStat",
      value: "$30",
      label: "sponsors a child for a month",
      showOnHome: true,
      order: 3,
    },
    {
      _id: "impactStat-screened",
      _type: "impactStat",
      value: "1,500+",
      label: "patients screened at eye camps",
      showOnHome: false,
      order: 4,
    },
    {
      _id: "impactStat-homes",
      _type: "impactStat",
      value: "20+",
      label: "homes rebuilt after the floods",
      showOnHome: false,
      order: 5,
    },
  ];

  for (const doc of impactStats) {
    await client.createOrReplace(doc);
  }

  console.log("Creating programs…");

  const programs = [
    {
      _id: "program-sponsor-an-eye",
      _type: "program",
      title: "Restore someone's sight",
      slug: { _type: "slug", current: "sponsor-an-eye" },
      pillar: "health-care",
      summary:
        "A simple cataract surgery brings a person's world back into focus. Your gift funds the operation, the camp, and the follow-up care.",
      heroImage: images.eyeCamp,
      theNeed: [
        heading("Sight shouldn't be a luxury"),
        block(
          "In rural Bangladesh, cataracts steal independence slowly — until a person can no longer work, travel, or recognize the faces of their grandchildren. Surgery exists, but the cost and distance put it out of reach for families already stretched thin.",
        ),
        block(
          "Without intervention, preventable blindness deepens poverty. Parents stop earning. Grandparents lose their footing. Children take on care instead of school.",
        ),
      ],
      whatWeDo: [
        heading("We restore vision, camp by camp"),
        block(
          "Ongshi funds eye camps where local clinicians screen patients, perform cataract surgeries, and provide glasses and follow-up care — all in the communities where people live.",
        ),
        block(
          "Volunteers coordinate logistics, donors cover the cost of each surgery, and families leave camp seeing clearly again. One gift funds the full path from screening to recovery.",
        ),
      ],
      sponsorable: true,
      suggestedGift: null,
      whatGiftFunds:
        "One gift covers screening, surgery, post-operative care, and glasses when needed.",
      impactStats: [
        { _type: "reference", _ref: "impactStat-surgeries", _key: key() },
        { _type: "reference", _ref: "impactStat-screened", _key: key() },
      ],
      gallery: [
        { _key: key(), ...images.eyeCamp },
        { _key: key(), ...images.heroGlasses },
      ],
      relatedStories: [
        { _type: "reference", _ref: "story-eye-camp-mymensingh", _key: key() },
      ],
      status: "active",
      featuredOnHome: true,
      order: 1,
    },
    {
      _id: "program-sponsor-a-village",
      _type: "program",
      title: "Rebuild after the flood",
      slug: { _type: "slug", current: "sponsor-a-village" },
      pillar: "relief-rehab",
      summary:
        "When the water takes everything, we help families rebuild their homes and their footing — board by board, roof by roof.",
      heroImage: images.rebuildRoof,
      theNeed: [
        heading("When the water recedes, nothing is left"),
        block(
          "Floods in Bangladesh can erase a family's home in a single night — walls collapsed, belongings washed away, and no savings left to start over.",
        ),
        block(
          "Families sleep under tarps for months. Children miss school. Parents borrow at crushing rates just to buy a few sheets of tin.",
        ),
      ],
      whatWeDo: [
        heading("We rebuild homes, together"),
        block(
          "Ongshi works with local partners to purchase materials, hire skilled labor, and rebuild structurally sound homes — board by board, roof by roof.",
        ),
        block(
          "Village sponsorship pools gifts so entire communities can recover faster. Families move back in with dignity, and children return to school.",
        ),
      ],
      sponsorable: true,
      whatGiftFunds:
        "Your sponsorship helps purchase materials, hire local labor, and restore a family's home.",
      impactStats: [{ _type: "reference", _ref: "impactStat-homes", _key: key() }],
      gallery: [
        { _key: key(), ...images.rebuildRoof },
        { _key: key(), ...images.rebuild },
      ],
      relatedStories: [
        { _type: "reference", _ref: "story-rebuilding-homes", _key: key() },
      ],
      status: "active",
      featuredOnHome: true,
      order: 2,
    },
    {
      _id: "program-sponsor-a-child",
      _type: "program",
      title: "Raise a child",
      slug: { _type: "slug", current: "sponsor-a-child" },
      pillar: "education",
      summary:
        "A monthly gift puts food on the table, clothes on their back, and a child in school — with updates on how they're growing.",
      heroImage: images.youth,
      theNeed: [
        heading("A child's future shouldn't depend on luck"),
        block(
          "In the communities we serve, a single setback — a lost job, an illness, a season of hunger — can pull a child out of school for good.",
        ),
        block(
          "Without steady support, children go without meals, miss classes, and lose the chance to build a different life.",
        ),
      ],
      whatWeDo: [
        heading("We walk alongside sponsored children"),
        block(
          "Monthly sponsors provide food, clothing, school fees, and supplies. Local partners check in regularly and share updates on each child's progress.",
        ),
        block(
          "Your gift is a long-term partnership — not a one-time handout. Sponsors see the difference their share makes, month after month.",
        ),
      ],
      sponsorable: true,
      suggestedGift: "$30 / month",
      whatGiftFunds:
        "Monthly support covers food, clothing, school fees, and supplies — with updates on your sponsored child.",
      impactStats: [{ _type: "reference", _ref: "impactStat-child", _key: key() }],
      gallery: [{ _key: key(), ...images.youth }],
      relatedStories: [
        { _type: "reference", _ref: "story-youth-shoe-drive", _key: key() },
      ],
      status: "active",
      featuredOnHome: true,
      order: 3,
    },
  ];

  for (const doc of programs) {
    await seedPublishedAndDraft(doc);
  }

  console.log("Creating stories…");

  const stories = [
    {
      _id: "story-eye-camp-mymensingh",
      _type: "story",
      title: "Eye camp in Mymensingh restores sight to 156 patients",
      slug: { _type: "slug", current: "eye-camp-mymensingh" },
      publishedAt: new Date("2025-03-01T12:00:00.000Z").toISOString(),
      coverImage: images.eyeCamp,
      body: [
        block(
          "Over three days, volunteers screened hundreds and funded life-changing cataract surgeries.",
        ),
      ],
      tags: ["health"],
      featuredOnHome: true,
      about: { _type: "reference", _ref: "program-sponsor-an-eye" },
    },
    {
      _id: "story-rebuilding-homes",
      _type: "story",
      title: "Rebuilding homes, one roof at a time",
      slug: { _type: "slug", current: "rebuilding-homes" },
      publishedAt: new Date("2025-02-15T12:00:00.000Z").toISOString(),
      coverImage: images.rebuildRoof,
      body: [
        block(
          "After the floods receded, families returned to nothing. Here's how the rebuild is going.",
        ),
      ],
      tags: ["relief"],
      featuredOnHome: true,
      about: { _type: "reference", _ref: "program-sponsor-a-village" },
    },
    {
      _id: "story-youth-shoe-drive",
      _type: "story",
      title: "Youth volunteers deliver 500 pairs of shoes",
      slug: { _type: "slug", current: "youth-shoe-drive" },
      publishedAt: new Date("2025-01-20T12:00:00.000Z").toISOString(),
      coverImage: images.youth,
      body: [
        block(
          "Ongshi students organized, inventoried, and handed out shoes through Soles4Souls.",
        ),
      ],
      tags: ["youth"],
      featuredOnHome: true,
    },
  ];

  for (const doc of stories) {
    await client.createOrReplace(doc);
  }

  console.log("Creating site settings…");

  const siteSettings = {
    _id: "siteSettings",
    _type: "siteSettings",
    orgName: "Ongshi",
    tagline: "Partner in hope",
    contactEmail: "info@ongshi.org",
    address: "Austin, Texas",
    nonprofitLine:
      "Ongshi is a registered 501(c)(3) nonprofit. Donations are tax-deductible.",
    donation: {
      platform: "zeffy",
      primaryUrl: ZEFFY_GENERAL,
      sponsorshipTiers: [
        {
          _key: key(),
          key: "eye",
          label: "Sponsor an Eye",
          amount: null,
          whatItFunds:
            "Funds screening, cataract surgery, post-operative care, and glasses when needed.",
          url: ZEFFY_EYE,
        },
        {
          _key: key(),
          key: "cervical-cancer",
          label: "Cervical Cancer Elimination",
          amount: null,
          whatItFunds:
            "Supports screening, treatment, and education to eliminate cervical cancer in the communities we serve.",
          url: ZEFFY_CERVICAL,
        },
        {
          _key: key(),
          key: "village",
          label: "Sponsor a Village",
          amount: null,
          whatItFunds:
            "Helps purchase materials, hire local labor, and rebuild homes after flooding.",
          url: ZEFFY_VILLAGE,
        },
        {
          _key: key(),
          key: "child",
          label: "Sponsor a Child",
          amount: "$30 / month",
          whatItFunds:
            "Monthly support covers food, clothing, school fees, and supplies for a sponsored child.",
          url: ZEFFY_CHILD,
        },
      ],
    },
  };

  await seedPublishedAndDraft(siteSettings);

  console.log("Creating home page…");

  const homePage = {
    _id: "homePage",
    _type: "homePage",
    heroSlides: [
      {
        _key: key(),
        image: images.heroGlasses,
        statValue: "156",
        statLabel: "sights restored in 2025",
      },
      {
        _key: key(),
        image: images.youth,
        statValue: "40+",
        statLabel: "youth volunteers in Austin",
      },
      {
        _key: key(),
        image: images.rebuild,
        statValue: "20+",
        statLabel: "homes rebuilt after the floods",
      },
      {
        _key: key(),
        image: images.eyeCamp,
        statValue: "1,500+",
        statLabel: "patients seen at eye camps",
      },
    ],
    heroHeadline: "Your share gives sight, shelter, and a *future*.",
    heroSubtext:
      "Ongshi is a community of volunteers restoring sight, rebuilding homes, and sponsoring children — across Bangladesh and Austin, Texas. Every gift is a hand held.",
    heroPrimaryCta: {
      label: "Sponsor a child",
      url: null,
    },
    heroSecondaryCta: {
      label: "See our work",
      url: "/our-work",
    },
    featuredPrograms: programs.map((p) => ({ _type: "reference", _ref: p._id })),
    featuredStats: impactStats.map((s) => ({ _type: "reference", _ref: s._id })),
    featuredStories: stories.map((s) => ({ _type: "reference", _ref: s._id })),
    sponsorshipHook: {
      headline: "For $30 a month, you sponsor a child's future.",
      text: "Food, clothing, and an education — and a clear line of sight to exactly where your gift goes. Cancel anytime; the difference lasts a lifetime.",
      ctaLabel: "Become a sponsor",
    },
  };

  await seedPublishedAndDraft(homePage);

  console.log("Creating donate page…");

  const donatePage = {
    _id: "donatePage",
    _type: "donatePage",
    headline: "Your share changes a life",
    whyGive:
      "Every gift to Ongshi goes directly to the work — restoring sight, rebuilding homes, and sponsoring children across Bangladesh and Austin, Texas. You choose how to give; we make sure it reaches the people who need it.",
    whereYourMoneyGoes:
      "Ongshi is volunteer-led. Your donation funds programs on the ground — not overhead.",
    featuredStats: impactStats
      .filter((s) => s.showOnHome)
      .map((s) => ({ _type: "reference", _ref: s._id })),
  };

  await seedPublishedAndDraft(donatePage);

  console.log("Done. homePage and siteSettings have matching published + draft documents.");
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
