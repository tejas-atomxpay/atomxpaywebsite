import React from 'react';
import { useIsMobile } from '../../hooks/use-mobile';
import content from '../../data/content.json';

const AboutSection: React.FC = () => {
  const { about } = content;
  const isMobile = useIsMobile();

  return (
    <section id="about" className={`bg-gray-50 ${
      isMobile ? 'py-12 pt-20' : 'py-8'
    }`}>
      <div className="container mx-auto px-4">
        <div className={`text-center ${
          isMobile ? 'mb-8' : 'mb-16'
        }`}>
          <h2 className={`font-bold text-black ${
            isMobile ? 'text-2xl mb-3' : 'text-4xl mb-6'
          }`}>{about.title}</h2>
          
          <div className="max-w-4xl mx-auto">
            <p className={`text-gray-700 leading-relaxed ${
              isMobile ? 'text-lg' : 'text-xl'
            }`}>
              {about.subtitle}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;