import { collection, getDocs, or, query, where } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { FIRESTORE } from "@/lib/firebase/firebaseConfig";
import { useFirebaseAuth } from "@/utils/firebase/hooks/useFirebaseAuth";
import type { Spendings } from "@/features/spendings/types/spendings";

export const useSpendingsList = () => {
  const { user } = useFirebaseAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["fetchSpendingsList", user?.uid],
    queryFn: async (): Promise<Spendings[]> => {
      const snapshot = await getDocs(
        query(
          collection(FIRESTORE, "spendings"),
          or(
            where("owner", "==", `${user!.uid}`),
            where("editors", "array-contains", `${user!.uid}`),
          ),
        ),
      );
      return snapshot.docs.map((doc) => ({ id: doc.id }));
    },
    enabled: !!user,
  });

  return { spendingsList: data ?? [], isLoading };
};
