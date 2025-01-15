import GalleryGrid from "@/components/GaleryGrid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GalleryTabProps {
  images: string[];
  title: string;
}

const GalleryTab = ({ images, title }: GalleryTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gallery</CardTitle>
      </CardHeader>
      <CardContent>
        <GalleryGrid images={images} title={title} />
      </CardContent>
    </Card>
  );
};

export default GalleryTab;