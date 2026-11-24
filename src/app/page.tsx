"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemStatement from "@/components/ProblemStatement";
import SolutionOverview from "@/components/SolutionOverview";
import ProductStage from "@/components/ProductStage";
import BentoFeatures from "@/components/BentoFeatures";
import AntiCheatShowcase from "@/components/AntiCheatShowcase";
import PlatformAvailability from "@/components/PlatformAvailability";
import TechStack from "@/components/TechStack";
import DownloadCta from "@/components/DownloadCta";
import LandingFooter from "@/components/LandingFooter";

export default function Home() {
  return (
    <>
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-golden focus:text-maroon-dark focus:rounded-lg focus:font-bold"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main-content">
        <Hero />
        <ProblemStatement />
        <SolutionOverview />
        <ProductStage />
        <BentoFeatures />
        <AntiCheatShowcase />
        <PlatformAvailability />
        <TechStack />
        <DownloadCta />
      </main>

      <LandingFooter />
    </>
  );
}
