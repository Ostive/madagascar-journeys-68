import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";

interface AuthFormProps {
  isSignUp: boolean;
  onSubmit: (email: string, password: string) => Promise<void>;
  onToggleMode: () => void;
  onResetPassword: () => void;
  loading: boolean;
  errors: { email?: string; password?: string };
}

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
  const [focused, setFocused] = useState<"email" | "password" | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label
          htmlFor="email"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Email
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            id="email"
            type="email"
            placeholder="votre@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setFocused("email")}
            onBlur={() => setFocused(null)}
            className={`pl-10 h-11 ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : focused === "email"
                ? "border-emerald-500 focus:ring-emerald-500"
                : ""
            }`}
            required
          />
        </div>
        {errors.email && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-500"
          >
            {errors.email}
          </motion.p>
        )}
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="password"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Mot de passe
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setFocused("password")}
            onBlur={() => setFocused(null)}
            className={`pl-10 h-11 ${
              errors.password
                ? "border-red-500 focus:ring-red-500"
                : focused === "password"
                ? "border-emerald-500 focus:ring-emerald-500"
                : ""
            }`}
            required
          />
        </div>
        {errors.password && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-500"
          >
            {errors.password}
          </motion.p>
        )}
      </div>

      {!isSignUp && (
        <button
          type="button"
          onClick={onResetPassword}
          className="text-sm text-emerald-600 hover:text-emerald-500 transition-colors"
        >
          Mot de passe oublié ?
        </button>
      )}

      <Button
        type="submit"
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white transition-colors h-11"
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
        <p className="text-gray-600 dark:text-gray-400">
          {isSignUp ? "Déjà un compte?" : "Pas encore de compte?"}{" "}
          <button
            type="button"
            onClick={onToggleMode}
            className="text-emerald-600 hover:text-emerald-500 font-medium transition-colors"
          >
            {isSignUp ? "Se connecter" : "S'inscrire"}
          </button>
        </p>
      </div>
    </form>
  );
};