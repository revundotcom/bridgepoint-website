import SiloHub from "@/components/SiloHub";
import { RESOURCE_PAGES } from "@/lib/silo-resources";
import { IMAGES } from "@/lib/images";

export const metadata = {
  title: "Resources | Bridgepoint Maintenance",
  description:
    "Maintenance checklists, seasonal prep guides, compliance reference, case studies, and the Bridgepoint blog. Practical operational resources for property owners and managers.",
};

export default function ResourcesHub() {
  return (
    <SiloHub
      pages={RESOURCE_PAGES}
      siloRoot="/resources"
      siloLabel="Resources"
      eyebrow="Resources"
      heroTitle="Field notes, checklists, and case work from the dispatch board."
      heroDescription="Bridgepoint publishes resources for property owners and managers who want to run their operations better. Checklists, seasonal prep, compliance reference, case studies, and the Bridgepoint blog."
      heroImage={IMAGES.edHelpHero}
      introTitle="Five resource lines."
      introDescription="Use these resources to run your own property reviews, prepare for the season, verify vendor compliance, and benchmark your operations against the case work we publish."
    />
  );
}
