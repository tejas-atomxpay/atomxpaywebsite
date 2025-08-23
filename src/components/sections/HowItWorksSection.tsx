import React from 'react';
import { Users, Shield, Send } from 'lucide-react';
import ProcessStep from '../ui/ProcessStep';
import content from '../../data/content.json';

const iconMap = {
  users: Users,
  shield: Shield,
  send: Send
};

const HowItWorksSection: React.FC = () => {
  const { howItWorks } = content;

  return (
    <section id="business-model" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-black">{howItWorks.title}</h2>
          <p className="text-xl text-gray-600">
            {howItWorks.subtitle}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
          {howItWorks.steps.map((step) => {
            const IconComponent = iconMap[step.icon as keyof typeof iconMap];
            return (
              <ProcessStep
                key={step.number}
                number={step.number}
                icon={IconComponent}
                title={step.title}
                description={step.description}
              />
            );
          })}
        </div>

        <div className="bg-white rounded-xl p-8 max-w-4xl mx-auto text-center shadow-lg">
          <h3 className="text-2xl font-bold mb-4">{howItWorks.compliance.title}</h3>
          <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
            {howItWorks.compliance.description}
          </p>
          <button className="atomx-accent text-white px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity" type="button">
            {howItWorks.compliance.button}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

