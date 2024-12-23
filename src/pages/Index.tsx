import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DestinationsSection from "@/components/DestinationsSection";
import WhyUsSection from "@/components/WhyUsSection";
import SearchSection from "@/components/SearchSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <DestinationsSection />
      <WhyUsSection />
      <SearchSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;