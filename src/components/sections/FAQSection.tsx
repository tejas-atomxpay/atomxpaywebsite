import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import FAQItem from '../ui/FAQItem';
import { useIsMobile } from '../../hooks/use-mobile';
import content from '../../data/content.json';

const FAQSection: React.FC = () => {
  const { faq } = content;
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredQuestions = useMemo(() => {
    if (!searchQuery.trim()) return faq.questions;
    
    return faq.questions.filter(item => 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, faq.questions]);

  return (
    <section id="faq" className={`bg-gray-200 scroll-mt-20 ${
      isMobile ? 'py-12' : 'py-8'
    }`}>
      <div className="container mx-auto px-4">
        <div className={`text-center ${
          isMobile ? 'mb-8' : 'mb-16'
        }`}>
          <h2 className={`font-bold text-black ${
            isMobile ? 'text-2xl mb-3' : 'text-4xl mb-4'
          }`}>{faq.title}</h2>
          <p className={`text-gray-600 ${
            isMobile ? 'text-lg mb-6' : 'text-xl mb-8'
          }`}>
            {faq.subtitle}
          </p>
          
          {/* FAQ Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((item, index) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
                searchQuery={searchQuery}
              />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">No questions found matching your search.</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-2 text-purple-600 hover:text-purple-800 underline"
                type="button"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

