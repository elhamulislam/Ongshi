import Image from "next/image";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { Wrap } from "@/components/ui/Wrap";

export type TeamMemberCard = {
  _id: string;
  name: string;
  role?: string | null;
  photoUrl?: string | null;
  photoAlt?: string | null;
};

export function AboutTeam({ members }: { members: TeamMemberCard[] }) {
  const team = members.filter((member) => member.name);

  if (!team.length) {
    return null;
  }

  return (
    <section className="border-t border-line py-14 md:py-20" id="team">
      <Wrap>
        <div className="mb-10 text-center">
          <Eyebrow>Board &amp; team</Eyebrow>
        </div>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <li
              key={member._id}
              className="overflow-hidden rounded-[18px] border border-line bg-white"
            >
              {member.photoUrl ? (
                <div className="relative aspect-[4/3] bg-green-tint">
                  <Image
                    src={member.photoUrl}
                    alt={member.photoAlt ?? member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ) : null}
              <div className="p-6">
                <h3 className="font-display text-[1.35rem] font-semibold leading-tight text-ink">
                  {member.name}
                </h3>
                {member.role ? (
                  <p className="mt-1.5 text-[0.98rem] text-muted">{member.role}</p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </Wrap>
    </section>
  );
}
