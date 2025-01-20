import { useParams } from "react-router-dom";
import { destinations } from "@/data/destinations";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Check, X, MapPin, Calendar, ThermometerSun, Cloud, Compass, Camera, Leaf, Utensils, Hotel, Bus } from "lucide-react";
import Header from "@/components/Header";
import DestinationCard from "@/components/cards/DestinationCard";
import FAQ from "@/components/FAQ";
import CardCarousel from "@/components/CardCarousel";
import GalleryGrid from "@/components/GaleryGrid";
import ReservationCard from "@/components/reservation/ReservationCard";
import { motion } from "framer-motion";
import CircuitMap from "@/components/maps/CircuitMap";

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={destination.main_image} 
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-center p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white">{destination.name}</h1>
            <p className="text-lg text-white/90 max-w-2xl">{destination.short_description}</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="rounded-3xl overflow-hidden">
                <CardHeader className="border-b bg-gray-50/50">
                  <h2 className="text-2xl font-semibold">À propos de {destination.name}</h2>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="prose max-w-none">
                    <p className="text-gray-600 leading-relaxed">{destination.long_description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Key Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              <Card className="p-4 text-center rounded-3xl">
                <MapPin className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                <h3 className="font-medium">Région</h3>
                <p className="text-sm text-gray-600">{destination.location}</p>
              </Card>
              <Card className="p-4 text-center rounded-3xl">
                <Calendar className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                <h3 className="font-medium">Meilleure période</h3>
                <p className="text-sm text-gray-600">{destination.best_time_to_visit}</p>
              </Card>
              <Card className="p-4 text-center rounded-3xl">
                <ThermometerSun className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                <h3 className="font-medium">Climat</h3>
                <p className="text-sm text-gray-600">Tropical</p>
              </Card>
              <Card className="p-4 text-center rounded-3xl">
                <Cloud className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                <h3 className="font-medium">Altitude</h3>
                <p className="text-sm text-gray-600">{destination.altitude || "Variable"}</p>
              </Card>
            </motion.div>

            {/* Activities and Attractions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="rounded-3xl overflow-hidden">
                <CardHeader className="border-b bg-gray-50/50">
                  <h2 className="text-2xl font-semibold">Points forts</h2>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {destination.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                          <Check className="w-5 h-5 text-emerald-600" />
                        </div>
                        <p className="text-gray-600">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Practical Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <Card className="rounded-3xl overflow-hidden">
                <CardHeader className="border-b bg-gray-50/50">
                  <div className="flex items-center gap-2">
                    <Hotel className="w-5 h-5 text-emerald-600" />
                    <h3 className="font-semibold">Hébergement</h3>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Hôtels confortables
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Lodges authentiques
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Chambres climatisées
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="rounded-3xl overflow-hidden">
                <CardHeader className="border-b bg-gray-50/50">
                  <div className="flex items-center gap-2">
                    <Utensils className="w-5 h-5 text-emerald-600" />
                    <h3 className="font-semibold">Restauration</h3>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Cuisine locale
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Petit-déjeuner inclus
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Options végétariennes
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="rounded-3xl overflow-hidden">
                <CardHeader className="border-b bg-gray-50/50">
                  <div className="flex items-center gap-2">
                    <Bus className="w-5 h-5 text-emerald-600" />
                    <h3 className="font-semibold">Transport</h3>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Transferts inclus
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Véhicules climatisés
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Chauffeur expérimenté
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="rounded-3xl overflow-hidden">
                <CardHeader className="border-b bg-gray-50/50">
                  <div className="flex items-center gap-2">
                    <Camera className="w-5 h-5 text-emerald-600" />
                    <h2 className="text-2xl font-semibold">Galerie photo</h2>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <GalleryGrid images={destination.gallery} title={destination.name} />
                </CardContent>
              </Card>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card className="rounded-3xl overflow-hidden">
                <CardHeader className="border-b bg-gray-50/50">
                  <div className="flex items-center gap-2">
                    <Compass className="w-5 h-5 text-emerald-600" />
                    <h2 className="text-2xl font-semibold">Localisation</h2>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[400px]">
                    <CircuitMap
                      cities={[
                        {
                          name: destination.name,
                          coordinates: destination.coordinates || [46.8691, -18.7669],
                          day: 1
                        }
                      ]}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* FAQ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Card className="rounded-3xl overflow-hidden">
                <CardHeader className="border-b bg-gray-50/50">
                  <h2 className="text-2xl font-semibold">FAQ</h2>
                </CardHeader>
                <CardContent className="p-6">
                  <FAQ faqs={faqs} />
                </CardContent>
              </Card>
            </motion.div>

            {/* Similar Destinations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <div className="mt-12">
                <CardCarousel
                  items={similarDestinations}
                  CardComponent={DestinationCard}
                  itemPropName="destination"
                  title="Destinations similaires"
                />
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="sticky top-24 space-y-6"
            >
              <ReservationCard
                price={destination.price.toString()}
                duration={destination.duration}
                bestTimeToVisit={destination.best_time_to_visit}
                title={destination.name}
                description={destination.description}
                destinationId={destination.id.toString()}
                className="rounded-3xl"
              />

              {/* Eco-Tourism */}
              <Card className="rounded-3xl overflow-hidden">
                <CardHeader className="border-b bg-gray-50/50">
                  <div className="flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-emerald-600" />
                    <h3 className="font-semibold">Tourisme responsable</h3>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Respect de l'environnement
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Soutien aux communautés locales
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Conservation de la biodiversité
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;
