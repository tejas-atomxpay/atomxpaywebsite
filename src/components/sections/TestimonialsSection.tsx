import React from 'react';
import TestimonialCard from '../ui/TestimonialCard';
import content from '../../data/content.json';

const TestimonialsSection: React.FC = () => {
  const { testimonials } = content;

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{testimonials.title}</h2>
          <p className="text-xl text-gray-600">
            {testimonials.subtitle}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.reviews.map((review, index) => (
            <TestimonialCard
              key={index}
              rating={review.rating}
              text={review.text}
              author={review.author}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

