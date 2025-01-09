import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blog";
import BlogCard from "./cards/BlogCard";

const BlogSection = () => {
  return (
    <section className="py-20 bg-white" id="blog">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-dark mb-4">
              Blog & Actualités
            </h2>
            <p className="text-lg text-dark/70 font-opensans">
              Restez informés des dernières actualités et découvrez nos conseils de
              voyage
            </p>
          </div>
          <Link to="/blog">
            <Button
              variant="outline"
              className="hover:bg-emerald hover:text-white"
            >
              Voir tout
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogPosts.map((post) => (
            <BlogCard key={post.title} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;