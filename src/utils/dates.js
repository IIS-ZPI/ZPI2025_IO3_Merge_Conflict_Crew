export const getDateRange = (timeframe) => {
  const end = new Date();
  const start = new Date();

  switch (timeframe) {
    case '1W': start.setDate(end.getDate() - 7); break;
    case '2W': start.setDate(end.getDate() - 14); break;
    case '1M': start.setMonth(end.getMonth() - 1); break;
    case '1Q': start.setMonth(end.getMonth() - 3); break;
    case '6M': start.setMonth(end.getMonth() - 6); break;
    case '1Y': start.setFullYear(end.getFullYear() - 1); break;
    default: start.setDate(end.getDate() - 7);
  }

  return {
    startDate: start.toISOString().split('T')[0],
    endDate: end.toISOString().split('T')[0]
  };
};
