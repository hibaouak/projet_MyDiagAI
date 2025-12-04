import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useLocation } from "react-router-dom";
import { AlertCircle, CheckCircle2, Info, Download } from "lucide-react";
import { generateDiagnosticPDF } from "@/lib/pdfGenerator";

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { symptoms = [], patient } = location.state || {};

  // Mock results based on symptoms
  const results = [
    {
      disease: "Grippe saisonnière",
      probability: 78,
      severity: "Modéré",
      description: "Infection virale commune des voies respiratoires",
      recommendations: [
        "Repos et hydratation",
        "Médicaments antipyrétiques si nécessaire",
        "Surveillance des symptômes pendant 7-10 jours",
      ],
    },
    {
      disease: "Bronchite aiguë",
      probability: 65,
      severity: "Modéré",
      description: "Inflammation des bronches généralement d'origine virale",
      recommendations: [
        "Repos et hydratation",
        "Antitussifs si toux sèche",
        "Consultation si aggravation",
      ],
    },
    {
      disease: "Migraine",
      probability: 45,
      severity: "Léger",
      description: "Maux de tête intenses et récurrents",
      recommendations: [
        "Repos dans un endroit calme et sombre",
        "Analgésiques adaptés",
        "Suivi avec un neurologue si récurrent",
      ],
    },
  ];

  const getSeverityColor = (severity: string) => {
    const colors: Record<string, string> = {
      Élevé: "destructive",
      Modéré: "warning",
      Léger: "success",
    };
    return colors[severity] || "secondary";
  };

  const getProbabilityColor = (prob: number) => {
    if (prob >= 70) return "text-destructive";
    if (prob >= 50) return "text-warning";
    return "text-success";
  };

  const handleDownloadPDF = () => {
    if (patient) {
      generateDiagnosticPDF(patient, symptoms, results);
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Résultats du Diagnostic</h1>
            <p className="text-muted-foreground text-lg">
              Analyse complétée par l'intelligence artificielle
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleDownloadPDF}>
              <Download className="mr-2 h-4 w-4" />
              Télécharger PDF
            </Button>
            <Button variant="outline" onClick={() => navigate("/diagnostic")}>
              Nouveau diagnostic
            </Button>
          </div>
        </div>

        {/* Patient Information */}
        {patient && (
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Informations du Patient</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Nom</p>
                  <p className="font-semibold">{patient.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Âge</p>
                  <p className="font-semibold">{patient.age} ans</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Genre</p>
                  <p className="font-semibold">
                    {patient.gender === "male" ? "Homme" : patient.gender === "female" ? "Femme" : "Autre"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

       
        {/* Results */}
        <div className="space-y-4">
          {results.map((result, index) => (
            <Card
              key={index}
              className="shadow-card hover:shadow-hover transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-2xl flex items-center gap-2">
                      {index === 0 && (
                        <AlertCircle className="h-6 w-6 text-primary" />
                      )}
                      {result.disease}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {result.description}
                    </CardDescription>
                  </div>
                  <Badge variant={getSeverityColor(result.severity) as any}>
                    {result.severity}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Probability */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">
                      Probabilité
                    </span>
                    <span
                      className={`text-lg font-bold ${getProbabilityColor(
                        result.probability
                      )}`}
                    >
                      {result.probability}%
                    </span>
                  </div>
                  <Progress value={result.probability} className="h-2" />
                </div>

                {/* Recommendations */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    Recommandations
                  </h4>
                  <ul className="space-y-2">
                    {result.recommendations.map((rec, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="text-primary mt-1">•</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button className="flex-1" onClick={() => navigate("/history")}>
            Enregistrer dans l'historique
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => navigate("/dashboard")}
          >
            Retour au tableau de bord
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Results;
