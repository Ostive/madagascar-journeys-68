import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Card from "./shared/Card";

const destinations = [
  {
    title: "Allée des Baobabs",
    location: "Morondava",
    duration: "2-3 jours",
    rating: 4.9,
    reviews: 234,
    image: "https://cedar-cdn-aws-webp.s3.eu-central-1.amazonaws.com/app/uploads/2020/10/24070404/Western-Madagascar-avenue-de-baobabs-SS-705245614-1920.jpg",
    price: "299€",
    tags: ["Nature", "Photographie", "Culture"],
  },
  {
    title: "Nosy Be",
    location: "Nord de Madagascar",
    duration: "5-7 jours",
    rating: 4.8,
    reviews: 189,
    image: "https://madagascar-tourisme.com/wp-content/uploads/2017/04/33879604103_f0de969da2_k.jpg",
    price: "599€",
    tags: ["Plages", "Snorkeling", "Détente"],
  },
  {
    title: "Parc National d'Isalo",
    location: "Région Ihorombe",
    duration: "3-4 jours",
    rating: 4.7,
    reviews: 156,
    image: "https://static.edenviaggi.it/.imaging/default/dam/edenviaggi.it/img/escursioni/madagascar/1900x1070-.png/jcr:content.png",
    price: "399€",
    tags: ["Randonnée", "Nature", "Aventure"],
  },
];

const DestinationsSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-gray-50 rounded-l-[100px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block"
            >
              <span className="text-sm font-semibold text-emerald-600 tracking-wider uppercase mb-4 block">
                Destinations
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Destinations Populaires
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explorez nos destinations les plus prisées et commencez à planifier votre prochain voyage
              </p>
            </motion.div>
          </div>

          {/* Destinations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination, index) => (
              <Card
                key={destination.title}
                type="destination"
                data={destination}
                index={index}
                onClick={() => navigate('/destination-details')}
              />
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-16"
          >
            <button
              onClick={() => navigate('/destinations')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-full transition-colors duration-300"
            >
              Voir toutes les destinations
              <ArrowRight className="h-5 w-5" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;