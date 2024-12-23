import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="py-20" id="contact">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-poppins font-bold text-dark text-center mb-4">
          Contactez-nous
        </h2>
        <p className="text-lg text-dark/70 text-center mb-12 font-opensans">
          Notre équipe est à votre disposition pour organiser votre voyage sur mesure
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nom</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Sujet</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    className="w-full p-2 border rounded h-32"
                    required
                  ></textarea>
                </div>
                <Button className="w-full bg-emerald hover:bg-emerald/90">
                  Envoyer
                </Button>
              </form>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <Phone className="text-emerald" />
                <div>
                  <h3 className="font-semibold mb-2">Téléphone</h3>
                  <p className="text-dark/70">+261 20 22 123 456</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <Mail className="text-emerald" />
                <div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-dark/70">contact@madagascar-travel.com</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <MapPin className="text-emerald" />
                <div>
                  <h3 className="font-semibold mb-2">Adresse</h3>
                  <p className="text-dark/70">Antananarivo, Madagascar</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <Clock className="text-emerald" />
                <div>
                  <h3 className="font-semibold mb-2">Horaires</h3>
                  <p className="text-dark/70">Lun - Ven: 9h - 18h</p>
                  <p className="text-dark/70">Sam: 9h - 12h</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;