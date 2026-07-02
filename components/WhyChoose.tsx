import {
  Zap,
  ShieldCheck,
  Wrench,
  DollarSign,
  Calendar,
  HeartHandshake,
} from "lucide-react";

const REASONS = [
  {
    Icon: Zap,
    title: "Same-day service",
    body: "Most non-emergency requests get booked same-day or next-business-day across the GTA.",
  },
  {
    Icon: DollarSign,
    title: "Upfront pricing",
    body: "Flat-rate quotes before work begins. no per-hour billing surprises after the fact.",
  },
  {
    Icon: ShieldCheck,
    title: "Licensed technicians",
    body: "ESA-licensed electrical, TSSA-licensed gas/HVAC, certified plumbing. credentials on every work order.",
  },
  {
    Icon: Wrench,
    title: "$0 dispatch credit",
    body: "Dispatch fee credited toward the work when you proceed with the recommended repair.",
  },
  {
    Icon: Calendar,
    title: "Financing available",
    body: "0% APR on installs over $1,000 through our financing partner, subject to credit approval.",
  },
  {
    Icon: HeartHandshake,
    title: "Satisfaction guarantee",
    body: "Workmanship warranty on every repair. We make it right or it's not done.",
  },
];

/**
 * "Why choose Bridgepoint" reasons grid.
 * Vercel-build tells stripped May 2026: removed framer-motion fade-up + uniform hover-lift.
 */
export default function WhyChoose() {
  return (
    <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {REASONS.map(({ Icon, title, body }) => (
        <li
          key={title}
          className="group relative flex flex-col rounded-md border border-steel-100 bg-white p-7 shadow-soft transition-colors hover:border-cyan-500"
        >
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-cyan-700 mb-5 transition-colors group-hover:bg-accent group-hover:text-white">
            <Icon className="h-6 w-6" />
          </span>
          <h3 className="font-display text-lg font-bold text-navy mb-2">
            {title}
          </h3>
          <p className="text-sm text-steel-500 leading-relaxed">{body}</p>
        </li>
      ))}
    </ul>
  );
}
