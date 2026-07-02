import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * Custom tailwind-merge config so that our display + stat font-size utilities
 * are correctly grouped with the built-in `text-{size}` family rather than
 * being misclassified as `text-{color}`. Before this, every section heading
 * that used `cn("text-display-2", "text-navy-700")` silently lost its size,
 * because twMerge thought `text-display-2` was a color and overrode it with
 * the navy class. (Confirmed live: section H2s rendered at default ~16px.)
 */
const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["display-1", "display-2", "display-3", "display-xl", "display-lg", "stat-xl", "stat-lg"] },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
