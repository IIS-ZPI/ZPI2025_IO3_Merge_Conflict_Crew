import React, { useState } from 'react';
import { useNbpApi } from '../services/nbpApi.jsx';

const NbpApiTester = () => {
  const { data, loading, error, fetchRates } = useNbpApi();

  const [currency, setCurrency] = useState('USD');
  const [startDate, setStartDate] = useState('2023-01-01');
  const [endDate, setEndDate] = useState('2023-12-31');

  const handleFetch = () => {
    fetchRates(currency, startDate, endDate).catch(() => { });
  };

  return (
    <div className="section-box mt-6">
      <div className="flex items-center gap-2 mb-4">
        <i className="material-icons text-accent-blue text-[1.5rem]">swap_horiz</i>
        <h2 className="text-[1.1rem] font-semibold text-text-main m-0">Test Połączenia z API NBP</h2>
      </div>

      <div className="flex flex-wrap gap-4 mb-6 items-end">
        <div className="flex flex-col">
          <label className="text-[0.75rem] font-semibold text-text-muted uppercase tracking-[1.5px] mb-[8px]">
            Waluta
          </label>
          <select
            className="bg-card-inner border border-border text-text-main p-2 rounded-lg focus:border-accent-blue focus:ring-1 focus:ring-accent-blue outline-none h-11 min-w-[150px] transition-colors"
            value={currency}
            onChange={e => setCurrency(e.target.value)}
          >
            <option value="USD">Dolar am. (USD)</option>
            <option value="EUR">Euro (EUR)</option>
            <option value="GBP">Funt bryt. (GBP)</option>
            <option value="CHF">Frank szw. (CHF)</option>
            <option value="JPY">Jen jap. (JPY)</option>
            <option value="CZK">Korona czes. (CZK)</option>
            <option value="NOK">Korona nor. (NOK)</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-[0.75rem] font-semibold text-text-muted uppercase tracking-[1.5px] mb-[8px]">
            Data od
          </label>
          <input
            type="date"
            className="bg-card-inner border border-border text-text-main p-2 rounded-lg focus:border-accent-blue focus:ring-1 focus:ring-accent-blue outline-none h-11 transition-colors"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-[0.75rem] font-semibold text-text-muted uppercase tracking-[1.5px] mb-[8px]">
            Data do
          </label>
          <input
            type="date"
            className="bg-card-inner border border-border text-text-main p-2 rounded-lg focus:border-accent-blue focus:ring-1 focus:ring-accent-blue outline-none h-11 transition-colors"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
          />
        </div>

        <button
          onClick={handleFetch}
          disabled={loading}
          className="btn-custom px-6 h-11 disabled:opacity-50 min-w-[120px]"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
              Pobieranie...
            </span>
          ) : (
            'Pobierz Kursy'
          )}
        </button>
      </div>

      {error && (
        <div className="text-status-red bg-status-red/10 border border-status-red/20 p-3 rounded-lg mb-4 text-sm flex items-center gap-2">
          <i className="material-icons text-[1.2rem]">error_outline</i>
          <span>Błąd: {error}</span>
        </div>
      )}

      {data && (
        <div className="mt-4 animate-fadeIn">
          <p className="mb-3 text-text-muted text-sm">
            Status: Znaleziono <span className="font-bold text-accent-blue">{data.rates.length}</span> notowań dla waluty <span className="text-text-main font-semibold">{data.currency}</span> ({data.code}).
          </p>
          <div className="max-h-64 overflow-y-auto border border-border rounded-lg bg-card-inner p-2 custom-scrollbar">
            {data.rates.length === 0 ? (
              <div className="text-text-muted p-4 text-center text-sm">Brak danych dla wybranego przedziału w API NBP.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 p-1">
                {data.rates.map((rate, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center bg-card-bg border border-border/60 py-2 px-3 text-xs rounded hover:border-accent-blue/50 transition-colors"
                  >
                    <span className="text-text-muted font-medium">{rate.effectiveDate}</span>
                    <span className="font-mono font-bold text-status-green">{rate.mid.toFixed(4)} PLN</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NbpApiTester;
