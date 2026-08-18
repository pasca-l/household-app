import { useEffect } from "react";
import { Spinner } from "shadcn-ui";
import { useVaultContext } from "@/features/vaults/contexts/VaultContext";
import { useNoteList } from "@/features/vaults/hooks/useNoteList";
import Vaults from "@/features/vaults/components/Vaults";

export default function HomePage() {
  const vault = useVaultContext();
  const { noteList, isLoading } = useNoteList();

  useEffect(() => {
    document.title = vault.id;
  }, [vault.id]);

  return (
    <div className="p-4">
      {isLoading ? <Spinner /> : <Vaults noteList={noteList} />}
    </div>
  );
}
