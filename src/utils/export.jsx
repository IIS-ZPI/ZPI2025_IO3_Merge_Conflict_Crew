import {
  calculateSessions,
  calculateMedian,
  calculateMode,
  calculateStandardDeviation,
  calculateCoefficientOfVariation
} from './calculations';


export const computeAnalytics = (rates) => {
  const { growth, decline, noChange } = calculateSessions(rates);
  const values = rates.map(r => r.mid).filter(val => typeof val === 'number' && !isNaN(val));
  const hasValues = values.length > 0;

  const median = hasValues ? calculateMedian(values) : null;
  const mode = hasValues ? calculateMode(values) : null;
  const stdDev = hasValues ? calculateStandardDeviation(values) : null;
  const cv = hasValues ? calculateCoefficientOfVariation(values) : null;

  return {
    sessions: { growth, decline, noChange },
    statistics: {
      median: median !== null ? Number(median.toFixed(4)) : null,
      mode: typeof mode === 'string' ? mode : (mode !== null ? Number(mode.toFixed(4)) : null),
      standardDeviation: stdDev !== null ? Number(stdDev.toFixed(4)) : null,
      coefficientOfVariation: cv !== null ? Number(cv.toFixed(2)) : null
    }
  };
};

export const generateJSON = (rates, options) => {
  const { baseCurrency, quoteCurrency, timeframe, type } = options;
  const exportedAt = new Date().toISOString();

  const result = {
    metadata: {
      baseCurrency,
      quoteCurrency,
      timeframe,
      exportedAt
    }
  };

  if (type === 'dataset' || type === 'both') {
    result.dataset = rates.map(r => ({
      date: r.effectiveDate,
      rate: Number(r.mid.toFixed(4))
    }));
  }

  if (type === 'analytics' || type === 'both') {
    result.analytics = computeAnalytics(rates);
  }

  return JSON.stringify(result, null, 2);
};


const escapeCSV = (value) => {
  if (value === null || value === undefined) return '';
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
};


export const generateCSV = (rates, options) => {
  const { baseCurrency, quoteCurrency, timeframe, type } = options;
  const exportedAt = new Date().toISOString();
  let csvLines = [];

  const metadataLines = [
    ['Metric', 'Value'],
    ['Base Currency', baseCurrency],
    ['Quote Currency', quoteCurrency],
    ['Timeframe', timeframe],
    ['Exported At', exportedAt]
  ];
  if (type === 'analytics' || type === 'both') {
    const analytics = computeAnalytics(rates);

    const analyticsLines = [
      ['Metric', 'Value'],
      ['Growth Sessions', analytics.sessions.growth],
      ['Decline Sessions', analytics.sessions.decline],
      ['No Change Sessions', analytics.sessions.noChange],
      ['Median', analytics.statistics.median !== null ? analytics.statistics.median.toFixed(4) : '-'],
      ['Mode', analytics.statistics.mode !== null ? analytics.statistics.mode : '-'],
      ['Standard Deviation', analytics.statistics.standardDeviation !== null ? analytics.statistics.standardDeviation.toFixed(4) : '-'],
      ['Coefficient of Variation', analytics.statistics.coefficientOfVariation !== null ? `${analytics.statistics.coefficientOfVariation.toFixed(2)}%` : '-']
    ];

    if (type === 'both') {
      csvLines.push('# METADATA');
      csvLines.push(...metadataLines.map(row => row.map(escapeCSV).join(',')));
      csvLines.push('');
      csvLines.push('# ANALYTICS');
      csvLines.push(...analyticsLines.map(row => row.map(escapeCSV).join(',')));
    } else {
      csvLines.push(...metadataLines.map(row => row.map(escapeCSV).join(',')));
      csvLines.push('');
      csvLines.push(...analyticsLines.map(row => row.map(escapeCSV).join(',')));
    }
  }

  if (type === 'dataset') {
    csvLines.push('Date,Rate');
    rates.forEach(r => {
      csvLines.push(`${r.effectiveDate},${r.mid.toFixed(4)}`);
    });
  } else if (type === 'both') {
    csvLines.push('');
    csvLines.push('# DATASET');
    csvLines.push('Date,Rate');
    rates.forEach(r => {
      csvLines.push(`${r.effectiveDate},${r.mid.toFixed(4)}`);
    });
  }

  return csvLines.join('\n');
};

export const triggerDownload = (content, filename, mimeType) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportChartAsPNG = (svgElement, baseCurrency, quoteCurrency, timeframe) => {
  if (!svgElement) return;

  const bbox = svgElement.getBoundingClientRect();
  const width = bbox.width || 800;
  const height = bbox.height || 400;

  const clonedSvg = svgElement.cloneNode(true);
  clonedSvg.setAttribute('width', width);
  clonedSvg.setAttribute('height', height);
  clonedSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

  const svgString = new XMLSerializer().serializeToString(clonedSvg);
  const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const URLObj = window.URL || window.webkitURL || window;
  const blobURL = URLObj.createObjectURL(svgBlob);

  const image = new Image();
  image.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = width * 2;
    canvas.height = height * 2;
    const context = canvas.getContext('2d');
    if (context) {
      context.scale(2, 2);
      context.fillStyle = '#1e222d';
      context.fillRect(0, 0, width, height);
      context.drawImage(image, 0, 0, width, height);

      const today = new Date().toISOString().split('T')[0];
      const fileName = `Chart_${baseCurrency}_${quoteCurrency}_${timeframe}_${today}.png`;
      const pngData = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.href = pngData;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    URLObj.revokeObjectURL(blobURL);
  };

  image.onerror = (err) => {
    console.error('Failed to load SVG into Image for export:', err);
    URLObj.revokeObjectURL(blobURL);
  };

  image.src = blobURL;
};
