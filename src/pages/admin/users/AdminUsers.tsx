import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { UserTable } from "./components/UserTable";
import { fetchProfiles, updateUserRole } from "./userUtils";
import type { Profile, UserRole } from "./types";
import { Alert, AlertDescription } from "@/components/ui/alert";

const AdminUsers = () => {
  const { toast } = useToast();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    try {
      setIsLoading(true);
      const data = await fetchProfiles();
      setProfiles(data);
      setError(null);
    } catch (err) {
      setError("Erreur lors du chargement des utilisateurs");
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger les utilisateurs",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, currentRole: string) => {
    try {
      const newRole = currentRole === "admin" ? "user" : "admin";
      await updateUserRole(userId, newRole as UserRole);
      await loadProfiles();
      toast({
        title: "Succès",
        description: "Rôle de l'utilisateur mis à jour",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de mettre à jour le rôle",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <UserTable />
    </div>
  );
};

export default AdminUsers;
