import type { DateRange } from "../types/date";

const DAY_MS = 24 * 60 * 60 * 1000;

export const defaultDateRange = (): DateRange => ({
  from: new Date(Date.now() - 365 * DAY_MS),
  to: new Date(),
});
