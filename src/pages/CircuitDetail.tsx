import { useParams } from "react-router-dom";
import { circuits } from "@/data/data";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import Header from "@/components/Header";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import CircuitCard from "@/components/cards/CircuitCard";
import { useState } from "react";
import FAQ from "@/components/FAQ";
import GalleryGrid from "@/components/GaleryGrid";
import CardCarousel from "@/components/CardCarousel";
import ReservationCard from "@/components/reservation/ReservationCard";
import { motion } from "framer-motion";

const CircuitDetail = () => {
  const { id } = useParams();
  const circuit = circuits.find((c) => c.id === id);

  if (!circuit) {
    return <div>Circuit non trouvé</div>;
  }

  const similarCircuits = circuits
    .filter((c) => c.id !== circuit.id && c.difficulty === circuit.difficulty)
    .slice(0, 3);

  const faqs = [
    {
      question: "Quelle est la meilleure période pour ce circuit ?",
      answer:
        "La meilleure période pour ce circuit est pendant la saison sèche, d'avril à octobre, lorsque les conditions météorologiques sont les plus favorables.",
    },
    {
      question: "Quel niveau de condition physique est requis ?",
      answer: `Ce circuit est de niveau ${circuit.difficulty.toLowerCase()}. Il est recommandé d'avoir une bonne condition physique et d'être habitué à la marche.`,
    },
    {
      question: "Les repas sont-ils inclus ?",
      answer:
        "Les repas principaux sont inclus dans le prix du circuit, sauf mention contraire dans la section 'Non inclus'.",
    },
    {
      question: "Que dois-je emporter ?",
      answer:
        "Nous vous recommandons d'emporter des vêtements adaptés à la saison, de bonnes chaussures de marche, un chapeau, de la crème solaire et une gourde.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <Header />

      <div className="p-14" />
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 my-6"
        >
          <h1 className="text-3xl font-bold">{circuit.title}</h1>
        </motion.div>

        <GalleryGrid images={circuit.gallery} title={circuit.title} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:pt-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Overview Card */}
              <Card className="mb-8">
                <CardHeader>
                  <h2 className="text-2xl font-semibold">Overview</h2>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{circuit.longDescription}</p>
                </CardContent>
              </Card>

              {/* Itinerary */}
              <Card className="p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-6">Itinéraire</h2>
                <div className="space-y-6">
                  {circuit.itinerary.map((day) => (
                    <div key={day.day} className="border-l-2 border-emerald pl-4">
                      <h3 className="text-lg font-semibold mb-2">
                        Jour {day.day} - {day.title}
                      </h3>
                      <p className="text-gray-600">{day.description}</p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Included/Not Included */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <Card>
                  <CardHeader>
                    <h2 className="text-xl font-semibold">Ce qui est inclus</h2>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {circuit.included.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Check className="text-emerald w-4 h-4" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <h2 className="text-xl font-semibold">Non inclus</h2>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {circuit.notIncluded.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <X className="text-red-500 w-4 h-4" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* FAQ Section */}
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <FAQ faqs={faqs} />
                </CardContent>
              </Card>

              {/* Similar Circuits */}
              <CardCarousel
                items={similarCircuits}
                CardComponent={CircuitCard}
                itemPropName="circuit"
                title="Circuits similaires"
              />
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="sticky top-24"
            >
              <ReservationCard
                price={circuit.price}
                duration={circuit.duration}
                persons={circuit.persons}
              />
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CircuitDetail;