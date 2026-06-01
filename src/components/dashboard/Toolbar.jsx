import React, { useState } from 'react';

const Toolbar = ({ onGenerate, loading }) => {
  const [baseCurrency, setBaseCurrency] = useState('EUR');
  const [quoteCurrency, setQuoteCurrency] = useState('USD');
  const [timeframe, setTimeframe] = useState('1W');

  const handleGenerate = () => {
    if (onGenerate) {
      onGenerate(baseCurrency, quoteCurrency, timeframe);
    }
  };

  return (
    <div className="bg-card-bg p-6 pb-2 rounded-xl shadow-[0_8px_16px_rgba(0,0,0,0.2)] mt-[30px] border border-border">
      <div className="flex flex-wrap -mx-3">
        <div className="w-full md:w-1/4 px-3 mb-4">
          <label className="block text-text-muted text-sm mb-1">Base Currency (A)</label>
          <select 
            value={baseCurrency}
            onChange={(e) => setBaseCurrency(e.target.value)}
            className="w-full bg-transparent border-b border-border text-text-main font-sans py-2 focus:outline-none focus:border-accent-blue"
          >
            <option value="USD" className="bg-card-inner text-text-main">US Dollar (USD)</option>
            <option value="EUR" className="bg-card-inner text-text-main">Euro (EUR)</option>
            <option value="GBP" className="bg-card-inner text-text-main">British Pound (GBP)</option>
            <option value="CHF" className="bg-card-inner text-text-main">Swiss Franc (CHF)</option>
            <option value="JPY" className="bg-card-inner text-text-main">Japanese Yen (JPY)</option>
            <option value="CZK" className="bg-card-inner text-text-main">Czech Koruna (CZK)</option>
            <option value="NOK" className="bg-card-inner text-text-main">Norwegian Krone (NOK)</option>
          </select>
        </div>
        <div className="w-full md:w-1/4 px-3 mb-4">
          <label className="block text-text-muted text-sm mb-1">Quote Currency (B)</label>
          <select 
            value={quoteCurrency}
            onChange={(e) => setQuoteCurrency(e.target.value)}
            className="w-full bg-transparent border-b border-border text-text-main font-sans py-2 focus:outline-none focus:border-accent-blue"
          >
            <option value="USD" className="bg-card-inner text-text-main">US Dollar (USD)</option>
            <option value="EUR" className="bg-card-inner text-text-main">Euro (EUR)</option>
            <option value="GBP" className="bg-card-inner text-text-main">British Pound (GBP)</option>
            <option value="CHF" className="bg-card-inner text-text-main">Swiss Franc (CHF)</option>
            <option value="JPY" className="bg-card-inner text-text-main">Japanese Yen (JPY)</option>
            <option value="CZK" className="bg-card-inner text-text-main">Czech Koruna (CZK)</option>
            <option value="NOK" className="bg-card-inner text-text-main">Norwegian Krone (NOK)</option>
          </select>
        </div>
        <div className="w-full md:w-1/4 px-3 mb-4">
          <label className="block text-text-muted text-sm mb-1">Timeframe</label>
          <select 
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="w-full bg-transparent border-b border-border text-text-main font-sans py-2 focus:outline-none focus:border-accent-blue"
          >
            <option value="1W" className="bg-card-inner text-text-main">1 Week</option>
            <option value="2W" className="bg-card-inner text-text-main">2 Weeks</option>
            <option value="1M" className="bg-card-inner text-text-main">1 Month</option>
            <option value="1Q" className="bg-card-inner text-text-main">1 Quarter</option>
            <option value="6M" className="bg-card-inner text-text-main">6 Months</option>
            <option value="1Y" className="bg-card-inner text-text-main">1 Year</option>
          </select>
        </div>
        <div className="w-full md:w-1/4 px-3 mb-4 flex items-end">
          <button 
            onClick={handleGenerate} 
            disabled={loading}
            className="btn-custom w-full disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Generate Analysis'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
