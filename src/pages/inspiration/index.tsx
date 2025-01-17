import { RecommendationForm } from "@/components/recommendation/RecommendationForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function InspirationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 pt-24">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent mb-4">
            Laissez-vous Inspirer
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez le voyage qui vous correspond. Répondez à quelques questions et
            nous vous proposerons les circuits adaptés à vos envies.
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link to="/inspiration/popular">
            <Card className="bg-white/40 hover:bg-white/60 backdrop-blur-sm transition-all border-emerald-100 shadow-lg shadow-emerald-100/20 p-6 rounded-2xl group">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent mb-2 group-hover:opacity-75 transition-opacity">
                Circuits Populaires
              </h3>
              <p className="text-gray-600">
                Découvrez nos circuits les plus appréciés par nos voyageurs
              </p>
            </Card>
          </Link>
          <Link to="/inspiration/themes">
            <Card className="bg-white/40 hover:bg-white/60 backdrop-blur-sm transition-all border-emerald-100 shadow-lg shadow-emerald-100/20 p-6 rounded-2xl group">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent mb-2 group-hover:opacity-75 transition-opacity">
                Thématiques
              </h3>
              <p className="text-gray-600">
                Explorez nos circuits par thèmes : nature, culture, aventure...
              </p>
            </Card>
          </Link>
          <Link to="/inspiration/seasons">
            <Card className="bg-white/40 hover:bg-white/60 backdrop-blur-sm transition-all border-emerald-100 shadow-lg shadow-emerald-100/20 p-6 rounded-2xl group">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent mb-2 group-hover:opacity-75 transition-opacity">
                Par Saison
              </h3>
              <p className="text-gray-600">
                Trouvez le meilleur moment pour visiter chaque région
              </p>
            </Card>
          </Link>
        </div>

        {/* Recommendation Form */}
        <div className="mb-12">
          <RecommendationForm />
        </div>

        {/* Additional Resources */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-white/40 backdrop-blur-sm border-emerald-100 shadow-lg shadow-emerald-100/20 p-6 rounded-2xl">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent mb-4">
              Besoin d'aide ?
            </h3>
            <p className="text-gray-600 mb-4">
              Nos experts sont là pour vous aider à planifier votre voyage idéal.
            </p>
            <Link to="/contact">
              <Button className="bg-gradient-to-r from-emerald-400 to-teal-500 text-white rounded-full border-none hover:opacity-90 transition-opacity">
                Contactez-nous
              </Button>
            </Link>
          </Card>
          <Card className="bg-white/40 backdrop-blur-sm border-emerald-100 shadow-lg shadow-emerald-100/20 p-6 rounded-2xl">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent mb-4">
              Guide de Voyage
            </h3>
            <p className="text-gray-600 mb-4">
              Téléchargez notre guide gratuit pour tout savoir sur Madagascar.
            </p>
            <Button className="bg-gradient-to-r from-emerald-400 to-teal-500 text-white rounded-full border-none hover:opacity-90 transition-opacity">
              Télécharger le Guide
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
