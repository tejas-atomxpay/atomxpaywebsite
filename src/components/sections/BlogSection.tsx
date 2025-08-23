import React from 'react';
import BlogCard from '../ui/BlogCard';
import content from '../../data/content.json';

const BlogSection: React.FC = () => {
  const { blog } = content;

  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-black">{blog.title}</h2>
          <p className="text-xl text-gray-600">
            {blog.subtitle}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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

