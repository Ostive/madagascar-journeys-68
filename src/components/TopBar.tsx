import { Mail, MapPin, Globe } from "lucide-react";

const TopBar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-emerald py-2 text-sm z-50 hidden md:block">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="text-white">Plus de 50 circuits disponibles</span>
            <a href="mailto:contact@madagascar-travel.com" className="flex items-center text-white hover:text-emerald">
              <Mail className="mr-2 h-4 w-4" />
              contact@madagascar-travel.com
            </a>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center text-white">
              <MapPin className="mr-2 h-4 w-4" />
              Antananarivo, Madagascar
            </div>
            <div className="flex items-center text-white cursor-pointer hover:text-emerald">
              <Globe className="mr-2 h-4 w-4" />
              FR
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;