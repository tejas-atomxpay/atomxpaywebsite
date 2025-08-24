import React, { createContext, useContext, useState } from 'react';
import { CurrencyPair } from '../types';
import content from '../data/content.json';

interface CurrencyContextType {
  currentPair: CurrencyPair;
  setCurrentPair: (pair: CurrencyPair) => void;
  fromAmount: number;
  setFromAmount: (amount: number) => void;
  exchangeRate: number;
  setExchangeRate: (rate: number) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPair, setCurrentPair] = useState<CurrencyPair>(content.calculator.supportedPairs[0]);
  const [fromAmount, setFromAmount] = useState<number>(
    content.calculator.supportedPairs[0].from === 'INR' ? 100000 : 1000
  );
  const [exchangeRate, setExchangeRate] = useState<number>(0.0120); // Default INR to USD rate

  return (
    <CurrencyContext.Provider
      value={{
        currentPair,
        setCurrentPair,
        fromAmount,
        setFromAmount,
        exchangeRate,
        setExchangeRate,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};