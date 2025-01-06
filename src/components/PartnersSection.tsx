import { Card, CardContent } from "@/components/ui/card";
import { Link } from "lucide-react";

const PartnersSection = () => {
  const partners = [
    {
      id: 1,
      name: "Air Madagascar",
      logo: "https://madagascar-tourisme.com/wp-content/uploads/2024/04/Logo-Madagascar-Airlines-300x145.png",
      description: "Compagnie aérienne nationale",
      url: "https://www.airmadagascar.com"
    },
    {
      id: 2,
      name: "Office National du Tourisme",
      logo: "https://media.licdn.com/dms/image/v2/C4D0BAQEpTlickDhtIA/company-logo_200_200/company-logo_200_200/0/1675426618991/office_national_du_tourisme_de_madagascar_logo?e=2147483647&v=beta&t=ilIFZVDP6rAxdFX0s1Rzg7RY8C8VycKDMGITIPYHInE",
      description: "Promotion du tourisme",
      url: "https://www.tourisme.gov.mg"
    },
    {
      id: 3,
      name: "Parc National Madagascar",
      logo: "https://www.parcs-madagascar.com/images/mnp.png",
      description: "Gestion des parcs nationaux",
      url: "https://www.parcs-madagascar.com"
    },
    {
      id: 4,
      name: "Association des Hôteliers",
      logo: "https://fhorm.mg/wp-content/uploads/2020/07/cropped-FHORM-logo-VF-2-01.png",
      description: "Hébergement de qualité",
      url: "https://www.hotels-madagascar.mg"
    }
  ];

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-poppins font-bold text-dark text-center mb-4">
          Nos Partenaires
        </h2>
        <p className="text-lg text-dark/70 text-center mb-12 font-opensans">
          Abonnez-vous à notre newsletter pour rester informé de nos actualités et bénéficier d'offres exclusives.
        </p>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

          <div className="overflow-hidden">
            <div 
              className="flex animate-marquee"
              style={{
                animation: 'scroll 30s linear infinite',
                width: 'fit-content'
              }}
            >
              {partners.map((partner, index) => (
                <a
                  key={`${partner.id}-first-${index}`}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-none w-72 px-4 group"
                >
                  <Card className="h-64 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                    <CardContent className="p-4 h-full flex flex-col">
                      <div className="h-48 mb-3 flex items-center justify-center bg-gray-50 rounded-lg p-3 group-hover:bg-gray-100 transition-colors duration-300">
                        <div className="relative w-full h-full">
                          <img
                            src={partner.logo}
                            alt={`${partner.name} logo`}
                            className="absolute inset-0 w-full h-full object-contain"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col flex-grow justify-between">
                        <div className="text-center">
                          <h3 className="font-semibold text-lg mb-1 line-clamp-1">{partner.name}</h3>
                          <p className="text-gray-600 text-sm line-clamp-2">{partner.description}</p>
                        </div>
                        <div className="flex items-center justify-center text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2">
                          <span className="mr-2 text-sm">Visiter le site</span>
                          <Link size={16} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
              {partners.map((partner, index) => (
                <a
                  key={`${partner.id}-second-${index}`}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-none w-72 px-4 group"
                >
                  <Card className="h-64 hover:shadow-lg transition-all duration-300 transform hover:scale-105 border-none">
                    <CardContent className="p-6 h-full flex flex-col">
                      <div className="h-28 mb-3 flex items-center justify-center bg-gray-50 rounded-lg p-3 group-hover:bg-gray-100 transition-colors duration-300">
                        <div className="relative w-full h-full">
                          <img
                            src={partner.logo}
                            alt={`${partner.name} logo`}
                            className="absolute inset-0 w-full h-full object-contain"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col flex-grow justify-between">
                        <div className="text-center">
                          <h3 className="font-semibold text-lg mb-1 line-clamp-1">{partner.name}</h3>
                          <p className="text-gray-600 text-sm line-clamp-2">{partner.description}</p>
                        </div>
                        <div className="flex items-center justify-center text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2">
                          <span className="mr-2 text-sm">Visiter le site</span>
                          <Link size={16} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}
      </style>
    </section>
  );
};

export default PartnersSection;