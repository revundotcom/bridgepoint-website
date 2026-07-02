import Link from "next/link";
import { ArrowRight, BadgePercent, Calendar, ShieldCheck } from "lucide-react";

const PARTNERS: { label: string; sub: string }[] = [
  { label: "Snap", sub: "Lease-to-own equipment" },
  { label: "Affirm", sub: "Pay-over-time installs" },
  { label: "FinanceIt", sub: "0% promotional" },
];

const POINTS: { Icon: React.ComponentType<{ className?: string }>; label: string; sub: string }[] = [
  { Icon: BadgePercent, label: "0% APR", sub: "On qualifying installs" },
  { Icon: Calendar, label: "12-60 months", sub: "Flexible terms" },
  { Icon: ShieldCheck, label: "Soft-pull", sub: "Won't ding your credit" },
];

export default function FinancingOptions() {
  return (
    <div className="rounded-3xl border border-steel-100 bg-white p-7 shadow-soft">
      <p className="eyebrow text-cyan-800 mb-2">
        <BadgePercent className="h-3.5 w-3.5" />
        Financing
      </p>
      <h3 className="font-display text-2xl font-bold text-navy mb-2 leading-tight">
        Pay over time. 0% APR for qualifying installs.
      </h3>
      <p className="text-sm text-steel-600 leading-relaxed mb-5">
        Furnace, AC, water-heater, panel-upgrade, EV-charger and more. Pre-qualify in under two minutes with a soft-pull check.
      </p>
      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {POINTS.map(({ Icon, label, sub }) => (
          <li
            key={label}
            className="flex items-center gap-3 rounded-2xl border border-steel-100 bg-steel-50/50 p-4"
          >
            <span className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-700">
              <Icon className="h-4 w-4" />
            </span>
            <div>
              <div className="font-display text-sm font-bold text-navy leading-none mb-1">
                {label}
              </div>
              <div className="text-[0.7rem] text-steel-500 leading-snug">{sub}</div>
            </div>
          </li>
        ))}
      </ul>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-800 mb-3">
        Financing partners
      </p>
      <ul className="flex flex-wrap gap-2 mb-5">
        {PARTNERS.map(({ label, sub }) => (
          <li
            key={label}
            className="inline-flex flex-col rounded-2xl border border-steel-100 bg-white px-4 py-2"
          >
            <span className="font-display text-sm font-bold text-navy">{label}</span>
            <span className="text-[0.65rem] text-steel-500">{sub}</span>
          </li>
        ))}
      </ul>
      <Link
        href="/contact"
        className="inline-flex items-center gap-1.5 rounded-full bg-cyan-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-cyan-800 transition"
      >
        Pre-qualify
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
      <p className="mt-3 text-[0.7rem] text-steel-500 leading-snug">
        Subject to credit approval through our financing partner. Promotional terms vary by program.
      </p>
    </div>
  );
}
