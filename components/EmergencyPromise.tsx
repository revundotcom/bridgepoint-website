import { Clock, ShieldCheck, Wrench, Wind, Zap, Droplet, Waves, Hammer } from "lucide-react";
import { NAP } from "@/lib/constants";
import { Phone } from "lucide-react";

/**
 * EmergencyPromise. The 90-minute promise + trade-specific emergency callouts.
 * Reinforces that the 24/7 dispatch covers more than HVAC.
 */
const TRADES = [
  { Icon: Wrench, label: "Burst pipe" },
  { Icon: Wind, label: "No heat" },
  { Icon: Wind, label: "No AC" },
  { Icon: Zap, label: "Power loss" },
  { Icon: Waves, label: "Sewer backup" },
  { Icon: Droplet, label: "Flood / water damage" },
  { Icon: Hammer, label: "Lock-out / hardware" },
];

export default function EmergencyPromise() {
  return (
    <section className="relative overflow-hidden bg-cyan-800 text-white">
      <span
        aria-hidden
        className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-white/15 blur-3xl"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] grid-bg"
      />
      <div className="container-bp relative py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              Bridgepoint promise
            </div>
            <h2 className="mt-4 font-display text-3xl md:text-4xl font-bold leading-tight tracking-tight text-balance text-white">
              Tech at your door in 90 minutes for emergencies. Or the dispatch
              fee comes back.
            </h2>
            <p className="mt-4 max-w-xl text-base text-white/85 leading-relaxed">
              Active emergency? Call dispatch and we route the right trade. We
              quote the dispatch fee up front. If we miss the 90-minute window
              inside the GTA, we credit it back on your invoice.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={NAP.phoneTel}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-cyan-700 shadow-soft transition hover:bg-cyan-50"
              >
                <Phone className="h-4 w-4" />
                Call dispatch · {NAP.phone}
              </a>
              <span className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/[0.05] px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/85">
                <Clock className="h-3.5 w-3.5" />
                24/7. live dispatcher
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-white/20 bg-white/[0.06] p-6 backdrop-blur">
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-white/80 mb-4">
                Emergency dispatched 24/7 for
              </p>
              <ul className="grid grid-cols-2 gap-2.5">
                {TRADES.map(({ Icon, label }) => (
                  <li
                    key={label}
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-xs font-semibold text-white"
                  >
                    <Icon className="h-3.5 w-3.5 flex-none text-cyan-200" />
                    {label}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] p-3 text-[0.7rem] text-white/75 leading-relaxed">
                <ShieldCheck className="mt-0.5 h-3.5 w-3.5 flex-none text-cyan-200" />
                <span>
                  90-minute window applies to the GTA core. Outside the GTA we
                  give a written ETA on the first call.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
