import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Card from "./shared/Card";

const circuits = [
  {
    title: "Grand Tour de Madagascar",
    duration: "15 jours",
    groupSize: "4-12 personnes",
    startLocation: "Antananarivo",
    price: "2499€",
    rating: 4.8,
    reviews: 124,
    image: "https://madagascar-tourisme.com/wp-content/uploads/2017/04/33879604103_f0de969da2_k.jpg",
    highlights: [
      "Allée des Baobabs",
      "Parc National d'Isalo",
      "Plages de Nosy Be",
      "Forêt tropicale",
    ],
    nextDeparture: "15 Mars 2024",
  },
  {
    title: "Aventure Nord-Ouest",
    duration: "10 jours",
    groupSize: "6-10 personnes",
    startLocation: "Majunga",
    price: "1899€",
    rating: 4.6,
    reviews: 89,
    image: "https://cedar-cdn-aws-webp.s3.eu-central-1.amazonaws.com/app/uploads/2020/10/24070404/Western-Madagascar-avenue-de-baobabs-SS-705245614-1920.jpg",
    highlights: [
      "Tsingy de Bemaraha",
      "Parc Ankarafantsika",
      "Villages traditionnels",
      "Coucher de soleil sur le détroit",
    ],
    nextDeparture: "5 Avril 2024",
  },
  {
    title: "Sud Sauvage",
    duration: "12 jours",
    groupSize: "4-8 personnes",
    startLocation: "Tuléar",
    price: "2099€",
    rating: 4.9,
    reviews: 156,
    image: "https://static.edenviaggi.it/.imaging/default/dam/edenviaggi.it/img/escursioni/madagascar/1900x1070-.png/jcr:content.png",
    highlights: [
      "Réserve de Berenty",
      "Fort-Dauphin",
      "Parc national d'Andohahela",
      "Plages sauvages",
    ],
    nextDeparture: "20 Mars 2024",
  },
];

const CircuitsSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-24 overflow-hidden bg-gray-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <svg
          className="absolute right-0 top-0 h-[500px] w-[500px] transform translate-x-1/2 -translate-y-1/2 text-emerald-50"
          fill="currentColor"
          viewBox="0 0 200 200"
        >
          <defs>
            <pattern
              id="circuitPattern"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="1" className="text-emerald-500" />
            </pattern>
          </defs>
          <path
            fill="url(#circuitPattern)"
            d="M100 0C44.8 0 0 44.8 0 100s44.8 100 100 100 100-44.8 100-100S155.2 0 100 0zM100 150c-27.6 0-50-22.4-50-50s22.4-50 50-50 50 22.4 50 50-22.4 50-50 50z"
          />
        </svg>
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
                Circuits
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Circuits Guidés
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Des itinéraires soigneusement conçus pour vous faire découvrir les merveilles de Madagascar
              </p>
            </motion.div>
          </div>

          {/* Circuits Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {circuits.map((circuit, index) => (
              <Card
                key={circuit.title}
                type="circuit"
                data={{
                  ...circuit,
                  location: circuit.startLocation
                }}
                index={index}
                onClick={() => navigate('/circuit-details')}
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
              onClick={() => navigate('/circuits')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-full transition-colors duration-300"
            >
              Découvrir tous nos circuits
              <ArrowRight className="h-5 w-5" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CircuitsSection;