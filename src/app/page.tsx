import { ApproachPreview } from "@/components/home/ApproachPreview";
import { FeaturedVentures } from "@/components/home/FeaturedVentures";
import { FinalCta } from "@/components/home/FinalCta";
import { FounderTeaser } from "@/components/home/FounderTeaser";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { Philosophy } from "@/components/home/Philosophy";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/config/seo";

export const metadata = pageMetadata({ description: siteConfig.description });

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <FeaturedVentures />
      <Philosophy />
      <ApproachPreview />
      <FounderTeaser />
      <FinalCta />
    </>
  );
}
