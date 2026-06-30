import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhatWeDo from "@/components/WhatWeDo";
import ImpactCounter from "@/components/ImpactCounter";
import WhyYopo from "@/components/WhyYopo";
import HowItWorks from "@/components/HowItWorks";
import AiInsightsDemo from "@/components/AiInsightsDemo";
import DashboardPreview from "@/components/DashboardPreview";
import Showcase from "@/components/Showcase";
import CarbonCalculator from "@/components/CarbonCalculator";
import AiChat from "@/components/AiChat";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <WhatWeDo />
      <ImpactCounter />
      <WhyYopo />
      <HowItWorks />
      <AiInsightsDemo />
      <DashboardPreview />
      <Showcase />
      <CarbonCalculator />
      <Contact />
      <Footer />
      <AiChat />
    </main>
  );
}
