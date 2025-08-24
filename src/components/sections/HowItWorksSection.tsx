import React from 'react';
import { Users, Shield, Send } from 'lucide-react';
import ProcessStep from '../ui/ProcessStep';
import { useIsMobile } from '../../hooks/use-mobile';
import content from '../../data/content.json';

const iconMap = {
  users: Users,
  shield: Shield,
  send: Send
};

const HowItWorksSection: React.FC = () => {
  const { howItWorks } = content;
  const isMobile = useIsMobile();

  return (
    <section id="business-model" className={`bg-gray-100 ${
      isMobile ? 'py-12 pt-20' : 'py-8'
    }`}>
      <div className="container mx-auto px-4">
        <div className={`text-center ${
          isMobile ? 'mb-8' : 'mb-16'
        }`}>
          <h2 className={`font-bold text-black ${
            isMobile ? 'text-2xl mb-3' : 'text-4xl mb-4'
          }`}>{howItWorks.title}</h2>
          <p className={`text-gray-600 ${
            isMobile ? 'text-lg' : 'text-xl'
          }`}>
            {howItWorks.subtitle}
          </p>
        </div>
        
        <div className={`grid gap-8 max-w-4xl mx-auto ${
          isMobile ? 'grid-cols-1 mb-8' : 'md:grid-cols-3 mb-16'
        }`}>
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

        <div className={`bg-white rounded-xl max-w-4xl mx-auto text-center shadow-lg ${
          isMobile ? 'p-6' : 'p-8'
        }`}>
          <h3 className={`font-bold mb-4 ${
            isMobile ? 'text-xl' : 'text-2xl'
          }`}>{howItWorks.compliance.title}</h3>
          <p className={`text-gray-600 max-w-3xl mx-auto ${
            isMobile ? 'mb-4 text-base' : 'mb-6'
          }`}>
            {howItWorks.compliance.description}
          </p>
          <a 
            href="mailto:contactus@atomxpay.com?subject=Start Your Transfer with AtomX Pay&body=Hello AtomX Pay team,%0D%0A%0D%0AI would like to start a money transfer using AtomX Pay. Please help me get started with the process.%0D%0A%0D%0AThank you!"
            className="atomx-accent text-white px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity inline-block text-center no-underline cursor-pointer"
          >
            {howItWorks.compliance.button}
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

