import { motion } from 'framer-motion'

export default function CGV() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="container mx-auto px-4 py-8 mt-24 flex-grow bg-background">
        <motion.h1 
          className="text-4xl font-bold mb-12 text-primary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Conditions Générales de Vente
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
              <h2 className="text-2xl font-bold text-primary">Objet</h2>
            </div>
            <div className="prose text-muted-foreground">
              <p>
                Les présentes conditions générales de vente (CGV) régissent les relations contractuelles entre Madagascar Travel et ses clients.
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
              <h2 className="text-2xl font-bold text-primary">Tarifs et réservation</h2>
            </div>
            <div className="prose text-muted-foreground">
              <p>
                Les tarifs sont indiqués en Ariary malgache (MGA) et incluent la TVA. La réservation est confirmée après réception du paiement.
              </p>
            </div>
          </motion.section>

          <motion.section 
            className="p-8 rounded-xl border border-border/50 bg-background/50 hover:bg-background/70 transition-all hover:shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h2 className="text-2xl font-bold text-primary">Paiement</h2>
            </div>
            <div className="prose text-muted-foreground">
              <p>
                Les modes de paiement acceptés sont : carte bancaire, virement et paiement mobile (MVola, Airtel Money).
              </p>
            </div>
          </motion.section>

          <motion.section 
            className="p-8 rounded-xl border border-border/50 bg-background/50 hover:bg-background/70 transition-all hover:shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">4</span>
              </div>
              <h2 className="text-2xl font-bold text-primary">Annulation et modification</h2>
            </div>
            <div className="prose text-muted-foreground">
              <p>
                Toute annulation ou modification doit être effectuée au moins 7 jours avant la date de départ. Des frais d'annulation peuvent s'appliquer.
              </p>
            </div>
          </motion.section>

          <motion.section 
            className="p-8 rounded-xl border border-border/50 bg-background/50 hover:bg-background/70 transition-all hover:shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">5</span>
              </div>
              <h2 className="text-2xl font-bold text-primary">Responsabilité</h2>
            </div>
            <div className="prose text-muted-foreground">
              <p>
                Madagascar Travel décline toute responsabilité en cas de force majeure ou d'événements indépendants de sa volonté.
              </p>
            </div>
          </motion.section>

          <motion.section 
            className="p-8 rounded-xl border border-border/50 bg-background/50 hover:bg-background/70 transition-all hover:shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">6</span>
              </div>
              <h2 className="text-2xl font-bold text-primary">Litiges</h2>
            </div>
            <div className="prose text-muted-foreground">
              <p>
                En cas de litige, les parties s'engagent à rechercher une solution amiable avant toute action en justice.
              </p>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
}
