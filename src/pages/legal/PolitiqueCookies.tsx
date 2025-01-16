import { motion } from 'framer-motion'

export default function PolitiqueCookies() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="container mx-auto px-4 py-8 mt-24 flex-grow bg-background">
        <motion.h1 
          className="text-4xl font-bold mb-12 text-primary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Politique des Cookies
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
              <h2 className="text-2xl font-bold text-primary">Introduction</h2>
            </div>
            <div className="prose text-muted-foreground">
              <p>
                Cette politique des cookies explique comment Madagascar Travel utilise les cookies et technologies similaires lorsque vous visitez notre site web.
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
              <h2 className="text-2xl font-bold text-primary">Qu'est-ce qu'un cookie ?</h2>
            </div>
            <div className="prose text-muted-foreground">
              <p>
                Un cookie est un petit fichier texte stocké sur votre appareil lorsque vous visitez un site web. Il permet au site de se souvenir de vos actions et préférences.
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
              <h2 className="text-2xl font-bold text-primary">Types de cookies utilisés</h2>
            </div>
            <div className="prose text-muted-foreground">
              <p>
                Nous utilisons différents types de cookies :
                <ul>
                  <li>Cookies essentiels</li>
                  <li>Cookies de performance</li>
                  <li>Cookies de fonctionnalité</li>
                  <li>Cookies de ciblage</li>
                </ul>
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
              <h2 className="text-2xl font-bold text-primary">Gestion des cookies</h2>
            </div>
            <div className="prose text-muted-foreground">
              <p>
                Vous pouvez contrôler et gérer les cookies via les paramètres de votre navigateur. Cependant, la désactivation des cookies peut affecter certaines fonctionnalités du site.
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
              <h2 className="text-2xl font-bold text-primary">Modifications de la politique</h2>
            </div>
            <div className="prose text-muted-foreground">
              <p>
                Nous nous réservons le droit de modifier cette politique des cookies. Toute modification sera publiée sur cette page.
              </p>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
}
