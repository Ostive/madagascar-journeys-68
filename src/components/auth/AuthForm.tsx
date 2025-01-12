import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { z } from "zod";

interface AuthFormProps {
  isSignUp: boolean;
  onSubmit: (email: string, password: string) => Promise<void>;
  onToggleMode: () => void;
  onResetPassword: () => void;
  loading: boolean;
  errors: { email?: string; password?: string };
}

const authSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

export const AuthForm = ({
  isSignUp,
  onSubmit,
  onToggleMode,
  onResetPassword,
  loading,
  errors,
}: AuthFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(email, password);
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
      <div className="space-y-2">
        <Label htmlFor="password">Mot de passe</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password}</p>
        )}
      </div>
      {!isSignUp && (
        <button
          type="button"
          onClick={onResetPassword}
          className="text-sm text-emerald hover:underline"
        >
          Mot de passe oublié ?
        </button>
      )}
      <Button
        type="submit"
        className="w-full bg-emerald hover:bg-emerald/90"
        disabled={loading}
      >
        {loading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : isSignUp ? (
          "S'inscrire"
        ) : (
          "Se connecter"
        )}
      </Button>

      <div className="text-center text-sm">
        {isSignUp ? (
          <p>
            Déjà un compte?{" "}
            <button
              type="button"
              onClick={onToggleMode}
              className="text-emerald hover:underline font-medium"
            >
              Se connecter
            </button>
          </p>
        ) : (
          <p>
            Pas encore de compte?{" "}
            <button
              type="button"
              onClick={onToggleMode}
              className="text-emerald hover:underline font-medium"
            >
              S'inscrire
            </button>
          </p>
        )}
      </div>
    </form>
  );
};