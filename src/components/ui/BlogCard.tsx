import React from 'react';
import { Link } from '@tanstack/react-router';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured';
  className?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, variant = 'default', className = '' }) => {
  // Return null if post is invalid
  if (!post || !post.id) {
    return null;
  }

  const getCategoryStyle = (category: string) => {
    switch (category.toLowerCase()) {
      case 'podcast':
        return 'bg-purple-600 text-white';
      case 'case study':
        return 'bg-blue-600 text-white';
      case 'article':
      default:
        return 'bg-gray-600 text-white';
    }
  };

  const isLargeTile = variant === 'featured';

  return (
    <Link
      to="/resources/$postId"
      params={{ postId: post.id }}
      className={`group block ${className}`}
    >
      <article className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
        {/* Image Container */}
        <div className={`relative overflow-hidden ${isLargeTile ? 'h-64' : 'h-48'}`}>
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              // Fallback to a placeholder gradient
              e.currentTarget.src = `data:image/svg+xml,%3Csvg width="400" height="300" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3ClinearGradient id="grad1" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%235e29a3;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23f05a2b;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="400" height="300" fill="url(%23grad1)" /%3E%3Ctext x="50%25" y="50%25" font-family="Arial, sans-serif" font-size="14" fill="white" text-anchor="middle" dy=".3em"%3E${post.category}%3C/text%3E%3C/svg%3E`;
            }}
          />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wide rounded ${getCategoryStyle(post.category)}`}>
              {post.category}
            </span>
          </div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className={`p-6 flex flex-col flex-grow ${isLargeTile ? 'space-y-4' : 'space-y-3'}`}>
          {/* Date and Read Time */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <time dateTime={post.date}>{post.date}</time>
            <span>{post.readTime}</span>
          </div>

          {/* Title */}
          <h3 className={`font-bold text-gray-900 leading-tight group-hover:text-primary transition-colors duration-300 ${
            isLargeTile ? 'text-xl' : 'text-lg'
          }`}>
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className={`text-gray-600 leading-relaxed flex-grow ${
            isLargeTile ? 'text-base' : 'text-sm'
          }`}>
            {post.excerpt}
          </p>

          {/* Read More Link */}
          <div className="flex items-center text-purple-600 hover:text-orange-500 font-semibold text-sm transition-colors duration-300 mt-auto pt-4">
            <span>Read {post.category.toLowerCase() === 'podcast' ? 'More' : 'Article'}</span>
            <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;

