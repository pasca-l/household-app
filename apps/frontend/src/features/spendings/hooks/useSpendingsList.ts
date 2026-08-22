import { collection, onSnapshot, or, query, where } from "firebase/firestore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FIRESTORE } from "@/lib/firebase/firebaseConfig";
import { useFirebaseAuth } from "@/utils/firebase/hooks/useFirebaseAuth";
import type { Spendings } from "@/features/spendings/types/spendings";

export const useSpendingsList = () => {
  const queryClient = useQueryClient();
  const { user } = useFirebaseAuth();

  const queryKey = ["fetchSpendingsList", user?.uid];

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: ({ signal }) =>
      new Promise<Spendings[]>((resolve) => {
        const unsubscribe = onSnapshot(
          query(
            collection(FIRESTORE, "spendings"),
            or(
              where("owner", "==", `${user!.uid}`),
              where("editors", "array-contains", `${user!.uid}`),
            ),
          ),
          (snapshot) => {
            const spendingsList = snapshot.docs.map((doc) => ({
              id: doc.id,
            }));
            queryClient.setQueryData(queryKey, spendingsList);
            resolve(spendingsList);
          },
        );
        signal.addEventListener("abort", unsubscribe);
      }),
    enabled: !!user,
  });

  return { spendingsList: data ?? [], isLoading };
};
