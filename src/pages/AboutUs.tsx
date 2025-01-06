import Header from "@/components/Header";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import { Users, Award, BookOpen, History } from "lucide-react";

const team = [
  {
    name: "Faly Mahery",
    role: "Fondateur & CEO",
    image: "/lovable-uploads/avatar.png",
    description: "20 ans d'expérience dans le tourisme à Madagascar",
  },
  {
    name: "Nirina Nirintsoa",
    role: "Directrice des Opérations",
    image: "/lovable-uploads/avatar.png",
    description: "Experte en logistique et organisation de voyages",
  },
  {
    name: "Andry Rakoto",
    role: "Guide Senior",
    image: "/lovable-uploads/avatar.png",
    description: "Guide certifié avec plus de 500 circuits réalisés",
  },
];

const AboutUs = () => {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Header />
      <div className="p-14" />
      {/* Hero Section */}
      <section className="bg-emerald/10 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-poppins font-bold text-center text-dark mb-6">
            À Propos de Madagascar Travel
          </h1>
          <p className="text-lg text-center text-dark/70 max-w-3xl mx-auto font-opensans">
            Votre partenaire de confiance pour découvrir les merveilles de
            Madagascar depuis plus de 10 ans.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-8">
            <BookOpen className="w-6 h-6 text-emerald" />
            <h2 className="text-3xl font-poppins font-bold text-dark">
              Notre Mission
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-dark/70 mb-4 font-opensans">
                Notre mission est de faire découvrir la beauté unique de
                Madagascar tout en préservant son environnement et en soutenant
                les communautés locales. Nous nous engageons à:
              </p>
              <ul className="space-y-4 text-dark/70 font-opensans">
                <li className="flex items-start gap-2">
                  <Award className="w-5 h-5 text-emerald mt-1" />
                  <span>
                    Offrir des expériences de voyage authentiques et
                    responsables
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Award className="w-5 h-5 text-emerald mt-1" />
                  <span>
                    Contribuer au développement durable des communautés locales
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Award className="w-5 h-5 text-emerald mt-1" />
                  <span>
                    Protéger et préserver la biodiversité unique de Madagascar
                  </span>
                </li>
              </ul>
            </div>
            <div className="relative h-[400px]">
              <img
                src="/lovable-uploads/about-us-mission.webp"
                alt="Mission Madagascar Travel"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-8">
            <Users className="w-6 h-6 text-emerald" />
            <h2 className="text-3xl font-poppins font-bold text-dark">
              Notre Équipe
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-poppins font-semibold text-center mb-2">
                  {member.name}
                </h3>
                <p className="text-emerald text-center mb-3 font-opensans">
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

      {/* History Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-8">
            <History className="w-6 h-6 text-emerald" />
            <h2 className="text-3xl font-poppins font-bold text-dark">
              Notre Histoire
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="border-l-4 border-emerald pl-6">
              <h3 className="text-xl font-poppins font-semibold mb-2">
                2013 - Les débuts
              </h3>
              <p className="text-dark/70 font-opensans">
                Création de Madagascar Travel avec une vision claire : faire
                découvrir l'authenticité de Madagascar.
              </p>
            </div>
            <div className="border-l-4 border-emerald pl-6">
              <h3 className="text-xl font-poppins font-semibold mb-2">
                2016 - Expansion
              </h3>
              <p className="text-dark/70 font-opensans">
                Développement de nouveaux circuits et partenariats avec les
                communautés locales.
              </p>
            </div>
            <div className="border-l-4 border-emerald pl-6">
              <h3 className="text-xl font-poppins font-semibold mb-2">
                2019 - Reconnaissance
              </h3>
              <p className="text-dark/70 font-opensans">
                Obtention de plusieurs prix pour notre engagement dans le
                tourisme durable.
              </p>
            </div>
            <div className="border-l-4 border-emerald pl-6">
              <h3 className="text-xl font-poppins font-semibold mb-2">
                2023 - Aujourd'hui
              </h3>
              <p className="text-dark/70 font-opensans">
                Leader dans l'organisation de voyages responsables à Madagascar.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;