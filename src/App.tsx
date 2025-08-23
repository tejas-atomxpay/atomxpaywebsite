import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
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
  const [activeSection, setActiveSection] = useState<string>('');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
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

    // Scroll progress tracking
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(scrollPercent, 100));

      // Show back-to-top button after scrolling 300px
      setShowBackToTop(scrollTop > 300);

      // Active section detection
      const sections = ['comparison', 'features', 'business-model', 'faq', 'testimonials', 'blog'];
      const current = sections.find(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => {
      lenis.destroy();
      window.lenis = undefined;
      window.removeEventListener('scroll', handleScroll);
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

  const scrollToTop = (): void => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="App">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full atomx-gradient transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      
      <Header scrollToSection={scrollToSection} activeSection={activeSection} />
      
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
      
      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 atomx-accent text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40 ${
          showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        type="button"
        aria-label="Back to top"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </div>
  );
};

export default App;

