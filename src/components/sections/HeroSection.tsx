import React from 'react';
import { Check } from 'lucide-react';
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

  return (
    <section className="bg-white text-black py-20 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {hero.title}
            </h1>
            <p className="text-xl mb-8 text-white/90 max-w-2xl">
              {hero.subtitle}
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
              {hero.trustBadges.map((badge, index) => (
                <div key={index} className="flex items-center bg-white/10 backdrop-blur rounded-lg px-4 py-2">
                  <Check className="w-5 h-5 mr-2 text-green-400" />
                  <span className="text-sm font-medium">{badge.text}</span>
                </div>
              ))}
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

