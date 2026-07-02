import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Crumb = { name: string; href?: string };

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: Crumb[];
  image: string;
  imageAlt?: string;
  align?: "left" | "center";
  size?: "compact" | "default";
  /**
   * "editorial" — full-bleed photo, single left column, restrained navy wash on
   *   left only so the right side of the photo breathes. Use for premium
   *   interior pages that should feel reportage, not boxed.
   * "default" — legacy four-stop navy wash.
   */
  variant?: "default" | "editorial";
  children?: React.ReactNode;
};

export default function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  image,
  imageAlt = "",
  align = "left",
  size = "default",
  variant = "default",
  children,
}: Props) {
  const isEditorial = variant === "editorial";
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 text-white">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className={cn(
          "object-cover",
          isEditorial ? "opacity-65" : "opacity-30"
        )}
      />
      {isEditorial ? (
        <>
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-navy-900/85 via-navy-900/55 to-navy-900/15"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-navy-900/55 via-transparent to-navy-900/20"
          />
        </>
      ) : (
        <>
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800/95 to-navy-700/85"
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.06] grid-bg pointer-events-none"
          />
        </>
      )}
      <div
        className={cn(
          "container-bp relative",
          size === "compact" ? "py-16 lg:py-20" : "py-20 lg:py-28",
          align === "center" && "text-center flex flex-col items-center"
        )}
      >
        {crumbs && crumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-1.5 text-sm text-white/85"
          >
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-cyan-300" />}
                {c.href ? (
                  <Link href={c.href} className="hover:text-cyan-300">
                    {c.name}
                  </Link>
                ) : (
                  <span className="text-white font-semibold">{c.name}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && (
          <p className="eyebrow-light mb-4">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400" />
            {eyebrow}
          </p>
        )}
        <h1
          className={cn(
            "font-display font-bold text-white text-balance leading-[1.05]",
            size === "compact"
              ? "text-3xl md:text-4xl lg:text-5xl"
              : "text-4xl md:text-5xl lg:text-6xl",
            align === "center" ? "max-w-4xl" : "max-w-3xl"
          )}
        >
          {title}
        </h1>
        {description && (
          <p
            className={cn(
              "mt-5 text-lg text-white/85 leading-relaxed text-pretty",
              align === "center" ? "max-w-2xl" : "max-w-2xl"
            )}
          >
            {description}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
