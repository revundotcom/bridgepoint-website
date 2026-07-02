import {
  ShieldCheck,
  BadgeCheck,
  Award,
  Lock,
  Flame,
  Zap,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/cn";

type Badge = {
  label: string;
  sub: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const BADGES: Badge[] = [
  {
    label: "Licensed",
    sub: "State + provincial trades",
    Icon: ShieldCheck,
  },
  {
    label: "Bonded",
    sub: "Commercial-grade",
    Icon: BadgeCheck,
  },
  {
    label: "TSSA",
    sub: "Gas / HVAC",
    Icon: Flame,
  },
  {
    label: "ESA",
    sub: "Electrical safety",
    Icon: Zap,
  },
  {
    label: "WSIB",
    sub: "Active clearance",
    Icon: Lock,
  },
  {
    label: "AODA",
    sub: "Accessibility ready",
    Icon: Award,
  },
];

type Props = {
  light?: boolean;
  className?: string;
};

export default function TrustBadgeRow({ light = false, className }: Props) {
  return (
    <div
      className={cn(
        "rounded-3xl border p-2 sm:p-3",
        light
          ? "border-white/10 bg-white/[0.04] backdrop-blur"
          : "border-steel-100 bg-white shadow-soft",
        className
      )}
    >
      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-y sm:divide-y-0 sm:divide-x-0 lg:divide-x lg:divide-y-0">
        {BADGES.map(({ label, sub, Icon }, i) => (
          <li
            key={label}
            className={cn(
              "flex items-center gap-3 px-4 py-4",
              light
                ? "divide-white/10 lg:border-white/10"
                : "divide-steel-100 lg:border-steel-100"
            )}
          >
            <span
              className={cn(
                "inline-flex h-10 w-10 flex-none items-center justify-center rounded-xl",
                light
                  ? "bg-white/[0.08] text-cyan-300"
                  : "bg-accent/10 text-cyan-700"
              )}
            >
              <Icon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <div
                className={cn(
                  "font-display text-sm font-bold leading-none mb-1",
                  light ? "text-white" : "text-navy"
                )}
              >
                {label}
              </div>
              <div
                className={cn(
                  "text-[0.7rem] leading-snug truncate",
                  light ? "text-white/75" : "text-steel-500"
                )}
              >
                {sub}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <p
        className={cn(
          "px-4 pb-3 pt-1 text-[0.65rem] uppercase tracking-[0.16em]",
          light ? "text-white/70" : "text-steel-600"
        )}
      >
        Licensed and bonded · ESA + TSSA compliant · License numbers on each work order
      </p>
    </div>
  );
}

// Smaller variant for inline use
export function TrustChips({ light = false }: { light?: boolean }) {
  const chips = [
    { Icon: ShieldCheck, label: "Licensed" },
    { Icon: Building2, label: "Bonded" },
    { Icon: Flame, label: "TSSA" },
    { Icon: Zap, label: "ESA" },
    { Icon: Lock, label: "WSIB" },
  ];
  return (
    <ul className="flex flex-wrap gap-2">
      {chips.map(({ Icon, label }) => (
        <li
          key={label}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold",
            light
              ? "border-white/15 bg-white/[0.04] text-white/85"
              : "border-steel-100 bg-white text-navy"
          )}
        >
          <Icon className="h-3.5 w-3.5 text-cyan-700" />
          {label}
        </li>
      ))}
    </ul>
  );
}
