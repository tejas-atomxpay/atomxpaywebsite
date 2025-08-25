import React from 'react';
import { Link, TrendingUp, Zap } from 'lucide-react';
import { useIsMobile } from '../../hooks/use-mobile';
import content from '../../data/content.json';

const iconMap = {
  link: Link,
  'trending-up': TrendingUp,
  zap: Zap
};

const HowItWorksSection: React.FC = () => {
  const { howItWorks } = content;
  const isMobile = useIsMobile();

  return (
    <section id="business-model" className={`bg-white scroll-mt-20 ${
      isMobile ? 'py-12' : 'py-8'
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
        
        {/* Unique Timeline Design */}
        <div className="max-w-6xl mx-auto mb-16">
          {isMobile ? (
            // Mobile: Vertical Timeline
            <div className="space-y-8">
              {howItWorks.steps.map((step, index) => {
                const IconComponent = iconMap[step.icon as keyof typeof iconMap];
                return (
                  <div key={step.number} className="flex gap-6">
                    {/* Timeline Icon */}
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      {index < howItWorks.steps.length - 1 && (
                        <div className="w-1 h-16 bg-gradient-to-b from-primary/50 to-accent/50 mt-4"></div>
                      )}
                    </div>
                    
                    {/* Content Card */}
                    <div className="flex-1 bg-white rounded-2xl p-6 shadow-xl border-l-4 border-primary">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="bg-accent text-white text-sm font-bold px-3 py-1 rounded-full">
                          STEP {step.number}
                        </span>
                        <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                          {(step as any).highlight}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // Desktop: Horizontal Timeline with Connecting Lines
            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute top-8 left-8 right-8 h-1 bg-gradient-to-r from-primary via-accent to-primary"></div>
              
              <div className="grid grid-cols-3 gap-8">
                {howItWorks.steps.map((step, index) => {
                  const IconComponent = iconMap[step.icon as keyof typeof iconMap];
                  return (
                    <div key={step.number} className="relative">
                      {/* Timeline Node */}
                      <div className="relative z-10 bg-white rounded-2xl p-6 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300">
                        {/* Icon Circle */}
                        <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg -mt-8 border-4 border-white">
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        
                        {/* Step Badge */}
                        <div className="text-center mb-3">
                          <span className="bg-accent text-white text-sm font-bold px-3 py-1 rounded-full">
                            STEP {step.number}
                          </span>
                        </div>
                        
                        {/* Highlight Badge */}
                        <div className="text-center mb-4">
                          <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                            {(step as any).highlight}
                          </span>
                        </div>
                        
                        {/* Content */}
                        <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{step.title}</h3>
                        <p className="text-gray-600 leading-relaxed text-center text-sm">{step.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Compliance Section with Different Design */}
        <div className={`bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl max-w-4xl mx-auto text-center border border-primary/20 ${
          isMobile ? 'p-6' : 'p-8'
        }`}>
          <div className="bg-white rounded-xl p-6 shadow-inner">
            <h3 className={`font-bold mb-4 text-primary ${
              isMobile ? 'text-xl' : 'text-2xl'
            }`}>{howItWorks.compliance.title}</h3>
            <p className={`text-gray-600 max-w-3xl mx-auto ${
              isMobile ? 'mb-4 text-base' : 'mb-6'
            }`}>
              {howItWorks.compliance.description}
            </p>
            <a 
              href="mailto:contactus@atomxpay.com?subject=Start Blockchain Transfer with AtomX Pay&body=Hello AtomX Pay team,%0D%0A%0D%0AI would like to experience blockchain rails for my international money transfer. Please help me get started.%0D%0A%0D%0AThank you!"
              className="bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-lg transition-all duration-300 inline-block text-center no-underline cursor-pointer transform hover:scale-105"
            >
              {howItWorks.compliance.button}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

