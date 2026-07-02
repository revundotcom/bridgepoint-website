import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  variant?: "dark" | "light";
};

/**
 * Bridgepoint Maintenance v3 refined lockup.
 * Source: /Users/samhabib/Desktop/sam-deliverables/bridgepoint-FINAL-lockup/lockup-color-on-white.svg
 * X mark: solid teal #24c4ca + solid navy #05283f (NO gradient).
 * Type: BRIDGEPOINT (one word, navy, Helvetica Neue Black 900, font-size 180, letter-spacing -8)
 *       MAINTENANCE (navy, weight 500, font-size 62, letter-spacing 32)
 * variant="light" -> wordmark becomes white for use on dark backgrounds.
 */
export default function LogoWordmark({ className, variant = "dark" }: Props) {
  const isLight = variant === "light";
  // On dark backgrounds, the navy parts of the X mark and the wordmark text both flip to white.
  // Teal stays teal because it reads on either background.
  const teal = "#24c4ca";
  const navy = isLight ? "#ffffff" : "#05283f";

  return (
    <svg
      viewBox="0 0 2400 700"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="geometricPrecision"
      className={cn("h-12 w-auto", className)}
      aria-hidden="true"
    >
      {/* X mark: 320px tall, vertically centered. Same polygons as the final approved SVG. */}
      <g transform="translate(-10, 70) scale(0.587)">
        <polygon points="90,285 150,285 315,548 258,612" fill={teal} />
        <polygon
          points="165,285 232,285 330,430 408,260 492,260 332,565"
          fill={navy}
        />
        <polygon points="505,215 592,215 260,760 168,760" fill={teal} />
        <polygon points="426,555 550,760 456,760 374,621" fill={navy} />
        <polygon points="388,601 458,760 548,760 430,555" fill={teal} />
      </g>

      {/* BRIDGEPOINT — single word, navy, Helvetica Neue Black 900 */}
      <text
        x="450"
        y="365"
        fontFamily="'Helvetica Neue','Inter','Avenir Next',Arial,sans-serif"
        fontWeight="900"
        fontSize="180"
        letterSpacing="-8"
        fill={navy}
      >
        BRIDGEPOINT
      </text>

      {/* MAINTENANCE — navy, weight 500, letter-spaced descriptor */}
      <text
        x="455"
        y="475"
        fontFamily="'Helvetica Neue','Inter','Avenir Next',Arial,sans-serif"
        fontWeight="500"
        fontSize="62"
        letterSpacing="32"
        fill={navy}
      >
        MAINTENANCE
      </text>
    </svg>
  );
}
