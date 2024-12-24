import { Mail, MapPin, Globe } from "lucide-react";

const TopBar = () => {
  return (
    <div className="bg-gray-100 py-2 text-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="text-dark/70">Plus de 50 circuits disponibles</span>
            <a href="mailto:contact@madagascar-travel.com" className="flex items-center text-dark/70 hover:text-emerald">
              <Mail className="mr-2 h-4 w-4" />
              contact@madagascar-travel.com
            </a>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center text-dark/70">
              <MapPin className="mr-2 h-4 w-4" />
              Antananarivo, Madagascar
            </div>
            <div className="flex items-center text-dark/70 cursor-pointer hover:text-emerald">
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