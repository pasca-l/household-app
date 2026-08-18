import { useMutation, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();

  const invalidate = () =>
    queryClient.invalidateQueries({
      queryKey: ["fetchReceiptList", spendingsId],
    });

  const addReceipt = useMutation({
    mutationFn: async (receipt: Receipt) => {
      const result = await addFirestoreDoc(spendingsId, receipt);
      await invalidate();
      return result;
    },
    onSuccess: () => {
      toast.add({ title: "Added receipt!" });
    },
  });

  const updateReceipt = useMutation({
    mutationFn: async (receipt: Receipt) => {
      const result = await updateFirestoreDoc(spendingsId, receipt);
      await invalidate();
      return result;
    },
    onSuccess: () => {
      toast.add({ title: "Updated receipt!" });
    },
  });

  const deleteReceipt = useMutation({
    mutationFn: async (receipt: Receipt) => {
      const result = await deleteFirestoreDoc(spendingsId, receipt);
      await invalidate();
      return result;
    },
    onSuccess: () => {
      toast.add({ title: "Deleted receipt!" });
    },
  });

  return { addReceipt, updateReceipt, deleteReceipt };
};
