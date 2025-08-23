import React, { useState } from 'react';
import './App.css';
import Header from './components/layout/Header';
import HeroSection from './components/sections/HeroSection';
import ComparisonSection from './components/sections/ComparisonSection';
import HowItWorksSection from './components/sections/HowItWorksSection';
import FeaturesSection from './components/sections/FeaturesSection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import FAQSection from './components/sections/FAQSection';
import BlogSection from './components/sections/BlogSection';
import Footer from './components/layout/Footer';
import { useCurrencyAPI } from './hooks/useCurrencyAPI';

const App: React.FC = () => {
  const [usdAmount, setUsdAmount] = useState<number>(1000);
  const { exchangeRate, isLoading, lastUpdated } = useCurrencyAPI();

  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="App">
      <Header scrollToSection={scrollToSection} />
      
      <HeroSection 
        usdAmount={usdAmount}
        setUsdAmount={setUsdAmount}
        exchangeRate={exchangeRate}
        isLoading={isLoading}
        lastUpdated={lastUpdated}
      />
      
      <ComparisonSection />
      <FeaturesSection />
      <HowItWorksSection />
      <FAQSection />
      <TestimonialsSection />
      <BlogSection />
      <Footer />
    </div>
  );
};

export default App;

