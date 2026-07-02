import { Eyebrow } from "@/components/ui/Eyebrow";
import { Wrap } from "@/components/ui/Wrap";
import {
  groupProgramsByPillar,
  PILLAR_HEADINGS,
  PILLAR_LABELS,
  type ProgramCard,
} from "@/lib/fallbacks/program";

import { ProgramIndexCard } from "./ProgramIndexCard";

export function OurWorkPrograms({ programs }: { programs: ProgramCard[] }) {
  const groups = groupProgramsByPillar(programs);

  if (groups.length === 0) {
    return null;
  }

  return (
    <>
      {groups.map((group, index) => (
        <section
          key={group.pillar}
          className={index % 2 === 1 ? "border-t border-line bg-green-tint/40" : undefined}
          aria-labelledby={`pillar-${group.pillar}`}
        >
          <Wrap className="py-14 md:py-20">
            <div className="mb-10 max-w-[640px]">
              <Eyebrow>{PILLAR_LABELS[group.pillar]}</Eyebrow>
              <h2
                id={`pillar-${group.pillar}`}
                className="mt-3 font-display text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-tight tracking-tight text-ink"
              >
                {PILLAR_HEADINGS[group.pillar]}
              </h2>
            </div>

            <div
              className={
                group.programs.length === 1
                  ? "max-w-xl"
                  : "grid gap-6 md:grid-cols-2"
              }
            >
              {group.programs.map((program) => (
                <ProgramIndexCard key={program._id} program={program} />
              ))}
            </div>
          </Wrap>
        </section>
      ))}
    </>
  );
}
