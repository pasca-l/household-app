"use client";

import SpendingsList from "@/features/spendings/components/SpendingsList";
import VaultList from "@/features/vaults/components/VaultList";

export default function AuthenticationServiceList({
  handleSpendingsRoute,
  handleVaultRoute,
}: {
  handleSpendingsRoute: (id: string) => void;
  handleVaultRoute: (id: string) => void;
}) {
  return (
    <>
      <SpendingsList handleSpendingsRoute={handleSpendingsRoute} />
      <VaultList handleVaultRoute={handleVaultRoute} />
    </>
  );
}
