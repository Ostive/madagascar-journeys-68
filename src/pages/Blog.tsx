import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blog";
import BlogCard from "@/components/cards/BlogCard";
import { ArrowRight, BookOpen, Calendar, Compass, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchAndFilter, type FilterGroup } from "@/components/search/SearchAndFilter";
import { useState } from "react";

const filterGroups: FilterGroup[] = [
  {
    id: "category",
    label: "Catégorie",
    options: [
      { value: "all", label: "Toutes les catégories" },
      { value: "tips", label: "Conseils pratiques", icon: <BookOpen className="h-4 w-4" /> },
      { value: "guides", label: "Guides des régions", icon: <Compass className="h-4 w-4" /> },
      { value: "culture", label: "Culture & Traditions", icon: <Tag className="h-4 w-4" /> },
    ],
  },
  {
    id: "date",
    label: "Date",
    options: [
      { value: "all", label: "Toutes les dates" },
      { value: "week", label: "Cette semaine" },
      { value: "month", label: "Ce mois" },
      { value: "year", label: "Cette année" },
    ],
  },
  {
    id: "sort",
    label: "Trier par",
    options: [
      { value: "recent", label: "Plus récents" },
      { value: "popular", label: "Plus populaires" },
      { value: "title", label: "Titre (A-Z)" },
    ],
  },
  {
    id: "duration",
    label: "Temps de lecture",
    options: [
      { value: "all", label: "Toutes les durées" },
      { value: "short", label: "< 5 minutes" },
      { value: "medium", label: "5-10 minutes" },
      { value: "long", label: "> 10 minutes" },
    ],
  },
];

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // TODO: Implement search logic
  };

  const handleFilter = (filters: Record<string, string>) => {
    setActiveFilters(filters);
    // TODO: Implement filter logic
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-24" />

      {/* Hero Section */}
      <section className="bg-emerald-50/50 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Blog & Actualités
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl">
                Découvrez nos derniers articles, conseils de voyage et actualités
                sur Madagascar
              </p>
            </div>
            <div className="w-full md:w-1/3 aspect-video rounded-3xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
                alt="Blog header"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 -mt-8">
        <div className="container mx-auto px-4">
          <SearchAndFilter
            placeholder="Rechercher un article..."
            filterGroups={filterGroups}
            onSearch={handleSearch}
            onFilter={handleFilter}
          />
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Articles récents</h2>
            <Button
              variant="outline"
              className="hidden md:flex items-center gap-2 hover:bg-emerald-500 hover:text-white"
            >
              Tous les articles
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <BlogCard key={post.title} post={post} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 hover:bg-emerald-500 hover:text-white"
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