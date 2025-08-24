import React from 'react';
import { useIsMobile } from '../../hooks/use-mobile';
import content from '../../data/content.json';

const ComparisonSection: React.FC = () => {
  const { comparison } = content;
  const isMobile = useIsMobile();

  const renderProviderCard = (provider: any, index: number) => {
    return (
      <div 
        key={index}
        className={`p-3 rounded-xl shadow-lg transition-all duration-300 ${
          provider.highlight 
            ? 'bg-gradient-to-br from-primary/10 via-primary/20 to-primary/10 border-2 border-primary border-opacity-60 shadow-xl transform scale-[1.02] shadow-primary/20'
            : 'bg-white border border-gray-300 hover:bg-gray-50 hover:shadow-xl hover:-translate-y-1 hover:border-gray-400'
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <h3 className={`font-bold text-base ${
              provider.highlight ? 'text-primary' : 'text-gray-900'
            }`}>
              {provider.name}
            </h3>
            {provider.highlight && (
              <span className="bg-gradient-to-r from-primary to-accent text-white text-xs px-2 py-1 rounded-full font-semibold animate-pulse">
                BEST VALUE
              </span>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <span className="text-sm text-gray-600 font-medium">Exchange Rate:</span>
            <div className={`text-sm font-semibold text-right ${
              provider.highlight ? 'text-green-600' : 'text-gray-700'
            }`}>
              {provider.exchangeRate}
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 font-medium">Transfer Fee:</span>
            <span className={`text-sm font-semibold ${
              provider.highlight ? 'text-green-600' : 'text-gray-700'
            }`}>
              {provider.transferFee}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 font-medium">You Receive:</span>
            <span className={`text-base font-bold ${
              provider.highlight ? 'text-green-600' : 'text-gray-900'
            }`}>
              {provider.recipientGets}
            </span>
          </div>
          
          <div className="flex justify-between items-center pt-2 border-t border-gray-300">
            <span className="text-sm text-gray-600 font-medium">Transfer Time:</span>
            <span className={`text-sm font-semibold ${
              provider.highlight ? 'text-green-600' : 'text-gray-700'
            }`}>
              {provider.time}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderTable = (category: string, title: string, colorClass: string) => {
    const providers = comparison.providers.filter(provider => provider.category === category);
    
    return (
      <div className="mb-6 last:mb-0">
        {/* Mobile scroll target for first table (Traditional Banking) */}
        {category === 'traditional' && isMobile && (
          <div id="comparison-mobile-target" className="absolute -mt-24"></div>
        )}
        {/* Table Header - Compact */}
        <div className="text-center mb-3">
          <h3 className={`text-lg lg:text-xl font-bold ${colorClass}`}>
            {title}
          </h3>
        </div>

        {/* Mobile Card Layout */}
        <div className="block lg:hidden">
          <div className="grid gap-3 px-4">
            {providers.map((provider, index) => renderProviderCard(provider, index))}
          </div>
        </div>

        {/* Desktop Table Layout - Compact */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow-md overflow-hidden border border-gray-300 table-fixed">
            <colgroup>
              <col className="w-[25%]" />
              <col className="w-[25%]" />
              <col className="w-[15%]" />
              <col className="w-[20%]" />
              <col className="w-[15%]" />
            </colgroup>
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left font-semibold text-gray-900 text-sm">
                  {comparison.tableHeaders.provider}
                </th>
                <th className="py-2 px-4 text-left font-semibold text-gray-900 text-sm">Rate</th>
                <th className="py-2 px-4 text-left font-semibold text-gray-900 text-sm">Fee</th>
                <th className="py-2 px-4 text-left font-semibold text-gray-900 text-sm">You Get</th>
                <th className="py-2 px-4 text-left font-semibold text-gray-900 text-sm">
                  {comparison.tableHeaders.time}
                </th>
              </tr>
            </thead>
            <tbody>
              {providers.map((provider, index) => (
                <tr 
                  key={index} 
                  className={`border-b border-gray-200 transition-all duration-200 ${
                    provider.highlight 
                      ? 'bg-gradient-to-r from-primary/5 to-primary/10 shadow-sm transform scale-[1.01] shadow-primary/10' 
                      : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  <td className={`py-2 px-4 relative font-technical text-sm ${
                    provider.highlight ? 'font-bold text-primary' : 'font-medium text-gray-900'
                  }`}>
                    {provider.highlight && (
                      <div className="absolute -left-1 top-0 bottom-0 w-1 bg-primary rounded-r pulse-trust"></div>
                    )}
                    <div className="flex items-center gap-2">
                      <span className="whitespace-nowrap">{provider.name}</span>
                      {provider.highlight && (
                        <span className="bg-gradient-to-r from-primary to-accent text-white text-xs px-1.5 py-0.5 rounded-full font-semibold whitespace-nowrap animate-pulse" style={{filter: 'url(#atomx-glow)'}}>
                          BEST
                        </span>
                      )}
                    </div>
                  </td>
                  <td className={`py-2 px-4 whitespace-nowrap text-sm ${
                    provider.highlight ? 'font-bold text-green-600' : 'text-gray-700'
                  }`}>
                    {provider.exchangeRate}
                  </td>
                  <td className={`py-2 px-4 whitespace-nowrap text-sm ${
                    provider.highlight ? 'font-bold text-green-600' : 'text-gray-700'
                  }`}>
                    {provider.transferFee}
                  </td>
                  <td className={`py-2 px-4 whitespace-nowrap text-sm ${
                    provider.highlight ? 'font-bold text-green-600' : 'text-gray-700'
                  }`}>
                    {provider.recipientGets}
                  </td>
                  <td className={`py-2 px-4 whitespace-nowrap text-sm ${
                    provider.highlight ? 'font-bold text-green-600' : 'text-gray-700'
                  }`}>
                    {provider.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <section id="comparison" className={`bg-gray-200 ${
      isMobile ? 'py-12 pt-20' : 'py-8'
    }`}>
      <div className="container mx-auto px-4">
        {/* Main Header - Compact */}
        <div className={`text-center ${isMobile ? 'mb-6' : 'mb-8'}`}>
          <h2 className={`font-bold text-black ${
            isMobile ? 'text-xl mb-2' : 'text-2xl lg:text-3xl mb-2'
          }`}>
            {comparison.title}
          </h2>
          <h3 className={`font-semibold text-gray-800 ${
            isMobile ? 'text-base mb-3' : 'text-lg lg:text-xl mb-4'
          }`}>
            {comparison.subtitle}
          </h3>
        </div>
        
        {/* Three Compact Tables */}
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Fintech (Blockchain) Table */}
          {renderTable('blockchain', comparison.categories.blockchain, 'text-primary')}
          
          {/* Traditional Banking Table */}
          {renderTable('traditional', comparison.categories.traditional, 'text-primary')}
          
          {/* Fintech with Traditional Banking Table */}
          {renderTable('msb', comparison.categories.msb, 'text-primary')}
        </div>
        
        {/* Footer Note - Compact */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-600">
            * All rates are indicative and subject to change. AtomX Pay offers live market rates with no hidden markups.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;