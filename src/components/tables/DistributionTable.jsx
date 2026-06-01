import { useMemo } from 'react';
import { calculateDistribution } from '../../utils/calculations';

const DistributionTable = ({ rates }) => {
  const data = useMemo(() => {
    if (!rates || rates.length < 2) {
      return [
        { range: '-0.0136 to -0.0116', count: 0 },
        { range: '-0.0116 to -0.0097', count: 0 },
        { range: '-0.0097 to -0.0077', count: 1 },
        { range: '-0.0077 to -0.0058', count: 4 },
        { range: '-0.0058 to -0.0039', count: 10 },
        { range: '-0.0039 to -0.0019', count: 7 },
        { range: '-0.0019 to 0.0000', count: 11, mid: true },
        { range: '0.0000 to 0.0019', count: 0, mid: true },
        { range: '0.0019 to 0.0039', count: 11 },
        { range: '0.0039 to 0.0058', count: 8 },
        { range: '0.0058 to 0.0077', count: 5 },
        { range: '0.0077 to 0.0097', count: 1 },
        { range: '0.0097 to 0.0116', count: 3 },
        { range: '0.0116 to 0.0136', count: 1 },
      ];
    }
    return calculateDistribution(rates, 14);
  }, [rates]);

  return (
    <div className="bg-card-bg rounded-xl border border-border flex flex-col h-full overflow-hidden">
      <div className="p-5 px-6 border-b border-border">
        <h2 className="text-[1.05rem] font-semibold text-text-main m-0">Distribution Frequency</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr>
              <th className="bg-card-inner text-text-muted p-4 text-center font-semibold text-[0.8rem] tracking-[1px] uppercase border-b border-border w-[55%]">Value Range</th>
              <th className="bg-card-inner text-text-muted p-4 text-center font-semibold text-[0.8rem] tracking-[1px] uppercase border-b border-border w-[45%]">Days Count</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="hover:bg-white/5 transition-colors">
                <td className={`p-3 px-4 text-center border-b border-[#232735] font-mono text-[14px] ${row.mid ? 'font-bold text-white text-[15px]' : 'text-text-main'}`}>
                  {row.range}
                </td>
                <td className={`p-3 px-4 text-center border-b border-[#232735] font-mono text-[14px] text-accent-blue font-semibold ${row.mid ? 'font-bold text-[15px]' : ''}`}>
                  {row.count}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DistributionTable;
