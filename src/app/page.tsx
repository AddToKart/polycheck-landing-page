"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import ProblemStatement from "@/components/ProblemStatement";
import StatusGuide from "@/components/StatusGuide";
import ProductStage from "@/components/ProductStage";
import BentoFeatures from "@/components/BentoFeatures";
import RoleFeatures from "@/components/RoleFeatures";
import AntiCheatShowcase from "@/components/AntiCheatShowcase";
import PlatformAvailability from "@/components/PlatformAvailability";
import UnderTheHood from "@/components/UnderTheHood";
import DownloadCta from "@/components/DownloadCta";
import LandingFooter from "@/components/LandingFooter";

export default function Home() {
  return (
    <>
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-golden focus:text-maroon-dark focus:font-bold"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main-content">
        <Hero />
        <HowItWorks />
        <ProductStage />
        <ProblemStatement />
        <BentoFeatures />
        <StatusGuide />
        <RoleFeatures />
        <AntiCheatShowcase />
        <PlatformAvailability />
        <UnderTheHood />
        <DownloadCta />
      </main>

      <LandingFooter />
    </>
  );
}
