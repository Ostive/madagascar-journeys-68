import { motion } from "framer-motion";
import { ArrowRight, Palmtree, Mountain, Sunset, Waves } from "lucide-react";
import { useNavigate } from "react-router-dom";

const experiences = [
  {
    title: "Plages Paradisiaques",
    description: "Découvrez les plus belles plages de l'océan Indien",
    icon: Waves,
    image: "https://madagascar-tourisme.com/wp-content/uploads/2017/04/33879604103_f0de969da2_k.jpg",
    color: "from-blue-500 to-cyan-500",
    path: "/inspiration/themes#beach"
  },
  {
    title: "Aventures en Nature",
    description: "Explorez les parcs nationaux et la faune unique",
    icon: Mountain,
    image: "https://cedar-cdn-aws-webp.s3.eu-central-1.amazonaws.com/app/uploads/2020/10/24070404/Western-Madagascar-avenue-de-baobabs-SS-705245614-1920.jpg",
    color: "from-emerald-500 to-green-500",
    path: "/inspiration/themes#nature"
  },
  {
    title: "Culture & Traditions",
    description: "Immergez-vous dans la culture malgache",
    icon: Palmtree,
    image: "https://static.edenviaggi.it/.imaging/default/dam/edenviaggi.it/img/escursioni/madagascar/1900x1070-.png/jcr:content.png",
    color: "from-orange-500 to-amber-500",
    path: "/inspiration/themes#culture"
  },
  {
    title: "Couchers de Soleil",
    description: "Admirez les plus beaux panoramas de l'île",
    icon: Sunset,
    image: "https://carter.eu/wp-content/uploads/2023/11/tsarabanjina-madagascar-aerial-view-20-1536x1024.jpg",
    color: "from-purple-500 to-pink-500",
    path: "/inspiration/themes#adventure"
  },
];

const InspireMeSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-50 rounded-r-[100px]" />
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
                Inspirations
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Laissez-vous Inspirer
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Découvrez nos expériences uniques à Madagascar et créez des souvenirs inoubliables
              </p>
            </motion.div>
          </div>

          {/* Experience Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {experiences.map((experience, index) => {
              const Icon = experience.icon;
              return (
                <motion.div
                  key={experience.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="group cursor-pointer"
                  onClick={() => navigate(experience.path)}
                >
                  <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-lg">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <img
                        src={experience.image}
                        alt={experience.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
                    </div>

                    {/* Content */}
                    <div className="relative h-full p-6 flex flex-col">
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${experience.color} flex items-center justify-center mb-auto shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>

                      {/* Text Content */}
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-xl font-bold text-white mb-2">
                          {experience.title}
                        </h3>
                        <p className="text-white/90 mb-4">
                          {experience.description}
                        </p>
                        <div className="flex items-center text-white gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-sm">En savoir plus</span>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
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
              onClick={() => navigate('/inspiration/themes')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-full transition-colors duration-300"
            >
              Voir toutes les expériences
              <ArrowRight className="h-5 w-5" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InspireMeSection;