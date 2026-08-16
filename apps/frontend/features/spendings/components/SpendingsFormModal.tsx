"use client";

import { useEffect, useMemo, useState } from "react";
import { Check } from "lucide-react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Separator,
} from "shadcn-ui";
import { category as categoryList } from "@/features/spendings/constants/category";
import { Category } from "@/features/spendings/types/category";
import { Receipt } from "@/features/spendings/types/receipt";
import { useReceiptMutations } from "@/features/spendings/hooks/useReceiptMutations";

export default function SpendingsFormModal({
  item,
  showModal,
  setShowModal,
}: {
  item?: Receipt;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}) {
  const categories = useMemo(() => Object.values(categoryList), []);
  const { addReceipt, updateReceipt, deleteReceipt } = useReceiptMutations();

  const [inputDate, setInputDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [inputValue, setInputValue] = useState("");
  const [pickedCategory, setPickedCategory] = useState<Category>(
    categories[0],
  );
  const [disableDelete, setDisableDelete] = useState(true);

  useEffect(() => {
    if (item) {
      setInputDate(item.purchase_date.toISOString().split("T")[0]);
      setInputValue(String(item.value));
      setPickedCategory(item.category);

      setDisableDelete(true);
      const timer = setTimeout(() => setDisableDelete(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [item, showModal]);

  const handleAdd = () => {
    addReceipt.mutate({
      created_at: new Date(),
      updated_at: new Date(),
      category: pickedCategory,
      value: Number(inputValue),
      purchase_date: new Date(Date.parse(inputDate)),
    });
    setShowModal(false);
    setInputValue("");
    setPickedCategory(categories[0]);
  };

  const handleUpdate = () => {
    if (!item) return;
    updateReceipt.mutate({
      id: item.id,
      created_at: item.created_at,
      updated_at: new Date(),
      category: pickedCategory,
      value: Number(inputValue),
      purchase_date: new Date(Date.parse(inputDate)),
    });
    setShowModal(false);
  };

  const handleDelete = () => {
    if (!item) return;
    deleteReceipt.mutate(item);
    setShowModal(false);
  };

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{item ? `Item ${item.id}` : "Add receipt"}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <Input
            placeholder="Purchase date (YYYY-MM-DD)"
            value={inputDate}
            onChange={(e) => setInputDate(e.target.value)}
          />
          <Input
            placeholder="Item value"
            inputMode="numeric"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Separator />
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <Button
                key={c}
                type="button"
                size="sm"
                variant={pickedCategory === c ? "default" : "outline"}
                onClick={() => setPickedCategory(c)}
              >
                {pickedCategory === c && <Check className="size-4" />}
                {c}
              </Button>
            ))}
          </div>
          <Separator />
          {item ? (
            <div className="flex gap-2">
              <Button onClick={handleUpdate}>Update receipt</Button>
              <Button
                variant="destructive"
                disabled={disableDelete}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          ) : (
            <Button onClick={handleAdd}>Add receipt</Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
