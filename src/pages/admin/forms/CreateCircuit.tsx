import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useMutation } from "@tanstack/react-query";

const CreateCircuit = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [persons, setPersons] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const createMutation = useMutation({
    mutationFn: async (formData: any) => {
      const { error } = await supabase
        .from('circuits')
        .insert([formData]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Circuit created",
        description: "The circuit has been successfully created.",
      });
      navigate('/admin/circuit');
    },
    onError: (error) => {
      console.error('Error creating circuit:', error);
      toast({
        title: "Error",
        description: "Failed to create circuit. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = {
      title,
      description,
      long_description: description,
      duration,
      persons,
      price,
      rating: "4.5",
      date_range: dateRange,
      image,
      gallery: [image],
      itinerary: [],
      included: [],
      not_included: [],
      difficulty,
    };

    createMutation.mutate(formData);
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" onClick={() => navigate('/admin/circuit')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Circuits List
        </Button>
        <h1 className="text-3xl font-bold">Create New Circuit</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter circuit title"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter circuit description"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Duration</label>
          <Input
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Enter duration"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Number of Persons</label>
          <Input
            value={persons}
            onChange={(e) => setPersons(e.target.value)}
            placeholder="Enter number of persons"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Price</label>
          <Input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Date Range</label>
          <Input
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            placeholder="Enter date range"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Difficulty</label>
          <Input
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            placeholder="Enter difficulty level"
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

        <Button type="submit" disabled={createMutation.isPending}>
          {createMutation.isPending ? "Creating..." : "Create Circuit"}
        </Button>
      </form>
    </div>
  );
};

export default CreateCircuit;