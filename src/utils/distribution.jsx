export const calculateDistribution = (rates) => {
  if (!rates || rates.length < 2) return [];

  const changes = [];
  for (let i = 1; i < rates.length; i++) {
    const prev = rates[i - 1].mid;
    const current = rates[i].mid;
    changes.push(current - prev);
  }

  if (changes.length === 0) return [];

  const min = Math.min(...changes);
  const max = Math.max(...changes);

  if (min === max) {
    return [{
      range: `${min.toFixed(4)} to ${max.toFixed(4)}`,
      label: `${min.toFixed(4)}`,
      count: changes.length,
      min,
      max,
      mid: true
    }];
  }

  const numBins = 14;
  const maxAbs = Math.max(Math.abs(min), Math.abs(max)) * 1.0001;
  const step = (maxAbs * 2) / numBins;

  const bins = Array.from({ length: numBins }, (_, i) => {
    const binMin = -maxAbs + i * step;
    const binMax = binMin + step;
    return {
      range: `${binMin.toFixed(4)} to ${binMax.toFixed(4)}`,
      label: `${((binMin + binMax) / 2).toFixed(4)}`,
      min: binMin,
      max: binMax,
      count: 0,
      mid: (binMin <= 0 && binMax >= 0)
    };
  });

  changes.forEach(change => {
    let binIndex = Math.floor((change - (-maxAbs)) / step);
    if (binIndex >= numBins) binIndex = numBins - 1;
    if (binIndex < 0) binIndex = 0;
    bins[binIndex].count++;
  });

  return bins;
};
