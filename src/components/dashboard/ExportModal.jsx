import React, { useState, useEffect } from 'react';
import { generateCSV, generateJSON, triggerDownload } from '../../utils/export';

const ExportModal = ({
  isOpen,
  onClose,
  rates = [],
  baseCurrency = 'EUR',
  quoteCurrency = 'USD',
  timeframe = '1W'
}) => {
  const [exportType, setExportType] = useState('both');
  const [exportFormat, setExportFormat] = useState('json');
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const name = `${baseCurrency}_${quoteCurrency}_${timeframe}_${exportType}_${today}.${exportFormat}`;
    setFileName(name);
  }, [baseCurrency, quoteCurrency, timeframe, exportType, exportFormat]);

  if (!isOpen) return null;

  const handleExport = () => {
    const options = {
      baseCurrency,
      quoteCurrency,
      timeframe,
      type: exportType
    };

    let content = '';
    let mimeType = '';

    if (exportFormat === 'json') {
      content = generateJSON(rates, options);
      mimeType = 'application/json';
    } else {
      content = generateCSV(rates, options);
      mimeType = 'text/csv';
    }

    triggerDownload(content, fileName, mimeType);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[#0c0e14]/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-card-bg border border-border w-full max-w-md rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden animate-fadeIn transform transition-all p-6">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <i className="material-icons text-accent-blue text-[1.4rem]">file_download</i>
            <h3 className="text-lg font-semibold text-text-main">Export Local Data</h3>
          </div>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-main p-1.5 rounded-lg hover:bg-white/5 transition-colors"
          >
            <i className="material-icons text-[1.3rem] block">close</i>
          </button>
        </div>
        <div className="py-5 space-y-5">
          <div>
            <label className="block text-[0.75rem] font-bold text-text-muted uppercase tracking-[1px] mb-2">
              Select Data to Export
            </label>
            <div className="grid grid-cols-1 gap-2.5">
              <button
                type="button"
                onClick={() => setExportType('both')}
                className={`flex items-center justify-between p-3.5 rounded-lg border text-left transition-all ${exportType === 'both'
                  ? 'border-accent-blue bg-accent-blue/5 text-text-main'
                  : 'border-border bg-card-inner text-text-muted hover:border-border/80 hover:text-text-main'
                  }`}
              >
                <div>
                  <div className="font-semibold text-sm">Combined (All Data)</div>
                  <div className="text-xs opacity-80 mt-0.5">Raw exchange rates & calculated metrics.</div>
                </div>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${exportType === 'both' ? 'border-accent-blue' : 'border-text-muted'}`}>
                  {exportType === 'both' && <div className="w-2 h-2 rounded-full bg-accent-blue" />}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setExportType('dataset')}
                className={`flex items-center justify-between p-3.5 rounded-lg border text-left transition-all ${exportType === 'dataset'
                  ? 'border-accent-blue bg-accent-blue/5 text-text-main'
                  : 'border-border bg-card-inner text-text-muted hover:border-border/80 hover:text-text-main'
                  }`}
              >
                <div>
                  <div className="font-semibold text-sm">Raw Dataset Only</div>
                  <div className="text-xs opacity-80 mt-0.5">List of exchange rates with dates and values.</div>
                </div>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${exportType === 'dataset' ? 'border-accent-blue' : 'border-text-muted'}`}>
                  {exportType === 'dataset' && <div className="w-2 h-2 rounded-full bg-accent-blue" />}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setExportType('analytics')}
                className={`flex items-center justify-between p-3.5 rounded-lg border text-left transition-all ${exportType === 'analytics'
                  ? 'border-accent-blue bg-accent-blue/5 text-text-main'
                  : 'border-border bg-card-inner text-text-muted hover:border-border/80 hover:text-text-main'
                  }`}
              >
                <div>
                  <div className="font-semibold text-sm">Analytic Summary Only</div>
                  <div className="text-xs opacity-80 mt-0.5">Session statistics and calculation measures.</div>
                </div>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${exportType === 'analytics' ? 'border-accent-blue' : 'border-text-muted'}`}>
                  {exportType === 'analytics' && <div className="w-2 h-2 rounded-full bg-accent-blue" />}
                </div>
              </button>
            </div>
          </div>
          <div>
            <label className="block text-[0.75rem] font-bold text-text-muted uppercase tracking-[1px] mb-2">
              File Format
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setExportFormat('json')}
                className={`flex items-center justify-center py-2.5 rounded-lg border font-semibold text-sm transition-all ${exportFormat === 'json'
                  ? 'border-accent-blue bg-accent-blue/5 text-accent-blue'
                  : 'border-border bg-card-inner text-text-muted hover:text-text-main'
                  }`}
              >
                JSON Format
              </button>
              <button
                type="button"
                onClick={() => setExportFormat('csv')}
                className={`flex items-center justify-center py-2.5 rounded-lg border font-semibold text-sm transition-all ${exportFormat === 'csv'
                  ? 'border-accent-blue bg-accent-blue/5 text-accent-blue'
                  : 'border-border bg-card-inner text-text-muted hover:text-text-main'
                  }`}
              >
                CSV Format
              </button>
            </div>
          </div>
          <div className="bg-card-inner border border-border p-3.5 rounded-lg">
            <span className="block text-[0.7rem] font-bold text-text-muted uppercase tracking-[1px] mb-1">
              Saving as
            </span>
            <span className="font-mono text-sm text-text-main font-semibold break-all">
              {fileName}
            </span>
          </div>
        </div>
        <div className="flex gap-3 pt-4 border-t border-border mt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-border hover:bg-white/5 text-text-main rounded-md text-sm font-semibold transition-all"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleExport}
            className="flex-1 btn-custom py-2.5 text-sm font-semibold"
          >
            Download File
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
