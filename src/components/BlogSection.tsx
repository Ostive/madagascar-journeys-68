import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const blogPosts = [
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

const BlogSection = () => {
  return (
    <section className="py-20 bg-white" id="blog">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-poppins font-bold text-dark text-center mb-4">
          Blog & Actualités
        </h2>
        <p className="text-lg text-dark/70 text-center mb-12 font-opensans">
          Restez informés des dernières actualités et découvrez nos conseils de voyage
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
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
                <h3 className="text-xl font-poppins font-semibold mb-2">
                  {post.title}
                </h3>
                <p className="text-dark/70 mb-4 font-opensans line-clamp-2">
                  {post.excerpt}
                </p>
                <Button variant="link" className="text-emerald hover:text-emerald/80 p-0 h-auto font-semibold">
                  Lire la suite <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/blog">
            <Button variant="outline" className="hover:bg-emerald hover:text-white">
              Voir tous les articles
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;