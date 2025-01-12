import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUploadSection } from "../../destination/ImageUploadSection";

interface CircuitGalleryProps {
  mainImage: string;
  gallery: string[];
  onMainImageChange: (url: string) => void;
  onGalleryChange: (urls: string[]) => void;
}

const CircuitGallery = ({
  mainImage,
  gallery,
  onMainImageChange,
  onGalleryChange,
}: CircuitGalleryProps) => {
  return (
    <div className="space-y-6">
      <Label className="text-lg font-semibold">Galerie photos</Label>
      <ImageUploadSection
        mainImage={mainImage}
        gallery={gallery}
        onMainImageChange={onMainImageChange}
        onGalleryChange={onGalleryChange}
      />
    </div>
  );
};

export default CircuitGallery;