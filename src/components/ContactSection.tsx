import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";
import { motion } from "framer-motion";

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
    <section className="relative py-24 overflow-hidden bg-gray-50" id="contact">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <svg
          className="absolute h-full w-full"
          width="100%"
          height="100%"
          fill="none"
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_201_2)">
            <g opacity="0.05">
              <path
                d="M-99 461H701V-99H-99V461ZM329.5 182.5C329.5 262.037 265.037 326.5 185.5 326.5C105.963 326.5 41.5 262.037 41.5 182.5C41.5 102.963 105.963 38.5 185.5 38.5C265.037 38.5 329.5 102.963 329.5 182.5Z"
                fill="currentColor"
                className="text-emerald-600"
              />
              <path
                d="M370.5 182.5C370.5 284.635 287.635 367.5 185.5 367.5C83.3645 367.5 0.5 284.635 0.5 182.5C0.5 80.3645 83.3645 -2.5 185.5 -2.5C287.635 -2.5 370.5 80.3645 370.5 182.5Z"
                stroke="currentColor"
                className="text-emerald-600"
              />
              <path
                d="M348.5 182.5C348.5 272.545 275.545 345.5 185.5 345.5C95.4548 345.5 22.5 272.545 22.5 182.5C22.5 92.4548 95.4548 19.5 185.5 19.5C275.545 19.5 348.5 92.4548 348.5 182.5Z"
                stroke="currentColor"
                className="text-emerald-600"
              />
            </g>
          </g>
        </svg>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Contactez-nous</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Notre équipe est là pour vous aider à planifier votre voyage de rêve à Madagascar. N'hésitez pas à nous contacter.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left side - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
              <img
                src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"
                alt="Notre équipe à votre service"
                className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
                <div className="flex items-start space-x-4">
                  <Phone className="text-emerald-500 h-6 w-6" />
                  <div>
                    <h3 className="font-semibold mb-2">Téléphone</h3>
                    <p className="text-gray-600">+261 20 22 123 456</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
                <div className="flex items-start space-x-4">
                  <Mail className="text-emerald-500 h-6 w-6" />
                  <div>
                    <h3 className="font-semibold mb-2">Email</h3>
                    <p className="text-gray-600">contact@madagascar-journeys.com</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
                <div className="flex items-start space-x-4">
                  <MapPin className="text-emerald-500 h-6 w-6" />
                  <div>
                    <h3 className="font-semibold mb-2">Adresse</h3>
                    <p className="text-gray-600">Antananarivo, Madagascar</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
                <div className="flex items-start space-x-4">
                  <Clock className="text-emerald-500 h-6 w-6" />
                  <div>
                    <h3 className="font-semibold mb-2">Horaires</h3>
                    <p className="text-gray-600">Lun - Ven: 9h - 18h</p>
                    <p className="text-gray-600">Sam: 9h - 12h</p>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>

          {/* Right side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 shadow-lg hover:shadow-xl transition-shadow bg-white/80 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Envoyez-nous un message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                    <Input
                      type="text"
                      placeholder="Votre nom"
                      className="w-full transition-all border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <Input
                      type="email"
                      placeholder="votre@email.com"
                      className="w-full transition-all border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sujet</label>
                  <Input
                    type="text"
                    placeholder="Sujet de votre message"
                    className="w-full transition-all border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <Textarea
                    placeholder="Votre message..."
                    className="w-full min-h-[150px] transition-all border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 rounded-lg transition-colors"
                >
                  Envoyer le message
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;