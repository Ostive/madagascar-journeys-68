import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Header from "@/components/Header";
import { Users, Award, BookOpen, History } from "lucide-react";
import { AnimatedSection } from "@/components/sections/AnimatedSection";

const team = [
  {
    name: "Faly Mahery",
    role: "Fondateur & CEO",
    image: "/lovable-uploads/avatar.png",
    description: "20 ans d'expérience dans le tourisme à Madagascar. Passionné par la préservation de la biodiversité malgache.",
    social: {
       linkedin: "#",
      twitter: "#"
    }
  },
  {
    name: "Nirina Nirintsoa",
    role: "Directrice des Opérations",
    image: "/lovable-uploads/avatar.png",
    description: "Experte en logistique et organisation de voyages. Diplômée en gestion touristique de l'Université d'Antananarivo.",
    social: {
      linkedin: "#",
      twitter: "#"
    }
  },
  {
    name: "Andry Rakoto",
    role: "Guide Senior",
    image: "/lovable-uploads/avatar.png",
    description: "Guide certifié avec plus de 500 circuits réalisés. Spécialiste des écosystèmes malgaches.",
    social: {
      linkedin: "#",
      twitter: "#"
    }
  },
  {
    name: "Sandra Rabe",
    role: "Responsable Marketing",
    image: "/lovable-uploads/avatar.png",
    description: "5 ans d'expérience en marketing digital. Passionnée par la promotion du tourisme responsable.",
    social: {
      linkedin: "#",
      twitter: "#"
    }
  },
  {
    name: "Jean-Claude Rajaonarivelo",
    role: "Responsable Partenariats",
    image: "/lovable-uploads/avatar.png",
    description: "Expert en développement de partenariats avec les communautés locales et les acteurs du tourisme.",
    social: {
      linkedin: "#",
      twitter: "#"
    }
  }
];

const AboutUs = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="relative min-h-screen" ref={containerRef}>
      <Header />
      
      {/* Hero Section - Clean without pattern */}
      <motion.div style={{ opacity }} className="relative z-0 mt-16">
        <section className="bg-emerald/10 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                À Propos de Madagascar Travel
              </h1>
              <p className="text-xl text-gray-600">
                Votre partenaire de confiance pour découvrir les merveilles de
                Madagascar depuis plus de 10 ans.
              </p>
            </div>
          </div>
        </section>
      </motion.div>

      {/* Main Content */}
      <motion.div className="relative z-10">
        <div className="bg-white">
          <div className="space-y-24 pb-24">
            {/* Mission Section - Pattern Right */}
            <AnimatedSection className="pt-12">
              <section className="py-16 relative overflow-hidden bg-gray-50/50">
                <div className="absolute inset-0 -z-10">
                  <div className="absolute inset-y-0 right-0 w-1/2 bg-white rounded-l-[100px]" />
                </div>
                <div className="container mx-auto px-4">
                  <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-sm font-semibold text-emerald-600 tracking-wider uppercase mb-4 block">
                      Notre Mission
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                      Ce Qui Nous Guide
                    </h2>
                    <p className="text-xl text-gray-600">
                      Découvrez notre engagement pour un tourisme responsable et authentique
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-12 items-stretch">
                    <div className="space-y-6">
                      <p className="text-dark/70 text-lg leading-relaxed font-opensans">
                        Notre mission est de faire découvrir la beauté unique de
                        Madagascar tout en préservant son environnement et en soutenant
                        les communautés locales. Depuis notre création, nous avons:
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                        <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                          <div className="text-3xl font-poppins font-bold text-emerald mb-2">10+</div>
                          <div className="text-dark/70 font-opensans">Années d'expérience</div>
                        </div>
                        <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                          <div className="text-3xl font-poppins font-bold text-emerald mb-2">500+</div>
                          <div className="text-dark/70 font-opensans">Circuits organisés</div>
                        </div>
                        <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                          <div className="text-3xl font-poppins font-bold text-emerald mb-2">95%</div>
                          <div className="text-dark/70 font-opensans">Clients satisfaits</div>
                        </div>
                        <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                          <div className="text-3xl font-poppins font-bold text-emerald mb-2">20+</div>
                          <div className="text-dark/70 font-opensans">Communautés soutenues</div>
                        </div>
                      </div>
                      <p className="text-dark/70 text-lg leading-relaxed font-opensans mb-6">
                        Nous nous engageons à:
                      </p>
                      <ul className="space-y-6">
                        <li className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                          <div className="p-3 bg-emerald/10 rounded-lg">
                            <Award className="w-6 h-6 text-emerald" />
                          </div>
                          <div>
                            <h3 className="text-lg font-poppins font-semibold mb-1">
                              Expériences authentiques
                            </h3>
                            <p className="text-dark/70 font-opensans">
                              Offrir des voyages responsables et immersifs
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                          <div className="p-3 bg-emerald/10 rounded-lg">
                            <Award className="w-6 h-6 text-emerald" />
                          </div>
                          <div>
                            <h3 className="text-lg font-poppins font-semibold mb-1">
                              Développement durable
                            </h3>
                            <p className="text-dark/70 font-opensans">
                              Contribuer au bien-être des communautés locales
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                          <div className="p-3 bg-emerald/10 rounded-lg">
                            <Award className="w-6 h-6 text-emerald" />
                          </div>
                          <div>
                            <h3 className="text-lg font-poppins font-semibold mb-1">
                              Protection de la biodiversité
                            </h3>
                            <p className="text-dark/70 font-opensans">
                              Préserver les écosystèmes uniques de Madagascar
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="relative h-full rounded-2xl overflow-hidden shadow-lg">
                      <img
                        src="/lovable-uploads/about-us-mission.webp"
                        alt="Mission Madagascar Travel"
                        className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                      <div className="absolute bottom-8 left-8 right-8 text-white">
                        <h3 className="text-2xl font-poppins font-bold mb-2">
                          Explorez Madagascar
                        </h3>
                        <p className="font-opensans">
                          Découvrez des paysages à couper le souffle
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </AnimatedSection>

            {/* Team Section - Pattern Left */}
            <AnimatedSection>
              <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 -z-10">
                  <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-50 rounded-r-[100px]" />
                </div>
                <div className="container mx-auto px-4">
                  <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-sm font-semibold text-emerald-600 tracking-wider uppercase mb-4 block">
                      Notre Équipe
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                      Les Experts Derrière Vos Voyages
                    </h2>
                    <p className="text-xl text-gray-600">
                      Une équipe passionnée dédiée à créer vos plus beaux souvenirs
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {team.map((member) => (
                      <div
                        key={member.name}
                        className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
                      >
                        <div className="w-40 h-40 mx-auto mb-6 overflow-hidden rounded-full relative">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                        <h3 className="text-2xl font-poppins font-semibold text-center mb-2">
                          {member.name}
                        </h3>
                        <p className="text-emerald text-lg text-center mb-4 font-opensans">
                          {member.role}
                        </p>
                        <p className="text-dark/70 text-center font-opensans">
                          {member.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </AnimatedSection>

            {/* History Section - Pattern Right */}
            <AnimatedSection>
              <section className="py-24 relative overflow-hidden bg-gray-50/50">
                <div className="absolute inset-0 -z-10">
                  <div className="absolute inset-y-0 right-0 w-1/2 bg-white rounded-l-[100px]" />
                </div>
                <div className="container mx-auto px-4">
                  <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-sm font-semibold text-emerald-600 tracking-wider uppercase mb-4 block">
                      Notre Histoire
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                      Notre Parcours
                    </h2>
                    <p className="text-xl text-gray-600">
                      Plus de 10 ans d'expérience dans le tourisme à Madagascar
                    </p>
                  </div>
                  <div className="relative max-w-4xl mx-auto">
                    <div className="absolute left-5 top-0 bottom-0 w-px bg-emerald/20"></div>
                    <div className="space-y-12">
                      <div className="relative pl-16">
                        <div className="absolute left-0 top-0 w-10 h-10 bg-emerald/10 rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-emerald rounded-full"></div>
                        </div>
                        <h3 className="text-2xl font-poppins font-semibold mb-3">
                          2013 - Les débuts
                        </h3>
                        <p className="text-dark/70 text-lg font-opensans">
                          Création de Madagascar Travel avec une vision claire : faire
                          découvrir l'authenticité de Madagascar.
                        </p>
                      </div>
                      <div className="relative pl-16">
                        <div className="absolute left-0 top-0 w-10 h-10 bg-emerald/10 rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-emerald rounded-full"></div>
                        </div>
                        <h3 className="text-2xl font-poppins font-semibold mb-3">
                          2015 - Premiers succès
                        </h3>
                        <p className="text-dark/70 text-lg font-opensans">
                          Lancement de nos premiers circuits phares et partenariats avec
                          des guides locaux certifiés.
                        </p>
                      </div>
                      <div className="relative pl-16">
                        <div className="absolute left-0 top-0 w-10 h-10 bg-emerald/10 rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-emerald rounded-full"></div>
                        </div>
                        <h3 className="text-2xl font-poppins font-semibold mb-3">
                          2016 - Expansion
                        </h3>
                        <p className="text-dark/70 text-lg font-opensans">
                          Développement de nouveaux circuits et partenariats avec les
                          communautés locales. Ouverture de notre premier bureau régional.
                        </p>
                      </div>
                      <div className="relative pl-16">
                        <div className="absolute left-0 top-0 w-10 h-10 bg-emerald/10 rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-emerald rounded-full"></div>
                        </div>
                        <h3 className="text-2xl font-poppins font-semibold mb-3">
                          2018 - Certification
                        </h3>
                        <p className="text-dark/70 text-lg font-opensans">
                          Obtention de la certification "Tourisme Responsable" par le
                          Ministère du Tourisme malgache.
                        </p>
                      </div>
                      <div className="relative pl-16">
                        <div className="absolute left-0 top-0 w-10 h-10 bg-emerald/10 rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-emerald rounded-full"></div>
                        </div>
                        <h3 className="text-2xl font-poppins font-semibold mb-3">
                          2019 - Reconnaissance
                        </h3>
                        <p className="text-dark/70 text-lg font-opensans">
                          Obtention de plusieurs prix pour notre engagement dans le
                          tourisme durable, dont le "Prix de l'Innovation Touristique".
                        </p>
                      </div>
                      <div className="relative pl-16">
                        <div className="absolute left-0 top-0 w-10 h-10 bg-emerald/10 rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-emerald rounded-full"></div>
                        </div>
                        <h3 className="text-2xl font-poppins font-semibold mb-3">
                          2021 - Digitalisation
                        </h3>
                        <p className="text-dark/70 text-lg font-opensans">
                          Lancement de notre plateforme digitale et développement de
                          nouveaux outils pour nos clients.
                        </p>
                      </div>
                      <div className="relative pl-16">
                        <div className="absolute left-0 top-0 w-10 h-10 bg-emerald/10 rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-emerald rounded-full"></div>
                        </div>
                        <h3 className="text-2xl font-poppins font-semibold mb-3">
                          2023 - Aujourd'hui
                        </h3>
                        <p className="text-dark/70 text-lg font-opensans">
                          Leader dans l'organisation de voyages responsables à Madagascar,
                          avec plus de 500 circuits organisés et 95% de clients satisfaits.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </AnimatedSection>

            {/* Testimonials Section - Pattern Left */}
            <AnimatedSection>
              <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 -z-10">
                  <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-50 rounded-r-[100px]" />
                </div>
                <div className="container mx-auto px-4">
                  <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-sm font-semibold text-emerald-600 tracking-wider uppercase mb-4 block">
                      Témoignages
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                      Ce Que Disent Nos Clients
                    </h2>
                    <p className="text-xl text-gray-600">
                      Découvrez les expériences de nos voyageurs satisfaits
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <motion.div 
                      className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <img 
                          src="/lovable-uploads/avatar.png" 
                          alt="Client" 
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <h3 className="font-poppins font-semibold">Marie D.</h3>
                          <p className="text-sm text-dark/70">Paris, France</p>
                        </div>
                      </div>
                      <p className="text-dark/70 font-opensans mb-4">
                        "Une expérience inoubliable ! L'équipe a su créer un voyage sur mesure qui a dépassé toutes nos attentes."
                      </p>
                      <div className="flex gap-1 text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                          </svg>
                        ))}
                      </div>
                    </motion.div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
                      <div className="flex items-center gap-4 mb-6">
                        <img 
                          src="/lovable-uploads/avatar.png" 
                          alt="Client" 
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <h3 className="font-poppins font-semibold">Jean P.</h3>
                          <p className="text-sm text-dark/70">Montréal, Canada</p>
                        </div>
                      </div>
                      <p className="text-dark/70 font-opensans mb-4">
                        "Un service impeccable et des guides passionnés. Madagascar est un pays magnifique, et Madagascar Travel sait le mettre en valeur."
                      </p>
                      <div className="flex gap-1 text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                          </svg>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
                      <div className="flex items-center gap-4 mb-6">
                        <img 
                          src="/lovable-uploads/avatar.png" 
                          alt="Client" 
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <h3 className="font-poppins font-semibold">Sophie L.</h3>
                          <p className="text-sm text-dark/70">Genève, Suisse</p>
                        </div>
                      </div>
                      <p className="text-dark/70 font-opensans mb-4">
                        "Un voyage bien organisé qui respecte les communautés locales. Nous avons adoré chaque moment de notre séjour."
                      </p>
                      <div className="flex gap-1 text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </AnimatedSection>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutUs;
