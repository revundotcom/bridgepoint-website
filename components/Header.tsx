"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight, Menu, Phone, X } from "lucide-react";
import LogoMark from "@/components/LogoMark";
import { BRAND, NAP } from "@/lib/constants";
import { CANADA_PROVINCES, US_STATES } from "@/lib/locations-data";
import { cn } from "@/lib/cn";

type MenuLink = { href: string; label: string; description?: string };

type MenuGroup = {
  label: string;
  href: string;
  hubLabel?: string;
  links: MenuLink[];
  // When set, renders a 2-column mega menu with each column having its own header.
  columns?: {
    title: string;
    allHref: string;
    allLabel: string;
    links: MenuLink[];
  }[];
};

const MENU: MenuGroup[] = [
  {
    label: "Services",
    href: "/services",
    hubLabel: "All services",
    links: [
      { href: "/services/plumbing", label: "Plumbing", description: "Licensed plumbing across residential and commercial." },
      { href: "/services/electrical", label: "Electrical", description: "Panels, circuits, EV chargers, code work." },
      { href: "/services/hvac", label: "HVAC", description: "Furnaces, boilers, AC, heat pumps, RTUs." },
      { href: "/services/carpentry", label: "Carpentry", description: "Doors, trim, framing, mounting." },
      { href: "/services/drywall-and-painting", label: "Drywall and Painting", description: "Patch, finish, prime, paint." },
      { href: "/services/general-repairs", label: "General Repairs", description: "Locks, hardware, fixtures, small jobs." },
      { href: "/services/preventative-maintenance", label: "Preventative Maintenance", description: "Scheduled service across the building." },
      { href: "/services/unit-turnovers", label: "Unit Turnovers", description: "Multi trade turnover for landlords." },
      { href: "/services/commercial-contracting", label: "Commercial Contracting", description: "Tenant improvements and capital work." },
      { href: "/services/tenant-fit-outs", label: "Tenant Fit Outs", description: "Office, retail, industrial build outs." },
      { href: "/services/facility-maintenance", label: "Facility Maintenance", description: "Building wide operational contract." },
      { href: "/services/building-upkeep", label: "Building Upkeep", description: "Envelope, common areas, presentation." },
    ],
  },
  {
    label: "Emergency",
    href: "/emergency",
    hubLabel: "All emergency lines",
    links: [
      { href: "/emergency/plumbing", label: "Emergency Plumbing", description: "Active leaks and ruptured lines." },
      { href: "/emergency/electrical", label: "Emergency Electrical", description: "Power loss, panel failure, exposed wiring." },
      { href: "/emergency/hvac", label: "Emergency HVAC", description: "No heat, no cooling, gas smell." },
      { href: "/emergency/water-damage", label: "Water Damage", description: "Mitigation, drying, rebuild prep." },
      { href: "/emergency/burst-pipes", label: "Burst Pipes", description: "Shutoff, repair, mitigation handoff." },
      { href: "/emergency/no-heat", label: "No Heat", description: "Winter furnace and boiler dispatch." },
      { href: "/emergency/no-cooling", label: "No Cooling", description: "Summer AC and RTU dispatch." },
      { href: "/emergency/no-power", label: "No Power", description: "Whole property outage response." },
      { href: "/emergency/roof-damage", label: "Roof Damage", description: "Dry in, mitigation, rebuild." },
      { href: "/emergency/storm-damage", label: "Storm Damage", description: "Multi trade storm recovery." },
      { href: "/emergency/sewer-backups", label: "Sewer Backups", description: "Clear, contain, biohazard cleanup." },
      { href: "/emergency/boiler-failure", label: "Boiler Failure", description: "Commercial and residential boilers." },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    hubLabel: "All industries",
    links: [
      { href: "/industries/property-managers", label: "Property Managers" },
      { href: "/industries/landlords", label: "Landlords" },
      { href: "/industries/multi-family-buildings", label: "Multi Family Buildings" },
      { href: "/industries/commercial-property-owners", label: "Commercial Property Owners" },
      { href: "/industries/residential-property-owners", label: "Residential Owners" },
      { href: "/industries/retail-and-office", label: "Retail and Office" },
      { href: "/industries/condominium-corporations", label: "Condo Corporations" },
      { href: "/industries/institutional-asset-holders", label: "Institutional Asset Holders" },
      { href: "/industries/real-estate-investors", label: "Real Estate Investors" },
      { href: "/industries/trades-and-subcontractors", label: "Trade Partners" },
    ],
  },
  {
    label: "Service Areas",
    href: "/locations",
    hubLabel: "All service areas",
    // Flat fallback for mobile + any consumer that ignores columns.
    links: [
      ...CANADA_PROVINCES.map((p) => ({
        href: `/locations/${p.slug}`,
        label: p.name,
      })),
      ...US_STATES.map((s) => ({
        href: `/locations/${s.slug}`,
        label: s.name,
      })),
    ],
    columns: [
      {
        title: "Canada",
        allHref: "/locations",
        allLabel: "All of Canada",
        links: CANADA_PROVINCES.map((p) => ({
          href: `/locations/${p.slug}`,
          label: p.name,
        })),
      },
      {
        title: "United States",
        allHref: "/locations",
        allLabel: "All US states",
        links: US_STATES.map((s) => ({
          href: `/locations/${s.slug}`,
          label: s.name,
        })),
      },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    hubLabel: "All resources",
    links: [
      { href: "/resources/blog", label: "Blog" },
      { href: "/resources/maintenance-checklists", label: "Maintenance Checklists" },
      { href: "/resources/seasonal-prep", label: "Seasonal Prep" },
      { href: "/resources/compliance-and-certifications", label: "Compliance and Certifications" },
      { href: "/resources/case-studies", label: "Case Studies" },
    ],
  },
  {
    label: "About",
    href: "/about",
    links: [
      { href: "/about", label: "About Bridgepoint" },
      { href: "/pricing", label: "Pricing" },
      { href: "/reviews", label: "Reviews" },
      { href: "/careers", label: "Careers" },
      { href: "/contact", label: "Contact" },
      { href: "/quote", label: "Request a Quote" },
    ],
  },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-slate-200 bg-white transition-shadow",
        scrolled && "shadow-sm"
      )}
    >
      <div className="border-b border-slate-200 bg-[#063b5a] text-white">
        <div className="container-bp flex items-center justify-between gap-4 py-1.5 text-xs">
          <p className="hidden font-semibold text-white/86 sm:block">
            24/7 emergency dispatch across Canada and the US
          </p>
          <p className="font-semibold text-white/86 sm:hidden">
            24/7 emergency dispatch
          </p>
          <a
            href={NAP.phoneTel}
            className="inline-flex items-center gap-2 whitespace-nowrap font-black text-white no-underline"
          >
            <Phone className="h-4 w-4 text-[#24c4ca]" />
            {NAP.phone}
          </a>
        </div>
      </div>

      <div className="container-bp flex h-16 items-center justify-between">
        <Link
          href="/"
          onClick={() => {
            setOpen(false);
            setOpenGroup(null);
          }}
          className="flex items-center gap-2.5 no-underline"
          aria-label={`${BRAND.name} home`}
        >
          <LogoMark className="h-11 w-11 sm:h-12 sm:w-12" />
          <span className="flex flex-col leading-[1.05] whitespace-nowrap">
            <span className="font-display text-[1.25rem] sm:text-[1.5rem] font-black uppercase tracking-tight text-[#05283f]">
              BRIDGEPOINT
            </span>
            <span className="text-[0.6rem] sm:text-[0.7rem] font-bold uppercase tracking-[0.3em] text-[#0ca7b4]">
              Maintenance
            </span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Primary"
          onMouseLeave={() => setOpenGroup(null)}
        >
          {MENU.map((group) => (
            <div
              key={group.href}
              className="relative"
              onMouseEnter={() => setOpenGroup(group.label)}
            >
              <Link
                href={group.href}
                className="inline-flex items-center gap-1 px-3 py-2 text-sm font-bold text-slate-700 no-underline hover:text-[#063b5a]"
                aria-haspopup="true"
                aria-expanded={openGroup === group.label}
              >
                {group.label}
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform",
                    openGroup === group.label && "rotate-180"
                  )}
                />
              </Link>

              {openGroup === group.label && (
                <div
                  className={cn(
                    "absolute left-1/2 top-full -translate-x-1/2 pt-2",
                    group.columns
                      ? "w-[720px]"
                      : group.links.length > 6
                        ? "w-[640px]"
                        : "w-[360px]"
                  )}
                >
                  <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xl ring-1 ring-black/5">
                    {group.columns ? (
                      <div className="grid grid-cols-2 gap-6">
                        {group.columns.map((col) => (
                          <div key={col.title}>
                            <Link
                              href={col.allHref}
                              onClick={() => setOpenGroup(null)}
                              className="mb-2 flex items-center justify-between border-b border-slate-100 px-2 pb-2 text-[0.7rem] font-black uppercase tracking-[0.18em] text-[#063b5a] no-underline hover:text-[#24c4ca]"
                            >
                              <span>{col.title}</span>
                              <span className="text-[0.65rem] font-bold text-[#24c4ca]">
                                {col.allLabel}
                              </span>
                            </Link>
                            <div className="grid grid-cols-1 gap-0.5">
                              {col.links.map((link) => (
                                <Link
                                  key={link.href}
                                  href={link.href}
                                  onClick={() => setOpenGroup(null)}
                                  className="group flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm font-semibold text-slate-700 no-underline hover:bg-slate-50 hover:text-[#063b5a]"
                                >
                                  <span>{link.label}</span>
                                  <ChevronRight className="h-3 w-3 flex-none text-[#24c4ca] opacity-0 transition group-hover:opacity-100" />
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div
                        className={cn(
                          "grid gap-1",
                          group.links.length > 6 ? "grid-cols-2" : "grid-cols-1"
                        )}
                      >
                        {group.links.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setOpenGroup(null)}
                            className="group flex items-start gap-3 rounded-lg px-3 py-2.5 no-underline hover:bg-slate-50"
                          >
                            <div className="flex-1">
                              <div className="text-sm font-bold text-[#063b5a]">
                                {link.label}
                              </div>
                              {link.description && (
                                <div className="mt-0.5 text-xs leading-snug text-slate-500">
                                  {link.description}
                                </div>
                              )}
                            </div>
                            <ChevronRight className="mt-0.5 h-3.5 w-3.5 flex-none text-[#24c4ca] opacity-0 transition group-hover:opacity-100" />
                          </Link>
                        ))}
                      </div>
                    )}
                    {group.hubLabel && (
                      <Link
                        href={group.href}
                        onClick={() => setOpenGroup(null)}
                        className="mt-3 flex items-center justify-between rounded-lg border-t border-slate-100 px-3 pt-3 text-xs font-black uppercase tracking-[0.16em] text-[#24c4ca] no-underline hover:text-[#063b5a]"
                      >
                        {group.hubLabel}
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/quote"
            className="hidden rounded-md border border-slate-300 px-4 py-2.5 text-sm font-black text-[#063b5a] no-underline hover:border-[#24c4ca] md:inline-flex"
          >
            Quote
          </Link>
          <Link
            href="/contact"
            className="hidden rounded-md bg-[#24c4ca] px-4 py-2.5 text-sm font-black text-[#05283f] no-underline hover:bg-[#45e4eb] sm:inline-flex"
          >
            Request Service
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-[#063b5a] lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="max-h-[calc(100vh-64px)] overflow-y-auto border-t border-slate-200 bg-white lg:hidden">
          <nav className="container-bp grid gap-1 py-5">
            {MENU.map((group) => {
              const isOpen = mobileGroup === group.label;
              return (
                <div
                  key={group.href}
                  className="border-b border-slate-100 last:border-b-0"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setMobileGroup(isOpen ? null : group.label)
                    }
                    className="flex w-full items-center justify-between rounded-lg px-4 py-4 text-left text-base font-black text-[#063b5a] hover:bg-slate-50"
                    aria-expanded={isOpen}
                  >
                    {group.label}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-[#24c4ca] transition-transform",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>
                  {isOpen && (
                    <div className="pb-3">
                      <Link
                        href={group.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-md px-6 py-2 text-sm font-bold text-[#24c4ca] no-underline hover:bg-slate-50"
                      >
                        {group.hubLabel || `Go to ${group.label}`} →
                      </Link>
                      {group.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className="block rounded-md px-6 py-2 text-sm font-semibold text-slate-700 no-underline hover:bg-slate-50"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="mt-4 grid gap-3 border-t border-slate-200 pt-5">
              <a
                href={NAP.phoneTel}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#063b5a] px-6 py-4 font-black text-white no-underline"
              >
                <Phone className="h-5 w-5 text-[#24c4ca]" />
                {NAP.phone}
              </a>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="inline-flex justify-center rounded-full bg-[#24c4ca] px-6 py-4 font-black text-[#05283f] no-underline"
              >
                Request Service
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
