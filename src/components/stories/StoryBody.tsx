import type { PortableTextBlock } from "@portabletext/types";

import { PortableTextContent } from "@/components/portable-text/PortableTextContent";
import { Wrap } from "@/components/ui/Wrap";

export function StoryBody({ body }: { body: PortableTextBlock[] }) {
  if (!body.length) {
    return null;
  }

  return (
    <section className="py-14 md:py-20">
      <Wrap>
        <div className="max-w-[720px]">
          <PortableTextContent value={body} />
        </div>
      </Wrap>
    </section>
  );
}
