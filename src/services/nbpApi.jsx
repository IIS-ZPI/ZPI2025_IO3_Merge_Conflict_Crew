import { useState, useCallback } from 'react';

const BASE_URL = 'https://api.nbp.pl/api';

const chunkDateRange = (startDate, endDate) => {
  const chunks = [];
  let currentStart = new Date(startDate);

  while (currentStart <= endDate) {
    let currentEnd = new Date(currentStart);
    currentEnd.setDate(currentEnd.getDate() + 92);

    if (currentEnd > endDate) {
      currentEnd = new Date(endDate);
    }

    chunks.push({
      start: currentStart.toISOString().split('T')[0],
      end: currentEnd.toISOString().split('T')[0],
    });

    currentStart = new Date(currentEnd);
    currentStart.setDate(currentStart.getDate() + 1);
  }

  return chunks;
};

export const fetchCurrencyRates = async (
  currencyCode,
  startDate,
  endDate,
  table = 'A'
) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (start > end) {
    throw new Error('Data początkowa musi być wcześniejsza lub równa dacie końcowej');
  }

  const chunks = chunkDateRange(start, end);
  const code = currencyCode.toUpperCase();

  try {
    const promises = chunks.map(chunk =>
      fetch(`${BASE_URL}/exchangerates/rates/${table}/${code}/${chunk.start}/${chunk.end}/?format=json`)
        .then(async (response) => {
          if (!response.ok) {
            if (response.status === 404) {
              return { rates: [] };
            }
            throw new Error(`Błąd pobierania danych dla przedziału ${chunk.start} - ${chunk.end}: ${response.statusText}`);
          }
          return response.json();
        })
    );

    const results = await Promise.all(promises);

    const combinedRates = results.flatMap(result => result.rates || []);

    const uniqueRates = Array.from(
      new Map(combinedRates.map(rate => [rate.effectiveDate, rate])).values()
    );

    uniqueRates.sort((a, b) => new Date(a.effectiveDate) - new Date(b.effectiveDate));

    const validResult = results.find(r => r.currency && r.code);

    return {
      table,
      currency: validResult ? validResult.currency : null,
      code,
      rates: uniqueRates,
    };
  } catch (error) {
    console.error('Błąd pobierania danych z NBP:', error);
    throw error;
  }
};

export const fetchAvailableCurrencies = async (table = 'A') => {
  try {
    const response = await fetch(`${BASE_URL}/exchangerates/tables/${table}/?format=json`);
    if (!response.ok) {
      throw new Error(`Błąd pobierania dostępnych walut z tabeli ${table}: ${response.statusText}`);
    }
    const data = await response.json();
    return data[0].rates.map(rate => ({
      currency: rate.currency,
      code: rate.code
    }));
  } catch (error) {
    console.error('Błąd pobierania walut z NBP:', error);
    throw error;
  }
};

export const useNbpApi = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRates = useCallback(async (currencyCode, startDate, endDate, table = 'A') => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchCurrencyRates(currencyCode, startDate, endDate, table);
      setData(result);
      return result;
    } catch (err) {
      setError(err.message || 'Nie udało się pobrać danych z API NBP');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    data,
    loading,
    error,
    fetchRates
  };
};
