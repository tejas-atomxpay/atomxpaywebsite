import React, { useState, useEffect } from 'react';
import { Check, Users, Zap } from 'lucide-react';
// import { MeshGradient } from '@paper-design/shaders-react';
import ExchangeRateWidget from '../ui/ExchangeRateWidget';
import { useIsMobile } from '../../hooks/use-mobile';
import { useCurrencyAPI } from '../../hooks/useCurrencyAPI';
import { useCurrency } from '../../contexts/CurrencyContext';
import content from '../../data/content.json';

interface HeroSectionProps {}

const HeroSection: React.FC<HeroSectionProps> = () => {
  const { hero } = content;
  const isMobile = useIsMobile();
  const [liveUsers, setLiveUsers] = useState<number>(1247);
  const [transfersToday, setTransfersToday] = useState<number>(89);
  
  // Use currency context
  const { currentPair, setCurrentPair, fromAmount, setFromAmount, exchangeRate: contextExchangeRate, setExchangeRate } = useCurrency();
  
  // Get exchange rate for current pair
  const { exchangeRate: apiExchangeRate, isLoading, lastUpdated } = useCurrencyAPI(currentPair.from, currentPair.to);
  
  // Update context exchange rate when API rate changes
  useEffect(() => {
    if (apiExchangeRate) {
      setExchangeRate(apiExchangeRate);
    }
  }, [apiExchangeRate, setExchangeRate]);

  // Get default amount based on currency
  const getDefaultAmount = (currency: string) => {
    switch (currency) {
      case 'INR': return 100000;
      case 'USD': return 1000;
      case 'EUR': return 1000;
      default: return 1000;
    }
  };

  // Update default amount when currency pair changes
  useEffect(() => {
    setFromAmount(getDefaultAmount(currentPair.from));
  }, [currentPair, setFromAmount]);

  // Simulate live counters
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveUsers(prev => prev + Math.floor(Math.random() * 3));
      if (Math.random() > 0.7) {
        setTransfersToday(prev => prev + 1);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={`relative bg-white text-black shader-container overflow-hidden ${
      isMobile 
        ? 'py-8 min-h-screen flex flex-col justify-center' 
        : 'py-12 h-[75vh] flex items-center'
    }`}>
      {/* MeshGradient Background */}
      {/* <div className="absolute inset-0 shader-overlay">
        <MeshGradient
          className="absolute inset-0 w-full h-full"
          colors={["#ffffff", "#5e29a3", "#f05a2b", "#7c3aed", "#ffffff"]}
          speed={0.2}
        />
      </div> */}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`grid gap-12 items-center ${
          isMobile ? 'grid-cols-1 gap-8' : 'lg:grid-cols-2'
        }`}>
          <div className={isMobile ? "text-center" : "text-center lg:text-left"}>
            <h1 className={`font-bold leading-tight text-black drop-shadow-lg ${
              isMobile ? 'text-3xl mb-4' : 'text-4xl md:text-5xl lg:text-6xl mb-6'
            }`} style={{textShadow: '2px 2px 4px rgba(0,0,0,0.3), 0 0 8px rgba(255,255,255,0.8)'}}>
              {hero.title}
            </h1>
            <p className={`text-gray-800 max-w-2xl font-semibold drop-shadow-md ${
              isMobile ? 'text-lg mb-6' : 'text-xl mb-8'
            }`} style={{textShadow: '1px 1px 3px rgba(0,0,0,0.2), 0 0 6px rgba(255,255,255,0.9)'}}>
              {hero.subtitle}
            </p>
            
            {/* Trust Badges with Glass Morphism */}
            <div className={`flex flex-wrap gap-4 ${
              isMobile ? 'justify-center mb-4' : 'justify-center lg:justify-start mb-6'
            }`}>
              {hero.trustBadges.map((badge, index) => (
                <div 
                  key={index} 
                  className="flex items-center glass-morphism-dark rounded-lg px-4 py-2 pulse-trust hover:scale-105 transition-transform duration-300"
                  style={{ filter: 'url(#atomx-glass)' }}
                >
                  <Check className="w-5 h-5 mr-2 text-green-700 animate-pulse drop-shadow-sm" />
                  <span className="text-sm font-bold font-technical">{badge.text}</span>
                </div>
              ))}
            </div>
            
            {/* Social Proof Counters with Enhanced Effects */}
            <div className={`flex flex-wrap gap-6 text-gray-600 ${
              isMobile ? 'justify-center mb-6' : 'justify-center lg:justify-start mb-8'
            }`}>
              <div className="flex items-center gap-2 glass-morphism-dark rounded-full px-3 py-1 animate-bounce-in" style={{animationDelay: '0.1s'}}>
                <Users className="w-5 h-5 text-green-600 pulse-success drop-shadow-sm" />
                <span className="text-sm font-technical">
                  <span className="font-bold text-green-800 drop-shadow-sm" style={{textShadow: '1px 1px 2px rgba(255,255,255,0.8)'}}>{liveUsers.toLocaleString()}</span> users online
                </span>
              </div>
              <div className="flex items-center gap-2 glass-morphism-dark rounded-full px-3 py-1 animate-bounce-in" style={{animationDelay: '0.3s'}}>
                <Zap className="w-5 h-5 text-orange-500" style={{filter: 'url(#atomx-glow)'}} />
                <span className="text-sm font-technical">
                  <span className="font-semibold text-orange-600">{transfersToday}</span> transfers today
                </span>
              </div>
              {/* <div className="flex items-center gap-2 glass-morphism-dark rounded-full px-3 py-1 animate-bounce-in" style={{animationDelay: '0.5s'}}>
                <div className="w-3 h-3 bg-green-600 rounded-full pulse-success drop-shadow-sm"></div>
                <span className="text-sm text-green-800 font-bold font-technical drop-shadow-sm" style={{textShadow: '1px 1px 2px rgba(255,255,255,0.8)'}}>
                  Live rates updated {lastUpdated ? 'now' : 'hourly'}
                </span>
              </div> */}
            </div>
            
            {/* CTA Buttons with Premium Effects */}
            <div className={`flex flex-col gap-4 ${
              isMobile ? 'justify-center items-center' : 'sm:flex-row justify-center lg:justify-start'
            }`}>
              <button 
                className="atomx-gradient-accent text-white px-8 py-4 rounded-lg text-lg font-semibold hover-lift btn-gooey font-technical relative overflow-hidden group" 
                type="button"
                style={{filter: 'url(#atomx-glow)'}}
              >
                <span className="relative z-10">{hero.buttons.primary}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </button>
              {/* <button 
                className="glass-morphism-dark border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 hover:text-purple-600 transition-all duration-300 hover-lift font-technical" 
                type="button"
              >
                {hero.buttons.secondary}
              </button> */}
            </div>
          </div>
          
          {/* Exchange Rate Widget */}
          <div className={isMobile ? "flex justify-center mt-8" : "flex justify-center lg:justify-end"}>
            <ExchangeRateWidget 
              fromAmount={fromAmount} 
              setFromAmount={setFromAmount} 
              exchangeRate={contextExchangeRate}
              isLoading={isLoading}
              lastUpdated={lastUpdated}
              currentPair={currentPair}
              onPairChange={setCurrentPair}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

