import Header from "@/components/Header";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blog";
import BlogCard from "@/components/cards/BlogCard";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Blog = () => {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Header />
      <div className="p-14" />
      {/* Hero Section */}
      <section className="bg-emerald/10 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-poppins font-bold text-dark mb-6">
                Blog & Actualités
              </h1>
              <p className="text-lg text-dark/70 font-opensans max-w-2xl">
                Découvrez nos derniers articles, conseils de voyage et actualités
                sur Madagascar
              </p>
            </div>
            <div className="w-full md:w-1/3 aspect-video rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
                alt="Blog header"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Articles récents</h2>
            <Button
              variant="outline"
              className="hidden md:flex items-center gap-2 hover:bg-emerald hover:text-white"
            >
              Tous les articles
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
            {blogPosts.map((post) => (
              <BlogCard key={post.title} post={post} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 hover:bg-emerald hover:text-white"
            >
              Tous les articles
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;