const PolitiqueCookies = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-24">
      <h1 className="text-4xl font-bold mb-8">Politique de gestion des cookies</h1>
      
      <div className="prose max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Qu'est-ce qu'un cookie ?</h2>
          <p>
            Un cookie est un petit fichier texte qui est placé sur votre ordinateur, tablette ou téléphone portable lorsque vous visitez un site internet.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Comment utilisons-nous les cookies ?</h2>
          <p>
            Nous utilisons les cookies pour :
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>Assurer le bon fonctionnement du site</li>
            <li>Mémoriser vos préférences</li>
            <li>Améliorer votre expérience de navigation</li>
            <li>Analyser l'utilisation du site</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Gestion des cookies</h2>
          <p>
            Vous pouvez à tout moment choisir de désactiver ces cookies. Votre navigateur peut également être paramétré pour vous signaler les cookies qui sont déposés dans votre ordinateur et vous demander de les accepter ou non.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PolitiqueCookies;