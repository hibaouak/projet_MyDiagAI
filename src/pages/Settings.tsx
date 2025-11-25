import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState("fr");
  const { toast } = useToast();

  const handleThemeToggle = (checked: boolean) => {
    setIsDarkMode(checked);
    document.documentElement.classList.toggle("dark", checked);
    toast({
      title: "Thème modifié",
      description: `Thème ${checked ? "sombre" : "clair"} activé`,
    });
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    toast({
      title: "Langue modifiée",
      description: `Langue changée en ${value === "fr" ? "Français" : "English"}`,
    });
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Paramètres</h1>
          <p className="text-muted-foreground text-lg">
            Personnalisez votre expérience MyDiagAI
          </p>
        </div>

        {/* Appearance */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isDarkMode ? (
                <Moon className="h-5 w-5 text-primary" />
              ) : (
                <Sun className="h-5 w-5 text-primary" />
              )}
              Apparence
            </CardTitle>
            <CardDescription>
              Choisissez le thème de l'application
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="dark-mode" className="text-base font-medium">
                  Mode sombre
                </Label>
                <p className="text-sm text-muted-foreground">
                  Activer le thème sombre pour réduire la fatigue oculaire
                </p>
              </div>
              <Switch
                id="dark-mode"
                checked={isDarkMode}
                onCheckedChange={handleThemeToggle}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                className={`p-6 rounded-lg border-2 transition-all ${
                  !isDarkMode
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => handleThemeToggle(false)}
              >
                <div className="mb-3 h-20 rounded-md bg-gradient-to-b from-white to-gray-100 border border-gray-200" />
                <p className="font-medium">Clair</p>
              </button>
              <button
                className={`p-6 rounded-lg border-2 transition-all ${
                  isDarkMode
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => handleThemeToggle(true)}
              >
                <div className="mb-3 h-20 rounded-md bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700" />
                <p className="font-medium">Sombre</p>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Language */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Langue
            </CardTitle>
            <CardDescription>
              Sélectionnez votre langue préférée
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language" className="text-base font-medium">
                  Langue de l'interface
                </Label>
                <Select value={language} onValueChange={handleLanguageChange}>
                  <SelectTrigger id="language" className="w-full">
                    <SelectValue placeholder="Sélectionner une langue" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">🇫🇷 Français</SelectItem>
                    <SelectItem value="en">🇬🇧 English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Gérez vos préférences de notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium">
                  Notifications email
                </Label>
                <p className="text-sm text-muted-foreground">
                  Recevoir des alertes par email
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium">
                  Rappels de suivi
                </Label>
                <p className="text-sm text-muted-foreground">
                  Notifications pour les suivis patients
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button className="flex-1">Sauvegarder les modifications</Button>
          <Button variant="outline" className="flex-1">
            Réinitialiser
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
