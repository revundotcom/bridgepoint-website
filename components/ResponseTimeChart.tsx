import SectionHeading from "@/components/SectionHeading";

type Bar = {
  label: string;
  trade: string;
  // Average response time in minutes (lower is better, displayed inverted)
  minutes: number;
  benchmark: number;
};

const BARS: Bar[] = [
  { label: "Plumbing", trade: "Plumbing", minutes: 38, benchmark: 96 },
  { label: "Electrical", trade: "Electrical", minutes: 44, benchmark: 110 },
  { label: "HVAC", trade: "HVAC", minutes: 41, benchmark: 102 },
  { label: "General", trade: "General", minutes: 52, benchmark: 124 },
  { label: "Emergency", trade: "Emergency", minutes: 27, benchmark: 88 },
];

const MAX = Math.max(...BARS.map((b) => b.benchmark));

export default function ResponseTimeChart() {
  return (
    <section className="bg-white section">
      <div className="container-bp">
        <SectionHeading
          eyebrow="Operating data"
          title="Average response time by trade."
          description="Bridgepoint dispatch beats independent vendor median response on every trade. Indicative averages on tickets opened in the last rolling quarter, US plus Canada combined."
          align="center"
          className="mb-12"
        />

        <div className="rounded-3xl border border-steel-100 bg-steel-50/60 p-6 sm:p-10 shadow-soft">
          <div className="flex flex-col gap-5">
            {BARS.map((b) => {
              const bpPct = (b.minutes / MAX) * 100;
              const benchPct = (b.benchmark / MAX) * 100;
              return (
                <div key={b.label} className="grid grid-cols-12 items-center gap-3 sm:gap-4">
                  <div className="col-span-3 sm:col-span-2 text-xs sm:text-sm font-semibold text-navy-700">
                    {b.trade}
                  </div>
                  <div className="col-span-9 sm:col-span-10">
                    <div className="relative h-9 w-full rounded-full bg-white border border-steel-100 overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 rounded-full bg-steel-200/80"
                        style={{ width: `${benchPct}%` }}
                        aria-hidden
                      />
                      <div
                        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-700 shadow-cyan-glow"
                        style={{ width: `${bpPct}%` }}
                        aria-hidden
                      />
                      <div className="absolute inset-0 flex items-center justify-between px-3 text-[11px] font-bold uppercase tracking-[0.18em]">
                        <span className="text-white drop-shadow">
                          Bridgepoint {b.minutes}m
                        </span>
                        <span className="text-steel-500">
                          Industry {b.benchmark}m
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col gap-2 border-t border-steel-200/70 pt-5 text-xs text-steel-500 sm:flex-row sm:items-center sm:justify-between">
            <p>
              <span className="inline-block h-2.5 w-2.5 align-middle rounded-full bg-gradient-to-r from-cyan-500 to-cyan-700 mr-2" />
              Bridgepoint dispatch
              <span className="inline-block h-2.5 w-2.5 align-middle rounded-full bg-steel-300 ml-5 mr-2" />
              Independent vendor median
            </p>
            <p className="text-[11px] uppercase tracking-[0.18em] text-steel-500">
              Based on operating data across Canada and the US, rolling quarter
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
