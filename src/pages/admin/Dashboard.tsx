import { Card } from "@/components/ui/card";
import { BarChart, Users, DollarSign, Calendar } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Tableau de bord</h1>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6 space-y-2">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-blue-500" />
            <h3 className="text-sm font-medium">Réservations</h3>
          </div>
          <p className="text-2xl font-bold">123</p>
          <p className="text-xs text-muted-foreground">+12% depuis le mois dernier</p>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-green-500" />
            <h3 className="text-sm font-medium">Visiteurs</h3>
          </div>
          <p className="text-2xl font-bold">1,234</p>
          <p className="text-xs text-muted-foreground">+5% depuis le mois dernier</p>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-yellow-500" />
            <h3 className="text-sm font-medium">Revenus</h3>
          </div>
          <p className="text-2xl font-bold">12,345€</p>
          <p className="text-xs text-muted-foreground">+8% depuis le mois dernier</p>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="flex items-center space-x-2">
            <BarChart className="h-4 w-4 text-purple-500" />
            <h3 className="text-sm font-medium">Conversion</h3>
          </div>
          <p className="text-2xl font-bold">3.2%</p>
          <p className="text-xs text-muted-foreground">+2% depuis le mois dernier</p>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Dernières réservations</h2>
        <div className="space-y-4">
          {/* Sample booking items */}
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <p className="font-medium">Circuit Nosy Be</p>
              <p className="text-sm text-muted-foreground">John Doe - 2 personnes</p>
            </div>
            <div className="text-right">
              <p className="font-medium">1,234€</p>
              <p className="text-sm text-muted-foreground">Il y a 2 heures</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <p className="font-medium">Destination Antananarivo</p>
              <p className="text-sm text-muted-foreground">Jane Smith - 4 personnes</p>
            </div>
            <div className="text-right">
              <p className="font-medium">2,345€</p>
              <p className="text-sm text-muted-foreground">Il y a 5 heures</p>
            </div>
          </div>
        </div>
      </Card>

      {/* System Alerts */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Alertes système</h2>
        <div className="space-y-4">
          <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg">
            <p className="font-medium">Mise à jour disponible</p>
            <p className="text-sm">Une nouvelle version du système est disponible.</p>
          </div>
          
          <div className="p-4 bg-green-50 text-green-800 rounded-lg">
            <p className="font-medium">Sauvegarde réussie</p>
            <p className="text-sm">La dernière sauvegarde a été effectuée avec succès.</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;