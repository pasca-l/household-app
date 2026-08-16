import { CategorySummary } from "@/features/spendings/types/category";
import { BarGraphData } from "@/features/spendings/types/graph";

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
