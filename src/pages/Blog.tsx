import Header from "@/components/Header";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";

const Blog = () => {
  const posts = [
    {
      title: "Les 10 plus belles plages de Madagascar",
      excerpt: "Découvrez notre sélection des plus belles plages de l'île, des criques secrètes aux longues étendues de sable blanc.",
      date: "15 Mars 2024",
      image: "/lovable-uploads/e33ed146-65bb-44b8-9251-84d03d375284.png",
      category: "Destinations"
    },
    {
      title: "Guide de la saison des pluies à Madagascar",
      excerpt: "Tout ce que vous devez savoir pour voyager pendant la saison des pluies : conseils, précautions et meilleures activités.",
      date: "10 Mars 2024",
      image: "/lovable-uploads/b33d8cd1-7240-4e19-8051-c0c3dc7afd42.png",
      category: "Conseils"
    },
    {
      title: "La culture Merina : traditions et coutumes",
      excerpt: "Plongez dans la richesse culturelle du peuple Merina, leurs traditions ancestrales et leur mode de vie actuel.",
      date: "5 Mars 2024",
      image: "/lovable-uploads/e33ed146-65bb-44b8-9251-84d03d375284.png",
      category: "Culture"
    }
  ];

  return (
    <div className="min-h-screen">
      <TopBar />
      <Header />
      
      {/* Hero Section */}
      <section className="bg-emerald/10 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-poppins font-bold text-center text-dark mb-6">
            Blog & Actualités
          </h1>
          <p className="text-lg text-center text-dark/70 max-w-3xl mx-auto font-opensans">
            Découvrez nos derniers articles, conseils de voyage et actualités sur Madagascar
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card key={post.title} className="overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-emerald text-white px-3 py-1 rounded-full text-sm">
                    {post.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-dark/60 mb-3">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{post.date}</span>
                  </div>
                  <h2 className="text-xl font-poppins font-semibold mb-3">{post.title}</h2>
                  <p className="text-dark/70 mb-4 font-opensans">{post.excerpt}</p>
                  <Button variant="link" className="text-emerald hover:text-emerald/80 p-0 h-auto font-semibold">
                    Lire la suite <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;