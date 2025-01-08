import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Option } from "@/types/options";

interface OptionsListProps {
  options: Option[];
  onDelete: (id: number) => void;
}

export const OptionsList = ({ options, onDelete }: OptionsListProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nom</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="w-24">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {options.map((option) => (
          <TableRow key={option.id}>
            <TableCell>{option.name}</TableCell>
            <TableCell>{option.description}</TableCell>
            <TableCell>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => onDelete(option.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};