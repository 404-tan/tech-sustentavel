import Hero from "@/app/components/Hero";
import ProblemSection from "@/app/components/ProblemSection";
import MapSection from "@/app/components/MapSection";
import BenefitsSection from "@/app/components/BenefitsSection";
import Footer from "@/app/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ProblemSection />
      <MapSection />
      <BenefitsSection />
      <Footer />
    </div>
  );
};

export default Index;
