import type { PortableTextBlock } from "@portabletext/types";

import { PortableTextContent } from "@/components/portable-text/PortableTextContent";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Wrap } from "@/components/ui/Wrap";

export function EventDetails({ details }: { details?: PortableTextBlock[] | null }) {
  if (!details?.length) {
    return null;
  }

  return (
    <section className="border-b border-line py-14 md:py-20">
      <Wrap>
        <div className="max-w-[720px]">
          <Eyebrow>Details</Eyebrow>
          <PortableTextContent value={details} />
        </div>
      </Wrap>
    </section>
  );
}
