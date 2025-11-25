import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Activity, Users } from "lucide-react";

const Statistics = () => {
  const topDiseases = [
    { name: "Grippe saisonnière", count: 8, trend: "+12%" },
    { name: "Migraine", count: 6, trend: "+5%" },
    { name: "Bronchite aiguë", count: 5, trend: "-3%" },
    { name: "Gastro-entérite", count: 3, trend: "+8%" },
    { name: "Sinusite", count: 2, trend: "0%" },
  ];

  const monthlyData = [
    { month: "Jan", diagnostics: 24 },
    { month: "Fév", diagnostics: 18 },
    { month: "Mar", diagnostics: 32 },
    { month: "Avr", diagnostics: 28 },
  ];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Statistiques</h1>
          <p className="text-muted-foreground text-lg">
            Analyses et tendances de vos diagnostics
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Diagnostics
              </CardTitle>
              <Activity className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-success flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" />
                +12% ce mois
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Patients Actifs
              </CardTitle>
              <Users className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-success flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" />
                +3 nouveaux
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Précision Moy.
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">79%</div>
              <p className="text-xs text-muted-foreground mt-1">
                Sur tous les diagnostics
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Temps Moyen
              </CardTitle>
              <Activity className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.3 min</div>
              <p className="text-xs text-muted-foreground mt-1">
                Par diagnostic
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Bar Chart */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Diagnostics Mensuels</CardTitle>
              <CardDescription>
                Évolution sur les 4 derniers mois
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyData.map((data) => (
                  <div key={data.month} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{data.month}</span>
                      <span className="text-muted-foreground">
                        {data.diagnostics}
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-primary rounded-full transition-all"
                        style={{ width: `${(data.diagnostics / 35) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Diseases */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Diagnostics Fréquents</CardTitle>
              <CardDescription>
                Les 5 maladies les plus diagnostiquées
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topDiseases.map((disease, index) => (
                  <div
                    key={disease.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{disease.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {disease.count} cas
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        disease.trend.startsWith("+")
                          ? "text-success"
                          : disease.trend.startsWith("-")
                          ? "text-destructive"
                          : "text-muted-foreground"
                      }`}
                    >
                      {disease.trend}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Stats */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Répartition par Catégorie</CardTitle>
            <CardDescription>
              Distribution des symptômes par catégorie médicale
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-5">
              {[
                { label: "Respiratoire", value: 35, color: "bg-accent" },
                { label: "Neurologique", value: 25, color: "bg-primary" },
                { label: "Digestif", value: 20, color: "bg-success" },
                { label: "Cardiovasculaire", value: 12, color: "bg-destructive" },
                { label: "Général", value: 8, color: "bg-warning" },
              ].map((cat) => (
                <div key={cat.label} className="text-center">
                  <div className="mx-auto mb-2 h-20 w-20 rounded-full border-8 border-muted flex items-center justify-center relative">
                    <div
                      className={`absolute inset-0 rounded-full ${cat.color} opacity-20`}
                      style={{
                        clipPath: `polygon(50% 50%, 50% 0%, ${
                          50 + 50 * Math.sin((cat.value / 100) * 2 * Math.PI)
                        }% ${50 - 50 * Math.cos((cat.value / 100) * 2 * Math.PI)}%)`,
                      }}
                    />
                    <span className="text-lg font-bold">{cat.value}%</span>
                  </div>
                  <p className="text-sm font-medium">{cat.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Statistics;
