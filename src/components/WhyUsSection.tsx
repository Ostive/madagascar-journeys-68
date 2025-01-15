import { motion } from "framer-motion";
import { Award, Users, Globe2, Clock, Shield, Heart } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Expertise Locale",
    description: "Notre équipe locale connaît Madagascar comme sa poche et vous fait découvrir ses trésors cachés.",
    stat: "15+",
    statLabel: "années d'expérience",
  },
  {
    icon: Users,
    title: "Service Personnalisé",
    description: "Chaque voyage est unique, conçu sur mesure selon vos envies et votre rythme.",
    stat: "1000+",
    statLabel: "clients satisfaits",
  },
  {
    icon: Globe2,
    title: "Destinations Uniques",
    description: "Accédez à des lieux exceptionnels et vivez des expériences authentiques.",
    stat: "50+",
    statLabel: "destinations",
  },
  {
    icon: Clock,
    title: "Support 24/7",
    description: "Une assistance disponible à tout moment pour votre tranquillité d'esprit.",
    stat: "24/7",
    statLabel: "disponibilité",
  },
  {
    icon: Shield,
    title: "Voyage Sécurisé",
    description: "Votre sécurité est notre priorité avec des partenaires de confiance sélectionnés.",
    stat: "100%",
    statLabel: "sécurité",
  },
  {
    icon: Heart,
    title: "Tourisme Durable",
    description: "Nous nous engageons pour un tourisme responsable et respectueux de l'environnement.",
    stat: "30+",
    statLabel: "projets soutenus",
  },
];

const WhyUsSection = () => {
  return (
    <section className="relative py-24 bg-gray-50/50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <svg
          className="absolute right-0 top-0 h-[500px] w-[500px] transform translate-x-1/2 -translate-y-1/2 text-emerald-50"
          fill="currentColor"
          viewBox="0 0 200 200"
        >
          <defs>
            <pattern
              id="whyUsPattern"
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
            fill="url(#whyUsPattern)"
            d="M100 0C44.8 0 0 44.8 0 100s44.8 100 100 100 100-44.8 100-100S155.2 0 100 0zM100 150c-27.6 0-50-22.4-50-50s22.4-50 50-50 50 22.4 50 50-22.4 50-50 50z"
          />
        </svg>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="text-sm font-semibold text-emerald-600 tracking-wider uppercase mb-4 block">
              Nos Avantages
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Pourquoi Nous Choisir
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez ce qui fait de Madagascar Journeys votre partenaire idéal pour explorer cette île extraordinaire
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="relative group"
                >
                  <div className="bg-white rounded-3xl p-8 h-full border border-gray-100 hover:border-emerald-200 transition-colors shadow-lg hover:shadow-xl">
                    {/* Icon */}
                    <div className="mb-6 relative">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center transform rotate-3 group-hover:rotate-6 transition-transform">
                        <Icon className="h-7 w-7 text-white transform -rotate-3 group-hover:-rotate-6 transition-transform" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {feature.description}
                    </p>

                    {/* Stats */}
                    <div className="pt-6 border-t border-gray-100">
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold text-emerald-600">
                          {feature.stat}
                        </span>
                        <span className="ml-2 text-sm text-gray-500">
                          {feature.statLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;