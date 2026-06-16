import { 
  calculateMedian, 
  calculateMode, 
  calculateStandardDeviation, 
  calculateCoefficientOfVariation 
} from '../../utils/calculations';

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

const StatisticalMeasures = ({ rates = [] }) => {
  const values = rates.map(r => r.mid).filter(val => typeof val === 'number' && !isNaN(val));
  const hasValues = values.length > 0;

  const median = hasValues ? calculateMedian(values) : null;
  const mode = hasValues ? calculateMode(values) : null;
  const stdDev = hasValues ? calculateStandardDeviation(values) : null;
  const cv = hasValues ? calculateCoefficientOfVariation(values) : null;

  const formatValue = (val, isPercentage = false) => {
    if (val === null || val === undefined) return "-";
    if (typeof val === 'string') return val;
    if (isPercentage) return `${val.toFixed(2)}%`;
    return val.toFixed(4);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="section-title">
        <i className="material-icons mr-2 text-[1.1rem]">calculate</i> 
        Statistical Measures
      </div>
      <div className="section-box flex-1">
        <div className="grid grid-cols-2 gap-[15px] h-full">
          <MeasureCard title="Median" value={formatValue(median)} />
          <MeasureCard title="Mode" value={formatValue(mode)} />
          <MeasureCard title="Std Deviation" value={formatValue(stdDev)} />
          <MeasureCard title="Coeff. Var." value={formatValue(cv, true)} />
        </div>
      </div>
    </div>
  );
};

export default StatisticalMeasures;

