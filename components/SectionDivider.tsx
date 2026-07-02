import { cn } from "@/lib/cn";

type Variant = "dotgrid" | "diagonal" | "wave" | "fade-cyan" | "fade-navy";

type Props = {
  variant?: Variant;
  /** Color of the section ABOVE the divider */
  from?: "white" | "cream" | "steel" | "navy";
  /** Color of the section BELOW the divider */
  to?: "white" | "cream" | "steel" | "navy";
  className?: string;
};

const COLOR_MAP: Record<NonNullable<Props["from"]>, string> = {
  white: "#FFFFFF",
  cream: "#FFF9F6",
  steel: "#F5F6F8",
  navy: "#03101F",
};

/**
 * Section divider with personality. Three distinct decorative transitions
 * used at section boundaries for visual rhythm without breaking layout.
 *
 * - dotgrid: cyan dot grid panel between sections
 * - diagonal: angled navy slash with cyan accent
 * - wave: SVG cyan curve
 * - fade-cyan: gradient fade with cyan glow line
 * - fade-navy: gradient fade with navy slate line
 */
export default function SectionDivider({
  variant = "dotgrid",
  from = "white",
  to = "white",
  className,
}: Props) {
  const fromHex = COLOR_MAP[from];
  const toHex = COLOR_MAP[to];

  if (variant === "diagonal") {
    return (
      <div
        aria-hidden
        className={cn("relative h-16 md:h-24 overflow-hidden", className)}
        style={{ backgroundColor: toHex }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: fromHex,
            clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "linear-gradient(115deg, transparent 48%, rgba(35,189,200,0.85) 49%, rgba(35,189,200,0.85) 50%, transparent 51%)",
          }}
        />
      </div>
    );
  }

  if (variant === "wave") {
    return (
      <div
        aria-hidden
        className={cn("relative h-14 md:h-20 overflow-hidden", className)}
        style={{ backgroundColor: toHex }}
      >
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <path
            d="M0,0 L1440,0 L1440,40 C1080,80 720,0 360,40 C180,60 90,30 0,50 Z"
            fill={fromHex}
          />
          <path
            d="M0,40 C360,80 720,0 1080,40 C1260,60 1350,30 1440,40"
            fill="none"
            stroke="#23BDC8"
            strokeWidth="2"
            strokeOpacity="0.4"
          />
        </svg>
      </div>
    );
  }

  if (variant === "fade-cyan") {
    return (
      <div
        aria-hidden
        className={cn("relative h-12 md:h-16", className)}
        style={{
          background: `linear-gradient(180deg, ${fromHex} 0%, ${toHex} 100%)`,
        }}
      >
        <div className="absolute left-1/2 top-1/2 h-px w-32 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      </div>
    );
  }

  if (variant === "fade-navy") {
    return (
      <div
        aria-hidden
        className={cn("relative h-12 md:h-16", className)}
        style={{
          background: `linear-gradient(180deg, ${fromHex} 0%, ${toHex} 100%)`,
        }}
      >
        <div className="absolute left-1/2 top-1/2 h-px w-24 -translate-x-1/2 -translate-y-1/2 bg-navy-200" />
      </div>
    );
  }

  // dotgrid variant (default)
  return (
    <div
      aria-hidden
      className={cn("relative h-14 md:h-20 overflow-hidden", className)}
      style={{
        background: `linear-gradient(180deg, ${fromHex} 0%, ${toHex} 100%)`,
      }}
    >
      <div className="absolute inset-0 dot-grid-cyan opacity-50" />
      <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
    </div>
  );
}
