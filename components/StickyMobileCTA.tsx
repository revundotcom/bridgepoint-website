"use client";

import Link from "next/link";
import { Phone, Wrench } from "lucide-react";
import { useEffect, useState } from "react";
import { NAP } from "@/lib/constants";
import { cn } from "@/lib/cn";

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "lg:hidden fixed bottom-0 inset-x-0 z-40 transition-transform duration-300",
        visible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="grid grid-cols-2 gap-px bg-[#05283f] shadow-elevated">
        <a
          href={NAP.phoneTel}
          className="flex items-center justify-center gap-2 bg-[#24c4ca] px-4 py-3.5 text-sm font-black text-[#05283f]"
        >
          <Phone className="h-4 w-4" />
          Call now
        </a>
        <Link
          href="/contact"
          className="flex items-center justify-center gap-2 bg-[#05283f] px-4 py-3.5 text-sm font-black text-white"
        >
          <Wrench className="h-4 w-4" />
          Book service
        </Link>
      </div>
    </div>
  );
}
