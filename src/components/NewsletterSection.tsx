import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    toast({
      title: "Merci de votre inscription!",
      description: "Vous recevrez bientôt nos dernières actualités.",
    });
    setEmail("");
  };

  return (
    <section className="py-16 bg-emerald/5">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-dark text-center mb-4">
            Restez informé
          </h2>
          <p className="text-lg text-dark/70 text-center mb-12 font-opensans">
            Inscrivez-vous à notre newsletter pour recevoir nos dernières actualités et offres spéciales.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Input
              type="email"
              placeholder="Votre adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="max-w-xs"
              required
            />
            <Button type="submit" className="bg-emerald hover:bg-emerald/90">
              S'inscrire
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;