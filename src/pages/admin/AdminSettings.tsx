import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Home, List } from "lucide-react";
import HomeSettings from "./settings/HomeSettings";
import OptionsSettings from "./settings/OptionsSettings";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import SettingsCard from "@/components/admin/settings/SettingsCard";

const AdminSettings = () => {
  const { toast } = useToast();
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
      <h1 className="text-3xl font-bold mb-8">Paramètres</h1>

      <Tabs defaultValue="home" className="space-y-6">
        <TabsList>
          <TabsTrigger value="home" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Page d'accueil
          </TabsTrigger>
          <TabsTrigger value="options" className="flex items-center gap-2">
            <List className="h-4 w-4" />
            Options
          </TabsTrigger>
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Général
          </TabsTrigger>
        </TabsList>

        <TabsContent value="home">
          <HomeSettings />
        </TabsContent>

        <TabsContent value="options">
          <OptionsSettings />
        </TabsContent>

        <TabsContent value="general">
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

            <div className="flex justify-end">
              <Button 
                onClick={handleSave}
                disabled={isLoading}
              >
                {isLoading ? "Sauvegarde en cours..." : "Sauvegarder les modifications"}
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;