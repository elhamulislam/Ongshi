import { TextLink } from "@/components/ui/TextLink";
import { Wrap } from "@/components/ui/Wrap";
import type { StoryAboutLink } from "@/lib/sanity/story";

function getAboutHref(about: StoryAboutLink): string {
  if (about._type === "program") {
    return `/our-work/${about.slug}`;
  }

  return `/events/${about.slug}`;
}

function getAboutLabel(about: StoryAboutLink): string {
  if (about._type === "program") {
    return "Related program";
  }

  return "Related event";
}

export function StoryRelated({ about }: { about?: StoryAboutLink | null }) {
  if (!about?.title || !about.slug) {
    return null;
  }

  return (
    <section className="border-t border-line bg-green-tint/40 py-10 md:py-12">
      <Wrap>
        <div className="max-w-[720px]">
          <p className="text-[0.82rem] font-bold uppercase tracking-[0.14em] text-green-deep">
            {getAboutLabel(about)}
          </p>
          <p className="mt-2 font-display text-[1.35rem] font-semibold text-ink">
            {about.title}
          </p>
          <TextLink href={getAboutHref(about)} className="mt-4">
            View {about._type === "program" ? "program" : "event"}
          </TextLink>
        </div>
      </Wrap>
    </section>
  );
}
