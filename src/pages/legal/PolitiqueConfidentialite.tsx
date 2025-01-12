const PolitiqueConfidentialite = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-24">
      <h1 className="text-4xl font-bold mb-8">Politique de confidentialité</h1>
      
      <div className="prose max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Collecte des informations</h2>
          <p>
            Nous collectons des informations lorsque vous vous inscrivez sur notre site, lorsque vous vous connectez à votre compte, faites un achat, ou lorsque vous vous déconnectez. Les informations collectées incluent votre nom, votre adresse e-mail, numéro de téléphone, et carte de crédit.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Utilisation des informations</h2>
          <p>
            Les informations que nous collectons auprès de vous peuvent être utilisées pour :
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>Personnaliser votre expérience et répondre à vos besoins individuels</li>
            <li>Fournir un contenu publicitaire personnalisé</li>
            <li>Améliorer notre site Web</li>
            <li>Améliorer le service client et vos besoins de prise en charge</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Protection des informations</h2>
          <p>
            Nous mettons en œuvre une variété de mesures de sécurité pour préserver la sécurité de vos informations personnelles.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PolitiqueConfidentialite;