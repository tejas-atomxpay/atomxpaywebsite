import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ProcessStepProps {
  number: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

const ProcessStep: React.FC<ProcessStepProps> = ({ number, icon: Icon, title, description }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-8 translate-x-8"></div>
      
      {/* Step number badge */}
      <div className="absolute top-4 right-4 w-10 h-10 bg-accent rounded-full flex items-center justify-center shadow-md">
        <span className="text-white font-bold text-lg">{number}</span>
      </div>
      
      {/* Icon and content */}
      <div className="relative z-10">
        <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-4 shadow-sm">
          <Icon className="w-8 h-8 text-white" />
        </div>
        
        <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
      
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent"></div>
    </div>
  );
};

export default ProcessStep;

