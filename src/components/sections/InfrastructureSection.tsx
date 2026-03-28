import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { useIsMobile } from '../../hooks/use-mobile';
import content from '../../data/content.json';

const InfrastructureSection: React.FC = () => {
  const { infrastructure } = content;
  const isMobile = useIsMobile();

  return (
    <section className={`bg-gray-50 border-y border-gray-200 ${
      isMobile ? 'py-12' : 'py-16'
    }`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className={`flex flex-col items-center text-center ${
            isMobile ? 'gap-6' : 'gap-8'
          }`}>
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-2">
              <ShieldCheck className="w-10 h-10 text-primary" />
            </div>
            
            <div className="space-y-4">
              <h2 className={`font-bold text-black tracking-tight ${
                isMobile ? 'text-2xl px-2' : 'text-4xl md:text-5xl'
              }`}>
                {infrastructure.title}
              </h2>
              
              <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
            </div>
            
            <p className={`text-gray-700 leading-relaxed font-medium ${
              isMobile ? 'text-lg' : 'text-xl md:text-2xl'
            }`}>
              {infrastructure.content.split(' — ').map((part, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <span className="text-gray-400 mx-2">—</span>}
                  {part.includes('AtomX Pay') ? (
                    <span>
                      <span className="text-primary font-bold">AtomX Pay</span>
                      {part.replace('AtomX Pay', '')}
                    </span>
                  ) : part}
                </React.Fragment>
              ))}
            </p>
            
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 w-full pt-8 ${
              isMobile ? 'max-w-sm' : ''
            }`}>
              {['Licensed Banks', 'MSBs', 'Financial Institutions'].map((partner) => (
                <div key={partner} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                  <span className="font-semibold text-gray-800">{partner}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfrastructureSection;
