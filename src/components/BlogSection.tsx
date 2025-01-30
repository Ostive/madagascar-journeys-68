import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BlogCard from "./cards/BlogCard";
import { BlogPost } from "@/types";

const blogPosts: BlogPost[] = [
  {
    id: "plages-madagascar",
    title: "Les 10 plus belles plages de Madagascar",
    excerpt: "Découvrez notre sélection des plus belles plages de l'île, des lagons turquoise aux criques secrètes.",
    image: "https://madagascar-tourisme.com/wp-content/uploads/2017/04/33879604103_f0de969da2_k.jpg",
    author: "Marie Laurent",
    date: "12 Jan 2024",
    category: "Plages",
    readTime: "5 min",
    content: "Découvrez les plus belles plages de Madagascar..."
  },
  {
    id: "guide-baobabs",
    title: "Guide complet de l'Allée des Baobabs",
    excerpt: "Tout ce que vous devez savoir pour visiter ce site emblématique de Madagascar.",
    image: "https://cedar-cdn-aws-webp.s3.eu-central-1.amazonaws.com/app/uploads/2020/10/24070404/Western-Madagascar-avenue-de-baobabs-SS-705245614-1920.jpg",
    author: "Thomas Dubois",
    date: "8 Jan 2024",
    category: "Guide",
    readTime: "8 min",
    content: "Guide complet pour visiter l'Allée des Baobabs..."
  },
  {
    id: "faune-unique",
    title: "La faune unique de Madagascar",
    excerpt: "Partez à la découverte des espèces endémiques qui peuplent cette île extraordinaire.",
    image: "https://static.edenviaggi.it/.imaging/default/dam/edenviaggi.it/img/escursioni/madagascar/1900x1070-.png/jcr:content.png",
    author: "Sophie Martin",
    date: "5 Jan 2024",
    category: "Nature",
    readTime: "6 min",
    content: "Découvrez la faune unique de Madagascar..."
  },
];

const BlogSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-24 overflow-hidden bg-gray-50/50">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <svg
          className="absolute right-0 top-0 h-[500px] w-[500px] transform translate-x-1/2 -translate-y-1/2 text-emerald-50"
          fill="currentColor"
          viewBox="0 0 200 200"
        >
          <defs>
            <pattern
              id="blogPattern"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="1" className="text-emerald-500" />
            </pattern>
          </defs>
          <path
            fill="url(#blogPattern)"
            d="M100 0C44.8 0 0 44.8 0 100s44.8 100 100 100 100-44.8 100-100S155.2 0 100 0zM100 150c-27.6 0-50-22.4-50-50s22.4-50 50-50 50 22.4 50 50-22.4 50-50 50z"
          />
        </svg>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block"
            >
              <span className="text-sm font-semibold text-emerald-600 tracking-wider uppercase mb-4 block">
                Blog
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Notre Blog Voyage
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Conseils, guides et inspiration pour votre prochain voyage à Madagascar
              </p>
            </motion.div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <BlogCard
                key={post.title}
                post={post}
                index={index}
              />
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-16"
          >
            <button
              onClick={() => navigate('/blog')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-full transition-colors duration-300"
            >
              Voir tous les articles
              <ArrowRight className="h-5 w-5" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;