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
import SpendingsDetailTable from "@/features/spendings/components/SpendingsDetailTable";
import SpendingsFormModal from "@/features/spendings/components/SpendingsFormModal";

export default function DetailPage() {
  const { receiptList, isLoading } = useReceiptList();
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="relative flex-1 p-4">
      {isLoading ? (
        <Spinner />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Receipts</CardTitle>
          </CardHeader>
          <CardContent>
            <SpendingsDetailTable receiptList={receiptList} />
          </CardContent>
        </Card>
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
