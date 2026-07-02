import {
  NA_FEATURES,
  NA_HEIGHT,
  NA_PINS,
  NA_WIDTH,
  type NaPin,
} from "@/lib/naMap";

export type CoveragePalette = {
  land?: string;
  border?: string;
  borderDashed?: string;
  marker?: string;
  markerRing?: string;
  hqFill?: string;
  hqRing?: string;
  caption?: string;
};

const DEFAULT_PALETTE: Required<CoveragePalette> = {
  land: "#F5F0E5",
  border: "#0F2441",
  borderDashed: "#0F2441",
  marker: "#23BDC8",
  markerRing: "#0F2441",
  hqFill: "#0F2441",
  hqRing: "#23BDC8",
  caption: "#0F2441",
};

type Props = {
  markers?: NaPin[];
  palette?: CoveragePalette;
  caption?: string;
  className?: string;
};

const DEFAULT_CAPTION =
  "Bridgepoint coverage. Active dispatch across Canada and the US.";

export default function RealCoverageMap({
  markers = NA_PINS,
  palette,
  caption = DEFAULT_CAPTION,
  className,
}: Props) {
  const p = { ...DEFAULT_PALETTE, ...(palette ?? {}) };

  return (
    <figure
      className={[
        "relative w-full overflow-hidden rounded-3xl border border-steel-100 bg-cream-100 shadow-soft",
        className ?? "",
      ].join(" ")}
    >
      <svg
        viewBox={`0 0 ${NA_WIDTH} ${NA_HEIGHT}`}
        className="block h-auto w-full"
        role="img"
        aria-label="Bridgepoint Maintenance North America coverage map"
      >
        <defs>
          {/* Subtle drop-shadow for markers */}
          <filter id="bp-pin-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              dx="0"
              dy="1.2"
              stdDeviation="1.2"
              floodColor={p.border}
              floodOpacity="0.3"
            />
          </filter>
        </defs>

        {/* Country fills */}
        <g aria-hidden>
          {NA_FEATURES.map((f) => (
            <path
              key={f.code}
              d={f.d}
              fill={p.land}
              stroke={p.border}
              strokeWidth={0.5}
              strokeLinejoin="round"
            />
          ))}
        </g>

        {/* Dashed US-Canada accent border. We re-stroke the Canada feature
            on top of the US to suggest a soft dashed national divider. */}
        <g aria-hidden>
          {NA_FEATURES.filter((f) => f.code === "CA").map((f) => (
            <path
              key={`${f.code}-dashed`}
              d={f.d}
              fill="none"
              stroke={p.borderDashed}
              strokeOpacity={0.55}
              strokeWidth={0.6}
              strokeDasharray="3 3"
              strokeLinejoin="round"
            />
          ))}
        </g>

        {/* Markers */}
        <g>
          {markers.map((m) => {
            const isHq = !!m.hq;
            const r = isHq ? 7 : 5;
            return (
              <g key={`${m.name}-${m.x}-${m.y}`} filter="url(#bp-pin-shadow)">
                {/* Outer ring */}
                <circle
                  cx={m.x}
                  cy={m.y}
                  r={r + (isHq ? 4 : 3)}
                  fill={isHq ? p.hqRing : p.marker}
                  fillOpacity={isHq ? 0.25 : 0.18}
                />
                <circle
                  cx={m.x}
                  cy={m.y}
                  r={r}
                  fill={isHq ? p.hqFill : p.marker}
                  stroke={isHq ? p.hqRing : p.markerRing}
                  strokeWidth={isHq ? 2 : 1}
                />
                {isHq && (
                  <circle
                    cx={m.x}
                    cy={m.y}
                    r={2.4}
                    fill={p.hqRing}
                  />
                )}
              </g>
            );
          })}
        </g>
      </svg>

      <figcaption
        className="px-5 py-3 text-xs font-semibold tracking-wide sm:px-7 sm:py-4 sm:text-sm"
        style={{ color: p.caption }}
      >
        <span
          className="mr-2 inline-block h-2.5 w-2.5 translate-y-[1px] rounded-full"
          style={{ backgroundColor: p.marker }}
          aria-hidden
        />
        {caption}
      </figcaption>
    </figure>
  );
}
