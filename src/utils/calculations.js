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
