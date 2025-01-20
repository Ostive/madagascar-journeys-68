import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Euro, Clock, Users, Calendar } from "lucide-react";

interface ReservationCardProps {
  price: string;
  duration?: string;
  persons?: string;
  bestTimeToVisit?: string;
  title?: string;
  description?: string;
  destinationId?: string;
}

const ReservationCard = ({
  price,
  duration,
  persons,
  bestTimeToVisit,
  title,
  description,
  destinationId,
}: ReservationCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="w-full bg-white/80 backdrop-blur-md border border-emerald-100/20 shadow-lg shadow-emerald-100/10">
      <CardContent className="p-6 space-y-6">
        {/* Prix */}
        <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-md border border-emerald-100/20 shadow-lg shadow-emerald-100/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
              <Euro className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">À partir de</p>
              <p className="text-2xl font-semibold text-gray-900">{price}€<span className="text-sm font-normal text-gray-500">/pers</span></p>
            </div>
          </div>
        </div>

        {/* Informations */}
        <div className="space-y-4">
          {duration && (
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-emerald-600" />
              <p className="text-gray-600">Durée : {duration}</p>
            </div>
          )}
          {persons && (
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-emerald-600" />
              <p className="text-gray-600">Pour {persons} personnes</p>
            </div>
          )}
          {bestTimeToVisit && (
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-emerald-600" />
              <p className="text-gray-600">Meilleure période : {bestTimeToVisit}</p>
            </div>
          )}
        </div>

        {/* Button */}
        <Button
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          onClick={() => navigate(`/reservation/${destinationId}`)}
        >
          Contacter l'agence
        </Button>

        {/* Notes */}
        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <p>Prix indicatif par personne</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <p>Devis personnalisé sur demande</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <p>Accompagnement personnalisé</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReservationCard;