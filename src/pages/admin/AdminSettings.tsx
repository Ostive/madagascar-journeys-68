import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Home, List, LogOut, Palette, Globe, Bell } from "lucide-react";
import HomeSettings from "./settings/HomeSettings";
import OptionsSettings from "./settings/OptionsSettings";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import SettingsCard from "@/components/admin/settings/SettingsCard";
import { useAuth } from "@/components/auth/AuthProvider";

const AdminSettings = () => {
  const { toast } = useToast();
  const { signOut } = useAuth();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [siteName, setSiteName] = useState("Madagascar Travel");
  const [contactEmail, setContactEmail] = useState("contact@madagascartravel.com");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Here you would typically save to Supabase
      toast({
        title: "Paramètres sauvegardés",
        description: "Les paramètres ont été mis à jour avec succès.",
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde des paramètres.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Paramètres</h1>
        <Button variant="outline" onClick={signOut} className="flex items-center gap-2">
          <LogOut className="h-4 w-4" />
          Déconnexion
        </Button>
      </div>

      <Tabs defaultValue="home" className="space-y-6">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="home" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Accueil
          </TabsTrigger>
          <TabsTrigger value="theme" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Thème
          </TabsTrigger>
          <TabsTrigger value="site" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Site
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="options" className="flex items-center gap-2">
            <List className="h-4 w-4" />
            Options
          </TabsTrigger>
        </TabsList>

        <TabsContent value="home">
          <HomeSettings />
        </TabsContent>

        <TabsContent value="theme">
          <div className="grid gap-6">
            <SettingsCard
              title="Thème"
              description="Configurez le thème de votre site"
            >
              {/* Add theme settings here */}
            </SettingsCard>
          </div>
        </TabsContent>

        <TabsContent value="site">
          <div className="grid gap-6">
            <SettingsCard
              title="Paramètres généraux"
              description="Configurez les paramètres généraux de votre site"
            >
              <div className="space-y-2">
                <Label htmlFor="siteName">Nom du site</Label>
                <Input
                  id="siteName"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Email de contact</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                />
              </div>
            </SettingsCard>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <div className="grid gap-6">
            <SettingsCard
              title="Notifications"
              description="Gérez vos préférences de notifications"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notifications par email</Label>
                  <p className="text-sm text-muted-foreground">
                    Recevoir des notifications par email pour les nouvelles réservations
                  </p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
            </SettingsCard>
          </div>
        </TabsContent>

        <TabsContent value="options">
          <OptionsSettings />
        </TabsContent>
      </Tabs>

      <div className="flex justify-end mt-6">
        <Button 
          onClick={handleSave}
          disabled={isLoading}
        >
          {isLoading ? "Sauvegarde en cours..." : "Sauvegarder les modifications"}
        </Button>
      </div>
    </div>
  );
};

export default AdminSettings;