import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function PolitiqueDeConfidentialite() {
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
          Politique de Confidentialité
        </motion.h1>
        
        <div className="prose max-w-none">
          <motion.section 
            className="mb-8 p-6 rounded-lg bg-background/50 hover:bg-background/70 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-secondary">1. Collecte des informations</h2>
            <p>
              Nous collectons des informations lorsque vous vous inscrivez sur notre site, lorsque vous vous connectez à votre compte, faites un achat, participez à un concours, et/ou lorsque vous vous déconnectez. Les informations collectées incluent votre nom, votre adresse e-mail, numéro de téléphone, et/ou carte de crédit.
            </p>
          </motion.section>

          <motion.section 
            className="mb-8 p-6 rounded-lg bg-background/50 hover:bg-background/70 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-secondary">2. Utilisation des informations</h2>
            <p>
              Toutes les informations que nous recueillons auprès de vous peuvent être utilisées pour :
              - Personnaliser votre expérience et répondre à vos besoins individuels
              - Fournir un contenu publicitaire personnalisé
              - Améliorer notre site web
              - Améliorer le service client et vos besoins de support
              - Vous contacter par e-mail
              - Administrer un concours, une promotion, ou une enquête
            </p>
          </motion.section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
