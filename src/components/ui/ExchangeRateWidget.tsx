import React, { useState } from 'react';
import { RefreshCw, AlertCircle } from 'lucide-react';
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
  const [inputError, setInputError] = useState<string>('');
  const inrAmount = usdAmount * exchangeRate;
  const transferFee = calculator.values.flatFee;
  const totalCost = usdAmount + transferFee;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = parseFloat(e.target.value) || 0;
    
    // Input validation
    if (value < 0) {
      setInputError('Amount cannot be negative');
      return;
    }
    if (value > 100000) {
      setInputError('Amount cannot exceed $10,000');
      return;
    }
    
    setInputError('');
    setUsdAmount(value);
  };


  return (
    <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-sm w-full glass-morphism hover-lift relative overflow-hidden group">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 atomx-gradient-trust opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center font-technical">{calculator.title}</h3>
      
        {/* Quick Amount Buttons with Enhanced Effects */}
        {/* <div className="flex gap-2 mb-6">
          {[500, 1000, 2000, 5000].map((amount) => (
            <button
              key={amount}
              onClick={() => handleQuickAmount(amount)}
              className={`flex-1 py-2 px-3 text-sm rounded-lg border transition-all duration-300 font-technical hover-lift ${
                usdAmount === amount 
                  ? 'bg-purple-100 border-purple-300 text-purple-700 pulse-trust' 
                  : 'border-gray-300 hover:border-purple-300 hover:bg-purple-50 glass-morphism-dark'
              }`}
              type="button"
            >
              ${amount.toLocaleString()}
            </button>
          ))}
        </div> */}
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{calculator.labels.youSend}</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">$</span>
            <input
              type="number"
              value={usdAmount || ''}
              onChange={handleAmountChange}
              className={`w-full pl-8 pr-16 py-2.5 border rounded-lg focus:ring-2 focus:border-transparent text-base font-semibold text-gray-800 ${
                inputError ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-purple-500'
              }`}
              placeholder="1000"
              min="0"
              step="0.01"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">{calculator.currencies.usd}</span>
          </div>
          {inputError && (
            <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{inputError}</span>
            </div>
          )}
        </div>
        
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">{calculator.labels.theyReceive}</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">₹</span>
            <input
              type="text"
              value={inrAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
              readOnly
              className="w-full pl-8 pr-16 py-2.5 border border-gray-300 rounded-lg bg-green-50 text-base font-semibold text-green-600"
            />
            {isLoading && (
              <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
                <RefreshCw className="w-5 h-5 animate-spin text-purple-500" />
              </div>
            )}
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">{calculator.currencies.inr}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between items-center bg-gradient-to-r from-green-50 to-blue-50 p-3 rounded-lg border border-green-200">
          <span className="text-green-700 font-semibold">{calculator.labels.liveGoogleRate}</span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-green-800 text-base">1 USD = ₹{exchangeRate.toFixed(2)}</span>
            {isLoading && <RefreshCw className="w-4 h-4 animate-spin text-green-500" />}
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
      
        <button 
          className={`w-full py-3 rounded-lg text-base font-semibold mt-4 transition-all font-technical btn-gooey relative overflow-hidden group ${
            inputError || usdAmount <= 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'atomx-gradient-accent text-white hover-lift'
          }`} 
          type="button"
          disabled={inputError !== '' || usdAmount <= 0}
          style={inputError || usdAmount <= 0 ? {} : {filter: 'url(#atomx-glow)'}}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2 relative z-10">
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>Calculating...</span>
            </div>
          ) : (
            <span className="relative z-10">{calculator.button}</span>
          )}
          {!inputError && usdAmount > 0 && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          )}
        </button>
      </div>
    </div>
  );
};

export default ExchangeRateWidget;

