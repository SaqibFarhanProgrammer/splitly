// app/page.tsx
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/Hero";
import { ProblemSection } from "@/components/ProblemSection";
import { SolutionSection } from "@/components/SolutionSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { UseCasesSection } from "@/components/UseCasesSection";
import { WhyUseSection } from "@/components/WhyUseSection";
import { TechPhilosophySection } from "@/components/TechPhilosophySection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { FeaturesSection } from "@/components/FeaturesSectiont";
import { Sidebar } from "lucide-react";

export default function Home() {
  return (
    <main className="bg-black min-h-screen font-[inter-reguler]">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <FeaturesSection />
      <UseCasesSection />
      <WhyUseSection />
      <TechPhilosophySection />
      <CTASection />
      <Footer />
    </main>
  );
}