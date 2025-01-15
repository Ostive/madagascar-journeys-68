import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "Quelle est la meilleure période pour visiter Madagascar ?",
    answer: "La meilleure période pour visiter Madagascar est d'avril à novembre, pendant la saison sèche. Le climat est plus agréable et les routes sont plus praticables. Évitez la saison des pluies de décembre à mars, qui peut rendre certaines régions difficiles d'accès.",
    category: "Voyage",
  },
  {
    question: "Ai-je besoin d'un visa pour Madagascar ?",
    answer: "Oui, un visa est nécessaire pour entrer à Madagascar. Il peut être obtenu à l'arrivée à l'aéroport ou en ligne avant le départ. Le visa touristique est valable 30 à 90 jours selon votre choix.",
    category: "Administratif",
  },
  {
    question: "Quelles vaccinations sont recommandées ?",
    answer: "Il est recommandé d'être à jour dans ses vaccinations de base et de prévoir une protection contre l'hépatite A, la typhoïde et le paludisme. Consultez votre médecin avant le départ pour des recommandations personnalisées.",
    category: "Santé",
  },
  {
    question: "Comment se déplacer à Madagascar ?",
    answer: "Plusieurs options sont disponibles : vols intérieurs pour les longues distances, taxi-brousse pour les trajets entre villes, et location de voiture avec chauffeur. Nous recommandons nos services de transport privé pour plus de confort et de sécurité.",
    category: "Transport",
  },
  {
    question: "Quelle est la monnaie utilisée ?",
    answer: "La monnaie locale est l'Ariary (MGA). Il est conseillé de changer de l'argent à l'aéroport ou dans les banques. Les cartes bancaires sont acceptées dans les grands hôtels mais pas partout.",
    category: "Pratique",
  },
  {
    question: "Les circuits sont-ils adaptés aux enfants ?",
    answer: "Oui, nous proposons des circuits adaptés aux familles avec enfants. Certains itinéraires sont spécialement conçus pour combiner découverte, confort et activités ludiques adaptées à tous les âges.",
    category: "Circuits",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(faqs.map((faq) => faq.category)));
  const filteredFaqs = selectedCategory
    ? faqs.filter((faq) => faq.category === selectedCategory)
    : faqs;

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <HelpCircle className="h-12 w-12 mx-auto mb-6 text-emerald-500" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Questions Fréquentes
            </h2>
            <p className="text-xl text-gray-600">
              Trouvez rapidement les réponses à vos questions sur Madagascar
            </p>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === null
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Tout
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* FAQ Items */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={false}
                animate={{ backgroundColor: openIndex === index ? "rgb(243 244 246)" : "white" }}
                className="rounded-2xl border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="flex items-center justify-between w-full p-6 text-left"
                >
                  <span className="text-lg font-medium text-gray-900">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-6 pb-6">
                        <div className="prose prose-emerald max-w-none">
                          <p className="text-gray-600">{faq.answer}</p>
                        </div>
                        <div className="mt-4 flex items-center">
                          <span className="text-sm font-medium text-emerald-600">
                            {faq.category}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <p className="text-gray-600 mb-4">
              Vous ne trouvez pas la réponse à votre question ?
            </p>
            <a
              href="/contact"
              className="inline-flex items-center text-emerald-500 font-medium hover:text-emerald-600 transition-colors"
            >
              Contactez-nous
              <ChevronDown className="ml-2 h-4 w-4 rotate-[-90deg]" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;