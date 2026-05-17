import React from 'react';

const MeasureCard = ({ title, value }) => (
  <div className="bg-card-inner rounded-lg p-5 border border-border h-full flex flex-col justify-center">
    <div className="text-[0.75rem] text-text-muted uppercase tracking-[1px] mb-2.5 font-semibold">
      {title}
    </div>
    <div className="text-[1.8rem] font-medium text-text-main font-mono leading-tight">
      {value}
    </div>
  </div>
);

const StatisticalMeasures = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="section-title">
        <i className="material-icons mr-2 text-[1.1rem]">calculate</i> 
        Statistical Measures
      </div>
      <div className="section-box flex-1">
        <div className="grid grid-cols-2 gap-[15px] h-full">
          <MeasureCard title="Median" value="1.0850" />
          <MeasureCard title="Mode" value="1.0825" />
          <MeasureCard title="Std Deviation" value="0.0142" />
          <MeasureCard title="Coeff. Var." value="0.85%" />
        </div>
      </div>
    </div>
  );
};

export default StatisticalMeasures;
