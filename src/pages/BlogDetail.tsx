import { useParams } from "react-router-dom";
import { blogPosts } from "@/data/blog";
import Header from "@/components/Header";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import { Calendar, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const BlogDetail = () => {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.title.toLowerCase().replace(/\s+/g, '-') === id);

  if (!post) {
    return <div>Article non trouvé</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <Header />
      <div className="py-12 ">
        <div className="container mx-auto px-4">
          <Link to="/blog">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux articles
            </Button>
          </Link>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-[400px] object-cover"
              />

              <div className="p-8">
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{post.date}</span>
                  <span className="px-2 py-1 bg-emerald/10 text-emerald rounded-full text-sm">
                    {post.category}
                  </span>
                </div>

                <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                  {/* Here you would typically have the full content of the blog post */}
                  <p className="text-gray-600 leading-relaxed">
                    {post.content}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogDetail;