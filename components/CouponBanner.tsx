import Link from "next/link";
import { Phone, Tag, ArrowRight } from "lucide-react";
import { NAP } from "@/lib/constants";

export default function CouponBanner() {
  return (
    <section className="bg-cyan-700 text-white relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 20%, rgba(255,255,255,0.4) 1px, transparent 1px), radial-gradient(circle at 80% 60%, rgba(255,255,255,0.35) 1px, transparent 1px)",
          backgroundSize: "44px 44px, 56px 56px",
        }}
      />
      <div className="container-bp relative grid grid-cols-1 gap-6 py-10 md:grid-cols-3 md:items-center">
        <div className="md:col-span-2 flex items-start gap-4">
          <span className="inline-flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-white/15 backdrop-blur ring-1 ring-white/20">
            <Tag className="h-6 w-6" />
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/80 mb-1.5">
              Limited-time offer
            </p>
            <h3 className="font-display text-xl md:text-2xl font-bold text-balance leading-tight">
              <span className="bg-white/15 backdrop-blur-sm px-2.5 py-1 rounded-md mr-2">
                $50 off
              </span>
              your first non-emergency service call.
            </h3>
            <p className="mt-2 text-sm text-white/80 leading-relaxed">
              Mention <strong>"BPM-WEB50"</strong> when booking. New customers
              only. One redemption per address. Cannot be combined with other
              offers. Valid on non-emergency service calls only.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2.5 sm:flex-row md:justify-end">
          <a
            href={NAP.phoneTel}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-cyan-700 shadow-soft hover:bg-navy-900 hover:text-white transition"
          >
            <Phone className="h-4 w-4" />
            {NAP.phone}
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/60 px-5 py-3 text-sm font-semibold text-white hover:bg-white hover:text-cyan-700 transition"
          >
            Book online
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
