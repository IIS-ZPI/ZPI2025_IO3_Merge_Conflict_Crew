export const getDateRange = (timeframe) => {
  const end = new Date();
  const start = new Date(end);

  switch (timeframe) {
    case '1W': start.setUTCDate(end.getUTCDate() - 7); break;
    case '2W': start.setUTCDate(end.getUTCDate() - 14); break;
    case '1M': start.setUTCMonth(end.getUTCMonth() - 1); break;
    case '1Q': start.setUTCMonth(end.getUTCMonth() - 3); break;
    case '6M': start.setUTCMonth(end.getUTCMonth() - 6); break;
    case '1Y': start.setUTCFullYear(end.getUTCFullYear() - 1); break;
    default: start.setUTCDate(end.getUTCDate() - 7);
  }

  return {
    startDate: start.toISOString().split('T')[0],
    endDate: end.toISOString().split('T')[0]
  };
};

export const getForwardDateRange = (startDateStr, timeframe) => {
  const [year, month, day] = startDateStr.split('-').map(Number);
  const start = new Date(Date.UTC(year, month - 1, day));
  const end = new Date(start);

  switch (timeframe) {
    case 'Month': end.setUTCMonth(start.getUTCMonth() + 1); break;
    case 'Quarter': end.setUTCMonth(start.getUTCMonth() + 3); break;
    default: end.setUTCMonth(start.getUTCMonth() + 1);
  }

  const today = new Date();
  if (end > today) {
    return {
      startDate: start.toISOString().split('T')[0],
      endDate: today.toISOString().split('T')[0]
    };
  }

  return {
    startDate: start.toISOString().split('T')[0],
    endDate: end.toISOString().split('T')[0]
  };
};
