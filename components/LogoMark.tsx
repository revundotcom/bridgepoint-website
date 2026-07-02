import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  variant?: "dark" | "light";
};

export default function LogoMark({ className, variant = "dark" }: Props) {
  const tealStart = "#0ca7b4";
  const tealMid = "#29cbd0";
  const tealEnd = "#45e4eb";
  const navyStart = variant === "light" ? "#FFFFFF" : "#05283f";
  const navyMid = variant === "light" ? "#FFFFFF" : "#073a59";
  const navyEnd = variant === "light" ? "#FFFFFF" : "#0d5578";

  const gradId = variant === "light" ? "bpLightMark" : "bpDarkMark";

  return (
    <svg
      viewBox="80 200 530 580"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-9 w-9", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${gradId}-teal`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor={tealStart} />
          <stop offset="0.55" stopColor={tealMid} />
          <stop offset="1" stopColor={tealEnd} />
        </linearGradient>
        <linearGradient id={`${gradId}-navy`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor={navyStart} />
          <stop offset="0.55" stopColor={navyMid} />
          <stop offset="1" stopColor={navyEnd} />
        </linearGradient>
      </defs>
      <polygon points="90,285 150,285 315,548 258,612" fill={`url(#${gradId}-teal)`} />
      <polygon
        points="165,285 232,285 330,430 408,260 492,260 332,565"
        fill={`url(#${gradId}-navy)`}
      />
      <polygon points="505,215 592,215 260,760 168,760" fill={`url(#${gradId}-teal)`} />
      <polygon
        points="426,555 550,760 456,760 374,621"
        fill={`url(#${gradId}-navy)`}
        opacity="0.98"
      />
      <polygon points="388,601 458,760 548,760 430,555" fill={`url(#${gradId}-teal)`} />
    </svg>
  );
}
