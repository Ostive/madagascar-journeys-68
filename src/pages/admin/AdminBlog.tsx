import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { blogPosts } from "@/data/blog";
import { Plus, Pencil, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminBlog = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    const index = blogPosts.findIndex(post => post.id === id);
    if (index !== -1) {
      blogPosts.splice(index, 1);
      toast({
        title: "Blog post deleted",
        description: "The blog post has been successfully deleted.",
      });
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin - Manage Blog Posts</h1>
        <Button onClick={() => navigate('/admin/blog/create')}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Post
        </Button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell>{post.category}</TableCell>
                <TableCell>{post.date}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate(`/admin/blog/edit/${post.id}`)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(post.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminBlog;