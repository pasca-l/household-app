import { createContext, useContext } from "react";
import type { Spendings } from "@/features/spendings/types/spendings";

const SpendingsContext = createContext({} as Spendings);

export const SpendingsProvider = ({
  children,
  spendings,
}: {
  children: React.ReactNode;
  spendings: Spendings;
}) => (
  <SpendingsContext.Provider value={spendings}>
    {children}
  </SpendingsContext.Provider>
);

export const useSpendingsContext = () => useContext(SpendingsContext);
