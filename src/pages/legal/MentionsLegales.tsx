import { motion } from 'framer-motion'

export default function MentionsLegales() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="container mx-auto px-4 py-8 mt-24 flex-grow bg-background">
        <motion.h1 
          className="text-4xl font-bold mb-12 text-primary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Mentions Légales
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
              <h2 className="text-2xl font-bold text-primary">Informations légales</h2>
            </div>
            <div className="prose text-muted-foreground">
              <p>
                Conformément aux dispositions des articles 6-III et 19 de la Loi n° 2004-575 du 21 juin 2004 pour la Confiance dans l'économie numérique, dite L.C.E.N., nous portons à la connaissance des utilisateurs et visiteurs du site les informations suivantes :
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
              <h2 className="text-2xl font-bold text-primary">Éditeur du site</h2>
            </div>
            <div className="prose text-muted-foreground">
              <p>
                Madagascar Travel<br />
                123 Rue des Voyages, Antananarivo 101<br />
                Téléphone : +261 34 12 345 67<br />
                Email : contact@madagascartravel.com<br />
                SIRET : 123 456 789 00012<br />
                RCS : Antananarivo B 123 456 789
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
              <h2 className="text-2xl font-bold text-primary">Hébergement</h2>
            </div>
            <div className="prose text-muted-foreground">
              <p>
                Le site est hébergé par :<br />
                Vercel Inc.<br />
                340 S Lemon Ave #4133, Walnut, CA 91789, USA
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
              <h2 className="text-2xl font-bold text-primary">Propriété intellectuelle</h2>
            </div>
            <div className="prose text-muted-foreground">
              <p>
                L'ensemble de ce site relève de la législation malgache, française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés.
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
              <h2 className="text-2xl font-bold text-primary">Protection des données</h2>
            </div>
            <div className="prose text-muted-foreground">
              <p>
                Conformément à la loi n°2014-038 relative à la protection des données personnelles à Madagascar, nous nous engageons à protéger vos informations personnelles. Vous disposez d'un droit d'accès, de modification et de suppression de vos données.
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
              <h2 className="text-2xl font-bold text-primary">Réglementation touristique</h2>
            </div>
            <div className="prose text-muted-foreground">
              <p>
                Notre activité est régie par le Code du Tourisme malgache (Loi n°2008-007) et les normes établies par l'Office National du Tourisme de Madagascar (ONTM). Nous sommes enregistrés auprès du Ministère du Tourisme sous le numéro : MT/2023/12345.
              </p>
            </div>
          </motion.section>

          <motion.section 
            className="p-8 rounded-xl border border-border/50 bg-background/50 hover:bg-background/70 transition-all hover:shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">7</span>
              </div>
              <h2 className="text-2xl font-bold text-primary">Autorités compétentes</h2>
            </div>
            <div className="prose text-muted-foreground">
              <p>
                En cas de litige, vous pouvez contacter :<br />
                - Commission de Régulation des Communications (CRC) : crc@crc.mg<br />
                - Office National du Tourisme de Madagascar : contact@ontm.mg<br />
                - Tribunal de Commerce d'Antananarivo : tribunal.commerce@justice.mg
              </p>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
}
