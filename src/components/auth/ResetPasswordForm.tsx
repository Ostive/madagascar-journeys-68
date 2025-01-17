import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface ResetPasswordFormProps {
  onSubmit: (email: string) => Promise<void>;
  onBack: () => void;
  loading: boolean;
  errors: { email?: string };
}

export const ResetPasswordForm = ({
  onSubmit,
  onBack,
  loading,
  errors,
}: ResetPasswordFormProps) => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(email);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="votre@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email}</p>
        )}
      </div>
      <Button
        type="submit"
        className="w-full bg-emerald hover:bg-emerald/90"
        disabled={loading}
      >
        {loading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          "Réinitialiser le mot de passe"
        )}
      </Button>
      <button
        type="button"
        onClick={onBack}
        className="w-full text-sm text-emerald hover:underline"
      >
        Retour à la connexion
      </button>
    </form>
  );
};