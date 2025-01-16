import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Header from "@/components/Header";
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

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="relative min-h-screen" ref={containerRef}>
      <Header />
      {/* Hero Section with Parallax */}
      <motion.div style={{ opacity }} className="relative z-0">
        <HeroSection />
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Curved Separator */}
        <div className="absolute -top-20 left-0 right-0 h-20 bg-white">
          <svg
            className="absolute -top-px left-0 right-0 h-20 w-full text-white"
            preserveAspectRatio="none"
            viewBox="0 0 1440 48"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 48h1440V0c-211.52 37.03-421.507 51.137-629.96 42.32C601.587 33.503 385.353 13.367 0 0v48z" />
          </svg>
        </div>

        {/* Content Sections */}
        <div className="bg-white">
          <div className="space-y-24 pb-24">
            <AnimatedSection className="pt-12">
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

            {/* Gradient Background Section */}
            <div className="relative py-24 bg-gradient-to-b from-emerald-50 to-white">
              <AnimatedSection>
                <PartnersSection />
              </AnimatedSection>

              <AnimatedSection>
                <BlogSection />
              </AnimatedSection>
            </div>

            <AnimatedSection>
              <NewsletterSection />
            </AnimatedSection>

            <AnimatedSection>
              <FAQSection />
            </AnimatedSection>

            <AnimatedSection>
              <ContactSection />
            </AnimatedSection>
          </div>

          <Footer />
        </div>
      </motion.div>
    </div>
  );
};

export default Index;