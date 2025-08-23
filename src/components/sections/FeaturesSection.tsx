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
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{features.title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {features.subtitle}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
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

