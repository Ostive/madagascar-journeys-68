import { useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const Account = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.user_metadata?.full_name || "",
    phone: user?.phone || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: formData.fullName,
        },
      });

      if (error) throw error;

      toast.success("Profil mis à jour avec succès");
      setIsEditing(false);
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du profil");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Mon Compte</h2>
        <p className="text-gray-500">Gérez vos informations personnelles</p>
      </div>

      <div className="space-y-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={user?.email || ""}
              disabled
              className="bg-gray-50 border-gray-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">Nom complet</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              disabled={!isEditing}
              className={cn(
                "border-gray-200",
                !isEditing && "bg-gray-50"
              )}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              disabled={!isEditing}
              className={cn(
                "border-gray-200",
                !isEditing && "bg-gray-50"
              )}
            />
          </div>

          <div className="pt-4 flex justify-end space-x-4">
            {isEditing ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  className="border-gray-200 hover:bg-gray-50"
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  className="bg-emerald-500 text-white hover:bg-emerald-600"
                >
                  Enregistrer
                </Button>
              </>
            ) : (
              <Button
                type="button"
                onClick={() => setIsEditing(true)}
                className="bg-emerald-500 text-white hover:bg-emerald-600"
              >
                Modifier
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Account;
