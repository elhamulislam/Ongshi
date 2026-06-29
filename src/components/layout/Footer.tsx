import Link from "next/link";

import { Wrap } from "@/components/ui/Wrap";
import type { SiteSettingsData } from "@/lib/fallbacks/home";

const workLinks = [
  { href: "/our-work/sponsor-an-eye", label: "Sponsor an Eye" },
  { href: "/our-work/sponsor-a-child", label: "Sponsor a Child" },
  { href: "/our-work/sponsor-a-village", label: "Sponsor a Village" },
  { href: "/events", label: "Events" },
];

const involveLinks = (donateUrl: string) => [
  { href: donateUrl, label: "Donate" },
  { href: "/get-involved", label: "Volunteer" },
  { href: "/ongshi-youth", label: "Ongshi Youth" },
  { href: "/get-involved#partner", label: "Partner with us" },
];

export function Footer({
  settings,
  donateUrl,
}: {
  settings: SiteSettingsData;
  donateUrl: string;
}) {
  const email = settings.contactEmail ?? "info@ongshi.org";
  const address = settings.address ?? "Austin, Texas";
  const nonprofitLine =
    settings.nonprofitLine ??
    "Ongshi is a registered 501(c)(3) nonprofit. Donations are tax-deductible.";
  const involve = involveLinks(donateUrl);

  return (
    <footer className="bg-[#211F1C] text-[#cfcbc4]">
      <Wrap className="pb-8 pt-12 md:pt-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <div className="font-display text-[1.7rem] font-bold text-white">
              ongshi<span className="text-green">.</span>
            </div>
            <p className="mt-3 max-w-sm text-[0.95rem] text-[#a8a39b]">
              A volunteer-driven nonprofit and partner in hope — restoring sight,
              rebuilding homes, and raising children across Bangladesh and Austin,
              Texas.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-[0.82rem] font-semibold uppercase tracking-[0.1em] text-[#86827b]">
              Our Work
            </h4>
            <ul className="space-y-2.5">
              {workLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[0.96rem] hover:text-green">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[0.82rem] font-semibold uppercase tracking-[0.1em] text-[#86827b]">
              Get Involved
            </h4>
            <ul className="space-y-2.5">
              {involve.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[0.96rem] hover:text-green">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[0.82rem] font-semibold uppercase tracking-[0.1em] text-[#86827b]">
              Connect
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href={`mailto:${email}`} className="text-[0.96rem] hover:text-green">
                  {email}
                </a>
              </li>
              <li className="text-[0.96rem]">{address}</li>
              {settings.social?.instagram ? (
                <li>
                  <a
                    href={settings.social.instagram}
                    className="text-[0.96rem] hover:text-green"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                </li>
              ) : null}
              {settings.social?.facebook ? (
                <li>
                  <a
                    href={settings.social.facebook}
                    className="text-[0.96rem] hover:text-green"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-2 border-t border-[#34302b] pt-5 text-[0.85rem] text-[#86827b]">
          <span>{nonprofitLine}</span>
          <span>&copy; {new Date().getFullYear()} Ongshi</span>
        </div>
      </Wrap>
    </footer>
  );
}
