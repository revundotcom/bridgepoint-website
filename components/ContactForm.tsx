"use client";

import { FormEvent, useState } from "react";
import { COMPLIANCE } from "@/lib/constants";
import { SERVICES } from "@/lib/services";
import { trackLead } from "@/components/Analytics";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSending(true);
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("https://rothenbury-contact-api.vercel.app/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brand: "bridgepoint", ...data }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Something went wrong. Please call us.");
      }
      trackLead("contact_form");
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please call 1-855-910-9090.",
      );
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <div
        role="status"
        className="rounded-xl border border-navy/20 bg-navy-50 p-6 text-navy"
      >
        <h3 className="text-lg font-semibold mb-2">Request received</h3>
        <p className="text-sm">
          Thank you. A Bridgepoint dispatcher will contact you shortly. For
          immediate emergencies, please call{" "}
          <a href="tel:+18559109090" className="font-semibold underline">
            1-855-910-9090
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      action="/api/contact"
      method="POST"
      className="grid grid-cols-1 gap-4"
      noValidate
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Full name" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Phone" name="phone" type="tel" required />
        <Field label="City / Service area" name="city" required />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Select label="Service needed" name="service" required>
          {SERVICES.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.shortName}
            </option>
          ))}
          <option value="other">Other / not sure</option>
        </Select>
        <Select label="Urgency" name="urgency" required>
          <option value="emergency">Emergency. dispatch now</option>
          <option value="same-week">Same week</option>
          <option value="scheduled">Scheduled / preventative</option>
          <option value="quote">Quote only</option>
        </Select>
      </div>

      <Select label="Property type" name="propertyType" required>
        <option value="commercial">Commercial</option>
        <option value="multifamily">Multifamily / Condo</option>
        <option value="institutional">Institutional</option>
        <option value="property-management">Property Management Portfolio</option>
        <option value="residential">Residential</option>
      </Select>

      <div>
        <label
          htmlFor="message"
          className="mb-1 block text-sm font-semibold text-navy"
        >
          Tell us what's happening
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full rounded-md border border-steel-200 px-3 py-2 text-sm focus:border-navy focus:outline-none"
        />
      </div>

      <label className="flex items-start gap-2 text-xs text-steel-500">
        <input
          type="checkbox"
          name="caslConsent"
          required
          className="mt-1"
        />
        <span>{COMPLIANCE.casl}</span>
      </label>

      <button
        type="submit"
        disabled={sending}
        className="btn-primary w-full md:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {sending ? "Sending…" : "Request service"}
      </button>

      {error && (
        <p role="alert" className="text-sm font-medium text-emergency">
          {error}
        </p>
      )}

      <p className="text-xs text-steel-500">
        For active emergencies, please call{" "}
        <a href="tel:+18559109090" className="font-semibold text-emergency">
          1-855-910-9090
        </a>{" "}
        directly. fastest response.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1 block text-sm font-semibold text-navy"
      >
        {label}
        {required && <span className="text-emergency"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-md border border-steel-200 px-3 py-2 text-sm focus:border-navy focus:outline-none"
      />
    </div>
  );
}

function Select({
  label,
  name,
  required = false,
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1 block text-sm font-semibold text-navy"
      >
        {label}
        {required && <span className="text-emergency"> *</span>}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        className="w-full rounded-md border border-steel-200 bg-white px-3 py-2 text-sm focus:border-navy focus:outline-none"
        defaultValue=""
      >
        <option value="" disabled>
          Select…
        </option>
        {children}
      </select>
    </div>
  );
}
