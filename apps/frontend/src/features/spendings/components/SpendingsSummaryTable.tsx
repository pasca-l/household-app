import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "shadcn-ui";
import { aggregateToSummary } from "@/features/spendings/utils/aggregation";
import { category } from "@/features/spendings/constants/category";
import type { Receipt } from "@/features/spendings/types/receipt";

export default function SpendingsSummaryTable({
  receiptList,
}: {
  receiptList: Receipt[];
}) {
  const summaryList = aggregateToSummary(receiptList);

  return (
    <div className="w-full overflow-x-auto">
      <Table className="min-w-200">
        <TableHeader>
          <TableRow>
            <TableHead>Period</TableHead>
            {category.map((c) => (
              <TableHead key={c}>{c}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {summaryList.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.date.toISOString().slice(0, 7)}</TableCell>
              {category.map((c) => (
                <TableCell key={c}>{item.agg[c] ?? "-"}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
