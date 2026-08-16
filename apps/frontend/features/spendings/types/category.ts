import { category } from "@/features/spendings/constants/category";

export type Category = (typeof category)[number];

export type CategorySummary = {
  id: string;
  date: Date;
  agg: Partial<{ [K in Category]: number }>;
};
