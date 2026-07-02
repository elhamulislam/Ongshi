import type { PortableTextBlock } from "@portabletext/types";

import { PortableTextContent } from "@/components/portable-text/PortableTextContent";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Wrap } from "@/components/ui/Wrap";
import type { ProgramData } from "@/lib/fallbacks/program";

export function ProgramTextSections({
  theNeed,
  whatWeDo,
}: {
  theNeed?: ProgramData["theNeed"];
  whatWeDo?: ProgramData["whatWeDo"];
}) {
  const hasNeed = Array.isArray(theNeed) && theNeed.length > 0;
  const hasWhatWeDo = Array.isArray(whatWeDo) && whatWeDo.length > 0;

  if (!hasNeed && !hasWhatWeDo) {
    return null;
  }

  return (
    <>
      {hasNeed ? (
        <section className="pt-14 pb-14 md:pt-20 md:pb-24">
          <Wrap>
            <div className="max-w-[720px]">
              <Eyebrow>The need</Eyebrow>
              <PortableTextContent
                value={theNeed as PortableTextBlock[]}
                className="mt-5"
              />
            </div>
          </Wrap>
        </section>
      ) : null}

      {hasWhatWeDo ? (
        <section className="bg-green-tint py-14 md:py-24">
          <Wrap>
            <div className="max-w-[720px]">
              <Eyebrow>What we do</Eyebrow>
              <PortableTextContent
                value={whatWeDo as PortableTextBlock[]}
                className="mt-5"
              />
            </div>
          </Wrap>
        </section>
      ) : null}
    </>
  );
}
