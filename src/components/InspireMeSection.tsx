import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const InspireMeSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden bg-white py-24">
      <div className="absolute inset-0">
        <div className="grid grid-cols-2 gap-2 h-full">
          <div className="bg-cover bg-center" style={{ backgroundImage: 'url("https://cedar-cdn-aws-webp.s3.eu-central-1.amazonaws.com/app/uploads/2020/10/24070404/Western-Madagascar-avenue-de-baobabs-SS-705245614-1920.jpg")' }} />
          <div className="grid grid-rows-2 gap-2">
            <div className="bg-cover bg-center" style={{ backgroundImage: 'url("https://madagascar-tourisme.com/wp-content/uploads/2017/04/33879604103_f0de969da2_k.jpg")' }} />
            <div className="bg-cover bg-center" style={{ backgroundImage: 'url("https://static.edenviaggi.it/.imaging/default/dam/edenviaggi.it/img/escursioni/madagascar/1900x1070-.png/jcr:content.png")' }} />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
      </div>
      
      <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Vous ne savez pas où partir ?
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-100">
            Laissez-nous vous guider vers votre prochaine aventure à Madagascar. 
            Répondez à quelques questions simples et découvrez les destinations 
            qui correspondent parfaitement à vos envies.
          </p>
          <div className="mt-10">
            <Button
              onClick={() => navigate("/quiz")}
              size="lg"
              className="bg-emerald hover:bg-emerald/90 text-white font-semibold py-6 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Inspirez-moi
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspireMeSection;