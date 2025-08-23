import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1 h-full flex flex-col">
      <div className="w-12 h-12 atomx-primary rounded-lg flex items-center justify-center mb-4 flex-shrink-0">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-lg sm:text-xl font-bold mb-3 leading-tight">{title}</h3>
      <p className="text-gray-600 text-sm sm:text-base leading-relaxed flex-grow">{description}</p>
    </div>
  );
};

export default FeatureCard;

