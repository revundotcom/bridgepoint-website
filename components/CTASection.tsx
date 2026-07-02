import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { NAP } from "@/lib/constants";
import { cn } from "@/lib/cn";

type Props = {
  title?: string;
  body?: string;
  variant?: "default" | "emergency";
};

export default function CTASection({
  title = "Ready to set up maintenance across Canada and the US?",
  body = "Talk to a Bridgepoint dispatcher about an emergency, scheduled service, or a portfolio maintenance contract.",
  variant = "default",
}: Props) {
  const isEmergency = variant === "emergency";
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        isEmergency ? "bg-cyan-500" : "bg-navy-gradient"
      )}
    >
      {/* Subtle pattern + cyan glow accents on navy variant */}
      {!isEmergency && (
        <>
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.06] pattern-cross-navy pointer-events-none"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-cyan-500/15 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-cyan-500/12 blur-3xl"
          />
        </>
      )}
      <div className="container-bp relative flex flex-col items-start gap-8 py-20 md:py-24 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          {/* Decorative cyan rule above eyebrow */}
          <div
            aria-hidden
            className={cn(
              "mb-5 h-1 w-14 rounded-full",
              isEmergency ? "bg-navy-700" : "bg-cyan-400"
            )}
          />
          <p
            className={cn(
              "text-xs font-bold uppercase tracking-[0.24em] mb-4",
              isEmergency ? "text-navy-700" : "text-cyan-300"
            )}
          >
            {isEmergency ? "24/7 Emergency Dispatch" : "Get in touch"}
          </p>
          <h2
            className={cn(
              "font-display font-extrabold text-balance text-display-2",
              isEmergency ? "text-navy-700" : "text-white"
            )}
          >
            {title}
          </h2>
          <p
            className={cn(
              "mt-5 text-base md:text-lg max-w-xl leading-relaxed",
              isEmergency ? "text-navy-700/85" : "text-white/85"
            )}
          >
            {body}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row md:items-stretch">
          <a
            href={NAP.phoneTel}
            className={cn(
              "inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-4 text-base font-bold shadow-lg transition active:scale-[0.98]",
              isEmergency
                ? "bg-navy-700 text-white hover:bg-navy-900"
                : "bg-cyan-500 text-navy-700 hover:bg-cyan-400 shadow-cyan-glow-lg"
            )}
          >
            <Phone className="h-5 w-5" />
            <span className="tabular-nums">{NAP.phone}</span>
          </a>
          <Link
            href="/contact"
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-full border-2 px-7 py-4 text-base font-semibold transition active:scale-[0.98]",
              isEmergency
                ? "border-navy-700 text-navy-700 hover:bg-navy-700 hover:text-white"
                : "border-white/60 text-white hover:bg-white hover:text-navy-700"
            )}
          >
            Request service
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
