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
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl p-8 shadow-lg">
            {resources.content.map((paragraph, index) => {
              // Check if it's a quote (starts and ends with quotes)
              const isQuote = paragraph.startsWith('"') && paragraph.endsWith('"');
              // Check if it's a section header like "Why This Matters"
              const isHeader = paragraph === "Why This Matters" || 
                               paragraph.includes("CEO of") || 
                               paragraph.includes("Federal Reserve Governor") ||
                               paragraph.includes("Chief Global Economist") ||
                               paragraph.includes("CEO of BlackRock");
              
              if (isHeader && !paragraph.includes("CEO of") && !paragraph.includes("Federal Reserve") && !paragraph.includes("Chief Global") && !paragraph.includes("BlackRock")) {
                return (
                  <h4 key={index} className={`font-bold text-gray-900 mt-8 mb-4 ${
                    isMobile ? 'text-lg' : 'text-xl'
                  }`}>
                    {paragraph}
                  </h4>
                );
              }
              
              if (isQuote) {
                return (
                  <blockquote key={index} className={`italic text-gray-600 border-l-4 border-primary pl-6 my-6 ${
                    isMobile ? 'text-base' : 'text-lg'
                  }`}>
                    {paragraph}
                  </blockquote>
                );
              }
              
              // Attribution lines (mentions CEO, Governor, etc.)
              if (paragraph.includes("CEO of") || paragraph.includes("Federal Reserve Governor") || 
                  paragraph.includes("Chief Global Economist") || paragraph.includes("emphasizes")) {
                return (
                  <p key={index} className={`text-gray-700 font-medium mb-2 ${
                    isMobile ? 'text-sm' : 'text-base'
                  }`}>
                    {paragraph}
                  </p>
                );
              }
              
              // Regular paragraphs
              return (
                <p key={index} className={`text-gray-700 leading-relaxed mb-4 ${
                  isMobile ? 'text-base' : 'text-lg'
                }`}>
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;