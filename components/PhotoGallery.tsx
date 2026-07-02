import Image from "next/image";
import { ArrowLeftRight, MapPin } from "lucide-react";
import { galleryPairs } from "@/lib/images";

/**
 * Before/after gallery component. Used on /gallery and (compact) on home.
 * Vercel-build tells stripped May 2026: removed framer-motion fade-up entrance
 * + uniform rounded-3xl hover-lift. Editorial restraint.
 */
export default function PhotoGallery({ limit }: { limit?: number }) {
  const pairs = limit ? galleryPairs().slice(0, limit) : galleryPairs();
  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {pairs.map((p, i) => (
        <li
          key={p.before + i}
          className="group overflow-hidden rounded-md border border-steel-100 bg-white shadow-soft transition-colors hover:border-cyan-500"
        >
          <div className="relative aspect-[4/3] grid grid-cols-2 overflow-hidden">
            <figure className="relative">
              <Image
                src={p.before}
                alt={p.beforeAlt}
                fill
                sizes="(min-width: 1024px) 16vw, (min-width: 768px) 25vw, 50vw"
                className="object-cover"
              />
              <figcaption className="absolute top-2 left-2 rounded-full bg-navy-900/85 backdrop-blur px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-wider text-white">
                Before
              </figcaption>
            </figure>
            <figure className="relative border-l-4 border-cyan-500">
              <Image
                src={p.after}
                alt={p.afterAlt}
                fill
                sizes="(min-width: 1024px) 16vw, (min-width: 768px) 25vw, 50vw"
                className="object-cover"
              />
              <figcaption className="absolute top-2 right-2 rounded-full bg-cyan-500/95 backdrop-blur px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-wider text-navy-900">
                After
              </figcaption>
            </figure>
            <span
              aria-hidden
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-soft border border-steel-100"
            >
              <ArrowLeftRight className="h-4 w-4 text-cyan-700" />
            </span>
          </div>
          <div className="p-5">
            <h3 className="font-display text-base font-bold text-navy leading-tight">
              {p.caption}
            </h3>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-steel-500">
              <MapPin className="h-3 w-3" />
              {p.city}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
