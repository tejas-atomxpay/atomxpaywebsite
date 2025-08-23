import React from 'react';
import content from '../../data/content.json';

const ComparisonSection: React.FC = () => {
  const { comparison } = content;

  const renderProvidersByCategory = (category: string) => {
    return comparison.providers
      .filter(provider => provider.category === category)
      .map((provider, index) => (
        <tr 
          key={index} 
          className={`border-b ${provider.highlight ? 'bg-purple-50 border-2 border-purple-200' : ''}`}
        >
          <td className={`py-4 px-6 ${provider.highlight ? 'font-bold text-purple-700' : 'font-medium'}`}>
            {provider.name}
          </td>
          <td className={`py-4 px-6 ${provider.highlight ? 'font-bold text-green-600' : 'text-gray-600'}`}>
            {provider.exchangeRate}
          </td>
          <td className={`py-4 px-6 ${provider.highlight ? 'font-bold text-green-600' : 'text-gray-600'}`}>
            {provider.transferFee}
          </td>
          <td className={`py-4 px-6 ${provider.highlight ? 'font-bold text-green-600' : 'text-gray-600'}`}>
            {provider.recipientGets}
          </td>
          <td className={`py-4 px-6 ${provider.highlight ? 'font-bold text-green-600' : 'text-gray-600'}`}>
            {provider.time}
          </td>
        </tr>
      ));
  };

  return (
    <section id="comparison" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{comparison.title}</h2>
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">{comparison.subtitle}</h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {comparison.description}
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-4 px-6 text-left font-semibold text-gray-800">{comparison.tableHeaders.provider}</th>
                <th className="py-4 px-6 text-left font-semibold text-gray-800">{comparison.tableHeaders.exchangeRate}</th>
                <th className="py-4 px-6 text-left font-semibold text-gray-800">{comparison.tableHeaders.transferFee}</th>
                <th className="py-4 px-6 text-left font-semibold text-gray-800">{comparison.tableHeaders.recipientGets}</th>
                <th className="py-4 px-6 text-left font-semibold text-gray-800">{comparison.tableHeaders.time}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b bg-gray-50">
                <td colSpan={5} className="py-3 px-6 font-semibold text-gray-700 bg-gray-200">
                  {comparison.categories.traditional}
                </td>
              </tr>
              {renderProvidersByCategory('traditional')}
              
              <tr className="border-b bg-gray-50">
                <td colSpan={5} className="py-3 px-6 font-semibold text-gray-700 bg-gray-200">
                  {comparison.categories.msb}
                </td>
              </tr>
              {renderProvidersByCategory('msb')}
              
              <tr className="border-b bg-purple-50">
                <td colSpan={5} className="py-3 px-6 font-semibold text-purple-700 bg-purple-100">
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

