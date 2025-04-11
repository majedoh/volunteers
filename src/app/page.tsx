// src/app/page.tsx
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturedOpportunities } from "@/components/sections/FeaturedOpportunities";
import { AboutSection } from "@/components/sections/AboutSection";
import { CallToAction } from "@/components/sections/CallToAction";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedOpportunities />
      <AboutSection />
      <CallToAction />
    </>
  );
};