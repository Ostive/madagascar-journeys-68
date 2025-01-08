import { useParams } from "react-router-dom";
import { destinations } from "@/data/destinations";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import Header from "@/components/Header";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import DestinationCard from "@/components/cards/DestinationCard";
import FAQ from "@/components/FAQ";
import CardCarousel from "@/components/CardCarousel";
import GalleryGrid from "@/components/GaleryGrid";
import ReservationCard from "@/components/reservation/ReservationCard";
import { motion } from "framer-motion";

const DestinationDetail = () => {
  const { id } = useParams();
  const destination = destinations.find((d) => d.id === Number(id));

  if (!destination) {
    return <div>Destination non trouvée</div>;
  }

  const similarDestinations = destinations
    .filter(
      (d) => d.id !== destination.id && d.location === destination.location
    )
    .slice(0, 3);

  const faqs = [
    {
      question: "Quelle est la meilleure période pour visiter ?",
      answer: `La meilleure période pour visiter ${destination.name} est ${destination.best_time_to_visit}.`,
    },
    {
      question: "Quelle est la durée recommandée du séjour ?",
      answer: `La durée recommandée pour profiter pleinement de ${destination.name} est ${destination.duration}.`,
    },
    {
      question: "Qu'est-ce qui est inclus dans le prix ?",
      answer: destination.included.join(", "),
    },
    {
      question: "Qu'est-ce qui n'est pas inclus dans le prix ?",
      answer: destination.not_included.join(", "),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <Header />
      <div className="p-8 md:p-14" />

      <div className="max-w-6xl px-4 md:mx-auto md:py-4 pb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 my-6"
        >
          <h1 className="text-3xl font-bold">{destination.name}</h1>
        </motion.div>

        <GalleryGrid images={destination.gallery} title={destination.name} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:pt-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="mb-8">
                <CardHeader>
                  <h2 className="text-2xl font-semibold">Overview</h2>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{destination.long_description}</p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardHeader>
                  <h2 className="text-2xl font-semibold">Points forts</h2>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {destination.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check className="text-emerald w-5 h-5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <Card>
                  <CardHeader>
                    <h2 className="text-xl font-semibold">Ce qui est inclus</h2>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {destination.included.map((item, index) => (
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
                      {destination.not_included.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <X className="text-red-500 w-4 h-4" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card className="mb-8">
                <CardContent className="pt-6">
                  <FAQ faqs={faqs} />
                </CardContent>
              </Card>

              <CardCarousel
                items={similarDestinations}
                CardComponent={DestinationCard}
                itemPropName="destination"
                title="Destinations similaires"
              />
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="sticky top-24"
            >
              <ReservationCard
                price={destination.price.toString()}
                duration={destination.duration}
                bestTimeToVisit={destination.best_time_to_visit}
                title={destination.name}
                description={destination.description}
              />
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DestinationDetail;