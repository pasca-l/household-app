import { useState } from "react";
import { Plus } from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Spinner,
} from "shadcn-ui";
import { useReceiptList } from "@/features/spendings/hooks/useReceiptList";
import { defaultDateRange } from "@/features/spendings/utils/initialization";
import SummaryBarGraph from "@/features/spendings/components/SummaryBarGraph";
import SummaryTable from "@/features/spendings/components/SummaryTable";
import ReceiptTable from "@/features/spendings/components/ReceiptTable";
import ReceiptFormModal from "@/features/spendings/components/ReceiptFormModal";
import DateRangePicker from "@/features/spendings/components/DateRangePicker";

export default function SummaryPage() {
  const [range, setRange] = useState(defaultDateRange);
  const { receiptList, isLoading } = useReceiptList(range);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="relative flex-1 p-4">
      <div className="mb-4">
        <DateRangePicker range={range} setRange={setRange} />
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly spending</CardTitle>
            </CardHeader>
            <CardContent>
              <SummaryBarGraph receiptList={receiptList} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Summary by category</CardTitle>
            </CardHeader>
            <CardContent>
              <SummaryTable receiptList={receiptList} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Receipts</CardTitle>
            </CardHeader>
            <CardContent>
              <ReceiptTable receiptList={receiptList} />
            </CardContent>
          </Card>
        </div>
      )}
      <Button
        size="icon"
        className="fixed bottom-4 right-4 rounded-full"
        onClick={() => setShowForm(true)}
      >
        <Plus />
      </Button>
      <ReceiptFormModal showModal={showForm} setShowModal={setShowForm} />
    </div>
  );
}
