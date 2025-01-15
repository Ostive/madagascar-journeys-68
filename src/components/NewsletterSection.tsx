import { motion } from "framer-motion";
import { Mail, ArrowRight, Send } from "lucide-react";
import { useState } from "react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1000);
  };

  return (
    <section className="relative overflow-hidden bg-gray-50/50 py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <svg
          className="absolute right-0 top-0 h-[500px] w-[500px] transform translate-x-1/2 -translate-y-1/2 text-emerald-50"
          fill="currentColor"
          viewBox="0 0 200 200"
        >
          <defs>
            <pattern
              id="newsletterPattern"
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
            fill="url(#newsletterPattern)"
            d="M100 0C44.8 0 0 44.8 0 100s44.8 100 100 100 100-44.8 100-100S155.2 0 100 0zM100 150c-27.6 0-50-22.4-50-50s22.4-50 50-50 50 22.4 50 50-22.4 50-50 50z"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Mail className="h-12 w-12 mx-auto mb-6 text-emerald-500" />
            <span className="text-sm font-semibold text-emerald-600 tracking-wider uppercase mb-4 block">
              Newsletter
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Restez Informé
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Abonnez-vous à notre newsletter pour recevoir nos meilleures offres et découvrir les trésors cachés de Madagascar
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="max-w-md mx-auto"
          >
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse email"
                className="w-full h-14 px-6 rounded-full bg-white border border-gray-200 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                disabled={status !== "idle"}
              />
              <button
                type="submit"
                disabled={status !== "idle"}
                className="absolute right-2 top-2 h-10 px-6 bg-gradient-to-r from-emerald-400 to-teal-500 text-white rounded-full hover:opacity-90 transition-opacity flex items-center"
              >
                {status === "idle" && (
                  <>
                    S'abonner
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
                {status === "loading" && (
                  <div className="animate-spin">
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  </div>
                )}
                {status === "success" && (
                  <Send className="h-5 w-5 text-white animate-ping" />
                )}
              </button>
            </div>
          </motion.form>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Offres Exclusives",
                description: "Accédez à des réductions et offres spéciales en avant-première",
              },
              {
                title: "Guides de Voyage",
                description: "Recevez nos meilleurs conseils pour explorer Madagascar",
              },
              {
                title: "Actualités",
                description: "Restez informé des dernières nouveautés et événements",
              },
            ].map((feature, index) => (
              <div key={feature.title} className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;