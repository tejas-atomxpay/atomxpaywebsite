import React, { useState, useEffect } from 'react';
import { Check, Users, Zap } from 'lucide-react';
import ExchangeRateWidget from '../ui/ExchangeRateWidget';
import { ExchangeRateWidgetProps } from '../../types';
import content from '../../data/content.json';

interface HeroSectionProps extends ExchangeRateWidgetProps {}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  usdAmount, 
  setUsdAmount, 
  exchangeRate, 
  isLoading, 
  lastUpdated 
}) => {
  const { hero } = content;
  const [liveUsers, setLiveUsers] = useState<number>(1247);
  const [transfersToday, setTransfersToday] = useState<number>(89);

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
    <section className="bg-white text-black py-20 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {hero.title}
            </h1>
            <p className="text-xl mb-8 text-gray-600 max-w-2xl">
              {hero.subtitle}
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-6">
              {hero.trustBadges.map((badge, index) => (
                <div key={index} className="flex items-center bg-white/10 backdrop-blur rounded-lg px-4 py-2">
                  <Check className="w-5 h-5 mr-2 text-green-400" />
                  <span className="text-sm font-medium">{badge.text}</span>
                </div>
              ))}
            </div>
            
            {/* Social Proof Counters */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8 text-gray-600">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-green-500" />
                <span className="text-sm">
                  <span className="font-semibold text-green-600">{liveUsers.toLocaleString()}</span> users online
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-orange-500" />
                <span className="text-sm">
                  <span className="font-semibold text-orange-600">{transfersToday}</span> transfers today
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-600 font-medium">
                  Live rates updated {lastUpdated ? 'now' : 'hourly'}
                </span>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="atomx-accent text-white px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity" type="button">
                {hero.buttons.primary}
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors" type="button">
                {hero.buttons.secondary}
              </button>
            </div>
          </div>
          
          {/* Exchange Rate Widget */}
          <div className="flex justify-center lg:justify-end">
            <ExchangeRateWidget 
              usdAmount={usdAmount} 
              setUsdAmount={setUsdAmount} 
              exchangeRate={exchangeRate}
              isLoading={isLoading}
              lastUpdated={lastUpdated}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

