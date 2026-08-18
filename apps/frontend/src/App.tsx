import { Route, Routes } from "react-router-dom";

import SpendingsSettingsPage from "@/features/spendings/pages/SettingsPage";
import SummaryPage from "@/features/spendings/pages/SummaryPage";
import SpendingsLayout from "@/features/spendings/layouts/SpendingsLayout";
import HomePage from "@/features/shell/pages/HomePage";
import VaultsHomePage from "@/features/vaults/pages/HomePage";
import VaultSettingsPage from "@/features/vaults/pages/SettingsPage";
import VaultLayout from "@/features/vaults/layouts/VaultLayout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/spendings/:id" element={<SpendingsLayout />}>
        <Route index element={<SummaryPage />} />
        <Route path="settings" element={<SpendingsSettingsPage />} />
      </Route>
      <Route path="/vaults/:id" element={<VaultLayout />}>
        <Route index element={<VaultsHomePage />} />
        <Route path="settings" element={<VaultSettingsPage />} />
      </Route>
    </Routes>
  );
}
