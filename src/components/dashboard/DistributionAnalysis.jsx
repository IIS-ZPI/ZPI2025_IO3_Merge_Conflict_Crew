import HistogramChart from '../charts/HistogramChart';
import DistributionTable from '../tables/DistributionTable';

const DistributionAnalysis = ({ rates }) => {
  return (
    <div className="mt-5">
      <div className="section-title">
        <i className="material-icons mr-2 text-[1.1rem]">bar_chart</i>
        Distribution Analysis
      </div>

      <div className="flex flex-wrap -mx-3 items-stretch">
        <div className="w-full lg:w-7/12 px-3 pb-5 flex flex-col">
          <div className="bg-card-bg rounded-xl p-6 border border-border flex-1 flex flex-col h-full">
            <div className="flex justify-between items-start mb-5 flex-wrap gap-4">
              <div>
                <h2 className="text-[1.1rem] font-semibold text-text-main mb-1">Monthly changes distribution EUR - USD</h2>
                <span className="text-[0.85rem] text-text-muted">Frequency histogram of value changes within a given timeframe</span>
              </div>
            </div>

            <div className="relative flex-1 min-h-[350px] w-full pt-2.5">
              <HistogramChart rates={rates} />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-5/12 px-3 pb-5 flex flex-col">
          <DistributionTable rates={rates} />
        </div>
      </div>
    </div>
  );
};

export default DistributionAnalysis;
