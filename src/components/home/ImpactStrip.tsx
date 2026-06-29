import { Wrap } from "@/components/ui/Wrap";
import type { HomeStat } from "@/lib/fallbacks/home";

export function ImpactStrip({ stats }: { stats: HomeStat[] }) {
  return (
    <section className="bg-green-ink text-white" aria-label="Our impact">
      <Wrap className="py-9 md:py-12">
        <div className="grid grid-cols-1 gap-6 text-center sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
          {stats.map((stat, index) => (
            <div key={`${stat.value}-${stat.label}`} className="contents">
              {index > 0 ? (
                <div
                  className="hidden h-full w-px bg-white/16 sm:block"
                  aria-hidden
                />
              ) : null}
              <div>
                <div className="font-display text-[clamp(2.4rem,4vw,3.2rem)] font-bold leading-none text-white">
                  {stat.value}
                </div>
                <div className="mt-2 text-[0.98rem] text-[#CFE6D4]">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </Wrap>
    </section>
  );
}
