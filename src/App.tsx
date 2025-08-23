import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
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

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2
    });

    // Make lenis instance globally available
    window.lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.lenis = undefined;
    };
  }, []);

  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element && window.lenis) {
      window.lenis.scrollTo(element, { 
        offset: -80, // Offset for the fixed header
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
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

