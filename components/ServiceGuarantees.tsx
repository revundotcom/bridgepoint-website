import { ShieldCheck, Clock, Receipt, BadgeCheck } from "lucide-react";

const PROMISES = [
  {
    Icon: ShieldCheck,
    title: "100% workmanship guarantee",
    body: "Repairs covered by the Bridgepoint workmanship warranty. Manufacturer warranties pass through on parts.",
  },
  {
    Icon: Clock,
    title: "Same-day appointments",
    body: "Most non-emergency requests get a same-day or next-day window during business hours. Emergencies dispatch 24/7.",
  },
  {
    Icon: Receipt,
    title: "Upfront flat-rate pricing",
    body: "Repair pricing quoted before work begins. No per-hour billing surprises after the fact.",
  },
  {
    Icon: BadgeCheck,
    title: "Licensed Master techs",
    body: "ESA, TSSA, WSIB. Specific license numbers documented on every work order.",
  },
];

export default function ServiceGuarantees() {
  return (
    <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
      {PROMISES.map(({ Icon, title, body }) => (
        <li
          key={title}
          className="group relative overflow-hidden rounded-md border border-steel-100 bg-white p-7 shadow-soft transition-colors hover:border-cyan-500"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-cyan-500/10 blur-2xl opacity-30 transition-opacity group-hover:opacity-60"
          />
          <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-700 mb-5">
            <Icon className="h-6 w-6" />
          </span>
          <p className="relative font-display text-base font-semibold text-navy mb-2 leading-tight">
            {title}
          </p>
          <p className="relative text-sm text-steel-500 leading-relaxed">{body}</p>
        </li>
      ))}
    </ul>
  );
}
