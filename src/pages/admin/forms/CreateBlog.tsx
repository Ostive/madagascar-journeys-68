import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Editor } from "@/components/ui/editor";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const BLOG_CATEGORIES = [
  "Aventure",
  "Culture",
  "Nature",
  "Gastronomie",
  "Histoire",
  "Conseils de voyage",
  "Hébergement",
  "Transport"
];

const CreateBlog = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "", 
    category: "",
    image: "",
    tags: [],
    published: false,
    featured: false
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      toast({
        title: "Erreur",
        description: "Aucun fichier sélectionné",
        variant: "destructive",
      });
      return;
    }
    
    const file = e.target.files[0];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (file.size > maxSize) {
      toast({
        title: "Erreur",
        description: "L'image ne doit pas dépasser 5MB",
        variant: "destructive",
      });
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Erreur",
        description: "Le fichier doit être une image",
        variant: "destructive",
      });
      return;
    }

    const fileExt = file.name.split('.').pop()?.toLowerCase();
    const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    
    if (!fileExt || !validExtensions.includes(fileExt)) {
      toast({
        title: "Erreur",
        description: "Format d'image non supporté. Utilisez JPG, PNG, GIF ou WEBP",
        variant: "destructive",
      });
      return;
    }

    const fileName = `${Math.random().toString(36).slice(2)}_${Date.now()}.${fileExt}`;
    const filePath = `images/${fileName}`;

    try {
      setUploadProgress(0);
      
      // First check if we can access the bucket
      const { data: bucketExists, error: bucketError } = await supabase
        .storage
        .getBucket('blogs');

      if (bucketError) {
        console.error('Bucket access error:', bucketError);
        throw new Error('Erreur d\'accès au bucket de stockage');
      }

      const { error: uploadError, data } = await supabase.storage
        .from('blogs')
        .upload(filePath, file, {
          upsert: true,
          contentType: file.type,
          cacheControl: '3600',
          onUploadProgress: (progress) => {
            setUploadProgress((progress.loaded / progress.total) * 100);
          },
        });

      if (uploadError) {
        console.error('Upload error details:', uploadError);
        throw uploadError;
      }

      const { data: { publicUrl }, error: urlError } = supabase.storage
        .from('blogs')
        .getPublicUrl(filePath);

      if (urlError) {
        console.error('URL generation error:', urlError);
        throw urlError;
      }

      setFormData(prev => ({ ...prev, image: publicUrl }));
      toast({
        title: "Image téléchargée",
        description: "L'image a été téléchargée avec succès.",
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      let errorMessage = "Impossible de télécharger l'image.";
      
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Erreur",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setUploadProgress(0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      // Convert content to JSONB format if it's a string
      const contentJson = typeof formData.content === 'string' 
        ? JSON.parse(formData.content) 
        : formData.content;
      
      const blogPost = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: contentJson,
        category: formData.category,
        image: formData.image,
        tags: formData.tags,
        author_id: user?.id,
        published: formData.published,
        featured: formData.featured,
        views_count: 0
      };

      const { error } = await supabase
        .from('blogs')
        .insert([blogPost]);

      if (error) throw error;

      toast({
        title: "Article créé",
        description: "L'article a été créé avec succès.",
      });
      navigate('/admin/blogs');
    } catch (error) {
      console.error('Error creating blog post:', error);
      toast({
        title: "Erreur",
        description: "Impossible de créer l'article.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" onClick={() => navigate('/admin/blogs')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à la liste
        </Button>
        <h1 className="text-3xl font-bold">Créer un nouvel article</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Entrez le titre"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Extrait</Label>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleChange}
                    placeholder="Entrez un extrait"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {BLOG_CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Image principale</Label>
                  {formData.image && (
                    <div className="relative aspect-video mb-4">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="rounded-lg object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <Label
                      htmlFor="image-upload"
                      className="flex items-center justify-center gap-2 p-4 border-2 border-dashed rounded-lg cursor-pointer hover:border-emerald-500 transition-colors"
                    >
                      <Upload className="h-4 w-4" />
                      Télécharger une image
                    </Label>
                  </div>
                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <Progress value={uploadProgress} className="w-full" />
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Options de publication</Label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="published"
                        checked={formData.published}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          published: e.target.checked 
                        }))}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <Label htmlFor="published">Publier</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={formData.featured}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          featured: e.target.checked 
                        }))}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <Label htmlFor="featured">Article en vedette</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <Label>Contenu</Label>
              <Editor
                value={formData.content}
                onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
                placeholder="Rédigez votre article ici..."
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting} size="lg">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Création en cours...
              </>
            ) : (
              "Publier l'article"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
