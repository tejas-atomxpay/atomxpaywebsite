import React from 'react';
import content from '../../data/content.json';

const ComparisonSection: React.FC = () => {
  const { comparison } = content;

  const renderProviderCard = (provider: any, index: number) => {
    return (
      <div 
        key={index}
        className={`p-4 rounded-xl shadow-lg transition-all duration-300 ${
          provider.highlight 
            ? 'bg-gradient-to-br from-purple-50 via-white to-green-50 border-2 border-purple-200 shadow-xl transform scale-[1.02]'
            : 'bg-white hover:shadow-xl hover:-translate-y-1'
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h3 className={`font-bold text-lg ${
              provider.highlight ? 'text-purple-700' : 'text-gray-800'
            }`}>
              {provider.name}
            </h3>
            {provider.highlight && (
              <span className="bg-gradient-to-r from-purple-600 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold animate-pulse">
                BEST VALUE
              </span>
            )}
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <span className="text-sm text-gray-600 font-medium">Exchange Rate:</span>
            <div className={`text-sm font-semibold text-right ${
              provider.highlight ? 'text-green-600' : 'text-gray-800'
            }`}>
              {provider.exchangeRate.replace(' (', '\n(').split('\n').map((line: string, i: number) => (
                <div key={i} className={i === 1 ? 'text-xs text-gray-500 font-normal' : ''}>{line}</div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 font-medium">Transfer Fee:</span>
            <span className={`text-sm font-semibold ${
              provider.highlight ? 'text-green-600' : 'text-gray-800'
            }`}>
              {provider.transferFee}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 font-medium">You Receive:</span>
            <span className={`text-lg font-bold ${
              provider.highlight ? 'text-green-600' : 'text-gray-800'
            }`}>
              {provider.recipientGets}
            </span>
          </div>
          
          <div className="flex justify-between items-center pt-2 border-t border-gray-100">
            <span className="text-sm text-gray-600 font-medium">Transfer Time:</span>
            <span className={`text-sm font-semibold ${
              provider.highlight ? 'text-green-600' : 'text-gray-800'
            }`}>
              {provider.time}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderProvidersByCategory = (category: string) => {
    return comparison.providers
      .filter(provider => provider.category === category)
      .map((provider, index) => (
        <tr 
          key={index} 
          className={`border-b transition-all duration-200 ${
            provider.highlight 
              ? 'bg-gradient-to-r from-purple-50 to-green-50 border-2 border-purple-200 shadow-md transform scale-[1.02]' 
              : 'hover:bg-gray-50'
          }`}
        >
          <td className={`py-3 px-2 sm:py-4 sm:px-4 lg:px-6 relative text-sm sm:text-base ${
            provider.highlight ? 'font-bold text-purple-700' : 'font-medium'
          }`}>
            {provider.highlight && (
              <div className="absolute -left-1 top-0 bottom-0 w-1 atomx-gradient rounded-r"></div>
            )}
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <span className="whitespace-nowrap">{provider.name}</span>
              {provider.highlight && (
                <span className="bg-gradient-to-r from-purple-600 to-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full font-semibold whitespace-nowrap">
                  BEST
                </span>
              )}
            </div>
          </td>
          <td className={`py-3 px-2 sm:py-4 sm:px-4 lg:px-6 text-xs sm:text-sm lg:text-base whitespace-nowrap ${provider.highlight ? 'font-bold text-green-600' : 'text-gray-600'}`}>
            {provider.exchangeRate.replace(' (', '\n(').split('\n').map((line, i) => (
              <div key={i} className={i === 1 ? 'text-xs text-gray-500' : ''}>{line}</div>
            ))}
          </td>
          <td className={`py-3 px-2 sm:py-4 sm:px-4 lg:px-6 text-xs sm:text-sm lg:text-base whitespace-nowrap ${provider.highlight ? 'font-bold text-green-600' : 'text-gray-600'}`}>
            {provider.transferFee}
          </td>
          <td className={`py-3 px-2 sm:py-4 sm:px-4 lg:px-6 text-xs sm:text-sm lg:text-base whitespace-nowrap ${provider.highlight ? 'font-bold text-green-600' : 'text-gray-600'}`}>
            {provider.recipientGets}
          </td>
          <td className={`py-3 px-2 sm:py-4 sm:px-4 lg:px-6 text-xs sm:text-sm lg:text-base whitespace-nowrap ${provider.highlight ? 'font-bold text-green-600' : 'text-gray-600'}`}>
            {provider.time}
          </td>
        </tr>
      ));
  };

  return (
    <section id="comparison" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 px-4">{comparison.title}</h2>
          <h3 className="text-xl lg:text-2xl font-semibold mb-4 text-gray-700 px-4">{comparison.subtitle}</h3>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            {comparison.description}
          </p>
        </div>
        
        {/* Mobile Card Layout */}
        <div className="block lg:hidden space-y-6">
          {/* Traditional Banking */}
          <div>
            <h3 className="text-lg font-bold text-gray-700 mb-4 px-4">{comparison.categories.traditional}</h3>
            <div className="grid gap-4 px-4">
              {comparison.providers
                .filter(provider => provider.category === 'traditional')
                .map((provider, index) => renderProviderCard(provider, index))
              }
            </div>
          </div>
          
          {/* MSB */}
          <div>
            <h3 className="text-lg font-bold text-gray-700 mb-4 px-4">{comparison.categories.msb}</h3>
            <div className="grid gap-4 px-4">
              {comparison.providers
                .filter(provider => provider.category === 'msb')
                .map((provider, index) => renderProviderCard(provider, index))
              }
            </div>
          </div>
          
          {/* Blockchain */}
          <div>
            <h3 className="text-lg font-bold text-purple-700 mb-4 px-4">{comparison.categories.blockchain}</h3>
            <div className="grid gap-4 px-4">
              {comparison.providers
                .filter(provider => provider.category === 'blockchain')
                .map((provider, index) => renderProviderCard(provider, index))
              }
            </div>
          </div>
        </div>
        
        {/* Desktop Table Layout */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-2 sm:py-4 sm:px-4 lg:px-6 text-left font-semibold text-gray-800 text-sm sm:text-base">{comparison.tableHeaders.provider}</th>
                <th className="py-3 px-2 sm:py-4 sm:px-4 lg:px-6 text-left font-semibold text-gray-800 text-sm sm:text-base">Rate</th>
                <th className="py-3 px-2 sm:py-4 sm:px-4 lg:px-6 text-left font-semibold text-gray-800 text-sm sm:text-base">Fee</th>
                <th className="py-3 px-2 sm:py-4 sm:px-4 lg:px-6 text-left font-semibold text-gray-800 text-sm sm:text-base">You Get</th>
                <th className="py-3 px-2 sm:py-4 sm:px-4 lg:px-6 text-left font-semibold text-gray-800 text-sm sm:text-base">{comparison.tableHeaders.time}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b bg-gray-50">
                <td colSpan={5} className="py-2 px-2 sm:py-3 sm:px-4 lg:px-6 font-semibold text-gray-700 bg-gray-200 text-sm sm:text-base">
                  {comparison.categories.traditional}
                </td>
              </tr>
              {renderProvidersByCategory('traditional')}
              
              <tr className="border-b bg-gray-50">
                <td colSpan={5} className="py-2 px-2 sm:py-3 sm:px-4 lg:px-6 font-semibold text-gray-700 bg-gray-200 text-sm sm:text-base">
                  {comparison.categories.msb}
                </td>
              </tr>
              {renderProvidersByCategory('msb')}
              
              <tr className="border-b bg-purple-50">
                <td colSpan={5} className="py-2 px-2 sm:py-3 sm:px-4 lg:px-6 font-semibold text-purple-700 bg-purple-100 text-sm sm:text-base">
                  {comparison.categories.blockchain}
                </td>
              </tr>
              {renderProvidersByCategory('blockchain')}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;

