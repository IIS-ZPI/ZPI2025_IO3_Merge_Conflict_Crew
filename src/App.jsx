import React from 'react';
import MainLayout from './components/layout/MainLayout';
import Toolbar from './components/dashboard/Toolbar';
import SessionSummary from './components/dashboard/SessionSummary';
import StatisticalMeasures from './components/dashboard/StatisticalMeasures';
import DistributionAnalysis from './components/dashboard/DistributionAnalysis';
import NbpApiTester from './components/NbpApiTester';

function App() {
  return (
    <MainLayout>
      <Toolbar />
      
      <div className="flex flex-wrap -mx-3 mt-4 items-stretch">
        <div className="w-full xl:w-5/12 px-3 flex flex-col mb-4 xl:mb-0">
          <SessionSummary />
        </div>
        <div className="w-full xl:w-7/12 px-3 flex flex-col">
          <StatisticalMeasures />
        </div>
      </div>

      <DistributionAnalysis />

      <div className="mt-4 flex justify-end">
        <button className="btn-custom px-4 flex items-center gap-2">
          <i className="material-icons text-[1.2rem] m-0">file_download</i>
          Export Data
        </button>
      </div>

      <NbpApiTester />
    </MainLayout>
  );
}

export default App;
