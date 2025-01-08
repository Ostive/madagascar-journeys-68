import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Upload } from "lucide-react";
import PhotoStream from "./PhotoStream";

interface ImageUploadSectionProps {
  mainImage: string;
  gallery: string[];
  onMainImageChange: (url: string) => void;
  onGalleryChange: (urls: string[]) => void;
}

export const ImageUploadSection = ({
  mainImage,
  gallery,
  onMainImageChange,
  onGalleryChange,
}: ImageUploadSectionProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  const fetchExistingImages = async () => {
    const { data, error } = await supabase.storage.from('destinations').list();
    if (error) {
      console.error('Error fetching images:', error);
      return;
    }
    setExistingImages(data.map(file => 
      `${supabase.storage.from('destinations').getPublicUrl(file.name).data.publicUrl}`
    ));
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      
      const { error: uploadError, data } = await supabase.storage
        .from('destinations')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('destinations')
        .getPublicUrl(fileName);

      if (!mainImage) {
        onMainImageChange(publicUrl);
      } else {
        onGalleryChange([...gallery, publicUrl]);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = (url: string) => {
    if (url === mainImage) {
      onMainImageChange('');
      if (gallery.length > 0) {
        onMainImageChange(gallery[0]);
        onGalleryChange(gallery.slice(1));
      }
    } else {
      onGalleryChange(gallery.filter(img => img !== url));
    }
  };

  const handleSetMainImage = (url: string) => {
    if (url === mainImage) return;
    
    const oldMainImage = mainImage;
    onMainImageChange(url);
    
    if (oldMainImage) {
      onGalleryChange([...gallery.filter(img => img !== url), oldMainImage]);
    } else {
      onGalleryChange(gallery.filter(img => img !== url));
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Images</label>
        <div className="flex gap-4">
          <Input
            type="file"
            onChange={handleFileUpload}
            accept="image/*"
            disabled={isUploading}
          />
          <Button
            variant="outline"
            onClick={fetchExistingImages}
            type="button"
          >
            <Upload className="w-4 h-4 mr-2" />
            Voir les images existantes
          </Button>
          {isUploading && <Loader2 className="animate-spin" />}
        </div>
      </div>

      <PhotoStream
        mainImage={mainImage}
        gallery={gallery}
        onRemoveImage={handleRemoveImage}
        onSetMainImage={handleSetMainImage}
      />

      {existingImages.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Images existantes</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {existingImages.map((url, index) => (
              <button
                key={index}
                className="aspect-square rounded-lg overflow-hidden hover:ring-2 hover:ring-primary transition-all"
                onClick={() => {
                  if (!mainImage) {
                    onMainImageChange(url);
                  } else {
                    onGalleryChange([...gallery, url]);
                  }
                }}
              >
                <img
                  src={url}
                  alt={`Existing ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};