import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SearchSection from "@/components/SearchSection";

const HeroContent = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl text-center animate-fadeIn">
      <h1 className="text-4xl md:text-6xl font-poppins font-bold text-white mb-6">
        Découvrez la magie de Madagascar
      </h1>
      <p className="text-xl text-white/90 font-opensans mb-12">
        Une île unique où nature exceptionnelle et culture authentique se rencontrent
      </p>

      <SearchSection />
    </div>
  );
};

export default HeroContent;