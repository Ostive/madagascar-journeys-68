import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Trash2, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface PhotoLibraryProps {
  onSelect?: (url: string) => void;
  showSelect?: boolean;
}

export const PhotoLibrary = ({ onSelect, showSelect = true }: PhotoLibraryProps) => {
  const [photos, setPhotos] = useState<Array<{ name: string; url: string }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletePhoto, setDeletePhoto] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.storage.from('destinations').list();
      
      if (error) throw error;

      const photoData = data.map(file => ({
        name: file.name,
        url: supabase.storage.from('destinations').getPublicUrl(file.name).data.publicUrl
      }));

      setPhotos(photoData);
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

  const handleDeletePhoto = async () => {
    if (!deletePhoto) return;

    try {
      setIsLoading(true);
      const fileName = deletePhoto.split('/').pop();
      if (!fileName) throw new Error('Invalid file name');

      const { error } = await supabase.storage
        .from('destinations')
        .remove([fileName]);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Photo supprimée avec succès",
      });

      setPhotos(photos.filter(photo => photo.url !== deletePhoto));
    } catch (error) {
      console.error('Error deleting photo:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la photo",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
      setDeletePhoto(null);
    }
  };

  const filteredPhotos = photos.filter(photo => 
    photo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Bibliothèque de photos</h3>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredPhotos.map(({ url, name }) => (
          <div 
            key={url} 
            className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200"
          >
            <img
              src={url}
              alt={name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              {showSelect && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onSelect?.(url)}
                >
                  Sélectionner
                </Button>
              )}
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setDeletePhoto(url)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <AlertDialog open={!!deletePhoto} onOpenChange={() => setDeletePhoto(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. La photo sera définitivement supprimée.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePhoto}>
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};