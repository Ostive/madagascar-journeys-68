import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const CreateBlog = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    image: "",
    date: new Date().toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  });

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const { error } = await supabase
      .from('blogs')
      .insert([formData]);

    if (error) throw error;

    toast({
      title: "Article créé",
      description: "L'article a été créé avec succès.",
    });
    navigate('/admin/blog');
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
        <Button variant="ghost" onClick={() => navigate('/admin/blog')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à la liste
        </Button>
        <h1 className="text-3xl font-bold">Créer un nouvel article</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Titre</label>
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Entrez le titre"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Extrait</label>
          <Textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            placeholder="Entrez un extrait"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Catégorie</label>
          <Input
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Entrez la catégorie"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">URL de l&apos;image</label>
          <Input
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Entrez l'URL de l'image"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Contenu</label>
          <Textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Entrez le contenu de l'article"
            required
            className="min-h-[300px]"
          />
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Création en cours...
            </>
          ) : (
            "Créer l'article"
          )}
        </Button>
      </form>
    </div>
  );
};

export default CreateBlog;
