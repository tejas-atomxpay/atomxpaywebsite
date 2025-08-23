import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TestimonialCard from '../ui/TestimonialCard';
import content from '../../data/content.json';

const TestimonialsSection: React.FC = () => {
  const { testimonials } = content;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.reviews.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlay, testimonials.reviews.length]);

  const nextTestimonial = () => {
    setCurrentIndex(prev => (prev + 1) % testimonials.reviews.length);
    setIsAutoPlay(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex(prev => (prev - 1 + testimonials.reviews.length) % testimonials.reviews.length);
    setIsAutoPlay(false);
  };

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-black">{testimonials.title}</h2>
          <p className="text-xl text-gray-600">
            {testimonials.subtitle}
          </p>
        </div>
        
        {/* Desktop: Show all testimonials */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.reviews.map((review, index) => (
            <TestimonialCard
              key={index}
              rating={review.rating}
              text={review.text}
              author={review.author}
            />
          ))}
        </div>
        
        {/* Mobile: Carousel */}
        <div className="md:hidden max-w-sm mx-auto relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.reviews.map((review, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <TestimonialCard
                    rating={review.rating}
                    text={review.text}
                    author={review.author}
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
            type="button"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
            type="button"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
          
          {/* Dots indicator */}
          <div className="flex justify-center mt-6 gap-2">
            {testimonials.reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlay(false);
                }}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'atomx-accent' : 'bg-gray-300'
                }`}
                type="button"
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

