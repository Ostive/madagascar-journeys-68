import { useParams } from "react-router-dom";
import { destinations } from "@/data/destinations";
import Header from "@/components/Header";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import { ReservationForm } from "@/components/reservation/ReservationForm";

const Reservation = () => {
  const { id } = useParams();
  const destination = destinations.find((d) => d.id === Number(id));

  if (!destination) {
    return <div>Destination non trouvée</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <Header />
      <div className="py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">
            Réserver {destination.name}
          </h1>
          <ReservationForm destinationId={id!} destination={destination} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Reservation;