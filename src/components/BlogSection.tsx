import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import BlogCard from "./cards/BlogCard";
import { blogPosts } from "@/data/blog";

export const BlogSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4">Notre Blog</h2>
            <p className="text-gray-600 max-w-2xl">
              Découvrez nos derniers articles et conseils pour votre voyage à Madagascar
            </p>
          </div>
          <Button
            variant="outline"
            asChild
            className="hidden md:flex items-center gap-2 mt-4 md:mt-0 hover:bg-emerald hover:text-white"
          >
            <Link to="/blog" className="flex items-center gap-2">
              Tous les articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogPosts.slice(0, 4).map((post) => (
            <BlogCard key={post.title} post={post} />
          ))}
        </div>

        {/* Mobile Button */}
        <div className="mt-8 text-center md:hidden">
          <Button
            variant="outline"
            asChild
            className="w-full flex items-center justify-center gap-2 hover:bg-emerald hover:text-white"
          >
            <Link to="/blog" className="flex items-center gap-2">
              Tous les articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        //
      </div>
    </section>
  );
};

export default BlogSection;