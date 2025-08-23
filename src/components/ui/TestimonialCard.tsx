import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  rating: number;
  text: string;
  author: {
    name: string;
    title: string;
    location: string;
  };
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ rating, text, author }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <div className="flex mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
        ))}
      </div>
      <p className="text-gray-600 mb-6 text-lg italic">"{text}"</p>
      <div>
        <h4 className="font-bold text-lg">{author.name}</h4>
        <p className="text-gray-500">{author.title}</p>
        <p className="text-gray-500">{author.location}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;

