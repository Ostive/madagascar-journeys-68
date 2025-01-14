import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blog";
import BlogCard from "./cards/BlogCard";
import { ArrowRight } from 'lucide-react'

const BlogSection = () => {
  return (
    <section className="py-20 bg-white" id="blog">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-poppins font-bold text-dark text-center mb-4">
          Blog & Actualités
        </h2>
        <p className="text-lg text-dark/70 text-center mb-12 font-opensans">
          Restez informés des dernières actualités et découvrez nos conseils de
          voyage
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {blogPosts.map((post) => (
            <BlogCard key={post.title} post={post} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link to="/blog">
            <Button
              variant="outline"
              className="group flex items-center gap-2 transition-all duration-300 hover:bg-emerald hover:text-white"
            >
              Voir tous les articles
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;