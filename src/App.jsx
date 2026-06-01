import { useState } from 'react';
import MainLayout from './components/layout/MainLayout';
import Toolbar from './components/dashboard/Toolbar';
import SessionSummary from './components/dashboard/SessionSummary';
import StatisticalMeasures from './components/dashboard/StatisticalMeasures';
import DistributionAnalysis from './components/dashboard/DistributionAnalysis';
import NbpApiTester from './components/NbpApiTester';
import ExportModal from './components/dashboard/ExportModal';
import { fetchCurrencyRates } from './services/nbpApi';
import { getDateRange } from './utils/dates';
import { calculateCrossRates } from './utils/calculations';

function App() {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeBaseCurrency, setActiveBaseCurrency] = useState('EUR');
  const [activeQuoteCurrency, setActiveQuoteCurrency] = useState('USD');
  const [activeTimeframe, setActiveTimeframe] = useState('1W');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const handleGenerate = async (baseCurrency, quoteCurrency, timeframe) => {
    setLoading(true);
    setError(null);
    setActiveBaseCurrency(baseCurrency);
    setActiveQuoteCurrency(quoteCurrency);
    setActiveTimeframe(timeframe);
    const { startDate, endDate } = getDateRange(timeframe);

    try {
      if (baseCurrency === quoteCurrency) {
        // Just fetch one and set rates to 1? Not super useful, but let's handle it
        const baseData = await fetchCurrencyRates(baseCurrency, startDate, endDate);
        setRates(baseData.rates.map(r => ({ effectiveDate: r.effectiveDate, mid: 1 })));
      } else {
        const baseData = await fetchCurrencyRates(baseCurrency, startDate, endDate);
        const quoteData = await fetchCurrencyRates(quoteCurrency, startDate, endDate);
        const crossRates = calculateCrossRates(baseData, quoteData);
        setRates(crossRates);
      }
    } catch (err) {
      console.error(err);
      setError('Błąd pobierania danych');
      setRates([]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <MainLayout>
      <Toolbar onGenerate={handleGenerate} loading={loading} />
      
      {error && (
        <div className="text-status-red bg-status-red/10 border border-status-red/20 p-3 rounded-lg mt-4 text-sm flex items-center gap-2">
          <i className="material-icons text-[1.2rem]">error_outline</i>
          <span>{error}</span>
        </div>
      )}

      <div className="flex flex-wrap -mx-3 mt-4 items-stretch">
        <div className="w-full xl:w-5/12 px-3 flex flex-col mb-4 xl:mb-0">
          <SessionSummary rates={rates} />
        </div>
        <div className="w-full xl:w-7/12 px-3 flex flex-col">
          <StatisticalMeasures rates={rates} />
        </div>
      </div>

      <DistributionAnalysis rates={rates} />

      <div className="mt-4 flex justify-end">
        <button 
          onClick={() => setIsExportModalOpen(true)}
          disabled={rates.length === 0 || loading}
          className="btn-custom px-4 flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
          title={rates.length === 0 ? "Generate analysis first to export data" : "Export data to CSV/JSON"}
        >
          <i className="material-icons text-[1.2rem] m-0">file_download</i>
          Export Data
        </button>
      </div>

      <ExportModal 
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        rates={rates}
        baseCurrency={activeBaseCurrency}
        quoteCurrency={activeQuoteCurrency}
        timeframe={activeTimeframe}
      />

      <NbpApiTester />
    </MainLayout>
  );
}

export default App;
