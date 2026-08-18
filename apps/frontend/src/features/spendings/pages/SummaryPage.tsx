import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Spinner,
} from "shadcn-ui";
import { useSpendingsContext } from "@/features/spendings/contexts/SpendingsContext";
import { useReceiptList } from "@/features/spendings/hooks/useReceiptList";
import { getLastYearRange } from "@/features/spendings/utils/dateRange";
import SummaryBarGraph from "@/features/spendings/components/SummaryBarGraph";
import SummaryTable from "@/features/spendings/components/SummaryTable";
import ReceiptTable from "@/features/spendings/components/ReceiptTable";
import ReceiptFormModal from "@/features/spendings/components/ReceiptFormModal";

export default function SummaryPage() {
  const spendings = useSpendingsContext();
  const { from, to } = getLastYearRange();
  const { receiptList, isLoading } = useReceiptList(from, to);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    document.title = spendings.id;
  }, [spendings.id]);

  return (
    <div className="relative flex-1 p-4">
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
