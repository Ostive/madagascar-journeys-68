import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { blogPosts } from "@/data/blog";
import { ArrowLeft } from "lucide-react";

const CreateBlog = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newBlog = {
      id: title.toLowerCase().replace(/\s+/g, '-'),
      title,
      excerpt,
      category,
      image,
      content,
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    };

    blogPosts.push(newBlog);
    toast({
      title: "Blog post created",
      description: "The blog post has been successfully created.",
    });
    navigate('/admin/blog');
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" onClick={() => navigate('/admin/blog')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog List
        </Button>
        <h1 className="text-3xl font-bold">Create New Blog Post</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Excerpt</label>
          <Textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Enter blog excerpt"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>
          <Input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter blog category"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Image URL</label>
          <Input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Enter image URL"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Content</label>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter blog content"
            required
            className="min-h-[200px]"
          />
        </div>

        <Button type="submit">Create Blog Post</Button>
      </form>
    </div>
  );
};

export default CreateBlog;