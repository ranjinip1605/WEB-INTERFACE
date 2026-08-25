import { useState, useEffect } from 'react';
import { DEFAULT_CURRENCY_RATES } from '../data/defaultRates';

export function useCurrencyRates() {
  const [rates, setRates] = useState(DEFAULT_CURRENCY_RATES);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchRates() {
      try {
        setLoading(true);
        const res = await fetch('https://open.er-api.com/v6/latest/USD');
        if (!res.ok) throw new Error('Failed to fetch exchange rates');
        const data = await res.json();
        
        if (data && data.rates && isMounted) {
          setRates(data.rates);
          setIsLive(true);
          setLastUpdated(data.time_last_update_utc || new Date().toLocaleTimeString());
        }
      } catch (err) {
        console.warn('Currency fetch failed, using offline default rates:', err.message);
        if (isMounted) {
          setIsLive(false);
          setLastUpdated('Offline (Using saved rates)');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchRates();

    return () => {
      isMounted = false;
    };
  }, []);

  return { rates, loading, isLive, lastUpdated };
}
