import { ParticleBackground } from "@/components/particle-background";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      <Navbar />
      <HeroSection />
      <FeaturesSection />
    </div>
  );
};

export default Index;
