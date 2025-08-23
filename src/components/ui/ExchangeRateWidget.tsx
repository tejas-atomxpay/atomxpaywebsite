import React from 'react';
import { RefreshCw } from 'lucide-react';
import { ExchangeRateWidgetProps } from '../../types';
import content from '../../data/content.json';

const ExchangeRateWidget: React.FC<ExchangeRateWidgetProps> = ({ 
  usdAmount, 
  setUsdAmount, 
  exchangeRate, 
  isLoading, 
  lastUpdated 
}) => {
  const { calculator } = content;
  const inrAmount = usdAmount * exchangeRate;
  const transferFee = calculator.values.flatFee;
  const totalCost = usdAmount + transferFee;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = parseFloat(e.target.value) || 0;
    setUsdAmount(value);
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">{calculator.title}</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{calculator.labels.youSend}</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">$</span>
            <input
              type="number"
              value={usdAmount || ''}
              onChange={handleAmountChange}
              className="w-full pl-8 pr-16 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg font-semibold text-gray-800"
              placeholder="1000"
              min="0"
              step="0.01"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">{calculator.currencies.usd}</span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{calculator.labels.theyReceive}</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">₹</span>
            <input
              type="text"
              value={inrAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
              readOnly
              className="w-full pl-8 pr-16 py-3 border border-gray-300 rounded-lg bg-green-50 text-lg font-semibold text-green-600"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">{calculator.currencies.inr}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 space-y-3 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">{calculator.labels.liveGoogleRate}</span>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-800">1 USD = ₹{exchangeRate.toFixed(2)}</span>
            {isLoading && <RefreshCw className="w-4 h-4 animate-spin text-blue-500" />}
          </div>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">{calculator.labels.flatFee}</span>
          <span className="font-semibold text-green-600">${transferFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">{calculator.labels.transferTime}</span>
          <span className="font-semibold text-green-600">{calculator.values.transferTime}</span>
        </div>
        <div className="border-t pt-3 flex justify-between">
          <span className="font-semibold text-gray-800">{calculator.labels.totalCost}</span>
          <span className="font-bold text-lg text-gray-800">${totalCost.toFixed(2)}</span>
        </div>
        <div className="text-center">
          <span className="text-xs text-green-600 font-semibold">{calculator.values.zeroFeePromo}</span>
        </div>
        {lastUpdated && (
          <div className="text-xs text-gray-500 text-center mt-2">
            Rates updated: {new Date(lastUpdated).toLocaleString()}
          </div>
        )}
      </div>
      
      <button className="w-full atomx-accent text-white py-4 rounded-lg text-lg font-semibold mt-6 hover:opacity-90 transition-opacity" type="button">
        {calculator.button}
      </button>
    </div>
  );
};

export default ExchangeRateWidget;

