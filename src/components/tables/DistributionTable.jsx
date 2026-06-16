const DistributionTable = ({ data = [], loading = false }) => {
  return (
    <div className="bg-card-bg rounded-xl border border-border flex flex-col h-full overflow-hidden relative">
      <div className="p-5 px-6 border-b border-border">
        <h2 className="text-[1.05rem] font-semibold text-text-main m-0">Distribution Frequency</h2>
      </div>
      <div className="flex-1 overflow-y-auto relative">
        {loading && (
          <div className="absolute inset-0 z-10 bg-card-bg/50 backdrop-blur-sm flex items-center justify-center">
             <div className="w-6 h-6 border-3 border-accent-blue border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr>
              <th className="bg-card-inner text-text-muted p-4 text-center font-semibold text-[0.8rem] tracking-[1px] uppercase border-b border-border w-[55%]">Value Range</th>
              <th className="bg-card-inner text-text-muted p-4 text-center font-semibold text-[0.8rem] tracking-[1px] uppercase border-b border-border w-[45%]">Days Count</th>
            </tr>
          </thead>
          <tbody>
            {(!data || data.length === 0) && !loading ? (
              <tr>
                <td colSpan="2" className="p-6 text-center text-text-muted text-sm">
                  No data to display
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className={`p-3 px-4 text-center border-b border-[#232735] font-mono text-[14px] ${row.mid ? 'font-bold text-white text-[15px]' : 'text-text-main'}`}>
                    {row.range}
                  </td>
                  <td className={`p-3 px-4 text-center border-b border-[#232735] font-mono text-[14px] text-accent-blue font-semibold ${row.mid ? 'font-bold text-[15px]' : ''}`}>
                    {row.count}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DistributionTable;
