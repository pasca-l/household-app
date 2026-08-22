import type { CategorySummary } from "@/features/spendings/types/category";
import type { BarGraphData } from "@/features/spendings/types/graph";

export const toStartOfDay = (date: Date): Date => {
  return new Date(new Date(date).setHours(0, 0, 0, 0));
};

export const toEndOfDay = (date: Date): Date => {
  return new Date(new Date(date).setHours(23, 59, 59, 999));
};

export function toBarGraphData(data: CategorySummary[]): BarGraphData[] {
  return data
    .map((item) => ({
      id: item.id,
      date: item.date.toISOString().slice(2, 7), // "YY-MM"
      value: Object.values(item.agg).reduce(
        (sum: number, value) => sum + (value ?? 0),
        0,
      ),
    }))
    .reverse();
}
