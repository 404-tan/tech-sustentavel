import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import MapSection from "@/components/MapSection";
import BenefitsSection from "@/components/BenefitsSection";
import Footer from "@/components/Footer";

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
