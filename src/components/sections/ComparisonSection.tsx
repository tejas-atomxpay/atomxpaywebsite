import React from 'react';
import { useIsMobile } from '../../hooks/use-mobile';
import { useCurrency } from '../../contexts/CurrencyContext';
import content from '../../data/content.json';

const ComparisonSection: React.FC = () => {
  const { comparison, calculator } = content;
  const isMobile = useIsMobile();
  const { currentPair, fromAmount, exchangeRate } = useCurrency();
  
  // Calculate dynamic values
  const toAmount = fromAmount * exchangeRate;
  const atomxFee = currentPair.from === 'USD' ? calculator.values.flatFeeUSD : 
                   currentPair.from === 'EUR' ? calculator.values.flatFeeEUR : 
                   currentPair.from === 'GBP' ? calculator.values.flatFeeGBP : 
                   currentPair.from === 'AED' ? calculator.values.flatFeeAED : 
                   calculator.values.flatFeeINR;
  
  // Generate dynamic provider data from content.json
  const generateDynamicProviders = () => {
    const baseAmount = fromAmount;
    const liveRate = exchangeRate;
    
    return comparison.providers.map(provider => {
      const markupMultiplier = 1 - (provider.markupPercent / 100);
      const providerFee = provider.fees[currentPair.from as keyof typeof provider.fees] || 0;
      const currencySymbol = currentPair.fromSymbol;
      
      // Calculate recipient amount
      let recipientAmount;
      if (provider.highlight) {
        // AtomX Pay - no markup, live rate
        recipientAmount = toAmount;
      } else {
        // Other providers - apply markup and subtract fees
        recipientAmount = (baseAmount - providerFee) * liveRate * markupMultiplier;
      }
      
      return {
        category: provider.category,
        name: provider.name,
        exchangeRate: provider.highlight 
          ? `${currentPair.toSymbol}${liveRate.toFixed(4)} (Live Exchange Rate)`
          : `${currentPair.toSymbol}${(liveRate * markupMultiplier).toFixed(4)} (${provider.markupPercent}% markup)`,
        transferFee: provider.highlight
          ? `${currentPair.fromSymbol}${atomxFee.toFixed(2)}`
          : `${currencySymbol}${providerFee}`,
        recipientGets: `${currentPair.toSymbol}${recipientAmount.toLocaleString(currentPair.to === 'INR' ? 'en-IN' : 'en-US', { maximumFractionDigits: provider.highlight ? 2 : 0 })}`,
        time: provider.highlight ? calculator.values.transferTime : provider.time,
        highlight: provider.highlight || false
      };
    });
  };
  
  const dynamicProviders = generateDynamicProviders();

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
    const providers = dynamicProviders.filter(provider => provider.category === category);
    
    return (
      <div className="mb-6 last:mb-0">
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
    <section id="comparison" className={`bg-gray-200 scroll-mt-20 ${
      isMobile ? 'py-12' : 'py-8'
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
            Compare what {currentPair.fromSymbol}{fromAmount.toLocaleString()} gets you across providers — AtomX Pay gives you the most, in minutes
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
        
        {/* Traditional Banking Rails vs. Blockchain Rails Table */}
        <div className="max-w-7xl mx-auto mt-12">
          <div className="text-center mb-8">
            <h3 className={`font-bold text-primary ${
              isMobile ? 'text-lg mb-2' : 'text-2xl mb-4'
            }`}>
              {comparison.railsComparison.title}
            </h3>
            <p className="text-gray-600 text-sm">
              {comparison.railsComparison.subtitle}
            </p>
          </div>
          
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-md overflow-hidden border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold text-gray-900 text-sm">Aspect</th>
                  <th className="py-3 px-4 text-center font-semibold text-gray-900 text-sm">Traditional Banking Rails</th>
                  <th className="py-3 px-4 text-center font-semibold text-gray-900 text-sm">MSB on Banking Rails</th>
                  <th className="py-3 px-4 text-center font-semibold text-primary text-sm">AtomX Pay Blockchain Rails</th>
                </tr>
              </thead>
              <tbody>
                {comparison.railsComparison.aspects.map((row, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900 text-sm">{row.aspect}</td>
                    <td className="py-3 px-4 text-center text-gray-700 text-sm">{row.traditional}</td>
                    <td className="py-3 px-4 text-center text-gray-700 text-sm">{row.fintech}</td>
                    <td className="py-3 px-4 text-center font-semibold text-green-600 text-sm bg-green-50">
                      {row.aspect === "Cost Structure" 
                        ? `Transparent: Google rate + ${currentPair.fromSymbol}${atomxFee.toFixed(2)}` 
                        : row.atomx
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4">
            {comparison.railsComparison.aspects.slice(0, 4).map((row, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-3">{row.aspect}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs font-medium text-gray-500">Traditional:</span>
                    <span className="text-sm text-gray-700 text-right flex-1 ml-2">{row.traditional}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs font-medium text-gray-500">MSB:</span>
                    <span className="text-sm text-gray-700 text-right flex-1 ml-2">{row.fintech}</span>
                  </div>
                  <div className="flex justify-between bg-green-50 p-2 rounded">
                    <span className="text-xs font-medium text-primary">AtomX Pay:</span>
                    <span className="text-sm font-semibold text-green-600 text-right flex-1 ml-2">
                      {row.aspect === "Cost Structure" 
                        ? `Transparent: Google rate + ${currentPair.fromSymbol}${atomxFee.toFixed(2)}` 
                        : row.atomx
                      }
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Footer Note - Compact */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-600">
            * Rates updated live from {currentPair.from} to {currentPair.to}. AtomX Pay offers real market rates with no hidden markups.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;