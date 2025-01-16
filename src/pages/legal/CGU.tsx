import { motion } from 'framer-motion'

export default function CGUPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="container mx-auto px-4 py-8 mt-24 flex-grow bg-background">
        <motion.h1 
          className="text-4xl font-bold mb-12 text-primary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Conditions Générales d'Utilisation
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
              <h2 className="text-2xl font-bold text-primary">Acceptation des conditions</h2>
            </div>
            <div className="prose text-muted-foreground">
              <p>
                En accédant et en utilisant ce site web, vous acceptez d'être lié par
                ces Conditions Générales d'Utilisation.
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
              <h2 className="text-2xl font-bold text-primary">Utilisation du site</h2>
            </div>
            <div className="prose text-muted-foreground">
              <p>
                Vous vous engagez à utiliser ce site uniquement à des fins légales et
                conformément à ces conditions.
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
              <h2 className="text-2xl font-bold text-primary">Propriété intellectuelle</h2>
            </div>
            <div className="prose text-muted-foreground">
              <p>
                Tout le contenu du site, y compris les textes, images, logos et
                graphiques, est la propriété de Madagascar Journeys ou de ses
                concédants de licence.
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
              <h2 className="text-2xl font-bold text-primary">Limitations de responsabilité</h2>
            </div>
            <div className="prose text-muted-foreground">
              <p>
                Madagascar Journeys ne peut être tenu responsable des dommages
                résultant de l'utilisation de ce site.
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
              <h2 className="text-2xl font-bold text-primary">Modifications</h2>
            </div>
            <div className="prose text-muted-foreground">
              <p>
                Nous nous réservons le droit de modifier ces conditions à tout moment.
                Votre utilisation continue du site constitue votre acceptation de ces
                modifications.
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
              <h2 className="text-2xl font-bold text-primary">Loi applicable</h2>
            </div>
            <div className="prose text-muted-foreground">
              <p>
                Ces conditions sont régies par les lois de Madagascar. Tout litige
                relatif à ces conditions sera soumis à la juridiction des tribunaux de
                Madagascar.
              </p>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
}
