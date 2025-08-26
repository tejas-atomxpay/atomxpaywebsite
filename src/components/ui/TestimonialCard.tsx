import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  rating: number;
  text: string;
  author: {
    name: string;
    title: string;
    subtitle?: string;
    location: string;
  };
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ rating, text, author }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        {/* Professional Designation */}
        <div>
          <span className="inline-block bg-gradient-to-r from-primary to-accent text-white text-sm font-bold px-3 py-1 rounded-full">
            {author.title}
          </span>
        </div>
        
        {/* Stars */}
        <div className="flex">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
          ))}
        </div>
      </div>
      <p className="text-gray-600 mb-4 text-base italic leading-relaxed">"{text}"</p>
      <div className="border-t pt-3 text-center">
        {/* Name and Subtitle side by side */}
        <div className="flex items-center justify-center gap-3 mb-2">
          <h4 className="font-bold text-lg text-gray-900">{author.name}</h4>
          {author.subtitle && (
            <span className="inline-block bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
              {author.subtitle}
            </span>
          )}
        </div>
        
        <p className="text-gray-500 text-sm font-medium">{author.location}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;

