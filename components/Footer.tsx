import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import LogoMark from "@/components/LogoMark";
import { BRAND, NAP, SOCIAL } from "@/lib/constants";
import { CANADA_PROVINCES, US_STATES } from "@/lib/locations-data";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.86-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.61 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.13C19.56 3.6 12 3.6 12 3.6s-7.56 0-9.4.47A3 3 0 0 0 .5 6.2C0 8.04 0 12 0 12s0 3.96.5 5.8a3 3 0 0 0 2.1 2.13c1.84.47 9.4.47 9.4.47s7.56 0 9.4-.47a3 3 0 0 0 2.1-2.13C24 15.96 24 12 24 12s0-3.96-.5-5.8ZM9.6 15.6V8.4l6.24 3.6L9.6 15.6Z" />
    </svg>
  );
}

const SERVICES = [
  { href: "/services/plumbing", label: "Plumbing" },
  { href: "/services/electrical", label: "Electrical" },
  { href: "/services/hvac", label: "HVAC" },
  { href: "/services/carpentry", label: "Carpentry" },
  { href: "/services/drywall-and-painting", label: "Drywall and Painting" },
  { href: "/services/general-repairs", label: "General Repairs" },
  { href: "/services/preventative-maintenance", label: "Preventative Maintenance" },
  { href: "/services/unit-turnovers", label: "Unit Turnovers" },
  { href: "/services/commercial-contracting", label: "Commercial Contracting" },
  { href: "/services/facility-maintenance", label: "Facility Maintenance" },
];

const COMPANY = [
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
  { href: "/quote", label: "Request a Quote" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

type IconProps = { className?: string };

const SOCIAL_ICONS: {
  key: keyof typeof SOCIAL;
  label: string;
  Icon: (p: IconProps) => JSX.Element;
}[] = [
  { key: "facebook", label: "Facebook", Icon: FacebookIcon },
  { key: "instagram", label: "Instagram", Icon: InstagramIcon },
  { key: "linkedin", label: "LinkedIn", Icon: LinkedInIcon },
  { key: "youtube", label: "YouTube", Icon: YoutubeIcon },
];

export default function Footer() {
  return (
    <footer className="bg-[#05283f] text-white">
      <div className="container-bp py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Brand block */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3 no-underline" aria-label={`${BRAND.name} home`}>
              <LogoMark variant="light" className="h-14 w-14" />
              <span className="flex flex-col leading-[1.05] whitespace-nowrap">
                <span className="text-[1.7rem] font-black uppercase tracking-tight text-white">
                  BRIDGEPOINT
                </span>
                <span className="text-[0.8rem] font-bold uppercase tracking-[0.3em] text-[#24c4ca]">
                  Maintenance
                </span>
              </span>
            </Link>
            <p className="mt-4 text-sm font-medium italic tracking-[0.04em] text-[#cfd8e3]">
              Every trade, one team.
            </p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/70">
              One service line for plumbing, HVAC, electrical, drain, sewer, and building repairs across Canada and the US.
            </p>

            <div className="mt-7 space-y-3 text-sm">
              <a
                href={NAP.phoneTel}
                className="group inline-flex items-center gap-3 rounded-lg bg-[#24c4ca] px-5 py-3 font-black text-[#05283f] no-underline transition hover:bg-[#45e4eb]"
              >
                <Phone className="h-4 w-4" />
                {NAP.phone}
              </a>

              <div className="space-y-2.5 pt-2">
                <a
                  href={`mailto:${NAP.email}`}
                  className="flex items-center gap-3 text-white/75 no-underline hover:text-white"
                >
                  <Mail className="h-4 w-4 flex-none text-[#24c4ca]" />
                  {NAP.email}
                </a>
                <p className="flex items-start gap-3 text-white/75">
                  <MapPin className="mt-0.5 h-4 w-4 flex-none text-[#24c4ca]" />
                  <span>{NAP.address.full}</span>
                </p>
              </div>
            </div>

            <ul className="mt-7 flex items-center gap-2.5">
              {SOCIAL_ICONS.map(({ key, label, Icon }) => (
                <li key={key}>
                  <a
                    href={SOCIAL[key]}
                    aria-label={label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-[#24c4ca] hover:bg-[#24c4ca]/10 hover:text-[#24c4ca]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Canada column */}
          <FooterListColumn
            title="Canada"
            featured={{ href: "/locations", label: "All of Canada" }}
            links={CANADA_PROVINCES.map((p) => ({
              href: `/locations/${p.slug}`,
              label: p.name,
            }))}
          />

          {/* United States column */}
          <FooterListColumn
            title="United States"
            featured={{ href: "/locations", label: "All US states" }}
            links={US_STATES.map((p) => ({
              href: `/locations/${p.slug}`,
              label: p.name,
            }))}
          />

          {/* Services column */}
          <FooterListColumn
            title="Services"
            featured={{ href: "/services", label: "All services" }}
            links={SERVICES}
          />

          {/* Company column */}
          <FooterListColumn title="Company" links={COMPANY} />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-bp flex flex-col gap-3 py-6 text-sm text-white/55 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {BRAND.legalEntity}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs font-semibold uppercase tracking-[0.14em]">
            <Link href="/privacy" className="text-white/60 no-underline hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="text-white/60 no-underline hover:text-white">
              Terms
            </Link>
            <Link href="/accessibility" className="text-white/60 no-underline hover:text-white">
              Accessibility
            </Link>
            <span className="text-white/40 normal-case tracking-normal">
              Canada and US service desk · 24/7 emergency dispatch
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

type FooterLink = { href: string; label: string };

function FooterListColumn({
  title,
  featured,
  links,
}: {
  title: string;
  featured?: FooterLink;
  links: FooterLink[];
}) {
  return (
    <div className="lg:col-span-2">
      <h2 className="text-xs font-black uppercase tracking-[0.22em] text-[#24c4ca]">
        {title}
      </h2>
      {featured && (
        <Link
          href={featured.href}
          className="mt-4 inline-flex items-center gap-1 text-base font-bold text-white no-underline hover:text-[#24c4ca]"
        >
          {featured.label}
        </Link>
      )}
      <ul className={featured ? "mt-3 grid gap-2" : "mt-5 grid gap-2"}>
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-white/70 no-underline hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
