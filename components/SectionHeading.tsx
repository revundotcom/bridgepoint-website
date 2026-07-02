import { cn } from "@/lib/cn";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.24em] mb-5",
            light ? "text-cyan-300" : "text-cyan-800"
          )}
        >
          <span
            className={cn(
              "inline-block h-2 w-2 rounded-full",
              light ? "bg-cyan-300" : "bg-cyan-500"
            )}
          />
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-display font-extrabold text-balance text-display-2",
          light ? "text-white" : "text-navy-700"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 text-base md:text-lg leading-relaxed text-pretty",
            light ? "text-white/85" : "text-steel-700"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
