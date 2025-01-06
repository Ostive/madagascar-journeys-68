import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

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
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-2xl font-bold">À partir de {price}€</h3>
            {duration && <p className="text-gray-600">Durée : {duration}</p>}
            {persons && <p className="text-gray-600">Pour {persons} personnes</p>}
            {bestTimeToVisit && (
              <p className="text-gray-600">
                Meilleure période : {bestTimeToVisit}
              </p>
            )}
          </div>

          <Button
            className="w-full bg-emerald hover:bg-emerald/90"
            onClick={() => navigate(`/reservation/${destinationId}`)}
          >
            Contacter l'agence
          </Button>

          <div className="text-sm text-gray-500">
            <p>• Prix indicatif par personne</p>
            <p>• Devis personnalisé sur demande</p>
            <p>• Accompagnement personnalisé</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReservationCard;