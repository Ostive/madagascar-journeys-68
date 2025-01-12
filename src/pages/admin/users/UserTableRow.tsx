import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Calendar, Shield } from "lucide-react";
import { Profile } from "./types";

interface UserTableRowProps {
  profile: Profile;
  onRoleChange: (userId: string, currentRole: string) => void;
}

export const UserTableRow = ({ profile, onRoleChange }: UserTableRowProps) => {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          {profile.email}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          <Badge variant={profile.role === "admin" ? "default" : "secondary"}>
            {profile.role}
          </Badge>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          {new Date(profile.created_at).toLocaleDateString()}
        </div>
      </TableCell>
      <TableCell>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onRoleChange(profile.id, profile.role)}
        >
          {profile.role === "admin" ? "Rétrograder" : "Promouvoir admin"}
        </Button>
      </TableCell>
    </TableRow>
  );
};