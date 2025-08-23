import React from 'react';
import { Globe, Clock, Shield, TrendingUp, DollarSign, CheckCircle, Send } from 'lucide-react';
import FeatureCard from '../ui/FeatureCard';
import content from '../../data/content.json';

const iconMap = {
  globe: Globe,
  clock: Clock,
  shield: Shield,
  'trending-up': TrendingUp,
  'dollar-sign': DollarSign,
  'check-circle': CheckCircle,
  send: Send
};

const FeaturesSection: React.FC = () => {
  const { features } = content;

  return (
    <section id="features" className="py-12 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 px-4 text-black">{features.title}</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            {features.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {features.cards.map((card, index) => {
            const IconComponent = iconMap[card.icon as keyof typeof iconMap];
            return (
              <FeatureCard
                key={index}
                icon={IconComponent}
                title={card.title}
                description={card.description}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

