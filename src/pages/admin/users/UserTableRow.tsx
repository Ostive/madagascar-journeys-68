import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Calendar, Shield, Phone } from "lucide-react";
import { Profile } from "./types";

interface UserTableRowProps {
  profile: Profile;
  onRoleChange: (userId: string, currentRole: string) => void;
}

export const UserTableRow = ({ profile, onRoleChange }: UserTableRowProps) => {
  return (
    <TableRow>
      <TableCell>
        <Avatar className="h-8 w-8">
          <AvatarImage 
            src={profile.avatarUrl || "/default-avatar.png"} 
            alt={`${profile.email}'s avatar`} 
          />
          <AvatarFallback>
            {profile.email?.charAt(0).toUpperCase() || 'U'}
          </AvatarFallback>
        </Avatar>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          {profile.email}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4" />
          {profile.phone || 'Non spécifié'}
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