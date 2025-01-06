import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { destinations } from "@/data/data";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DestinationCard from "@/components/cards/DestinationCard";

const DestinationsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <Header />

      <div className="pt-32 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Nos Destinations</h1>
          <p className="text-gray-600 mb-8">
            Explorez nos destinations soigneusement sélectionnées à Madagascar.
            Des plages paradisiaques aux forêts tropicales, découvrez la
            diversité exceptionnelle de la Grande Île.
          </p>

          <Card className="p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="text-emerald">⚡</span> Filtrer les destinations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Tous les types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="nature">Nature</SelectItem>
                  <SelectItem value="culture">Culture</SelectItem>
                  <SelectItem value="beach">Plage</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Tous les budgets" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les budgets</SelectItem>
                  <SelectItem value="low">Économique</SelectItem>
                  <SelectItem value="medium">Intermédiaire</SelectItem>
                  <SelectItem value="high">Premium</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Toutes les durées" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les durées</SelectItem>
                  <SelectItem value="short">Courts séjours</SelectItem>
                  <SelectItem value="medium">Séjours moyens</SelectItem>
                  <SelectItem value="long">Longs séjours</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Toutes les saisons" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les saisons</SelectItem>
                  <SelectItem value="dry">Saison sèche</SelectItem>
                  <SelectItem value="wet">Saison des pluies</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
            {destinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DestinationsPage;