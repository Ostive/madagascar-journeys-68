import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PhotoStreamProps {
  mainImage: string;
  gallery: string[];
  onRemoveImage: (url: string) => void;
  onSetMainImage: (url: string) => void;
}

const PhotoStream = ({ mainImage, gallery, onRemoveImage, onSetMainImage }: PhotoStreamProps) => {
  const allImages = [mainImage, ...gallery].filter(Boolean);

  if (allImages.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg">
        <p className="text-gray-500">Aucune photo n'a été téléchargée</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Photos téléchargées</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {allImages.map((url, index) => (
          <div 
            key={url} 
            className={`relative group aspect-square rounded-lg overflow-hidden border-2 ${
              url === mainImage ? 'border-primary' : 'border-transparent'
            }`}
          >
            <img
              src={url}
              alt={`Photo ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              {url !== mainImage && (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => onSetMainImage(url)}
                >
                  Définir comme principale
                </Button>
              )}
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onRemoveImage(url)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoStream;