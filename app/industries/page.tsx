import SiloHub from "@/components/SiloHub";
import { INDUSTRY_PAGES } from "@/lib/silo-industries";
import { IMAGES } from "@/lib/images";

export const metadata = {
  title: "Industries We Serve | Bridgepoint Maintenance",
  description:
    "Bridgepoint serves property managers, landlords, multi family operators, commercial owners, condo corporations, institutional asset holders, and real estate investors.",
};

export default function IndustriesHub() {
  return (
    <SiloHub
      pages={INDUSTRY_PAGES}
      siloRoot="/industries"
      siloLabel="Industries"
      eyebrow="Who we serve"
      heroTitle="One dispatch line for the owners and operators who keep buildings running."
      heroDescription="Property managers, landlords, multi family operators, commercial owners, condo corporations, institutional asset holders, real estate investors, and trade partners across Canada and the US."
      heroImage={IMAGES.edPropertyManagersHero}
      introTitle="Ten audience programs."
      introDescription="Bridgepoint runs dedicated service programs for the audiences that own and operate the buildings we maintain. Pick the program that matches your asset class to see how the dispatch model works for you."
    />
  );
}
