import { useState } from "react";
import { Profile } from "../types";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { supabase } from "@/integrations/supabase/client";
import {
  MoreVertical,
  Shield,
  UserX,
  UserCheck,
  Edit,
  Trash,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface UserTableRowProps {
  user: Profile;
  onUpdate: () => void;
}

export const UserTableRow = ({ user, onUpdate }: UserTableRowProps) => {
  const [loading, setLoading] = useState(false);

  const handleRoleChange = async (newRole: string) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from("profiles")
        .update({ role: newRole })
        .eq("id", user.id);

      if (error) throw error;
      toast.success("Rôle mis à jour avec succès");
      onUpdate();
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error("Erreur lors de la mise à jour du rôle");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: boolean) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from("profiles")
        .update({ is_active: newStatus })
        .eq("id", user.id);

      if (error) throw error;
      toast.success("Statut mis à jour avec succès");
      onUpdate();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Erreur lors de la mise à jour du statut");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) return;

    try {
      setLoading(true);
      const { error } = await supabase
        .from("profiles")
        .delete()
        .eq("id", user.id);

      if (error) throw error;
      toast.success("Utilisateur supprimé avec succès");
      onUpdate();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Erreur lors de la suppression de l'utilisateur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
              <span className="text-emerald-600 font-medium text-sm">
                {user.full_name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
              </span>
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {user.full_name || "N/A"}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{user.email}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">
          {format(new Date(user.created_at), "d MMMM yyyy", { locale: fr })}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={cn(
            "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
            user.role === "admin"
              ? "bg-purple-100 text-purple-800"
              : "bg-emerald-100 text-emerald-800"
          )}
        >
          {user.role === "admin" ? "Admin" : "Utilisateur"}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={cn(
            "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
            user.is_active
              ? "bg-emerald-100 text-emerald-800"
              : "bg-red-100 text-red-800"
          )}
        >
          {user.is_active ? "Actif" : "Inactif"}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
        <DropdownMenu>
          <DropdownMenuTrigger
            className="p-2 text-gray-400 hover:text-gray-500"
            disabled={loading}
          >
            <MoreVertical className="h-5 w-5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {user.role !== "admin" && (
              <DropdownMenuItem
                className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                onClick={() => handleRoleChange("admin")}
              >
                <Shield className="mr-2 h-4 w-4" />
                Promouvoir admin
              </DropdownMenuItem>
            )}
            {user.role === "admin" && (
              <DropdownMenuItem
                className="text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                onClick={() => handleRoleChange("user")}
              >
                <Shield className="mr-2 h-4 w-4" />
                Rétrograder
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              className={cn(
                "hover:bg-gray-50",
                user.is_active
                  ? "text-red-600 hover:text-red-700"
                  : "text-emerald-600 hover:text-emerald-700"
              )}
              onClick={() => handleStatusChange(!user.is_active)}
            >
              {user.is_active ? (
                <>
                  <UserX className="mr-2 h-4 w-4" />
                  Désactiver
                </>
              ) : (
                <>
                  <UserCheck className="mr-2 h-4 w-4" />
                  Activer
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleDelete}
            >
              <Trash className="mr-2 h-4 w-4" />
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  );
};