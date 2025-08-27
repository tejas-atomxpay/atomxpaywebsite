import React from 'react';
import { Link } from '@tanstack/react-router';
import { useIsMobile } from '../../hooks/use-mobile';
import BlogCard from '../ui/BlogCard';
import content from '../../data/content.json';

const ResourcesSection: React.FC = () => {
  const { blog } = content;
  const isMobile = useIsMobile();

  // Safely get blog posts with fallback and validation
  const blogPosts = blog?.posts || [];
  
  // Filter and validate blog posts - ensure each post has required fields
  const validBlogPosts = blogPosts.filter(post => 
    post && 
    typeof post === 'object' && 
    post.id && 
    post.title && 
    post.excerpt && 
    post.date && 
    post.readTime && 
    post.category && 
    post.image
  );
  
  // No longer using featured/regular separation since we simplified the layout

  // If no valid blog posts available, show a message
  if (validBlogPosts.length === 0) {
    return (
      <section id="resources" className={`bg-gray-50 scroll-mt-20 ${
        isMobile ? 'py-12' : 'py-16'
      }`}>
        <div className="container mx-auto px-4">
          <div className={`text-center ${
            isMobile ? 'mb-8' : 'mb-12'
          }`}>
            <h2 className={`font-bold text-black ${
              isMobile ? 'text-2xl mb-3' : 'text-4xl mb-6'
            }`}>{blog.title}</h2>
            
            <p className={`text-gray-600 max-w-2xl mx-auto ${
              isMobile ? 'text-base' : 'text-lg'
            }`}>
              {blog.subtitle}
            </p>
          </div>
          
          <div className="text-center">
            <p className="text-gray-500">No resources available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="resources" className={`bg-gray-50 scroll-mt-20 ${
      isMobile ? 'py-12' : 'py-16'
    }`}>
      <div className="container mx-auto px-4">
        <div className={`text-center ${
          isMobile ? 'mb-8' : 'mb-12'
        }`}>
          <h2 className={`font-bold text-black ${
            isMobile ? 'text-2xl mb-3' : 'text-4xl mb-6'
          }`}>{blog.title}</h2>
          
          <p className={`text-gray-600 max-w-2xl mx-auto ${
            isMobile ? 'text-base' : 'text-lg'
          }`}>
            {blog.subtitle}
          </p>
        </div>
        
        {/* Blog Grid Layout */}
        <div className="max-w-7xl mx-auto">
          <div className={`grid gap-6 ${
            isMobile 
              ? 'grid-cols-1' 
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}>
            {/* All Posts - Equal Height */}
            {validBlogPosts.map((post, index) => (
              <BlogCard 
                key={`${post.id}-${index}`} 
                post={post} 
                variant={index === 0 ? 'featured' : 'default'}
              />
            ))}
          </div>
          
          {/* View All Resources Button */}
          <div className="text-center mt-12">
            <Link 
              to="/resources"
              className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300 shadow-lg hover:shadow-xl inline-block"
            >
              View All Resources
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;