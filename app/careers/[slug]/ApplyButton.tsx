"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, CheckCircle2, Loader2, X } from "lucide-react";

interface Props {
  role: string;
  jobId: string;
  workType: "remote" | "hybrid";
  className?: string;
  variant?: "primary" | "secondary";
}

export default function ApplyButton({
  role,
  jobId,
  workType,
  className = "",
  variant = "primary",
}: Props) {
  const [open, setOpen] = useState(false);

  const triggerBase =
    "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold transition-all whitespace-nowrap";
  const triggerVariant =
    variant === "primary"
      ? "btn-accent shadow-cyan-glow hover:shadow-cyan-glow-lg hover:-translate-y-0.5"
      : "border border-steel-200 bg-white text-navy hover:border-steel-400 hover:bg-steel-50";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`${triggerBase} ${triggerVariant} ${className}`}
      >
        Apply Now
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>

      {open && (
        <ApplyModal
          role={role}
          jobId={jobId}
          workType={workType}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}

function ApplyModal({
  role,
  jobId,
  workType,
  onClose,
}: {
  role: string;
  jobId: string;
  workType: "remote" | "hybrid";
  onClose: () => void;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [errorMsg, setErrorMsg] = useState("");
  const [mounted, setMounted] = useState(false);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [businessType, setBusinessType] = useState("");
  const [hasVehicle, setHasVehicle] = useState("");

  useEffect(() => {
    setMounted(true);
    setNum1(Math.floor(Math.random() * 10) + 1);
    setNum2(Math.floor(Math.random() * 10) + 1);
  }, []);

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    document.documentElement.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
      document.documentElement.classList.remove("overflow-hidden");
    };
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    setFieldErrors({});
    const form = e.currentTarget;
    const fd = new FormData(form);

    const errors: Record<string, string> = {};

    const firstName = fd.get("first_name") as string;
    if (!firstName?.trim()) errors.first_name = "First name is required";

    const lastName = fd.get("last_name") as string;
    if (!lastName?.trim()) errors.last_name = "Last name is required";

    const email = fd.get("email") as string;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address";
    }

    const phone = fd.get("phone") as string;
    if (!phone || !/^\+?[1-9]\d{1,14}$/.test(phone.replace(/[\s()+-]/g, ""))) {
      errors.phone = "Please enter a valid phone number (e.g. +1 416 555 0199)";
    }

    const resume = fd.get("resume") as File | null;
    if (!resume || resume.size === 0) {
      errors.resume = "Please upload a resume";
    }

    if (workType === "remote") {
      const workedFromHome = fd.get("worked_from_home") as string;
      if (!workedFromHome) errors.worked_from_home = "This field is required";

      const noiseCancelling = fd.get("noise_cancelling_headset") as string;
      if (!noiseCancelling) errors.noise_cancelling_headset = "This field is required";

      const ram = fd.get("computer_ram") as string;
      if (!ram) errors.computer_ram = "Computer RAM is required";

      const internet = fd.get("internet_speed") as string;
      if (!internet) errors.internet_speed = "Internet speed is required";
    } else {
      const bType = fd.get("business_type") as string;
      if (!bType) errors.business_type = "This field is required";

      if (bType === "Yes, Sole Proprietorship" || bType === "Yes, Corporation under my name") {
        if (!fd.get("legal_business_name")) errors.legal_business_name = "Business name is required";
        if (!fd.get("business_number")) errors.business_number = "Business Number is required";
      }

      const hasLicense = fd.get("has_drivers_license") as string;
      if (!hasLicense) errors.has_drivers_license = "This field is required";

      const hasVeh = fd.get("has_vehicle") as string;
      if (!hasVeh) errors.has_vehicle = "This field is required";

      if (hasVeh === "Yes") {
        if (!fd.get("vehicle_make")) errors.vehicle_make = "Make is required";
        if (!fd.get("vehicle_model")) errors.vehicle_model = "Model is required";
        if (!fd.get("vehicle_year")) errors.vehicle_year = "Year is required";
        if (!fd.get("vehicle_mileage")) errors.vehicle_mileage = "Mileage is required";
      }

      if (!fd.get("smartphone_model")) errors.smartphone_model = "Smartphone model is required";
    }

    const captchaVal = parseInt(fd.get("captcha") as string, 10);
    if (captchaVal !== num1 + num2) {
      errors.captcha = "Incorrect math verification";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setStatus("idle");
      return;
    }

    // Append hidden fields
    fd.append("job_id", jobId);
    fd.append("source", "bridgepoint");
    fd.set("mobile", phone);

    const baseUrl = process.env.NEXT_PUBLIC_PORTAL_BASE_URL || "https://portal.revun.com";

    try {
      const res = await fetch(`${baseUrl}/api/v1/job-postings/apply`, {
        method: "POST",
        body: fd,
      });
      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.message || data.error || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (!mounted) return null;

  return createPortal(
    <>
      <div
        aria-hidden="true"
        className="fixed inset-0 z-40 bg-navy/70 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="apply-modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pb-8 sm:p-6 sm:pb-6"
      >
        <div className="relative flex w-full max-w-2xl max-h-full sm:max-h-[90vh] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
          <div className="flex shrink-0 items-center justify-between border-b border-steel-100 bg-white px-5 py-4 pt-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-700">
                Apply Now · {jobId}
              </p>
              <h2
                id="apply-modal-title"
                className="mt-0.5 text-lg font-display font-bold text-navy"
              >
                {role}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-steel-400 transition-colors hover:text-navy"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="overflow-y-auto p-5 pb-8">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
                <CheckCircle2 className="h-12 w-12 text-cyan" />
                <h3 className="text-xl font-display font-bold text-navy">
                  Application Received
                </h3>
                <div className="space-y-3 text-sm text-steel-600 max-w-md leading-relaxed">
                  <p>Thank you for applying to Bridgepoint Maintenance.</p>
                  <p>
                    Our recruitment team will review your application and contact you by email or text message if you are approved for the next step.
                  </p>
                  <p className="font-semibold text-navy">
                    Please follow the instructions sent to your email or mobile device.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="btn-primary mt-4"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-steel-700">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="first_name"
                      required
                      className={`w-full rounded-lg border ${fieldErrors.first_name ? "border-red-500" : "border-steel-200"} bg-steel-50 px-3 py-2.5 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                      placeholder="Jane"
                    />
                    {fieldErrors.first_name && <p className="mt-1 text-xs text-red-500">{fieldErrors.first_name}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-steel-700">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="last_name"
                      required
                      className={`w-full rounded-lg border ${fieldErrors.last_name ? "border-red-500" : "border-steel-200"} bg-steel-50 px-3 py-2.5 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                      placeholder="Smith"
                    />
                    {fieldErrors.last_name && <p className="mt-1 text-xs text-red-500">{fieldErrors.last_name}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-steel-700">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      className={`w-full rounded-lg border ${fieldErrors.email ? "border-red-500" : "border-steel-200"} bg-steel-50 px-3 py-2.5 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                      placeholder="you@email.com"
                    />
                    {fieldErrors.email && <p className="mt-1 text-xs text-red-500">{fieldErrors.email}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-steel-700">
                      Mobile <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      required
                      className={`w-full rounded-lg border ${fieldErrors.phone ? "border-red-500" : "border-steel-200"} bg-steel-50 px-3 py-2.5 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                      placeholder="+1 (416) 555-0100"
                    />
                    {fieldErrors.phone && <p className="mt-1 text-xs text-red-500">{fieldErrors.phone}</p>}
                  </div>
                </div>

                {workType === "remote" && (
                  <>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-steel-700">
                          Worked from home for a minimum of 2 years? <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="worked_from_home"
                          required
                          className={`w-full rounded-lg border ${fieldErrors.worked_from_home ? "border-red-500" : "border-steel-200"} bg-steel-50 px-3 py-2.5 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                        >
                          <option value="">Select an option</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        {fieldErrors.worked_from_home && <p className="mt-1 text-xs text-red-500">{fieldErrors.worked_from_home}</p>}
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-steel-700">
                          Own a noise-cancelling headset? <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="noise_cancelling_headset"
                          required
                          className={`w-full rounded-lg border ${fieldErrors.noise_cancelling_headset ? "border-red-500" : "border-steel-200"} bg-steel-50 px-3 py-2.5 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                        >
                          <option value="">Select an option</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        {fieldErrors.noise_cancelling_headset && <p className="mt-1 text-xs text-red-500">{fieldErrors.noise_cancelling_headset}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-steel-700">
                          Your Computer RAM (in GB)? <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            name="computer_ram"
                            type="number"
                            min="1"
                            required
                            className={`w-full rounded-lg border ${fieldErrors.computer_ram ? "border-red-500" : "border-steel-200"} bg-steel-50 px-3 py-2.5 pr-10 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                            placeholder="e.g. 16"
                          />
                          <span className="absolute inset-y-0 right-3 flex items-center text-sm font-semibold text-steel-400 pointer-events-none">
                            GB
                          </span>
                        </div>
                        {fieldErrors.computer_ram && <p className="mt-1 text-xs text-red-500">{fieldErrors.computer_ram}</p>}
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-steel-700">
                          Home internet speed (Download Mbps)? <span className="text-red-500">*</span>
                        </label>
                        <input
                          name="internet_speed"
                          type="number"
                          min="1"
                          required
                          className={`w-full rounded-lg border ${fieldErrors.internet_speed ? "border-red-500" : "border-steel-200"} bg-steel-50 px-3 py-2.5 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                          placeholder="e.g. 100"
                        />
                        {fieldErrors.internet_speed && <p className="mt-1 text-xs text-red-500">{fieldErrors.internet_speed}</p>}
                      </div>
                    </div>
                  </>
                )}

                {workType !== "remote" && (
                  <>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-steel-700">
                        Do you currently operate a business under your name, such as a sole proprietorship, or do you have an incorporated company? <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="business_type"
                        required
                        value={businessType}
                        onChange={(e) => setBusinessType(e.target.value)}
                        className={`w-full rounded-lg border ${fieldErrors.business_type ? "border-red-500" : "border-steel-200"} bg-steel-50 px-3 py-2.5 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                      >
                        <option value="">Select an option</option>
                        <option value="Yes, Sole Proprietorship">Yes, Sole Proprietorship</option>
                        <option value="Yes, Corporation under my name">Yes, Corporation under my name</option>
                        <option value="No">No</option>
                      </select>
                      {fieldErrors.business_type && <p className="mt-1 text-xs text-red-500">{fieldErrors.business_type}</p>}
                    </div>

                    {(businessType === "Yes, Sole Proprietorship" || businessType === "Yes, Corporation under my name") && (
                      <>
                        <div>
                          <label className="mb-1.5 block text-xs font-semibold text-steel-700">
                            Legal Business/Sole Proprietorship Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            name="legal_business_name"
                            type="text"
                            required
                            className={`w-full rounded-lg border ${fieldErrors.legal_business_name ? "border-red-500" : "border-steel-200"} bg-steel-50 px-3 py-2.5 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                            placeholder="Enter business name"
                          />
                          {fieldErrors.legal_business_name && <p className="mt-1 text-xs text-red-500">{fieldErrors.legal_business_name}</p>}
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <label className="mb-1.5 block text-xs font-semibold text-steel-700">
                              WSIB Number (Optional)
                            </label>
                            <input
                              name="wsib_number"
                              type="text"
                              className={`w-full rounded-lg border border-steel-200 bg-steel-50 px-3 py-2.5 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                              placeholder="Enter WSIB Number"
                            />
                          </div>
                          <div>
                            <label className="mb-1.5 block text-xs font-semibold text-steel-700">
                              WSIB Clearance Certificate (Optional)
                            </label>
                            <input
                              name="wsib_certificate"
                              type="file"
                              accept=".pdf,.doc,.docx,.jpg,.png"
                              className="w-full text-xs text-steel-500 file:mr-4 file:rounded-lg file:border-0 file:bg-cyan/10 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-cyan-700 hover:file:bg-cyan/20 cursor-pointer"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <label className="mb-1.5 block text-xs font-semibold text-steel-700">
                              Business Number <span className="text-red-500">*</span>
                            </label>
                            <input
                              name="business_number"
                              type="text"
                              required
                              className={`w-full rounded-lg border ${fieldErrors.business_number ? "border-red-500" : "border-steel-200"} bg-steel-50 px-3 py-2.5 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                              placeholder="Enter Business Number"
                            />
                            {fieldErrors.business_number && <p className="mt-1 text-xs text-red-500">{fieldErrors.business_number}</p>}
                          </div>
                          <div>
                            <label className="mb-1.5 block text-xs font-semibold text-steel-700">
                              HST Number (Optional)
                            </label>
                            <input
                              name="hst_number"
                              type="text"
                              className="w-full rounded-lg border border-steel-200 bg-steel-50 px-3 py-2.5 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-cyan-500"
                              placeholder="Enter HST Number"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-steel-700">
                          Do you have a valid driver's license? <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="has_drivers_license"
                          required
                          className={`w-full rounded-lg border ${fieldErrors.has_drivers_license ? "border-red-500" : "border-steel-200"} bg-steel-50 px-3 py-2.5 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                        >
                          <option value="">Select an option</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        {fieldErrors.has_drivers_license && <p className="mt-1 text-xs text-red-500">{fieldErrors.has_drivers_license}</p>}
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-steel-700">
                          Do you currently have a reliable vehicle? <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="has_vehicle"
                          required
                          value={hasVehicle}
                          onChange={(e) => setHasVehicle(e.target.value)}
                          className={`w-full rounded-lg border ${fieldErrors.has_vehicle ? "border-red-500" : "border-steel-200"} bg-steel-50 px-3 py-2.5 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                        >
                          <option value="">Select an option</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        {fieldErrors.has_vehicle && <p className="mt-1 text-xs text-red-500">{fieldErrors.has_vehicle}</p>}
                      </div>
                    </div>

                    {hasVehicle === "Yes" && (
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-1.5 block text-xs font-semibold text-steel-700">
                            Vehicle Make <span className="text-red-500">*</span>
                          </label>
                          <input
                            name="vehicle_make"
                            type="text"
                            required
                            className={`w-full rounded-lg border ${fieldErrors.vehicle_make ? "border-red-500" : "border-steel-200"} bg-steel-50 px-3 py-2.5 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                            placeholder="e.g. Ford"
                          />
                          {fieldErrors.vehicle_make && <p className="mt-1 text-xs text-red-500">{fieldErrors.vehicle_make}</p>}
                        </div>
                        <div>
                          <label className="mb-1.5 block text-xs font-semibold text-steel-700">
                            Vehicle Model <span className="text-red-500">*</span>
                          </label>
                          <input
                            name="vehicle_model"
                            type="text"
                            required
                            className={`w-full rounded-lg border ${fieldErrors.vehicle_model ? "border-red-500" : "border-steel-200"} bg-steel-50 px-3 py-2.5 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                            placeholder="e.g. Transit"
                          />
                          {fieldErrors.vehicle_model && <p className="mt-1 text-xs text-red-500">{fieldErrors.vehicle_model}</p>}
                        </div>
                        <div>
                          <label className="mb-1.5 block text-xs font-semibold text-steel-700">
                            Vehicle Year <span className="text-red-500">*</span>
                          </label>
                          <input
                            name="vehicle_year"
                            type="number"
                            required
                            className={`w-full rounded-lg border ${fieldErrors.vehicle_year ? "border-red-500" : "border-steel-200"} bg-steel-50 px-3 py-2.5 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                            placeholder="e.g. 2020"
                          />
                          {fieldErrors.vehicle_year && <p className="mt-1 text-xs text-red-500">{fieldErrors.vehicle_year}</p>}
                        </div>
                        <div>
                          <label className="mb-1.5 block text-xs font-semibold text-steel-700">
                            Approximate Mileage <span className="text-red-500">*</span>
                          </label>
                          <input
                            name="vehicle_mileage"
                            type="text"
                            required
                            className={`w-full rounded-lg border ${fieldErrors.vehicle_mileage ? "border-red-500" : "border-steel-200"} bg-steel-50 px-3 py-2.5 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                            placeholder="e.g. 80,000"
                          />
                          {fieldErrors.vehicle_mileage && <p className="mt-1 text-xs text-red-500">{fieldErrors.vehicle_mileage}</p>}
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-steel-700">
                        What is your current smartphone model? <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="smartphone_model"
                        type="text"
                        required
                        className={`w-full rounded-lg border ${fieldErrors.smartphone_model ? "border-red-500" : "border-steel-200"} bg-steel-50 px-3 py-2.5 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                        placeholder="e.g. iPhone 14 Pro, Samsung Galaxy S23"
                      />
                      {fieldErrors.smartphone_model && <p className="mt-1 text-xs text-red-500">{fieldErrors.smartphone_model}</p>}
                    </div>
                  </>
                )}

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-steel-700">
                    Resume / CV <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="resume"
                    type="file"
                    required
                    accept=".pdf,.doc,.docx"
                    className={`w-full rounded-lg border ${fieldErrors.resume ? "border-red-500" : "border-steel-200"} bg-steel-50 px-3 py-2.5 text-sm text-navy file:mr-4 file:rounded-lg file:border-0 file:bg-cyan/10 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-cyan-700 hover:file:bg-cyan/20 cursor-pointer`}
                  />
                  {fieldErrors.resume && <p className="mt-1 text-xs text-red-500">{fieldErrors.resume}</p>}
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-steel-700">
                    Human Verification: What is {num1} + {num2}? <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="captcha"
                    type="number"
                    required
                    className={`w-full rounded-lg border ${fieldErrors.captcha ? "border-red-500" : "border-steel-200"} bg-steel-50 px-3 py-2.5 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                    placeholder="Enter the sum"
                  />
                  {fieldErrors.captcha && <p className="mt-1 text-xs text-red-500">{fieldErrors.captcha}</p>}
                </div>

                {status === "error" && (
                  <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-xs text-red-600">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-accent w-full flex items-center justify-center gap-2 disabled:opacity-60 py-3 rounded-xl font-bold"
                >
                  {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
                  {status === "loading" ? "Submitting..." : "Submit Application"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}
