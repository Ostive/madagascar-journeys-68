import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { destinations } from "@/data/destinations";
import { ArrowLeft } from "lucide-react";

const CreateDestination = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newDestination = {
      id: title.toLowerCase().replace(/\s+/g, '-'),
      title,
      description,
      longDescription: description,
      price,
      location,
      duration,
      image,
      gallery: [image],
      highlights: [],
      included: [],
      notIncluded: [],
      bestTimeToVisit: "",
    };

    destinations.push(newDestination);
    toast({
      title: "Destination created",
      description: "The destination has been successfully created.",
    });
    navigate('/admin/destination');
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" onClick={() => navigate('/admin/destination')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Destinations List
        </Button>
        <h1 className="text-3xl font-bold">Create New Destination</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter destination title"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter destination description"
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
          <label className="text-sm font-medium">Location</label>
          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
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
          <label className="text-sm font-medium">Image URL</label>
          <Input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Enter image URL"
            required
          />
        </div>

        <Button type="submit">Create Destination</Button>
      </form>
    </div>
  );
};

export default CreateDestination;