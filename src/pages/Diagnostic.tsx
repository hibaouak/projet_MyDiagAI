import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const symptoms = [
  { id: "fever", label: "Fièvre", category: "général" },
  { id: "cough", label: "Toux", category: "respiratoire" },
  { id: "headache", label: "Maux de tête", category: "neurologique" },
  { id: "fatigue", label: "Fatigue", category: "général" },
  { id: "nausea", label: "Nausées", category: "digestif" },
  { id: "dizziness", label: "Vertiges", category: "neurologique" },
  { id: "chest-pain", label: "Douleur thoracique", category: "cardiovasculaire" },
  { id: "breathing", label: "Difficultés respiratoires", category: "respiratoire" },
  { id: "stomach-pain", label: "Douleurs abdominales", category: "digestif" },
  { id: "muscle-pain", label: "Douleurs musculaires", category: "général" },
];

const Diagnostic = () => {
  const navigate = useNavigate();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSymptomToggle = (symptomId: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptomId)
        ? prev.filter((id) => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleAnalyze = async () => {
    if (selectedSymptoms.length === 0) return;
    
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      navigate("/results", { state: { symptoms: selectedSymptoms } });
    }, 2000);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      général: "bg-primary/10 text-primary",
      respiratoire: "bg-accent/10 text-accent",
      neurologique: "bg-warning/10 text-warning",
      cardiovasculaire: "bg-destructive/10 text-destructive",
      digestif: "bg-success/10 text-success",
    };
    return colors[category] || "bg-muted text-muted-foreground";
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Nouveau Diagnostic</h1>
          <p className="text-muted-foreground text-lg">
            Sélectionnez les symptômes du patient pour obtenir un diagnostic IA
          </p>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Symptômes</CardTitle>
            <CardDescription>
              Sélectionnez tous les symptômes présentés par le patient
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {symptoms.map((symptom) => (
                <div
                  key={symptom.id}
                  className="flex items-start space-x-3 rounded-lg border border-border p-4 transition-all hover:shadow-md"
                >
                  <Checkbox
                    id={symptom.id}
                    checked={selectedSymptoms.includes(symptom.id)}
                    onCheckedChange={() => handleSymptomToggle(symptom.id)}
                  />
                  <div className="flex-1">
                    <Label
                      htmlFor={symptom.id}
                      className="text-base font-medium cursor-pointer"
                    >
                      {symptom.label}
                    </Label>
                    <Badge
                      variant="secondary"
                      className={`mt-1 ${getCategoryColor(symptom.category)}`}
                    >
                      {symptom.category}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card bg-gradient-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-lg mb-1">
                  {selectedSymptoms.length} symptôme(s) sélectionné(s)
                </p>
                <p className="text-sm text-muted-foreground">
                  Minimum 1 symptôme requis pour l'analyse
                </p>
              </div>
              <Button
                size="lg"
                disabled={selectedSymptoms.length === 0 || isAnalyzing}
                onClick={handleAnalyze}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyse en cours...
                  </>
                ) : (
                  "Analyser avec l'IA"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Diagnostic;
