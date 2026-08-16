"use client";

import { collection, getDocs, or, query, where } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { FIRESTORE } from "@/lib/firebase/firebaseConfig";
import { useFirebaseAuth } from "@/utils/firebase/hooks/useFirebaseAuth";
import { Vault } from "@/features/vaults/types/vault";

export const useVaultList = () => {
  const { user } = useFirebaseAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["fetchVaultList", user?.uid],
    queryFn: async (): Promise<Vault[]> => {
      const snapshot = await getDocs(
        query(
          collection(FIRESTORE, "vaults"),
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

  return { vaultList: data ?? [], isLoading };
};
