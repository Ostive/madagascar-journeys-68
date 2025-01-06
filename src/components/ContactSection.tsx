import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";

const ContactSection = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Message envoyé !",
      description: "Nous vous répondrons dans les plus brefs délais.",
    });
  };

  return (
    <section className="py-16 bg-white" id="contact">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left side - Contact Info */}
          <div className="space-y-8">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"
                alt="Notre équipe à votre service"
                className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start space-x-4">
                  <Phone className="text-emerald h-6 w-6" />
                  <div>
                    <h3 className="font-semibold mb-2">Téléphone</h3>
                    <p className="text-dark/70">+261 20 22 123 456</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start space-x-4">
                  <Mail className="text-emerald h-6 w-6" />
                  <div>
                    <h3 className="font-semibold mb-2">Email</h3>
                    <p className="text-dark/70">contact@madagascar-travel.com</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start space-x-4">
                  <MapPin className="text-emerald h-6 w-6" />
                  <div>
                    <h3 className="font-semibold mb-2">Adresse</h3>
                    <p className="text-dark/70">Antananarivo, Madagascar</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start space-x-4">
                  <Clock className="text-emerald h-6 w-6" />
                  <div>
                    <h3 className="font-semibold mb-2">Horaires</h3>
                    <p className="text-dark/70">Lun - Ven: 9h - 18h</p>
                    <p className="text-dark/70">Sam: 9h - 12h</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Right side - Contact Form */}
          <Card className="p-8 shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-poppins font-semibold mb-6">Envoyez-nous un message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium mb-2">Nom</label>
                  <Input
                    type="text"
                    placeholder="Votre nom"
                    className="w-full transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    type="email"
                    placeholder="votre@email.com"
                    className="w-full transition-all"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium mb-2">Sujet</label>
                <Input
                  type="text"
                  placeholder="Sujet de votre message"
                  className="w-full transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium mb-2">Message</label>
                <Textarea
                  className="min-h-[150px] w-full transition-all"
                  placeholder="Votre message..."
                  required
                />
              </div>
              <Button 
                type="submit"
                className="w-full bg-emerald hover:bg-emerald/90 transition-colors"
              >
                Envoyer
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;