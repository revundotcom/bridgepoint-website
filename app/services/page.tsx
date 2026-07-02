import SiloHub from "@/components/SiloHub";
import { SERVICE_PAGES } from "@/lib/silo-services";
import { IMAGES } from "@/lib/images";

export const metadata = {
  title: "Property Maintenance Services | Bridgepoint Maintenance",
  description:
    "Plumbing, electrical, HVAC, carpentry, drywall, paint, general repairs, preventative maintenance, unit turnovers, commercial contracting, tenant fit outs, facility maintenance, and building upkeep across Canada and the US.",
};

export default function ServicesHub() {
  return (
    <SiloHub
      pages={SERVICE_PAGES}
      siloRoot="/services"
      siloLabel="Services"
      eyebrow="Services"
      heroTitle="Twelve trade lines. One dispatch number."
      heroDescription="Bridgepoint Maintenance runs plumbing, electrical, HVAC, carpentry, drywall and paint, general repairs, preventative maintenance, unit turnovers, commercial contracting, tenant fit outs, facility maintenance, and building upkeep across Canada and the US."
      heroImage={IMAGES.edServicesHero}
      introTitle="Twelve service lines."
      introDescription="Mix emergency dispatch with scheduled preventative maintenance, project work, and turnover programs. We coordinate trades internally so property owners and managers do not run their own vendor management overhead."
    />
  );
}
