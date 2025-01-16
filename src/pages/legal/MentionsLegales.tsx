import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const MentionsLegales = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-8 mt-24 flex-grow">
      <motion.h1 
        className="text-4xl font-bold mb-8 text-primary"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Mentions légales
      </motion.h1>
      
      <div className="prose max-w-none">
        <motion.section 
          className="mb-8 p-6 rounded-lg bg-background/50 hover:bg-background/70 transition-colors"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-secondary">1. Informations légales</h2>
          <p>
            Conformément aux dispositions des articles 6-III et 19 de la Loi n° 2004-575 du 21 juin 2004 pour la Confiance dans l'économie numérique, dite L.C.E.N., nous portons à la connaissance des utilisateurs et visiteurs du site les informations suivantes :
          </p>
        </motion.section>

        <motion.section 
          className="mb-8 p-6 rounded-lg bg-background/50 hover:bg-background/70 transition-colors"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-secondary">2. Éditeur du site</h2>
          <p>
            Madagascar Travel<br />
            123 Rue des Voyages, Antananarivo 101<br />
            Téléphone : +261 34 12 345 67<br />
            Email : contact@madagascartravel.com<br />
            SIRET : 123 456 789 00012<br />
            RCS : Antananarivo B 123 456 789
          </p>
        </motion.section>

        <motion.section 
          className="mb-8 p-6 rounded-lg bg-background/50 hover:bg-background/70 transition-colors"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-secondary">3. Hébergement</h2>
          <p>
            Le site est hébergé par :<br />
            Vercel Inc.<br />
            340 S Lemon Ave #4133, Walnut, CA 91789, USA
          </p>
        </motion.section>

        <motion.section 
          className="mb-8 p-6 rounded-lg bg-background/50 hover:bg-background/70 transition-colors"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-secondary">4. Propriété intellectuelle</h2>
          <p>
            L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés.
          </p>
        </motion.section>
      </div>
      </main>
      <Footer />
    </div>
  );
};

export default MentionsLegales;
