"use client";

import { collection, getDocs, query } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { FIRESTORE } from "@/lib/firebase/firebaseConfig";
import { useVaultContext } from "@/features/vaults/contexts/VaultContext";
import { useVaultList } from "@/features/vaults/hooks/useVaultList";
import { Note, noteConverter } from "@/features/vaults/types/note";

export const useNoteList = () => {
  const { id } = useVaultContext();
  const { vaultList } = useVaultList();
  const enabled = vaultList.some((obj) => obj.id === id);

  const { data, isLoading } = useQuery({
    queryKey: ["fetchNoteList", id],
    queryFn: async (): Promise<Note[]> => {
      const snapshot = await getDocs(
        query(
          collection(FIRESTORE, `vaults/${id}/notes`).withConverter(
            noteConverter,
          ),
        ),
      );
      return snapshot.docs.map(
        (doc): Note => ({
          id: doc.id,
          ...doc.data(),
        }),
      );
    },
    enabled,
  });

  return { noteList: data ?? [], isLoading };
};
