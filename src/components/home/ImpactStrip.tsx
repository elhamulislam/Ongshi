import { Wrap } from "@/components/ui/Wrap";

type ImpactStat = {
  value: string;
  label: string;
};

export function ImpactStrip({ stats }: { stats: ImpactStat[] }) {
  if (!stats.length) {
    return null;
  }

  return (
    <section className="bg-green-ink text-white" aria-label="Our impact">
      <Wrap className="py-9 md:py-12">
        <div className="flex flex-col items-stretch gap-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
          {stats.map((stat, index) => (
            <div key={`${stat.value}-${stat.label}`} className="flex items-center">
              {index > 0 ? (
                <div
                  className="mx-8 hidden h-12 w-px shrink-0 bg-white/16 sm:block"
                  aria-hidden
                />
              ) : null}
              <div className="text-center sm:px-2">
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
