import {
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FIRESTORE } from "@/lib/firebase/firebaseConfig";
import { useSpendingsContext } from "@/features/spendings/contexts/SpendingsContext";
import { useSpendingsList } from "@/features/spendings/hooks/useSpendingsList";
import {
  receiptConverter,
  type Receipt,
} from "@/features/spendings/types/receipt";
import type { DateRange } from "../types/date";
import { toEndOfDay, toStartOfDay } from "../utils/conversion";

export const useReceiptList = (range: DateRange) => {
  const queryClient = useQueryClient();
  const { id } = useSpendingsContext();
  const { spendingsList } = useSpendingsList();

  const enabled = spendingsList.some((obj) => obj.id === id);
  const from = toStartOfDay(range.from);
  const to = toEndOfDay(range.to);

  const queryKey = [
    "fetchReceiptList",
    id,
    from.toISOString(),
    to.toISOString(),
  ];

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: ({ signal }) =>
      new Promise<Receipt[]>((resolve) => {
        const unsubscribe = onSnapshot(
          query(
            collection(FIRESTORE, `spendings/${id}/receipts`).withConverter(
              receiptConverter,
            ),
            where("purchase_date", ">=", Timestamp.fromDate(from)),
            where("purchase_date", "<=", Timestamp.fromDate(to)),
            orderBy("purchase_date", "desc"),
            orderBy("created_at", "desc"),
          ),
          (snapshot) => {
            const receiptList = snapshot.docs.map(
              (doc): Receipt => ({
                id: doc.id,
                ...doc.data(),
              }),
            );
            queryClient.setQueryData(queryKey, receiptList);
            resolve(receiptList);
          },
        );
        signal.addEventListener("abort", unsubscribe);
      }),
    enabled,
  });

  return { receiptList: data ?? [], isLoading };
};
