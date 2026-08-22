import { collection, onSnapshot, or, query, where } from "firebase/firestore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FIRESTORE } from "@/lib/firebase/firebaseConfig";
import { useFirebaseAuth } from "@/utils/firebase/hooks/useFirebaseAuth";
import type { Vault } from "@/features/vaults/types/vault";

export const useVaultList = () => {
  const queryClient = useQueryClient();
  const { user } = useFirebaseAuth();

  const queryKey = ["fetchVaultList", user?.uid];

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: ({ signal }) =>
      new Promise<Vault[]>((resolve) => {
        const unsubscribe = onSnapshot(
          query(
            collection(FIRESTORE, "vaults"),
            or(
              where("owner", "==", `${user!.uid}`),
              where("editors", "array-contains", `${user!.uid}`),
            ),
          ),
          (snapshot) => {
            const vaultList = snapshot.docs.map((doc) => ({ id: doc.id }));
            queryClient.setQueryData(queryKey, vaultList);
            resolve(vaultList);
          },
        );
        signal.addEventListener("abort", unsubscribe);
      }),
    enabled: !!user,
  });

  return { vaultList: data ?? [], isLoading };
};
