import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover-lift h-full flex flex-col glass-morphism group relative overflow-hidden">
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 atomx-gradient-trust opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
      
      <div className="relative z-10">
        <div className="w-12 h-12 atomx-gradient rounded-lg flex items-center justify-center mb-4 flex-shrink-0 pulse-trust group-hover:scale-110 transition-transform duration-300" style={{filter: 'url(#atomx-glow)'}}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold mb-3 leading-tight font-technical atomx-text-neon group-hover:text-purple-700 transition-colors">{title}</h3>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed flex-grow font-technical">{description}</p>
      </div>
      
      {/* Shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
    </div>
  );
};

export default FeatureCard;

