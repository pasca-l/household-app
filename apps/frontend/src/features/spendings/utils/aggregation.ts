import type { Receipt } from "@/features/spendings/types/receipt";
import type {
  Category,
  CategorySummary,
} from "@/features/spendings/types/category";

export function aggregateToSummary(receipts: Receipt[]): CategorySummary[] {
  const grouped = new Map<string, Partial<{ [K in Category]: number }>>();

  for (const receipt of receipts) {
    const key = receipt.purchase_date.toISOString().slice(0, 7); // "YYYY-MM"
    const agg = grouped.get(key) ?? {};
    agg[receipt.category] = (agg[receipt.category] ?? 0) + receipt.value;
    grouped.set(key, agg);
  }

  return Array.from(grouped.entries()).map(([key, agg]) => {
    const [year, month] = key.split("-").map(Number);
    return {
      id: key,
      date: new Date(year, month),
      agg,
    };
  });
}
