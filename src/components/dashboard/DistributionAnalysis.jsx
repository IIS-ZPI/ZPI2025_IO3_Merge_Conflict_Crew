import { useState, useEffect } from 'react';
import HistogramChart from '../charts/HistogramChart';
import DistributionTable from '../tables/DistributionTable';
import DatePicker from '../form/DatePicker';
import { fetchCurrencyRates } from '../../services/nbpApi';
import { calculateCrossRates } from '../../utils/calculations';
import { getForwardDateRange } from '../../utils/dates';
import { calculateDistribution } from '../../utils/distribution';

const DistributionAnalysis = ({ baseCurrency = 'EUR', quoteCurrency = 'USD' }) => {
  const [timeframe, setTimeframe] = useState('Month');
  const [startDate, setStartDate] = useState('');
  const [distributionData, setDistributionData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!startDate) return;

      const selectedDate = new Date(startDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate > today) {
        setError('Cannot analyze future dates. Please select a past date.');
        setDistributionData([]);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const { endDate } = getForwardDateRange(startDate, timeframe);
        
        let rates = [];
        if (baseCurrency === quoteCurrency) {
          const baseData = await fetchCurrencyRates(baseCurrency, startDate, endDate);
          rates = baseData.rates.map(r => ({ effectiveDate: r.effectiveDate, mid: 1 }));
        } else {
          const baseData = await fetchCurrencyRates(baseCurrency, startDate, endDate);
          const quoteData = await fetchCurrencyRates(quoteCurrency, startDate, endDate);
          rates = calculateCrossRates(baseData, quoteData);
        }
        
        const distData = calculateDistribution(rates);
        setDistributionData(distData);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch data for distribution analysis');
        setDistributionData([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [baseCurrency, quoteCurrency, startDate, timeframe]);

  return (
    <div className="mt-5">
      <div className="section-title flex justify-between items-center">
        <div>
          <i className="material-icons mr-2 text-[1.1rem]">bar_chart</i>
          Distribution Analysis
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 items-stretch">
        <div className="w-full lg:w-7/12 px-3 pb-5 flex flex-col">
          <div className="bg-card-bg rounded-xl p-6 border border-border flex-1 flex flex-col h-full relative">
            <div className="flex justify-between items-start mb-5 flex-wrap gap-4">
              <div>
                <h2 className="text-[1.1rem] font-semibold text-text-main mb-1">
                  {timeframe}ly changes distribution {baseCurrency} - {quoteCurrency}
                </h2>
                <span className="text-[0.85rem] text-text-muted">Frequency histogram of value changes within a given timeframe</span>
              </div>
              <div className="flex gap-4 items-center">
                <div className="flex bg-card-bg rounded-lg border border-border overflow-hidden">
                  <button 
                    onClick={() => setTimeframe('Month')}
                    className={`border-none px-4 py-2 text-[0.85rem] cursor-pointer font-sans font-medium transition-colors ${timeframe === 'Month' ? 'bg-white/5 text-text-main' : 'bg-transparent text-text-muted hover:bg-white/5'}`}
                  >
                    Month
                  </button>
                  <button 
                    onClick={() => setTimeframe('Quarter')}
                    className={`border-none border-l border-border px-4 py-2 text-[0.85rem] cursor-pointer font-sans font-medium transition-colors ${timeframe === 'Quarter' ? 'bg-white/5 text-text-main' : 'bg-transparent text-text-muted hover:bg-white/5'}`}
                  >
                    Quarter
                  </button>
                </div>
                <DatePicker 
                  placeholder="Start date" 
                  onChange={(e) => setStartDate(e.target.value)} 
                />
              </div>
            </div>

            {loading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-card-bg/50 backdrop-blur-sm rounded-xl">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-4 border-accent-blue border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-text-muted text-sm font-medium">Loading distribution...</span>
                </div>
              </div>
            )}
            
            {error && (
              <div className="text-text-muted bg-white/5 border border-border p-3 rounded-lg text-sm flex items-center gap-2 mb-4">
                <i className="material-icons text-[1.2rem]">info_outline</i>
                <span>{error}</span>
              </div>
            )}

            <div className="relative flex-1 min-h-[350px] w-full pt-2.5">
              {!loading && !error && startDate && distributionData.length > 0 ? (
                <HistogramChart data={distributionData} />
              ) : !startDate ? (
                <div className="absolute inset-0 flex items-center justify-center text-text-muted text-sm">
                  Please select a start date to generate the distribution analysis.
                </div>
              ) : distributionData.length === 0 && !loading && !error ? (
                <div className="absolute inset-0 flex items-center justify-center text-text-muted text-sm">
                  No distribution data available for this period.
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-5/12 px-3 pb-5 flex flex-col">
          <DistributionTable data={distributionData} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default DistributionAnalysis;
