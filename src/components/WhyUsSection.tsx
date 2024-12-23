import { Award, Clock, Map, Shield } from "lucide-react";

const features = [
  {
    icon: Map,
    title: "Expertise locale",
    description: "Guides natifs et connaisseurs du terrain"
  },
  {
    icon: Award,
    title: "15 ans d'expérience",
    description: "Des milliers de voyageurs satisfaits"
  },
  {
    icon: Shield,
    title: "Guides certifiés",
    description: "Formation et certification rigoureuses"
  },
  {
    icon: Clock,
    title: "Support 24/7",
    description: "Une équipe à votre écoute en permanence"
  }
];

const WhyUsSection = () => {
  return (
    <section className="py-20" id="about">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-poppins font-bold text-dark text-center mb-4">
          Pourquoi nous choisir
        </h2>
        <p className="text-lg text-dark/70 text-center mb-12 font-opensans">
          Notre engagement pour des voyages d'exception
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="text-center p-6 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald/10 mb-6">
                <feature.icon className="w-8 h-8 text-emerald" />
              </div>
              <h3 className="text-xl font-poppins font-semibold mb-3">
                {feature.title}
              </h3>
              <p className="text-dark/70 font-opensans">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;