import { useState, useEffect, useCallback, useRef } from 'react';

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

// Rate limiting and retry configuration
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;
const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY_BASE = 1000; // 1 second
const REQUEST_TIMEOUT = 10000; // 10 seconds

// Global rate limiting storage
const rateLimitStorage = {
  requests: [] as number[],
  isRateLimited: false
};

export const useCurrencyAPI = (fromCurrency: string = 'USD', toCurrency: string = 'INR'): UseCurrencyAPIReturn => {
  const [exchangeRate, setExchangeRate] = useState<number>(83.25); // Default fallback rate
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Rate limiting check
  const isRateLimited = useCallback(() => {
    const now = Date.now();
    // Clean old requests outside the window
    rateLimitStorage.requests = rateLimitStorage.requests.filter(
      (timestamp) => now - timestamp < RATE_LIMIT_WINDOW
    );
    
    return rateLimitStorage.requests.length >= MAX_REQUESTS_PER_WINDOW;
  }, []);

  // Record API request
  const recordRequest = useCallback(() => {
    rateLimitStorage.requests.push(Date.now());
  }, []);

  // Exponential backoff delay
  const getRetryDelay = useCallback((attempt: number) => {
    return RETRY_DELAY_BASE * Math.pow(2, attempt) + Math.random() * 1000;
  }, []);

  // Enhanced fetch with timeout and abort support
  const fetchWithTimeout = useCallback(async (url: string, options: RequestInit = {}) => {
    const controller = new AbortController();
    abortControllerRef.current = controller;
    
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }, []);

  // Main fetch function with retry logic
  const fetchExchangeRateWithRetry = useCallback(async (attempt: number = 0): Promise<void> => {
    if (isRateLimited()) {
      setError('Rate limit exceeded. Please try again later.');
      setIsLoading(false);
      return;
    }

    try {
      recordRequest();
      
      // Using the free ExchangeRate-API endpoint
      const response = await fetchWithTimeout(`https://open.er-api.com/v6/latest/${fromCurrency}`);
      
      if (!response.ok) {
        if (response.status === 429 && attempt < MAX_RETRY_ATTEMPTS) {
          // Rate limited by API, retry with backoff
          const delay = getRetryDelay(attempt);
          retryTimeoutRef.current = setTimeout(() => {
            fetchExchangeRateWithRetry(attempt + 1);
          }, delay);
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ExchangeRateData = await response.json();

      if (data.result === 'success' && data.rates[toCurrency]) {
        setExchangeRate(data.rates[toCurrency]);
        setLastUpdated(data.time_last_update_utc);
        setError(null);
      } else {
        throw new Error('Invalid response format or currency not found');
      }
    } catch (err) {
      console.error(`Error fetching exchange rate (attempt ${attempt + 1}):`, err);
      
      if (err instanceof Error && err.name === 'AbortError') {
        // Request was aborted, don't retry
        return;
      }
      
      if (attempt < MAX_RETRY_ATTEMPTS) {
        // Retry with exponential backoff
        const delay = getRetryDelay(attempt);
        retryTimeoutRef.current = setTimeout(() => {
          fetchExchangeRateWithRetry(attempt + 1);
        }, delay);
      } else {
        // Max retries reached, set error
        setError(err instanceof Error ? err.message : 'Failed to fetch exchange rate after multiple attempts');
        setIsLoading(false);
      }
    }
  }, [fromCurrency, toCurrency, isRateLimited, recordRequest, getRetryDelay, fetchWithTimeout]);

  const fetchExchangeRate = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    await fetchExchangeRateWithRetry(0);
    setIsLoading(false);
  }, [fetchExchangeRateWithRetry]);

  useEffect(() => {

    // Fetch immediately
    fetchExchangeRate();

    // Set up interval to fetch every hour (API updates once per day, but we check hourly)
    const interval = setInterval(fetchExchangeRate, 60 * 60 * 1000); // 1 hour

    return () => {
      clearInterval(interval);
      // Cleanup: abort ongoing requests and clear timeouts
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, [fetchExchangeRate]);

  return {
    exchangeRate,
    isLoading,
    error,
    lastUpdated
  };
};

