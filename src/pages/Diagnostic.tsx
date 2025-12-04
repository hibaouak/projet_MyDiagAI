import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { Loader2, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const patientSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  age: z.string().min(1, "L'âge est requis"),
  gender: z.string().min(1, "Le genre est requis"),
});

const symptoms = [
  { id: "fever", label: "Fièvre", category: "général" },
  { id: "cough", label: "Toux", category: "respiratoire" },
  { id: "headache", label: "Mal de tête", category: "neurologique" },
  { id: "fatigue", label: "Fatigue", category: "général" },
  { id: "nausea", label: "Nausée", category: "digestif" },
  { id: "vomiting", label: "Vomissements", category: "digestif" },
  { id: "diarrhea", label: "Diarrhée", category: "digestif" },
  { id: "rash", label: "Éruption cutanée", category: "dermatologique" },
  { id: "sore-throat", label: "Mal de gorge", category: "respiratoire" },
  { id: "shortness-of-breath", label: "Essoufflement", category: "respiratoire" },
  { id: "chest-pain", label: "Douleur thoracique", category: "cardiovasculaire" },
  { id: "dizziness", label: "Étourdissement", category: "neurologique" },
  { id: "joint-pain", label: "Douleurs articulaires", category: "musculosquelettique" },
  { id: "muscle-pain", label: "Douleurs musculaires", category: "musculosquelettique" },
  { id: "loss-of-smell", label: "Perte d'odorat", category: "neurologique" },
  { id: "loss-of-taste", label: "Perte de goût", category: "neurologique" },
  { id: "runny-nose", label: "Nez qui coule", category: "respiratoire" },
  { id: "abdominal-pain", label: "Douleur abdominale", category: "digestif" },
  { id: "chills", label: "Frissons", category: "général" },
  { id: "thirst", label: "Soif", category: "général" },
  { id: "sensitivity", label: "Sensibilité", category: "neurologique" },
  { id: "pain", label: "Douleur", category: "général" },
  { id: "itching", label: "Démangeaison", category: "dermatologique" },
  { id: "loss-of-appetite", label: "Perte d'appétit", category: "digestif" },
  { id: "other-disorders", label: "Troubles divers", category: "général" },
];

const Diagnostic = () => {
  const navigate = useNavigate();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [step, setStep] = useState(1);

  const form = useForm<z.infer<typeof patientSchema>>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      name: "",
      age: "",
      gender: "",
    },
  });

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
    const patientData = form.getValues();
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      navigate("/results", { 
        state: { 
          symptoms: selectedSymptoms,
          patient: patientData
        } 
      });
    }, 2000);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      général: "bg-primary/10 text-primary",
      respiratoire: "bg-accent/10 text-accent",
      neurologique: "bg-warning/10 text-warning",
      cardiovasculaire: "bg-destructive/10 text-destructive",
      digestif: "bg-success/10 text-success",
      dermatologique: "bg-orange-500/10 text-orange-600",
      musculosquelettique: "bg-purple-500/10 text-purple-600",
    };
    return colors[category] || "bg-muted text-muted-foreground";
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Nouveau Diagnostic</h1>
          <p className="text-muted-foreground text-lg">
            {step === 1 
              ? "Renseignez les informations du patient"
              : "Sélectionnez les symptômes du patient pour obtenir un diagnostic IA"
            }
          </p>
        </div>

        {/* Patient Information Form */}
        {step === 1 && (
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Informations du Patient
              </CardTitle>
              <CardDescription>
                Veuillez renseigner les informations du patient avant de continuer
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(() => setStep(2))} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom complet</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Jean Dupont" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Âge</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Ex: 35" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Genre</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionner" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="male">Homme</SelectItem>
                              <SelectItem value="female">Femme</SelectItem>
                              <SelectItem value="other">Autre</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Continuer vers la sélection des symptômes
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        {/* Symptoms Selection */}
        {step === 2 && (
          <>

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
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="font-semibold text-lg mb-1">
                  {selectedSymptoms.length} symptôme(s) sélectionné(s)
                </p>
                <p className="text-sm text-muted-foreground">
                  Minimum 1 symptôme requis pour l'analyse
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                >
                  Retour
                </Button>
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
            </div>
          </CardContent>
        </Card>
        </>
        )}
      </div>
    </Layout>
  );
};

export default Diagnostic;
