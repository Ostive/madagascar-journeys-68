import React from "react";
import Header from "@/components/Header";
import TopBar from "@/components/TopBar";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <TopBar />
      <Header />
      <div className="p-14" />
      <section className="bg-emerald/10 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-poppins font-bold text-center text-dark mb-6">
            Contactez-nous
          </h1>
          <p className="text-lg text-center text-dark/70 max-w-3xl mx-auto font-opensans">
            Notre équipe est à votre écoute pour répondre à toutes vos questions
            et vous accompagner dans l'organisation de votre voyage.
          </p>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </div>
  );
};

export default Contact;