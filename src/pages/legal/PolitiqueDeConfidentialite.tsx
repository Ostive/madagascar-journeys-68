import { motion } from 'framer-motion'

export default function PolitiqueDeConfidentialite() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="container mx-auto px-4 py-8 mt-24 flex-grow bg-background">
        <motion.h1 
          className="text-4xl font-bold mb-12 text-primary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Politique de Confidentialité
        </motion.h1>
        
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.section 
            className="p-8 rounded-xl border border-border/50 bg-background/50 hover:bg-background/70 transition-all hover:shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h2 className="text-2xl font-bold text-primary">Collecte des informations</h2>
            </div>
            <div className="prose text-muted-foreground">
              <p>
                Nous collectons des informations lorsque vous :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Vous inscrivez sur notre site</li>
                <li>Vous connectez à votre compte</li>
                <li>Effectuez un achat</li>
                <li>Participez à un concours</li>
                <li>Vous déconnectez</li>
              </ul>
              <p className="mt-4">
                Les informations collectées incluent votre nom, adresse e-mail, numéro de téléphone, et/ou carte de crédit.
              </p>
            </div>
          </motion.section>

          <motion.section 
            className="p-8 rounded-xl border border-border/50 bg-background/50 hover:bg-background/70 transition-all hover:shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h2 className="text-2xl font-bold text-primary">Utilisation des informations</h2>
            </div>
            <div className="prose text-muted-foreground">
              <p>
                Toutes les informations que nous recueillons peuvent être utilisées pour :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Personnaliser votre expérience</li>
                <li>Répondre à vos besoins individuels</li>
                <li>Fournir un contenu publicitaire personnalisé</li>
                <li>Améliorer notre site web</li>
                <li>Améliorer le service client</li>
                <li>Vous contacter par e-mail</li>
                <li>Administrer concours et promotions</li>
              </ul>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
}
