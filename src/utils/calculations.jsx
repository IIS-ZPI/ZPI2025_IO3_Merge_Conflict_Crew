export const calculateSessions = (rates) => {
  let growth = 0;
  let decline = 0;
  let noChange = 0;

  if (!rates || rates.length < 2) {
    return { growth, decline, noChange };
  }

  for (let i = 1; i < rates.length; i++) {
    const prev = rates[i - 1].mid;
    const current = rates[i].mid;

    if (current > prev) {
      growth++;
    } else if (current < prev) {
      decline++;
    } else {
      noChange++;
    }
  }

  return { growth, decline, noChange };
};

export const calculateCrossRates = (baseData, quoteData) => {
  if (!baseData || !baseData.rates) return [];
  if (!quoteData || !quoteData.rates) return baseData.rates || []; // Fallback

  const baseRates = baseData.rates;
  const quoteRates = quoteData.rates;

  const quoteMap = new Map();
  quoteRates.forEach(rate => {
    quoteMap.set(rate.effectiveDate, rate.mid);
  });

  const crossRates = [];

  baseRates.forEach(baseRate => {
    const quoteMid = quoteMap.get(baseRate.effectiveDate);
    if (quoteMid) {
      crossRates.push({
        effectiveDate: baseRate.effectiveDate,
        mid: baseRate.mid / quoteMid,
      });
    }
  });

  return crossRates;
};

export const calculateMean = (values) => {
  if (!values || values.length === 0) return 0;
  const sum = values.reduce((acc, val) => acc + val, 0);
  return sum / values.length;
};

export const calculateMedian = (values) => {
  if (!values || values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 !== 0) {
    return sorted[mid];
  }
  return (sorted[mid - 1] + sorted[mid]) / 2;
};

export const calculateMode = (values) => {
  if (!values || values.length === 0) return null;

  const counts = {};
  let maxCount = 0;

  values.forEach(val => {
    const rounded = Math.round(val * 10000) / 10000;
    counts[rounded] = (counts[rounded] || 0) + 1;
    if (counts[rounded] > maxCount) {
      maxCount = counts[rounded];
    }
  });

  if (maxCount <= 1) {
    return 'None';
  }

  const modes = [];
  for (const val in counts) {
    if (counts[val] === maxCount) {
      modes.push(Number(val));
    }
  }

  modes.sort((a, b) => a - b);

  if (modes.length === 1) {
    return modes[0];
  } else if (modes.length > 1) {
    if (modes.length <= 3) {
      return modes.map(m => m.toFixed(4)).join(', ');
    } else {
      return `${modes[0].toFixed(4)}, ${modes[1].toFixed(4)}...`;
    }
  }
  return 'None';
};

export const calculateStandardDeviation = (values) => {
  if (!values || values.length <= 1) return 0;
  const mean = calculateMean(values);
  const sumSqDiff = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
  return Math.sqrt(sumSqDiff / (values.length - 1));
};

export const calculateCoefficientOfVariation = (values) => {
  if (!values || values.length === 0) return 0;
  const mean = calculateMean(values);
  if (mean === 0) return 0;
  const std = calculateStandardDeviation(values);
  return (std / mean) * 100;
};

export const calculateDistribution = (rates, binsCount = 14) => {
  if (!rates || rates.length < 2) return [];

  const changes = [];
  for (let i = 1; i < rates.length; i++) {
    const prev = rates[i - 1].mid;
    const current = rates[i].mid;
    changes.push(current - prev);
  }

  const min = Math.min(...changes);
  const max = Math.max(...changes);

  if (min === max) {
    return [{ range: `${min.toFixed(4)} to ${max.toFixed(4)}`, count: changes.length, name: min.toFixed(4), mid: true }];
  }

  const binWidth = (max - min) / binsCount;
  const bins = [];

  for (let i = 0; i < binsCount; i++) {
    const binStart = min + i * binWidth;
    const binEnd = i === binsCount - 1 ? max : min + (i + 1) * binWidth;

    let count = 0;
    changes.forEach(change => {
      if (i === binsCount - 1) {
        if (change >= binStart && change <= binEnd) count++;
      } else {
        if (change >= binStart && change < binEnd) count++;
      }
    });

    const isMid = (binStart <= 0 && binEnd > 0) || (binStart < 0 && binEnd >= 0);

    bins.push({
      range: `${binStart.toFixed(4)} to ${binEnd.toFixed(4)}`,
      count,
      name: ((binStart + binEnd) / 2).toFixed(4),
      mid: isMid
    });
  }

  return bins;
};
