const MentionsLegales = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-24">
      <h1 className="text-4xl font-bold mb-8">Mentions légales</h1>
      
      <div className="prose max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Informations légales</h2>
          <p>
            Conformément aux dispositions des articles 6-III et 19 de la Loi n° 2004-575 du 21 juin 2004 pour la Confiance dans l'économie numérique, dite L.C.E.N., nous portons à la connaissance des utilisateurs et visiteurs du site les informations suivantes :
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Éditeur du site</h2>
          <p>
            Madagascar Travel<br />
            [Adresse complète]<br />
            Téléphone : [Numéro]<br />
            Email : contact@madagascartravel.com
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Hébergement</h2>
          <p>
            Le site est hébergé par :<br />
            [Nom de l'hébergeur]<br />
            [Adresse de l'hébergeur]
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Propriété intellectuelle</h2>
          <p>
            L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés.
          </p>
        </section>
      </div>
    </div>
  );
};

export default MentionsLegales;