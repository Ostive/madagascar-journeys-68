import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import SettingsCard from "@/components/admin/settings/SettingsCard";

const ThemeSettings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [primaryColor, setPrimaryColor] = useState("#007AFF");
  const [fontFamily, setFontFamily] = useState("inter");

  return (
    <div className="grid gap-6">
      <SettingsCard
        title="Apparence"
        description="Personnalisez l'apparence de votre site"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode">Mode sombre</Label>
            <Switch
              id="dark-mode"
              checked={darkMode}
              onCheckedChange={setDarkMode}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="primary-color">Couleur principale</Label>
            <Input
              id="primary-color"
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="h-10 w-20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="font-family">Police de caractères</Label>
            <Select value={fontFamily} onValueChange={setFontFamily}>
              <SelectTrigger id="font-family">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inter">Inter</SelectItem>
                <SelectItem value="roboto">Roboto</SelectItem>
                <SelectItem value="poppins">Poppins</SelectItem>
                <SelectItem value="open-sans">Open Sans</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </SettingsCard>
    </div>
  );
};

export default ThemeSettings;
