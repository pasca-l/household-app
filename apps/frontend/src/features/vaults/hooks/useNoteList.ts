import { collection, onSnapshot, query } from "firebase/firestore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FIRESTORE } from "@/lib/firebase/firebaseConfig";
import { useVaultContext } from "@/features/vaults/contexts/VaultContext";
import { useVaultList } from "@/features/vaults/hooks/useVaultList";
import { noteConverter, type Note } from "@/features/vaults/types/note";

export const useNoteList = () => {
  const queryClient = useQueryClient();
  const { id } = useVaultContext();
  const { vaultList } = useVaultList();

  const enabled = vaultList.some((obj) => obj.id === id);

  const queryKey = ["fetchNoteList", id];

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: ({ signal }) =>
      new Promise<Note[]>((resolve) => {
        const unsubscribe = onSnapshot(
          query(
            collection(FIRESTORE, `vaults/${id}/notes`).withConverter(
              noteConverter,
            ),
          ),
          (snapshot) => {
            const noteList = snapshot.docs.map(
              (doc): Note => ({
                id: doc.id,
                ...doc.data(),
              }),
            );
            queryClient.setQueryData(queryKey, noteList);
            resolve(noteList);
          },
        );
        signal.addEventListener("abort", unsubscribe);
      }),
    enabled,
  });

  return { noteList: data ?? [], isLoading };
};
