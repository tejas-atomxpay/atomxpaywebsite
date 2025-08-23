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
    <div className="text-center">
      <div className="relative mb-6">
        <div className="w-20 h-20 atomx-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon className="w-10 h-10 text-white" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">{number}</span>
        </div>
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default ProcessStep;

