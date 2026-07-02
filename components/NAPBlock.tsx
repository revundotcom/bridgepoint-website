import { NAP } from "@/lib/constants";

type Props = { variant?: "default" | "compact" };

export default function NAPBlock({ variant = "default" }: Props) {
  if (variant === "compact") {
    return (
      <div className="rounded-lg border border-steel-200 bg-white p-4 text-sm">
        <p className="font-semibold text-navy mb-1">{NAP.name}</p>
        <p className="text-steel-500">{NAP.address.full}</p>
        <p className="mt-2">
          <a href={NAP.phoneTel} className="text-navy font-semibold hover:underline">
            {NAP.phone}
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-steel-200 bg-white p-6">
      <h3 className="text-lg font-semibold text-navy mb-3">Contact details</h3>
      <dl className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
        <div>
          <dt className="font-semibold text-steel">24/7 Emergency Dispatch</dt>
          <dd>
            <a href={NAP.phoneTel} className="text-emergency font-bold text-xl hover:underline">
              {NAP.phone}
            </a>
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-steel">Service inquiries</dt>
          <dd>
            <a href={`mailto:${NAP.email}`} className="text-navy hover:underline break-all">
              {NAP.email}
            </a>
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-steel">Headquarters</dt>
          <dd className="text-steel-500">
            {NAP.address.line1}
            <br />
            {NAP.address.city}, {NAP.address.region} {NAP.address.postalCode}
            <br />
            {NAP.address.country}
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-steel">Hours</dt>
          <dd className="text-steel-500">
            {NAP.hours.summary}
            <br />
            <span className="text-xs">Office: {NAP.hours.office}</span>
          </dd>
        </div>
      </dl>
    </div>
  );
}
