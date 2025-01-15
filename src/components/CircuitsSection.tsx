import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Clock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const circuits = [
  {
    title: "Grand Tour de Madagascar",
    duration: "15 jours",
    groupSize: "4-12 personnes",
    startLocation: "Antananarivo",
    price: "2499€",
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
              <motion.div
                key={circuit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                onClick={() => navigate('/circuit-details')}
              >
                {/* Image */}
                <div className="relative h-[250px] overflow-hidden">
                  <img
                    src={circuit.image}
                    alt={circuit.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {circuit.title}
                    </h3>
                    <div className="flex items-center text-white/90">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{circuit.startLocation}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 text-emerald-500 mr-2" />
                      <span className="text-sm">{circuit.duration}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="h-4 w-4 text-emerald-500 mr-2" />
                      <span className="text-sm">{circuit.groupSize}</span>
                    </div>
                    <div className="flex items-center text-gray-600 col-span-2">
                      <Calendar className="h-4 w-4 text-emerald-500 mr-2" />
                      <span className="text-sm">Prochain départ: {circuit.nextDeparture}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Points forts :</h4>
                    <ul className="space-y-2">
                      {circuit.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 mr-2" />
                          <span className="text-sm">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <span className="text-sm text-gray-500">À partir de</span>
                      <p className="text-2xl font-bold text-emerald-600">{circuit.price}</p>
                    </div>
                    <div className="flex items-center text-emerald-500 group-hover:text-emerald-600 transition-colors">
                      <span className="text-sm font-medium">Réserver</span>
                      <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
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