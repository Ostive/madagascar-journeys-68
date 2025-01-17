import React from 'react';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, User2, Clock, ArrowRight } from "lucide-react";
import { BlogPost } from '@/data/types';

interface BlogCardProps {
  post?: BlogPost;
  className?: string;
  index?: number;
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
  className = "",
  index = 0
}: BlogCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ${className}`}
      onClick={() => navigate(`/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`)}
    >
      {/* Image Container */}
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Content Container */}
      <div className="p-6 space-y-4">
        {/* Category and Date */}
        <div className="flex items-center justify-between text-sm">
          <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full font-medium">
            {post.category}
          </span>
          <div className="flex items-center text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            {post.date}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 line-clamp-2">
          {post.excerpt}
        </p>

        {/* Author and Read Time */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            {/* Author Avatar */}
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
              <img
                src="/placeholder-avatar.jpg"
                alt="Author"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Author Info */}
            <div>
              <p className="font-medium text-gray-900">Marie Dupont</p>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                5 min de lecture
              </div>
            </div>
          </div>

          {/* Read More */}
          <div className="flex items-center text-emerald-600 font-medium group-hover:text-emerald-700">
            <span className="mr-2">Lire</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default BlogCard;