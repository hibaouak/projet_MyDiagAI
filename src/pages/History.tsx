import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Eye, Trash2 } from "lucide-react";

const History = () => {
  const history = [
    {
      id: 1,
      date: "2024-01-15",
      symptoms: ["Fièvre", "Toux", "Fatigue"],
      topDiagnosis: "Grippe saisonnière",
      probability: 78,
      patientId: "PAT-001",
    },
    {
      id: 2,
      date: "2024-01-14",
      symptoms: ["Maux de tête", "Vertiges"],
      topDiagnosis: "Migraine",
      probability: 82,
      patientId: "PAT-002",
    },
    {
      id: 3,
      date: "2024-01-13",
      symptoms: ["Douleur thoracique", "Difficultés respiratoires"],
      topDiagnosis: "Bronchite aiguë",
      probability: 71,
      patientId: "PAT-003",
    },
    {
      id: 4,
      date: "2024-01-12",
      symptoms: ["Nausées", "Douleurs abdominales"],
      topDiagnosis: "Gastro-entérite",
      probability: 85,
      patientId: "PAT-001",
    },
  ];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Historique</h1>
            <p className="text-muted-foreground text-lg">
              Consultez tous vos diagnostics précédents
            </p>
          </div>
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Filtrer par date
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardDescription>Total diagnostics</CardDescription>
              <CardTitle className="text-3xl">24</CardTitle>
            </CardHeader>
          </Card>
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardDescription>Ce mois</CardDescription>
              <CardTitle className="text-3xl">8</CardTitle>
            </CardHeader>
          </Card>
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardDescription>Précision moyenne</CardDescription>
              <CardTitle className="text-3xl">79%</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* History List */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Diagnostics récents</CardTitle>
            <CardDescription>
              Vos {history.length} derniers diagnostics effectués
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:shadow-md transition-all"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="outline">{item.patientId}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {new Date(item.date).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg mb-1">
                      {item.topDiagnosis}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {item.symptoms.map((symptom, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {symptom}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Probabilité: <span className="font-semibold text-primary">{item.probability}%</span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default History;
