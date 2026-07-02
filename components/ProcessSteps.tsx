import { Phone, Compass, Wrench, ClipboardCheck } from "lucide-react";

const STEPS = [
  {
    n: "01",
    title: "Call dispatch",
    body: "One number, 24/7. Trade-routed intake captures your address, scope, and urgency.",
    Icon: Phone,
  },
  {
    n: "02",
    title: "Trade-routed",
    body: "We dispatch the right licensed trade. plumbing, electrical, HVAC, or general. from our North American service desk.",
    Icon: Compass,
  },
  {
    n: "03",
    title: "Licensed on-site",
    body: "Licensed technicians complete the work with code-compliant repairs and clear on-site documentation.",
    Icon: Wrench,
  },
  {
    n: "04",
    title: "Reported & billed",
    body: "Single billing relationship and consolidated reporting across multifamily, commercial, and institutional portfolios.",
    Icon: ClipboardCheck,
  },
];

export default function ProcessSteps() {
  return (
    <ol className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
      {STEPS.map(({ n, title, body, Icon }) => (
        <li
          key={n}
          className="relative flex flex-col rounded-2xl border border-steel-100 bg-white p-7 shadow-soft"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-800 mb-3">
            Step {n}
          </span>
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-navy mb-5">
            <Icon className="h-6 w-6" aria-hidden />
          </span>
          <h3 className="font-display text-lg font-semibold text-navy mb-2">
            {title}
          </h3>
          <p className="text-sm text-steel-500 leading-relaxed">{body}</p>
        </li>
      ))}
    </ol>
  );
}
