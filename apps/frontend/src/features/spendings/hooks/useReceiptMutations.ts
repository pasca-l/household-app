import { useMutation } from "@tanstack/react-query";
import { toast } from "shadcn-ui";
import { useSpendingsContext } from "@/features/spendings/contexts/SpendingsContext";
import {
  addFirestoreDoc,
  deleteFirestoreDoc,
  updateFirestoreDoc,
} from "@/features/spendings/utils/firestoreCrud";
import type { Receipt } from "@/features/spendings/types/receipt";

export const useReceiptMutations = () => {
  const { id: spendingsId } = useSpendingsContext();

  const addReceipt = useMutation({
    mutationFn: (receipt: Receipt) => addFirestoreDoc(spendingsId, receipt),
    onSuccess: () => {
      toast.add({ title: "Added receipt!" });
    },
  });

  const updateReceipt = useMutation({
    mutationFn: (receipt: Receipt) => updateFirestoreDoc(spendingsId, receipt),
    onSuccess: () => {
      toast.add({ title: "Updated receipt!" });
    },
  });

  const deleteReceipt = useMutation({
    mutationFn: (receipt: Receipt) => deleteFirestoreDoc(spendingsId, receipt),
    onSuccess: () => {
      toast.add({ title: "Deleted receipt!" });
    },
  });

  return { addReceipt, updateReceipt, deleteReceipt };
};
