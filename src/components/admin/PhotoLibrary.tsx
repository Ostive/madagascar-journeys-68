import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PhotoLibraryProps {
  onSelect?: (url: string) => void;
  showSelect?: boolean;
}

export const PhotoLibrary = ({ onSelect, showSelect = true }: PhotoLibraryProps) => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.storage.from('destinations').list();
      
      if (error) throw error;

      const photoUrls = data.map(file => 
        supabase.storage.from('destinations').getPublicUrl(file.name).data.publicUrl
      );

      setPhotos(photoUrls);
    } catch (error) {
      console.error('Error fetching photos:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les photos",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Bibliothèque de photos</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {photos.map((url, index) => (
          <div 
            key={url} 
            className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200"
          >
            <img
              src={url}
              alt={`Photo ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {showSelect && (
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onSelect?.(url)}
                >
                  Sélectionner
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};