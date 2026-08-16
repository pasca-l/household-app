"use client";

import { useEffect } from "react";
import { Spinner } from "shadcn-ui";
import { useVaultContext } from "@/features/vaults/contexts/VaultContext";
import { useNoteList } from "@/features/vaults/hooks/useNoteList";
import VaultSiteManager from "@/features/vaults/components/VaultSiteManager";

export default function SiteManagerPage() {
  const vault = useVaultContext();
  const { noteList, isLoading } = useNoteList();

  useEffect(() => {
    document.title = vault.id;
  }, [vault.id]);

  return (
    <div className="p-4">
      {isLoading ? <Spinner /> : <VaultSiteManager noteList={noteList} />}
    </div>
  );
}
