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
        <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-8">
          {stats.map((stat, index) => (
            <div
              key={`${stat.value}-${stat.label}`}
              className="sm:flex sm:items-center"
            >
              {index > 0 ? (
                <div
                  className="mx-8 hidden h-12 w-px shrink-0 bg-white/16 sm:block"
                  aria-hidden
                />
              ) : null}
              <div className="text-left sm:px-2 sm:text-center">
                <div className="font-display text-[clamp(2.4rem,4vw,3.2rem)] font-bold leading-none text-white">
                  {stat.value}
                </div>
                <div className="mt-2 max-w-[18rem] text-[0.98rem] text-[#CFE6D4] sm:max-w-none">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Wrap>
    </section>
  );
}
