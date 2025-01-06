import FAQ from "./FAQ";

const FAQSection = () => {
  const faqs = [
    {
      question: "Quelle est la meilleure période pour visiter Madagascar ?",
      answer: "La meilleure période pour visiter Madagascar est d'avril à novembre, pendant la saison sèche. Le climat est plus agréable et les routes sont plus praticables."
    },
    {
      question: "Ai-je besoin d'un visa pour Madagascar ?",
      answer: "Oui, un visa est nécessaire pour entrer à Madagascar. Il peut être obtenu à l'arrivée à l'aéroport ou en ligne avant le départ."
    },
    {
      question: "Quelles vaccinations sont recommandées ?",
      answer: "Il est recommandé d'être à jour dans ses vaccinations classiques et de prévoir une protection contre le paludisme. Consultez votre médecin avant le départ."
    },
    {
      question: "Comment se déplacer à Madagascar ?",
      answer: "Plusieurs options sont disponibles : vols intérieurs, taxi-brousse, location de voiture avec chauffeur. Le choix dépend de votre itinéraire et de votre budget."
    },
    {
      question: "Quelle devise utiliser à Madagascar ?",
      answer: "La monnaie locale est l'Ariary. Il est conseillé de changer de l'argent à l'aéroport ou dans les banques. Les euros sont généralement acceptés dans les grands hôtels."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 font-poppins">
          Questions Fréquentes
        </h2>
        <div className="max-w-3xl mx-auto">
          <FAQ faqs={faqs} />
        </div>
      </div>
    </section>
  );
};

export default FAQSection;