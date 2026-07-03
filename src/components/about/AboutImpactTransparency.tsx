import { ImpactStrip } from "@/components/home/ImpactStrip";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Wrap } from "@/components/ui/Wrap";

type ImpactStat = {
  value: string;
  label: string;
};

type AnnualReport = {
  label: string;
  url: string;
};

export function AboutImpactTransparency({
  impactStats,
  transparencyStatement,
  annualReports,
}: {
  impactStats?: ImpactStat[] | null;
  transparencyStatement?: string | null;
  annualReports?: AnnualReport[] | null;
}) {
  const stats = impactStats?.filter((stat) => stat.value && stat.label) ?? [];
  const reports =
    annualReports?.filter((report) => report.label && report.url) ?? [];
  const hasTransparency = Boolean(transparencyStatement) || reports.length > 0;

  if (!stats.length && !hasTransparency) {
    return null;
  }

  return (
    <section id="impact">
      {stats.length ? <ImpactStrip stats={stats} /> : null}
      {hasTransparency ? (
        <div className="border-t border-line bg-green-tint py-14 md:py-20">
          <Wrap>
            <div className="mx-auto max-w-[640px] text-center">
              <Eyebrow>Impact &amp; transparency</Eyebrow>
              {transparencyStatement ? (
                <p className="mt-4 text-[1.05rem] leading-[1.68] text-muted">
                  {transparencyStatement}
                </p>
              ) : null}
              {reports.length ? (
                <ul className="mt-6 flex flex-col items-center gap-3">
                  {reports.map((report) => (
                    <li key={`${report.label}-${report.url}`}>
                      <a
                        href={report.url}
                        className="inline-flex items-center gap-1.5 font-semibold text-green-deep hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {report.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </Wrap>
        </div>
      ) : null}
    </section>
  );
}
