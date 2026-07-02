import Image from "next/image";
import Link from "next/link";

import { TextLink } from "@/components/ui/TextLink";
import type { ProgramCard } from "@/lib/fallbacks/program";

export function ProgramIndexCard({ program }: { program: ProgramCard }) {
  const href = `/our-work/${program.slug}`;
  const showGiftBadge = Boolean(program.suggestedGift);

  if (showGiftBadge) {
    return (
      <article className="relative flex flex-col justify-end overflow-hidden rounded-[18px] border border-green-deep bg-green-deep text-white">
        {program.imageUrl ? (
          <div className="relative aspect-[3/2] w-full">
            <Image
              src={program.imageUrl}
              alt={program.imageAlt ?? program.title}
              fill
              className="object-cover opacity-35"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        ) : null}
        <div className="relative flex flex-1 flex-col p-6 md:p-8">
          <div
            className="absolute -right-10 -top-10 h-40 w-40 rounded-full border-[14px] border-white/10"
            aria-hidden
          />
          {program.suggestedGift ? (
            <span className="mb-4 inline-block w-fit rounded-full bg-white/16 px-3 py-1 text-[0.78rem] font-bold tracking-wide">
              {program.suggestedGift}
            </span>
          ) : null}
          <h3 className="font-display text-[1.4rem] font-semibold">
            <Link href={href} className="hover:underline">
              {program.title}
            </Link>
          </h3>
          <p className="mt-2 flex-1 text-[0.98rem] opacity-92">{program.summary}</p>
          <TextLink href={href} light className="mt-5">
            View program
          </TextLink>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-[18px] border border-line bg-white transition duration-200 hover:-translate-y-1 hover:shadow-[0_22px_44px_-24px_rgba(20,40,20,0.4)]">
      {program.imageUrl ? (
        <Link href={href} className="relative block aspect-[3/2] overflow-hidden">
          <Image
            src={program.imageUrl}
            alt={program.imageAlt ?? program.title}
            fill
            className="object-cover transition duration-400 group-hover:scale-[1.04]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </Link>
      ) : null}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-[1.4rem] font-semibold">
          <Link href={href} className="text-ink hover:text-green-deep">
            {program.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-[0.98rem] text-muted">{program.summary}</p>
        <TextLink href={href} className="mt-4">
          View program
        </TextLink>
      </div>
    </article>
  );
}
