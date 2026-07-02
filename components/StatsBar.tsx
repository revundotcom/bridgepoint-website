"use client";

import { MapPin, Clock, ShieldCheck, Wrench } from "lucide-react";
import Stat from "./Stat";

type Item = {
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number | string }>;
  stat: React.ReactNode;
  label: string;
};

/**
 * Premium stats bar — big editorial typography with tabular numerals.
 * Cyan dividers between desktop columns. Generous spacing.
 */
const ITEMS: Item[] = [
  {
    Icon: MapPin,
    stat: (
      <Stat
        value={200}
        suffix="+"
        label="Cities served"
        sublabel="Across Canada and the US"
        light
        big
      />
    ),
    label: "Cities served",
  },
  {
    Icon: Clock,
    stat: (
      <div className="flex flex-col">
        <div className="font-display font-extrabold tracking-tight text-white leading-none tabular-nums text-stat-lg">
          24/7
        </div>
        <div className="mt-3 text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">
          Live dispatcher
        </div>
        <div className="mt-1.5 text-sm text-white/75 leading-snug">
          Real human answer, not voicemail
        </div>
      </div>
    ),
    label: "Live dispatcher",
  },
  {
    Icon: ShieldCheck,
    stat: (
      <Stat
        value={13}
        suffix=""
        label="Trades under one roof"
        sublabel="Plumbing, Electrical, HVAC, Carpentry, Drywall, Drain, General Repairs, Preventative, Unit Turnovers, Commercial Contracting, Facility, Restoration"
        light
        big
      />
    ),
    label: "Trades",
  },
  {
    Icon: Wrench,
    stat: (
      <div className="flex flex-col">
        <div className="font-display font-extrabold tracking-tight text-white leading-[0.98] text-stat-lg">
          North American
        </div>
        <div className="mt-3 text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">
          Dispatch
        </div>
        <div className="mt-1.5 text-sm text-white/75 leading-snug">
          Continental Canada and US coverage
        </div>
      </div>
    ),
    label: "Dispatch",
  },
];

export default function StatsBar() {
  return (
    <section className="relative bg-navy-800 text-white overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05] grid-bg pointer-events-none"
      />
      {/* Cyan glow accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/4 h-[400px] w-[400px] rounded-full bg-cyan-500/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 right-1/4 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-3xl"
      />
      <div className="container-bp relative grid grid-cols-1 gap-12 py-20 md:py-24 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {ITEMS.map(({ Icon, stat }, i) => (
          <div
            key={i}
            className="relative flex items-start gap-5 lg:border-l lg:first:border-l-0 lg:border-cyan-500/25 lg:pl-8"
          >
            <span className="inline-flex h-14 w-14 flex-none items-center justify-center rounded-md bg-cyan-500/15 ring-1 ring-cyan-300/20 text-cyan-300">
              <Icon className="h-6 w-6" strokeWidth={2} />
            </span>
            <div className="flex-1">{stat}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
