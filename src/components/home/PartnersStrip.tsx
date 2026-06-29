import { Eyebrow } from "@/components/ui/Eyebrow";
import { Wrap } from "@/components/ui/Wrap";

type Partner = {
  _id: string;
  name: string;
  website?: string | null;
};

export function PartnersStrip({ partners }: { partners: Partner[] }) {
  return (
    <section className="py-14 text-center md:py-24" id="about">
      <Wrap>
        <Eyebrow>In partnership with</Eyebrow>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {partners.map((partner, index) => (
            <span key={partner._id} className="contents">
              {index > 0 ? (
                <span className="font-display text-[1.3rem] font-semibold text-[#9b968d]">
                  ·
                </span>
              ) : null}
              {partner.website ? (
                <a
                  href={partner.website}
                  className="font-display text-[1.3rem] font-semibold text-[#9b968d] hover:text-green-deep"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {partner.name}
                </a>
              ) : (
                <span className="font-display text-[1.3rem] font-semibold text-[#9b968d]">
                  {partner.name}
                </span>
              )}
            </span>
          ))}
        </div>
      </Wrap>
    </section>
  );
}
