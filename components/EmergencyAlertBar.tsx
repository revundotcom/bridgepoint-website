import { Phone, AlertTriangle } from "lucide-react";
import { NAP } from "@/lib/constants";

export default function EmergencyAlertBar() {
  return (
    <div className="bg-cyan-700 text-white">
      <div className="container-bp flex flex-wrap items-center justify-between gap-2 py-2 text-xs sm:text-sm">
        <span className="flex items-center gap-2 font-semibold">
          <AlertTriangle className="h-3.5 w-3.5 flex-none" aria-hidden />
          24/7 Emergency Service · Active dispatcher answering now
        </span>
        <a
          href={NAP.phoneTel}
          className="flex items-center gap-2 font-bold hover:text-navy-900 transition"
        >
          <Phone className="h-3.5 w-3.5" aria-hidden />
          {NAP.phone}
        </a>
      </div>
    </div>
  );
}
