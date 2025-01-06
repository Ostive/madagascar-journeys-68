import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { circuits } from "@/data/circuits";
import { Plus, Pencil, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminCircuit = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    const index = circuits.findIndex(circuit => circuit.id === id);
    if (index !== -1) {
      circuits.splice(index, 1);
      toast({
        title: "Circuit deleted",
        description: "The circuit has been successfully deleted.",
      });
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin - Manage Circuits</h1>
        <Button onClick={() => navigate('/admin/circuit/create')}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Circuit
        </Button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Persons</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {circuits.map((circuit) => (
              <TableRow key={circuit.id}>
                <TableCell className="font-medium">{circuit.title}</TableCell>
                <TableCell>{circuit.duration}</TableCell>
                <TableCell>{circuit.persons}</TableCell>
                <TableCell>{circuit.price}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate(`/admin/circuit/edit/${circuit.id}`)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(circuit.id)}
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

export default AdminCircuit;