const DAY_MS = 24 * 60 * 60 * 1000;

const startOfDay = (date: Date) => {
  const truncated = new Date(date);
  truncated.setHours(0, 0, 0, 0);
  return truncated;
};

const endOfDay = (date: Date) => {
  const truncated = new Date(date);
  truncated.setHours(23, 59, 59, 999);
  return truncated;
};

export const getLastYearRange = () => ({
  from: startOfDay(new Date(Date.now() - 365 * DAY_MS)),
  to: endOfDay(new Date(Date.now() + DAY_MS)),
});
