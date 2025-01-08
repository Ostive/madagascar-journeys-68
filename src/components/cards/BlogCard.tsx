import React from 'react';
import { Card } from "@/components/ui/card";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { BlogPost } from '@/data/types';

interface BlogCardProps {
  post?: BlogPost;
  className?: string;
}

const samplePost: BlogPost = {
  id: "1",
  title: "10 Best Places in Bali",
  excerpt: "Discover the hidden gems and most beautiful locations in Bali...",
  image: "/api/placeholder/400/500",
  category: "Travel",
  date: "23 Aug 2024",
  content: "Sample content"
};

const BlogCard = ({ 
  post = samplePost,
  className = ""
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`}>
      <Card 
        className={`relative w-72 h-96 overflow-hidden cursor-pointer group hover:scale-[1.02] transition-transform ${className}`}
      >
        {/* Background Image */}
        <img
          src={post.image}
          alt={post.title}
          className="absolute w-full h-full object-cover"
        />
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />

        {/* Top Content */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm">
            {post.category}
          </span>
          <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
            <Calendar className="w-4 h-4" />
            {post.date}
          </div>
        </div>

        {/* Bottom Content */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-sm opacity-90 line-clamp-2 mb-3">
            {post.excerpt}
          </p>
          <div className="flex items-center text-sm font-semibold group-hover:gap-2 transition-all">
            Lire la suite
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default BlogCard;