import React from 'react';
import FAQItem from '../ui/FAQItem';
import content from '../../data/content.json';

const FAQSection: React.FC = () => {
  const { faq } = content;

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{faq.title}</h2>
          <p className="text-xl text-gray-600">
            {faq.subtitle}
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {faq.questions.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

