import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Upload } from "lucide-react";
import PhotoStream from "./PhotoStream";
import { PhotoLibrary } from "../PhotoLibrary";

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
  const [showLibrary, setShowLibrary] = useState(false);

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

  const handleSelectFromLibrary = (url: string) => {
    if (!mainImage) {
      onMainImageChange(url);
    } else {
      onGalleryChange([...gallery, url]);
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
            onClick={() => setShowLibrary(!showLibrary)}
            type="button"
          >
            <Upload className="w-4 h-4 mr-2" />
            {showLibrary ? 'Masquer la bibliothèque' : 'Voir la bibliothèque'}
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

      {showLibrary && (
        <PhotoLibrary onSelect={handleSelectFromLibrary} />
      )}
    </div>
  );
};