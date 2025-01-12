import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserTableRow } from "./UserTableRow";
import { Profile } from "./types";

interface UserTableProps {
  profiles: Profile[];
  onRoleChange: (userId: string, currentRole: string) => void;
}

export const UserTable = ({ profiles, onRoleChange }: UserTableProps) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Rôle</TableHead>
            <TableHead>Date d'inscription</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {profiles.map((profile) => (
            <UserTableRow
              key={profile.id}
              profile={profile}
              onRoleChange={onRoleChange}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};