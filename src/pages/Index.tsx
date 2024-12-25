import Header from "@/components/Header";
import TopBar from "@/components/TopBar";
import HeroSection from "@/components/HeroSection";
import DestinationsSection from "@/components/DestinationsSection";
import CircuitsSection from "@/components/CircuitsSection";
import WhyUsSection from "@/components/WhyUsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Header />
      <HeroSection />
      <DestinationsSection />
      <CircuitsSection />
      <WhyUsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;