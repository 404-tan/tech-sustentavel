'use client'
import Image from "next/image";
import Hero from "@/app/components/Hero";
import ProblemSection from "@/app/components/ProblemSection";
import MapSection from "@/app/components/MapSection";
import BenefitsSection from "@/app/components/BenefitsSection";
import Footer from "@/app/components/Footer";
import { ThemeToggle } from "./components/ThemeToggle";
import HowToSection from "./components/HowToSection";


export default function Home() {
  return (

    <div className="min-h-screen">
      <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
      </div>
      <Hero />
      <ProblemSection />
      <HowToSection/>
      <MapSection />
      <BenefitsSection />
      <Footer />
    </div>

  );
}
