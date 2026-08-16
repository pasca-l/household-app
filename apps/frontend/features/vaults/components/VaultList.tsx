"use client";

import { Button, Spinner } from "shadcn-ui";
import { useVaultList } from "@/features/vaults/hooks/useVaultList";

export default function VaultList({
  handleVaultRoute,
}: {
  handleVaultRoute: (id: string) => void;
}) {
  const { vaultList, isLoading } = useVaultList();

  return (
    <div className="flex flex-col gap-1">
      <p className="font-bold">List of Vaults</p>
      {isLoading ? (
        <Spinner />
      ) : (
        vaultList.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className="justify-start"
            onClick={() => handleVaultRoute(item.id)}
          >
            {item.id}
          </Button>
        ))
      )}
    </div>
  );
}
