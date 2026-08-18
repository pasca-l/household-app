import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "shadcn-ui";
import { aggregateToSummary } from "@/features/spendings/utils/aggregation";
import { toBarGraphData } from "@/features/spendings/utils/conversion";
import type { Receipt } from "@/features/spendings/types/receipt";

const chartConfig = {
  value: {
    label: "Total",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function SpendingsBarGraph({
  receiptList,
}: {
  receiptList: Receipt[];
}) {
  const data = useMemo(() => {
    const summaryList = aggregateToSummary(receiptList);
    return toBarGraphData(summaryList);
  }, [receiptList]);

  return (
    <ChartContainer config={chartConfig} className="h-75 w-full">
      <BarChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="value" fill="var(--color-value)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
