import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Search, MapPin, Users, Calendar } from 'lucide-react';
const images = [
  "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=2000&q=80"
];

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen">
      {/* Background Image Slider */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${currentImage === index ? "opacity-100" : "opacity-0"
              }`}
          >
            <img
              src={image}
              alt={`Madagascar paysage ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center">
        <div className="max-w-3xl text-center animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-poppins font-bold text-white mb-6">
            Découvrez la magie de Madagascar
          </h1>
          <p className="text-xl text-white/90 font-opensans mb-12">
            Une île unique où nature exceptionnelle et culture authentique se rencontrent
          </p>

          {/* Search Bar */}
          {/* <div className="bg-white/95 p-4 rounded-lg shadow-lg max-w-2xl mx-auto mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Destination"
                className="flex-1 p-2 border rounded"
              />
              <input
                type="date"
                className="flex-1 p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Voyageurs"
                min="1"
                className="flex-1 p-2 border rounded"
              />
              <Button className="bg-emerald hover:bg-emerald/90">
                <Search className="mr-2 h-4 w-4" />
                Rechercher
              </Button>
            </div>
          </div> */}


          <div className="bg-white rounded-lg shadow-xl p-6 max-w-4xl">
            <form className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Destination
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Où souhaitez-vous aller ?"
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date de départ
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="date"
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Voyageurs
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <select className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                    <option>1 personne</option>
                    <option>2 personnes</option>
                    <option>3 personnes</option>
                    <option>4+ personnes</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  &nbsp;
                </label>
                <button className="w-full bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-600/90 transition-colors flex items-center justify-center gap-2">
                  <Search size={20} />
                  Rechercher
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;