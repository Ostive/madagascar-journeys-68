import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar, MessageSquare, Star, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import GalleryGrid from "@/components/GaleryGrid";
import { useToast } from "@/hooks/use-toast";

interface Circuit {
  id: number;
  name: string;
  description: string;
  long_description?: string;
  duration_days: number;
  price: number;
  persons?: string;
  rating?: number;
  date_range?: string;
  main_image?: string;
  gallery?: string[];
  difficulty?: string;
  reviews?: Array<{
    id: number;
    rating: number;
    review_text?: string;
    traveler_name?: string;
  }>;
  reservation_requests?: Array<{
    id: string;
    status: string;
    created_at: string;
    adults_count?: number;
    children_count?: number;
  }>;
}

const CircuitDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: circuit, isLoading } = useQuery<Circuit>({
    queryKey: ['admin-circuit', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('circuits')
        .select(`
          *,
          reviews (
            id,
            rating,
            review_text,
            traveler_name
          ),
          reservation_requests (
            id,
            status,
            created_at,
            adults_count,
            children_count
          ),
          gallery
        `)
        .eq('id', parseInt(id || '0'))
        .single();

      if (error) {
        toast({
          title: "Erreur",
          description: "Impossible de charger les détails du circuit",
          variant: "destructive",
        });
        throw error;
      }

      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!circuit) {
    return (
      <div className="container mx-auto p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Circuit non trouvé</h1>
          <p className="mt-2 text-gray-600">Le circuit que vous recherchez n'existe pas.</p>
          <Button onClick={() => navigate('/admin/circuit')} className="mt-4">
            Retour à la liste
          </Button>
        </div>
      </div>
    );
  }

  const averageRating = circuit?.reviews?.length
    ? circuit.reviews.reduce((acc: number, review: any) => acc + (review.rating || 0), 0) / circuit.reviews.length
    : 0;

  const totalBookings = circuit?.reservation_requests?.length || 0;
  const confirmedBookings = Array.isArray(circuit?.reservation_requests) 
    ? circuit.reservation_requests.filter(r => r.status === 'confirmed').length 
    : 0;

  const galleryImages = circuit ? [circuit.main_image, ...(circuit.gallery || [])].filter(Boolean) : [];

  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" onClick={() => navigate('/admin/circuit')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à la liste
        </Button>
        <h1 className="text-3xl font-bold">{circuit.name}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Note moyenne</CardTitle>
            <Star className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRating.toFixed(1)}/5</div>
            <p className="text-xs text-muted-foreground">
              Basé sur {circuit.reviews?.length || 0} avis
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Réservations</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{confirmedBookings}/{totalBookings}</div>
            <p className="text-xs text-muted-foreground">
              Réservations confirmées
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Capacité</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{circuit.persons}</div>
            <p className="text-xs text-muted-foreground">
              Personnes par groupe
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="gallery">Galerie</TabsTrigger>
          <TabsTrigger value="reviews">Avis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informations générales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-sm text-gray-600">{circuit.long_description || circuit.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2">Durée</h3>
                  <p className="text-sm text-gray-600">{circuit.duration_days} jours</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Prix</h3>
                  <p className="text-sm text-gray-600">{circuit.price} €</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Difficulté</h3>
                  <p className="text-sm text-gray-600">{circuit.difficulty}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Période</h3>
                  <p className="text-sm text-gray-600">{circuit.date_range}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gallery">
          <Card>
            <CardHeader>
              <CardTitle>Galerie photos</CardTitle>
            </CardHeader>
            <CardContent>
              <GalleryGrid 
                images={[circuit.main_image, ...(circuit.gallery || [])].filter(Boolean)} 
                title={circuit.name} 
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Avis des voyageurs</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {circuit.reviews?.length ? (
                <div className="space-y-4">
                  {circuit.reviews.map((review) => (
                    <div key={review.id} className="border-b pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{review.traveler_name}</span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span>{review.rating}/5</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{review.review_text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">
                  Aucun avis pour le moment
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CircuitDetailPage;