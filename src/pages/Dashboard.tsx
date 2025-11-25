import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Users, TrendingUp, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import dashboardHero from "@/assets/dashboard-hero.png";

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Diagnostics",
      value: "24",
      description: "Total effectués",
      icon: Activity,
      color: "text-primary",
    },
    {
      title: "Patients",
      value: "12",
      description: "Suivis actifs",
      icon: Users,
      color: "text-success",
    },
    {
      title: "Précision",
      value: "94%",
      description: "Moyenne IA",
      icon: TrendingUp,
      color: "text-accent",
    },
    {
      title: "Dernière visite",
      value: "2h",
      description: "Il y a",
      icon: Clock,
      color: "text-warning",
    },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-primary p-8 text-primary-foreground shadow-hover">
          <div className="relative z-10">
            <h1 className="text-4xl font-bold mb-2">Bienvenue sur MyDiagAI</h1>
            <p className="text-lg opacity-90 mb-6">
              Votre assistant intelligent pour le diagnostic médical
            </p>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate("/diagnostic")}
              className="bg-white text-primary hover:bg-white/90"
            >
              Nouveau Diagnostic
            </Button>
          </div>
          <img 
            src={dashboardHero} 
            alt="Dashboard" 
            className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-20"
          />
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card
                key={stat.title}
                className="shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Derniers Diagnostics</CardTitle>
              <CardDescription>Vos 5 dernières consultations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium">Patient #{i}</p>
                    <p className="text-sm text-muted-foreground">
                      Il y a {i} heure{i > 1 ? "s" : ""}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Voir
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Actions Rapides</CardTitle>
              <CardDescription>Accès rapide aux fonctionnalités</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => navigate("/diagnostic")}
              >
                <Activity className="mr-2 h-4 w-4" />
                Nouveau diagnostic
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => navigate("/history")}
              >
                <Clock className="mr-2 h-4 w-4" />
                Voir l'historique
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => navigate("/statistics")}
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                Consulter les stats
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
