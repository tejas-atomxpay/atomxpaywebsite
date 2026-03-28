import React, { useState } from 'react';
import { RefreshCw, AlertCircle, ChevronDown } from 'lucide-react';
import { ExchangeRateWidgetProps } from '../../types';
import content from '../../data/content.json';

const ExchangeRateWidget: React.FC<ExchangeRateWidgetProps> = ({ 
  fromAmount, 
  setFromAmount, 
  exchangeRate, 
  isLoading, 
  lastUpdated,
  currentPair,
  onPairChange
}) => {
  const { calculator } = content;
  const [inputError, setInputError] = useState<string>('');
  
  // Use the first supported pair as default if none provided
  const activePair = currentPair || calculator.supportedPairs[0];
  
  const toAmount = fromAmount * exchangeRate;
  // Use different flat fees based on source currency
  const getFlatFee = (currency: string) => {
    switch (currency) {
      case 'USD': return calculator.values.flatFeeUSD;
      case 'INR': return calculator.values.flatFeeINR;
      case 'EUR': return calculator.values.flatFeeEUR;
      case 'GBP': return calculator.values.flatFeeGBP;
      case 'AED': return calculator.values.flatFeeAED;
      default: return calculator.values.flatFee;
    }
  };
  const transferFee = getFlatFee(activePair.from);
  // Calculate total cost - fee is already in the correct currency
  const totalCost = fromAmount + transferFee;
  

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = parseFloat(e.target.value) || 0;
    
    // Input validation
    if (value < 0) {
      setInputError('Amount cannot be negative');
      return;
    }
    if (value > 1000000) {
      setInputError(`Amount cannot exceed ${activePair.fromSymbol}1,000,000`);
      return;
    }
    
    setInputError('');
    setFromAmount(value);
  };


  return (
    <div className="bg-white rounded-xl p-5 shadow-xl max-w-md w-full glass-morphism hover-lift relative overflow-hidden group">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 atomx-gradient-trust opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
      <div className="relative z-10">
        <h3 className="text-lg font-bold text-gray-800 mb-3 text-center font-technical">{calculator.title}</h3>
        
        {/* Currency Pair Selector */}
        {onPairChange && calculator.supportedPairs.length > 1 && (
          <div className="mb-2.5">
            <label className="block text-[10px] font-medium text-gray-700 mb-0.5 uppercase tracking-wider">Select Currency Pair</label>
            <div className="relative">
              <select
                value={`${activePair.from}_${activePair.to}`}
                onChange={(e) => {
                  const [from, to] = e.target.value.split('_');
                  const selectedPair = calculator.supportedPairs.find(
                    pair => pair.from === from && pair.to === to
                  );
                  if (selectedPair && onPairChange) {
                    onPairChange(selectedPair);
                  }
                }}
                className="w-full pl-2.5 pr-8 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm font-medium text-gray-800 bg-white appearance-none"
              >
                {calculator.supportedPairs.map((pair) => (
                  <option key={`${pair.from}_${pair.to}`} value={`${pair.from}_${pair.to}`}>
                    {pair.from} ({pair.fromSymbol}) → {pair.to} ({pair.toSymbol})
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>
        )}
      
      <div className="space-y-2.5">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-[10px] font-medium text-gray-700 uppercase tracking-wider">{calculator.labels.youSend}</label>
          </div>
          <div className="relative">
            <span className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold text-sm">{activePair.fromSymbol}</span>
            <input
              type="number"
              value={fromAmount || ''}
              onChange={handleAmountChange}
              className={`w-full pl-6 pr-12 py-2 border rounded-md focus:ring-2 focus:border-transparent text-sm font-semibold text-gray-800 ${
                inputError ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-purple-500'
              }`}
              placeholder={activePair.from === 'INR' ? '100000' : '1000'}
              min="0"
              step="0.01"
            />
            <span className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium text-[10px]">{activePair.from}</span>
          </div>
          {inputError && (
            <div className="flex items-center gap-1 mt-0.5 text-red-600 text-[10px]">
              <AlertCircle className="w-3 h-3" />
              <span>{inputError}</span>
            </div>
          )}
        </div>
        
        <div className="relative">
          <label className="block text-[10px] font-medium text-gray-700 mb-1 uppercase tracking-wider">{calculator.labels.theyReceive}</label>
          <div className="relative">
            <span className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold text-sm">{activePair.toSymbol}</span>
            <input
              type="text"
              value={toAmount.toLocaleString(activePair.to === 'INR' ? 'en-IN' : 'en-US', { maximumFractionDigits: 2 })}
              readOnly
              className="w-full pl-6 pr-12 py-2 border border-gray-300 rounded-md bg-green-50 text-sm font-semibold text-green-600"
            />
            {isLoading && (
              <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-md">
                <RefreshCw className="w-4 h-4 animate-spin text-purple-500" />
              </div>
            )}
            <span className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium text-[10px]">{activePair.to}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-3 space-y-1.5 text-xs">
        <div className="flex justify-between items-center bg-gradient-to-r from-green-50 to-blue-50 p-2 rounded-md border border-green-100">
          <span className="text-green-700 font-semibold text-[10px] uppercase tracking-wider">{calculator.labels.liveGoogleRate}</span>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-green-800 text-xs">1 {activePair.from} = {activePair.toSymbol}{exchangeRate.toFixed(4)}</span>
            {isLoading && <RefreshCw className="w-3.5 h-3.5 animate-spin text-green-500" />}
          </div>
        </div>
        <div className="flex justify-between px-1">
          <span className="text-gray-600">{calculator.labels.flatFee}</span>
          <span className="font-semibold text-green-600">
            {activePair.fromSymbol}{transferFee.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between px-1">
          <span className="text-gray-600">{calculator.labels.transferTime}</span>
          <span className="font-semibold text-green-600">{calculator.values.transferTime}</span>
        </div>
        <div className="border-t pt-1.5 px-1 flex justify-between">
          <span className="font-semibold text-gray-800">{calculator.labels.totalCost}</span>
          <span className="font-bold text-sm text-gray-800">
            {activePair.from === 'USD' 
              ? `$${totalCost.toFixed(2)}` 
              : `${activePair.fromSymbol}${totalCost.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`
            }
          </span>
        </div>
        <div className="text-center">
          <span className="text-[10px] text-green-600 font-bold italic">{calculator.values.zeroFeePromo}</span>
        </div>
      </div>
      
        {inputError || fromAmount <= 0 ? (
          <button 
            className="w-full py-2.5 rounded-md text-sm font-semibold mt-3 transition-all font-technical bg-gray-300 text-gray-500 cursor-not-allowed"
            type="button"
            disabled
          >
            <span className="relative z-10">{calculator.button}</span>
          </button>
        ) : (
          <a 
            href={`mailto:contactus@atomxpay.com?subject=Start Transfer - ${activePair.fromSymbol}${fromAmount} to ${activePair.to}&body=Hello AtomX Pay team,%0D%0A%0D%0AI would like to start a money transfer:%0D%0A%0D%0AAmount: ${activePair.fromSymbol}${fromAmount}%0D%0AFrom: ${activePair.from}%0D%0ATo: ${activePair.to}%0D%0ARecipient will receive: ${activePair.toSymbol}${toAmount.toLocaleString()}%0D%0ATransfer fee: ${activePair.fromSymbol}${transferFee}%0D%0A%0D%0APlease help me complete this transfer.%0D%0A%0D%0AThank you!`}
            className="w-full py-2.5 rounded-md text-sm font-semibold mt-3 transition-all font-technical btn-gooey relative overflow-hidden group atomx-gradient-accent text-white hover-lift inline-block text-center no-underline cursor-pointer"
            style={{filter: 'url(#atomx-glow)'}}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2 relative z-10">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Calculating...</span>
              </div>
            ) : (
              <span className="relative z-10">{calculator.button}</span>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </a>
        )}
        
        {lastUpdated && (
          <div className="text-[9px] text-gray-400 text-center mt-2">
            Rates updated: {new Date(lastUpdated).toLocaleString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExchangeRateWidget;

