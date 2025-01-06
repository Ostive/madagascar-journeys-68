import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, User, MapPin } from "lucide-react";

const AdminBookings = () => {
  const { toast } = useToast();

  // Placeholder data - will be replaced with real data from Supabase
  const bookings = [
    {
      id: "1",
      customerName: "John Doe",
      destination: "Nosy Be",
      date: "2024-05-15",
      status: "Confirmé",
    },
    {
      id: "2",
      customerName: "Jane Smith",
      destination: "Masoala",
      date: "2024-06-20",
      status: "En attente",
    },
  ];

  const handleStatusChange = (id: string) => {
    toast({
      title: "Statut mis à jour",
      description: "Le statut de la réservation a été mis à jour avec succès.",
    });
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gestion des Réservations</h1>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {booking.customerName}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {booking.destination}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {booking.date}
                  </div>
                </TableCell>
                <TableCell>{booking.status}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusChange(booking.id)}
                  >
                    Modifier le statut
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminBookings;