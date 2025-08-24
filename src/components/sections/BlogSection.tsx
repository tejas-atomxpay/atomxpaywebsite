import React from 'react';
import BlogCard from '../ui/BlogCard';
import { useIsMobile } from '../../hooks/use-mobile';
import content from '../../data/content.json';

const BlogSection: React.FC = () => {
  const { blog } = content;
  const isMobile = useIsMobile();

  return (
    <section id="blog" className={`bg-gray-50 ${
      isMobile ? 'py-12 pt-20' : 'py-8'
    }`}>
      <div className="container mx-auto px-4">
        <div className={`text-center ${
          isMobile ? 'mb-8' : 'mb-16'
        }`}>
          <h2 className={`font-bold text-black ${
            isMobile ? 'text-2xl mb-3' : 'text-4xl mb-4'
          }`}>{blog.title}</h2>
          <p className={`text-gray-600 ${
            isMobile ? 'text-lg' : 'text-xl'
          }`}>
            {blog.subtitle}
          </p>
        </div>
        
        <div className={`grid gap-8 max-w-6xl mx-auto ${
          isMobile ? 'grid-cols-1' : 'md:grid-cols-3'
        }`}>
          {blog.posts.map((post, index) => (
            <BlogCard
              key={index}
              title={post.title}
              excerpt={post.excerpt}
              date={post.date}
              readTime={post.readTime}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;

