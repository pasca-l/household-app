"use client";

import { createContext, useContext } from "react";
import { Vault } from "@/features/vaults/types/vault";

const VaultContext = createContext({} as Vault);

export const VaultProvider = ({
  children,
  vault,
}: {
  children: React.ReactNode;
  vault: Vault;
}) => <VaultContext.Provider value={vault}>{children}</VaultContext.Provider>;

export const useVaultContext = () => useContext(VaultContext);
