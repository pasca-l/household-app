import {
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { FIRESTORE } from "@/lib/firebase/firebaseConfig";
import { useSpendingsContext } from "@/features/spendings/contexts/SpendingsContext";
import { useSpendingsList } from "@/features/spendings/hooks/useSpendingsList";
import {
  receiptConverter,
  type Receipt,
} from "@/features/spendings/types/receipt";

export const useReceiptList = (from: Date, to: Date) => {
  const { id } = useSpendingsContext();
  const { spendingsList } = useSpendingsList();
  const enabled = spendingsList.some((obj) => obj.id === id);

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["fetchReceiptList", id, from.toISOString(), to.toISOString()],
    queryFn: async (): Promise<Receipt[]> => {
      const snapshot = await getDocs(
        query(
          collection(FIRESTORE, `spendings/${id}/receipts`).withConverter(
            receiptConverter,
          ),
          where("purchase_date", ">=", Timestamp.fromDate(from)),
          where("purchase_date", "<=", Timestamp.fromDate(to)),
          orderBy("purchase_date", "desc"),
          orderBy("created_at", "desc"),
        ),
      );
      return snapshot.docs.map(
        (doc): Receipt => ({
          id: doc.id,
          ...doc.data(),
        }),
      );
    },
    enabled,
  });

  return { receiptList: data ?? [], refetch, isLoading };
};
