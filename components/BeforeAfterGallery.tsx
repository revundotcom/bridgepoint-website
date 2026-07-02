"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Layers } from "lucide-react";
import { galleryImages } from "@/lib/images";

export default function BeforeAfterGallery() {
  const items = galleryImages();
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {items.map((item, i) => (
          <motion.figure
            key={item.src}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden rounded-2xl border border-steel-100 bg-steel-50"
          >
            <div className="relative aspect-square overflow-hidden duotone-trades">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Editorial duotone overlay (navy to cyan, color blend) */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-br from-navy-900/45 via-navy-700/25 to-cyan-500/30 mix-blend-color transition-opacity duration-500 group-hover:opacity-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/85 via-navy-900/30 to-transparent" />
              <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-wider text-navy">
                <Layers className="h-3 w-3" />
                Recent job
              </span>
            </div>
            <figcaption className="absolute bottom-3 left-3 right-3 text-xs font-semibold text-white drop-shadow">
              {item.caption}
            </figcaption>
          </motion.figure>
        ))}
      </div>
      <p className="mt-5 text-xs text-steel-600 text-center">
        Recent work from across our service area.
      </p>
    </div>
  );
}
