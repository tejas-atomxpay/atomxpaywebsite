import React from 'react';
import { useIsMobile } from '../../hooks/use-mobile';
import content from '../../data/content.json';

const ResourcesSection: React.FC = () => {
  const { resources } = content;
  const isMobile = useIsMobile();

  return (
    <section id="resources" className={`bg-gray-200 scroll-mt-20 ${
      isMobile ? 'py-12' : 'py-8'
    }`}>
      <div className="container mx-auto px-4">
        <div className={`text-center ${
          isMobile ? 'mb-8' : 'mb-12'
        }`}>
          <h2 className={`font-bold text-black ${
            isMobile ? 'text-2xl mb-3' : 'text-4xl mb-6'
          }`}>{resources.title}</h2>
          
          <h3 className={`font-semibold text-gray-800 ${
            isMobile ? 'text-lg mb-4' : 'text-2xl mb-8'
          }`}>
            {resources.subtitle}
          </h3>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl p-8 shadow-lg">
            {/* Introduction */}
            <p className={`text-gray-700 leading-relaxed mb-8 ${
              isMobile ? 'text-base' : 'text-lg'
            }`}>
              {resources.introduction}
            </p>
            
            {/* Industry Leader Quotes */}
            <div className={`grid gap-8 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2'}`}>
              {resources.quotes.map((quote, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <blockquote className={`italic text-gray-600 mb-4 ${
                    isMobile ? 'text-base' : 'text-lg'
                  }`}>
                    "{quote.quote}"
                  </blockquote>
                  
                  <div className="flex items-center mt-4">
                    <img 
                      src={quote.author.image} 
                      alt={quote.author.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(quote.author.name)}&background=5e29a3&color=fff&size=48`;
                      }}
                    />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        {quote.author.name}
                      </p>
                      <p className="text-gray-600 text-xs">
                        {quote.author.title}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Conclusion */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h4 className={`font-bold text-gray-900 mb-4 ${
                isMobile ? 'text-lg' : 'text-xl'
              }`}>
                {resources.conclusion.title}
              </h4>
              <p className={`text-gray-700 leading-relaxed ${
                isMobile ? 'text-base' : 'text-lg'
              }`}>
                {resources.conclusion.content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;