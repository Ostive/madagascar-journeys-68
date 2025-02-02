import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Plus, Search, Trash2, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface PhotoLibraryProps {
  bucket?: string;
  showSelect?: boolean;
  onSelect?: (url: string) => void;
}

export const PhotoLibrary = ({ 
  bucket = "destinations",
  showSelect = false, 
  onSelect 
}: PhotoLibraryProps) => {
  const { toast } = useToast();
  const [photos, setPhotos] = useState<Array<{ name: string; url: string }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [photoToDelete, setPhotoToDelete] = useState<string | null>(null);
  const [uploadFolder, setUploadFolder] = useState("general");
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    fetchPhotos();
  }, [bucket]);

  const fetchPhotos = async () => {
    try {
      setIsLoading(true);
      const { data: files, error } = await supabase.storage
        .from(bucket)
        .list('images', {
          limit: 100,
          offset: 0,
          sortBy: { column: 'name', order: 'asc' },
        });

      if (error) throw error;

      const photoUrls = await Promise.all(
        (files || []).map(async (file) => {
          const { data: { publicUrl } } = await supabase.storage
            .from(bucket)
            .getPublicUrl(`images/${file.name}`);
          return {
            name: file.name,
            url: publicUrl
          };
        })
      );

      setPhotos(photoUrls);
    } catch (error) {
      console.error('Error fetching photos:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les images.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    const uploadPromises = Array.from(files).map(async (file) => {
      const maxSize = 5 * 1024 * 1024; // 5MB
      
      if (file.size > maxSize) {
        throw new Error(`${file.name} dépasse la limite de 5MB`);
      }

      if (!file.type.startsWith('image/')) {
        throw new Error(`${file.name} n'est pas une image`);
      }

      const fileExt = file.name.split('.').pop()?.toLowerCase();
      const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
      
      if (!fileExt || !validExtensions.includes(fileExt)) {
        throw new Error(`${file.name} n'est pas au bon format (JPG, PNG, GIF ou WEBP)`);
      }

      const fileName = `${Math.random().toString(36).slice(2)}_${Date.now()}.${fileExt}`;
      const filePath = `images/${uploadFolder}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
          contentType: file.type
        });

      if (uploadError) throw uploadError;

      return fileName;
    });

    try {
      setIsUploading(true);
      setUploadProgress(0);

      const progress = (index: number) => {
        setUploadProgress((index / files.length) * 100);
      };

      for (let i = 0; i < uploadPromises.length; i++) {
        await uploadPromises[i];
        progress(i + 1);
      }

      toast({
        title: "Succès",
        description: `${files.length} image${files.length > 1 ? 's' : ''} téléchargée${files.length > 1 ? 's' : ''}`,
      });

      fetchPhotos();
      setShowUploadDialog(false);
    } catch (error) {
      console.error('Error uploading files:', error);
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Impossible de télécharger les images.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDeletePhoto = async () => {
    if (!photoToDelete) return;

    try {
      const fileName = photoToDelete.split('/').pop();
      if (!fileName) throw new Error('Invalid file name');

      const { error } = await supabase.storage
        .from(bucket)
        .remove([`images/${fileName}`]);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "L'image a été supprimée.",
      });

      setPhotoToDelete(null);
      setShowDeleteDialog(false);
      fetchPhotos();
    } catch (error) {
      console.error('Error deleting photo:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'image.",
        variant: "destructive",
      });
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const filteredPhotos = photos.filter(photo => 
    photo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>

        <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Télécharger
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Télécharger des images</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div 
                className={cn(
                  "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
                  dragActive ? "border-primary bg-primary/10" : "border-gray-200 hover:border-primary"
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e.target.files)}
                />
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-8 w-8 text-gray-400" />
                  <p className="text-sm text-gray-600">
                    Glissez-déposez vos images ici ou cliquez pour sélectionner
                  </p>
                  <p className="text-xs text-gray-400">
                    PNG, JPG, GIF ou WEBP (max. 5MB)
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Dossier de destination</Label>
                <select
                  value={uploadFolder}
                  onChange={(e) => setUploadFolder(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="general">Général</option>
                  <option value="header">En-tête</option>
                  <option value="gallery">Galerie</option>
                  <option value="thumbnail">Miniatures</option>
                </select>
              </div>

              {isUploading && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Téléchargement en cours...</span>
                  </div>
                  <Progress value={uploadProgress} />
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredPhotos.map(({ url }, index) => (
          <Card key={index} className="relative group">
            <img
              src={url}
              alt={`Image ${index + 1}`}
              className={`${showSelect ? 'cursor-pointer' : ''} w-full aspect-square object-cover`}
              onClick={() => showSelect && onSelect?.(url)}
            />
            {!showSelect && (
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => {
                  setPhotoToDelete(url);
                  setShowDeleteDialog(true);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </Card>
        ))}
      </div>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
          </DialogHeader>
          <p>Êtes-vous sûr de vouloir supprimer cette image ?</p>
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDeletePhoto}>
              Supprimer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};