import { GraduationCap } from "lucide-react";

import { YouthJoinForm } from "@/components/forms/YouthJoinForm";
import { Wrap } from "@/components/ui/Wrap";
import { youthAccentClasses } from "@/components/youth/youthAccent";

import { YouthEyebrow } from "./YouthEyebrow";

const defaultJoinHeadline = "Join Ongshi Youth";
const defaultJoinText =
  "Students sign up here; a coordinator follows up with your parent or guardian.";

export function YouthJoinCta({
  joinHeadline,
  joinText,
}: {
  joinHeadline?: string | null;
  joinText?: string | null;
}) {
  return (
    <section className="border-t border-line bg-[#E7EAFB]/55 py-14 md:py-20" id="join">
      <Wrap>
        <div className="mx-auto max-w-[640px] text-center">
          <div
            className={`mx-auto mb-5 inline-flex h-[52px] w-[52px] items-center justify-center rounded-xl ${youthAccentClasses.iconBg} ${youthAccentClasses.iconText}`}
            aria-hidden
          >
            <GraduationCap className="h-7 w-7" />
          </div>
          <YouthEyebrow>For students &amp; families</YouthEyebrow>
          <h2 className="mt-3 font-display text-[clamp(1.9rem,3.6vw,2.5rem)] font-semibold leading-tight tracking-tight text-ink">
            {joinHeadline ?? defaultJoinHeadline}
          </h2>
          <p className="mt-4 text-[1.05rem] leading-[1.65] text-muted">
            {joinText ?? defaultJoinText}
          </p>
        </div>

        <div className="mx-auto max-w-[640px]">
          <YouthJoinForm />
        </div>
      </Wrap>
    </section>
  );
}
