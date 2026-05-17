import React from 'react';
import HistogramChart from '../charts/HistogramChart';
import DistributionTable from '../tables/DistributionTable';
import DatePicker from '../form/DatePicker';

const DistributionAnalysis = () => {
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
              <div className="flex gap-4 items-center">
                <div className="flex bg-card-bg rounded-lg border border-border overflow-hidden">
                  <button className="border-none bg-white/5 text-text-main px-4 py-2 text-[0.85rem] cursor-pointer font-sans font-medium">Month</button>
                  <button className="border-none border-l border-border bg-transparent text-text-muted px-4 py-2 text-[0.85rem] cursor-pointer font-sans font-medium hover:bg-white/5 transition-colors">Quarter</button>
                </div>
                <DatePicker placeholder="Start date" />
              </div>
            </div>

            <div className="relative flex-1 min-h-[350px] w-full pt-2.5">
              <HistogramChart />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-5/12 px-3 pb-5 flex flex-col">
          <DistributionTable />
        </div>
      </div>
    </div>
  );
};

export default DistributionAnalysis;
