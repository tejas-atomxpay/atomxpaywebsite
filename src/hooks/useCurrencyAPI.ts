import { useState, useEffect } from 'react';

interface ExchangeRateData {
  result: string;
  base_code: string;
  rates: {
    [key: string]: number;
  };
  time_last_update_utc: string;
}

interface UseCurrencyAPIReturn {
  exchangeRate: number;
  isLoading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

export const useCurrencyAPI = (fromCurrency: string = 'USD', toCurrency: string = 'INR'): UseCurrencyAPIReturn => {
  const [exchangeRate, setExchangeRate] = useState<number>(83.25); // Default fallback rate
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Using the free ExchangeRate-API endpoint
        const response = await fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ExchangeRateData = await response.json();

        if (data.result === 'success' && data.rates[toCurrency]) {
          setExchangeRate(data.rates[toCurrency]);
          setLastUpdated(data.time_last_update_utc);
        } else {
          throw new Error('Invalid response format or currency not found');
        }
      } catch (err) {
        console.error('Error fetching exchange rate:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch exchange rate');
        // Keep the default rate on error
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch immediately
    fetchExchangeRate();

    // Set up interval to fetch every hour (API updates once per day, but we check hourly)
    const interval = setInterval(fetchExchangeRate, 60 * 60 * 1000); // 1 hour

    return () => clearInterval(interval);
  }, [fromCurrency, toCurrency]);

  return {
    exchangeRate,
    isLoading,
    error,
    lastUpdated
  };
};

