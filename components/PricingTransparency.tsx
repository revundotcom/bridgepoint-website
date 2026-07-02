import { DollarSign, FileText, ShieldCheck, Receipt } from "lucide-react";

const ITEMS = [
  {
    Icon: DollarSign,
    k: "$0",
    title: "Dispatch fee waived",
    body: "When you proceed with the recommended repair, our dispatch fee is applied as a credit toward the work. no fee, no obligation.",
  },
  {
    Icon: FileText,
    k: "Free",
    title: "Estimates on installs",
    body: "Furnace, AC, water-heater, panel-upgrade, and HVAC installation estimates are free, on-site, and good for 30 days.",
  },
  {
    Icon: Receipt,
    k: "Upfront",
    title: "Flat-rate pricing",
    body: "Repair pricing is quoted before work begins. never per-hour billing surprises after the fact.",
  },
  {
    Icon: ShieldCheck,
    k: "Guarantee",
    title: "Workmanship warranty",
    body: "Repairs covered by Bridgepoint workmanship warranty. Manufacturer warranties pass through on parts.",
  },
];

export default function PricingTransparency() {
  return (
    <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
      {ITEMS.map(({ Icon, k, title, body }) => (
        <li
          key={title}
          className="group relative overflow-hidden rounded-2xl border border-steel-100 bg-white p-7 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card"
        >
          <div
            aria-hidden
            className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-accent/10 blur-2xl transition-opacity group-hover:opacity-60 opacity-30"
          />
          <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-cyan-700 mb-5">
            <Icon className="h-6 w-6" />
          </span>
          <p className="relative font-display text-3xl font-bold text-navy leading-none mb-2">
            {k}
          </p>
          <p className="relative font-display text-base font-semibold text-navy mb-2">
            {title}
          </p>
          <p className="relative text-sm text-steel-500 leading-relaxed">
            {body}
          </p>
        </li>
      ))}
    </ul>
  );
}
