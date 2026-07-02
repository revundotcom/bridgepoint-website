import { cn } from "@/lib/cn";

type Props = {
  quote: string;
  attribution?: string;
  role?: string;
  light?: boolean;
  className?: string;
};

/**
 * Editorial pull-quote callout.
 * Cyan accent rule on the left, oversized serif-feel display type,
 * dramatic whitespace, attribution line below.
 */
export default function PullQuote({
  quote,
  attribution,
  role,
  light = false,
  className,
}: Props) {
  return (
    <figure
      className={cn(
        "relative my-14 md:my-20 px-2 md:px-4",
        className
      )}
    >
      <div className="flex gap-6 md:gap-10">
        <div
          aria-hidden
          className="pull-quote-rule w-1 md:w-[3px] flex-none rounded-full self-stretch"
        />
        <div className="flex-1">
          <span
            aria-hidden
            className={cn(
              "block font-display text-[5rem] md:text-[7rem] leading-none mb-2 select-none",
              light ? "text-cyan-300/70" : "text-cyan-500/70"
            )}
          >
            &ldquo;
          </span>
          <blockquote
            className={cn(
              "font-display font-semibold tracking-tight text-balance",
              "text-2xl md:text-3xl lg:text-[2.25rem] leading-[1.18]",
              light ? "text-white" : "text-navy-700"
            )}
            style={{ letterSpacing: "-0.022em" }}
          >
            {quote}
          </blockquote>
          {(attribution || role) && (
            <figcaption
              className={cn(
                "mt-6 flex items-center gap-3 text-sm font-semibold",
                light ? "text-white/85" : "text-navy-700"
              )}
            >
              <span
                aria-hidden
                className="inline-block h-px w-8 bg-cyan-500"
              />
              <span>
                {attribution}
                {role && (
                  <span
                    className={cn(
                      "ml-2 font-normal",
                      light ? "text-white/60" : "text-steel-500"
                    )}
                  >
                    · {role}
                  </span>
                )}
              </span>
            </figcaption>
          )}
        </div>
      </div>
    </figure>
  );
}
