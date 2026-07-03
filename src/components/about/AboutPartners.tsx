import Image from "next/image";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { Wrap } from "@/components/ui/Wrap";

export type PartnerCard = {
  _id: string;
  name: string;
  website?: string | null;
  logoUrl?: string | null;
  logoAlt?: string | null;
};

export function AboutPartners({ partners }: { partners: PartnerCard[] }) {
  const items = partners.filter((partner) => partner.name && partner.logoUrl);

  if (!items.length) {
    return null;
  }

  return (
    <section className="border-t border-line bg-green-tint py-14 md:py-20" id="partners">
      <Wrap>
        <div className="mb-10 text-center">
          <Eyebrow>Partners</Eyebrow>
        </div>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8">
          {items.map((partner) => (
            <li key={partner._id}>
              {partner.website ? (
                <a
                  href={partner.website}
                  className="block rounded-lg transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-3 focus-visible:outline-blue focus-visible:outline-offset-4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={partner.logoUrl!}
                    alt={partner.logoAlt ?? partner.name}
                    width={160}
                    height={64}
                    className="h-14 w-auto max-w-[160px] object-contain"
                  />
                </a>
              ) : (
                <Image
                  src={partner.logoUrl!}
                  alt={partner.logoAlt ?? partner.name}
                  width={160}
                  height={64}
                  className="h-14 w-auto max-w-[160px] object-contain"
                />
              )}
            </li>
          ))}
        </ul>
      </Wrap>
    </section>
  );
}
