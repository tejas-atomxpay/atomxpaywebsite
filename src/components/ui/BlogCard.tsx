import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useIsMobile } from '../../hooks/use-mobile';

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ title, excerpt, date, readTime }) => {
  const isMobile = useIsMobile();
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className={isMobile ? 'p-4' : 'p-6'}>
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span>{date}</span>
          <span className="mx-2">•</span>
          <span>{readTime}</span>
        </div>
        <h3 className={`font-bold mb-3 ${
          isMobile ? 'text-lg' : 'text-xl'
        }`}>{title}</h3>
        <p className={`text-gray-600 ${
          isMobile ? 'text-sm mb-3' : 'mb-4'
        }`}>{excerpt}</p>
        <button className="flex items-center atomx-text-primary font-semibold hover:underline" type="button">
          Read More
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default BlogCard;

