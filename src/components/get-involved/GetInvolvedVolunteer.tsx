import { Handshake } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Wrap } from "@/components/ui/Wrap";

const defaultVolunteerHeadline = "Volunteer with us";
const defaultVolunteerText =
  "Lend your time and skills to camps, drives, and events in Austin and beyond.";

export function GetInvolvedVolunteer({
  volunteerHeadline,
  volunteerText,
  volunteerFormUrl,
}: {
  volunteerHeadline?: string | null;
  volunteerText?: string | null;
  volunteerFormUrl?: string | null;
}) {
  if (!volunteerFormUrl) {
    return null;
  }

  return (
    <section className="border-t border-line bg-green-tint py-14 md:py-20" id="volunteer">
      <Wrap>
        <div className="mx-auto max-w-[640px] text-center">
          <div
            className="mx-auto mb-5 inline-flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-white text-green-deep"
            aria-hidden
          >
            <Handshake className="h-7 w-7" />
          </div>
          <Eyebrow>Volunteer</Eyebrow>
          <h2 className="mt-3 font-display text-[clamp(1.9rem,3.6vw,2.5rem)] font-semibold leading-tight tracking-tight text-ink">
            {volunteerHeadline ?? defaultVolunteerHeadline}
          </h2>
          <p className="mt-4 text-[1.05rem] leading-[1.65] text-muted">
            {volunteerText ?? defaultVolunteerText}
          </p>
          <div className="mt-8">
            <Button href={volunteerFormUrl} variant="ghost">
              Sign up
            </Button>
          </div>
        </div>
      </Wrap>
    </section>
  );
}
