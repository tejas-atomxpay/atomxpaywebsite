import React from 'react';
import { Globe, Clock, Shield, TrendingUp, DollarSign, CheckCircle, Send } from 'lucide-react';
import FeatureCard from '../ui/FeatureCard';
import { useIsMobile } from '../../hooks/use-mobile';
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
  const isMobile = useIsMobile();

  return (
    <section id="features" className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold mb-2 text-black">{features.title}</h2>
          <p className="text-lg lg:text-xl font-semibold mb-4 text-gray-800">
            {features.subtitle}
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.cards.slice(0, 6).map((card, index) => {
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
      </div>
    </section>
  );
};

export default FeaturesSection;

