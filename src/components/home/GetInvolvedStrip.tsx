import { Handshake, GraduationCap } from "lucide-react";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextLink } from "@/components/ui/TextLink";
import { Wrap } from "@/components/ui/Wrap";

export function GetInvolvedStrip() {
  return (
    <section className="bg-green-tint py-14 md:py-24" id="involve">
      <Wrap>
        <div className="mx-auto mb-10 max-w-[640px] text-center">
          <Eyebrow>Beyond giving</Eyebrow>
          <h2 className="mt-3 font-display text-[clamp(1.9rem,3.6vw,2.7rem)] font-semibold leading-tight tracking-tight text-ink">
            Be part of it
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-[18px] border border-line bg-white p-9">
            <div
              className="mb-4 inline-flex h-[46px] w-[46px] items-center justify-center rounded-xl bg-green-tint text-green-deep"
              aria-hidden
            >
              <Handshake className="h-6 w-6" />
            </div>
            <h3 className="font-display text-[1.45rem] font-semibold">Volunteer with us</h3>
            <p className="mt-2 text-muted">
              Lend your time and skills to camps, drives, and events in Austin and beyond.
            </p>
            <TextLink href="/get-involved" className="mt-5">
              Find a way to help
            </TextLink>
          </div>

          <div className="rounded-[18px] border border-line bg-white p-9" id="youth">
            <div
              className="mb-4 inline-flex h-[46px] w-[46px] items-center justify-center rounded-xl bg-[#E7EAFB] text-blue"
              aria-hidden
            >
              <GraduationCap className="h-6 w-6" />
            </div>
            <h3 className="font-display text-[1.45rem] font-semibold">Ongshi Youth</h3>
            <p className="mt-2 text-muted">
              Students lead real service projects — from shoe drives to coat collections — and
              grow as leaders.
            </p>
            <TextLink href="/ongshi-youth" className="mt-5">
              For students &amp; families
            </TextLink>
          </div>
        </div>
      </Wrap>
    </section>
  );
}
