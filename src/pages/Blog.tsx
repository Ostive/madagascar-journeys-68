import Header from "@/components/Header";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blog";
import BlogCard from "@/components/cards/BlogCard";

const Blog = () => {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Header />
      <div className="p-14" />
      {/* Hero Section */}
      <section className="bg-emerald/10 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-poppins font-bold text-center text-dark mb-6">
            Blog & Actualités
          </h1>
          <p className="text-lg text-center text-dark/70 max-w-3xl mx-auto font-opensans">
            Découvrez nos derniers articles, conseils de voyage et actualités
            sur Madagascar
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
            {blogPosts.map((post) => (
              <BlogCard key={post.title} post={post} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;