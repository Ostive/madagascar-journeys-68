import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Header from "@/components/Header";
import TopBar from "@/components/TopBar";
import HeroSection from "@/components/HeroSection";
import InspireMeSection from "@/components/InspireMeSection";
import DestinationsSection from "@/components/DestinationsSection";
import CircuitsSection from "@/components/CircuitsSection";
import WhyUsSection from "@/components/WhyUsSection";
import BlogSection from "@/components/BlogSection";
import PartnersSection from "@/components/PartnersSection";
import NewsletterSection from "@/components/NewsletterSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { AnimatedSection } from "@/components/sections/AnimatedSection";

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 1]);

  return (
    <div className="min-h-screen" ref={containerRef}>
      <TopBar />
      <Header />
      <div className="p-14" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <HeroSection />
      </motion.div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 bg-white"
      >
        <div className="md:p-14" />
        <AnimatedSection>
          <InspireMeSection />
        </AnimatedSection>

        <AnimatedSection>
          <DestinationsSection />
        </AnimatedSection>

        <AnimatedSection>
          <CircuitsSection />
        </AnimatedSection>

        <AnimatedSection>
          <WhyUsSection />
        </AnimatedSection>

        <AnimatedSection>
          <PartnersSection />
        </AnimatedSection>

        <AnimatedSection>
          <BlogSection />
        </AnimatedSection>

        <AnimatedSection>
          <NewsletterSection />
        </AnimatedSection>

        <AnimatedSection>
          <FAQSection />
        </AnimatedSection>

        <AnimatedSection>
          <ContactSection />
        </AnimatedSection>

        <Footer />
      </motion.div>
    </div>
  );
};

export default Index;