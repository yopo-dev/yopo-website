import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhatWeDo from "@/components/WhatWeDo";
import Showcase from "@/components/Showcase";
import HowItWorks from "@/components/HowItWorks";
import WhyYopo from "@/components/WhyYopo";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <WhatWeDo />
      <Showcase />
      <HowItWorks />
      <WhyYopo />
      <Contact />
      <Footer />
    </main>
  );
}
