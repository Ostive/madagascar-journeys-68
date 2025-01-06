import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { destinations } from "@/data/destinations";
import { Plus, Pencil, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminDestination = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    const index = destinations.findIndex(dest => dest.id === id);
    if (index !== -1) {
      destinations.splice(index, 1);
      toast({
        title: "Destination deleted",
        description: "The destination has been successfully deleted.",
      });
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin - Manage Destinations</h1>
        <Button onClick={() => navigate('/admin/destination/create')}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Destination
        </Button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {destinations.map((destination) => (
              <TableRow key={destination.id}>
                <TableCell className="font-medium">{destination.title}</TableCell>
                <TableCell>{destination.location}</TableCell>
                <TableCell>{destination.price}</TableCell>
                <TableCell>{destination.duration}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate(`/admin/destination/edit/${destination.id}`)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(destination.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminDestination;