import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Plus, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SiteSettings } from "@/types/settings";

const HomeSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState("");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .single();

      if (error) throw error;
      setSettings(data as SiteSettings);
    } catch (error) {
      console.error("Error fetching settings:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les paramètres",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!settings) return;
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('site_settings')
        .update(settings)
        .eq('id', settings.id);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Les paramètres ont été mis à jour",
      });
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder les paramètres",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const addHeroImage = () => {
    if (!newImageUrl || !settings) return;
    setSettings({
      ...settings,
      hero_images: [...settings.hero_images, newImageUrl],
    });
    setNewImageUrl("");
  };

  const removeHeroImage = (index: number) => {
    if (!settings) return;
    const newImages = [...settings.hero_images];
    newImages.splice(index, 1);
    setSettings({
      ...settings,
      hero_images: newImages,
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!settings) return null;

  return (
    <div className="container mx-auto p-8 space-y-8">
      <h1 className="text-3xl font-bold mb-8">Paramètres de la page d'accueil</h1>

      <Card>
        <CardHeader>
          <CardTitle>Section Héro</CardTitle>
          <CardDescription>
            Gérez les images et le texte de la section héro
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label>Images du carousel</Label>
            <div className="flex gap-4 items-center">
              <Input
                placeholder="URL de l'image"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
              />
              <Button onClick={addHeroImage}>
                <Plus className="w-4 h-4 mr-2" />
                Ajouter
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {settings.hero_images.map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={url}
                    alt={`Hero ${index + 1}`}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removeHeroImage(index)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="hero-title">Titre</Label>
            <Input
              id="hero-title"
              value={settings.hero_title}
              onChange={(e) =>
                setSettings({ ...settings, hero_title: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hero-subtitle">Sous-titre</Label>
            <Input
              id="hero-subtitle"
              value={settings.hero_subtitle}
              onChange={(e) =>
                setSettings({ ...settings, hero_subtitle: e.target.value })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sections de contenu</CardTitle>
          <CardDescription>
            Gérez l'affichage des différentes sections
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Section Destinations</Label>
              <p className="text-sm text-muted-foreground">
                Afficher la section des destinations populaires
              </p>
            </div>
            <div className="space-y-2">
              <Switch
                checked={settings.show_destinations}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, show_destinations: checked })
                }
              />
              {settings.show_destinations && (
                <Input
                  type="number"
                  min="1"
                  max="12"
                  value={settings.destinations_count}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      destinations_count: parseInt(e.target.value),
                    })
                  }
                  className="w-20 ml-4"
                />
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Section Circuits</Label>
              <p className="text-sm text-muted-foreground">
                Afficher la section des circuits populaires
              </p>
            </div>
            <div className="space-y-2">
              <Switch
                checked={settings.show_circuits}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, show_circuits: checked })
                }
              />
              {settings.show_circuits && (
                <Input
                  type="number"
                  min="1"
                  max="12"
                  value={settings.circuits_count}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      circuits_count: parseInt(e.target.value),
                    })
                  }
                  className="w-20 ml-4"
                />
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Section Blog</Label>
              <p className="text-sm text-muted-foreground">
                Afficher la section du blog
              </p>
            </div>
            <div className="space-y-2">
              <Switch
                checked={settings.show_blog}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, show_blog: checked })
                }
              />
              {settings.show_blog && (
                <Input
                  type="number"
                  min="1"
                  max="12"
                  value={settings.blog_count}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      blog_count: parseInt(e.target.value),
                    })
                  }
                  className="w-20 ml-4"
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sauvegarde...
            </>
          ) : (
            "Sauvegarder les modifications"
          )}
        </Button>
      </div>
    </div>
  );
};

export default HomeSettings;
