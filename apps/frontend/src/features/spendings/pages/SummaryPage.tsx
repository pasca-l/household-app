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
import SpendingsBarGraph from "@/features/spendings/components/SpendingsBarGraph";
import SpendingsSummaryTable from "@/features/spendings/components/SpendingsSummaryTable";
import SpendingsFormModal from "@/features/spendings/components/SpendingsFormModal";

export default function SummaryPage() {
  const spendings = useSpendingsContext();
  const { receiptList, isLoading } = useReceiptList();
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
              <SpendingsBarGraph receiptList={receiptList} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Summary by category</CardTitle>
            </CardHeader>
            <CardContent>
              <SpendingsSummaryTable receiptList={receiptList} />
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
      <SpendingsFormModal showModal={showForm} setShowModal={setShowForm} />
    </div>
  );
}
