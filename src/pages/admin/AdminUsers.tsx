import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { UserTable } from "./users/UserTable";
import { fetchProfiles, updateUserRole } from "./users/userUtils";
import type { Profile } from "./users/types";
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
      setError(null);
      const profilesData = await fetchProfiles();
      setProfiles(profilesData);
    } catch (error) {
      console.error('Error fetching profiles:', error);
      setError("Impossible de charger les utilisateurs. Veuillez réessayer plus tard.");
      toast({
        title: "Erreur",
        description: "Impossible de charger les utilisateurs",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, currentRole: string) => {
    try {
      const newRole = await updateUserRole(userId, currentRole);
      
      setProfiles(profiles.map(profile => 
        profile.id === userId ? { ...profile, role: newRole } : profile
      ));

      toast({
        title: "Succès",
        description: "Le rôle de l'utilisateur a été mis à jour",
      });
    } catch (error) {
      console.error('Error updating user role:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le rôle",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gestion des Utilisateurs</h1>
      </div>
      
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <UserTable profiles={profiles} onRoleChange={handleRoleChange} />
    </div>
  );
};

export default AdminUsers;