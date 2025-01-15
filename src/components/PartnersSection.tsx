import { motion } from "framer-motion";

const partners = [
  {
    name: "Air Madagascar",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Air_Madagascar_logo.svg/2560px-Air_Madagascar_logo.svg.png",
    category: "Transport",
  },
  {
    name: "Office National du Tourisme",
    logo: "https://www.madagascar-tourisme.com/wp-content/themes/ont/images/logo-ont.png",
    category: "Tourisme",
  },
  {
    name: "Parc National Madagascar",
    logo: "https://www.parcs-madagascar.com/wordpress/wp-content/uploads/2016/06/Madagascar-National-Parks.png",
    category: "Conservation",
  },
  {
    name: "Ministère du Tourisme",
    logo: "https://www.tourisme.gov.mg/wp-content/uploads/2019/07/logo-ministere-tourisme-madagascar.png",
    category: "Gouvernement",
  },
];

const testimonials = [
  {
    quote: "Une collaboration exceptionnelle qui nous permet d'offrir des expériences uniques à nos clients.",
    author: "Jean Dupont",
    role: "Directeur Commercial",
    company: "Air Madagascar",
  },
  {
    quote: "Madagascar Journeys est un partenaire de confiance qui partage notre vision du tourisme durable.",
    author: "Marie Robert",
    role: "Responsable Partenariats",
    company: "Office National du Tourisme",
  },
];

const PartnersSection = () => {
  return (
    <div className="bg-gray-50/50">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Nos Partenaires
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Nous collaborons avec les meilleurs acteurs du tourisme pour vous offrir une expérience exceptionnelle
              </p>
            </motion.div>
          </div>

          {/* Partners Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group"
              >
                <div className="bg-white rounded-3xl p-8 h-full border border-gray-100 hover:border-emerald-200 transition-colors shadow-lg hover:shadow-xl">
                  <div className="aspect-[3/2] relative flex items-center justify-center">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-w-[80%] max-h-[80%] object-contain transition-opacity group-hover:opacity-80"
                    />
                  </div>
                  <div className="text-center mt-4">
                    <div className="text-sm font-medium text-emerald-600">
                      {partner.category}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    <svg
                      className="h-8 w-8 text-emerald-400"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                    >
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                  </div>
                  <blockquote className="flex-1">
                    <p className="text-lg text-gray-600 italic mb-4">
                      {testimonial.quote}
                    </p>
                  </blockquote>
                  <footer className="mt-4">
                    <div className="font-medium text-gray-900">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role} • {testimonial.company}
                    </div>
                  </footer>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnersSection;