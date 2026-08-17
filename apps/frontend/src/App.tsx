import { Route, Routes } from "react-router-dom";

import DetailPage from "@/features/spendings/pages/DetailPage";
import SettingsPage from "@/features/spendings/pages/SettingsPage";
import SummaryPage from "@/features/spendings/pages/SummaryPage";
import SpendingsLayout from "@/features/spendings/layouts/SpendingsLayout";
import HomePage from "@/features/shell/pages/HomePage";
import SiteManagerPage from "@/features/vaults/pages/SiteManagerPage";
import VaultSettingsPage from "@/features/vaults/pages/SettingsPage";
import VaultLayout from "@/features/vaults/layouts/VaultLayout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/spendings/:id" element={<SpendingsLayout />}>
        <Route index element={<SummaryPage />} />
        <Route path="detail" element={<DetailPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      <Route path="/vaults/:id" element={<VaultLayout />}>
        <Route index element={<SiteManagerPage />} />
        <Route path="settings" element={<VaultSettingsPage />} />
      </Route>
    </Routes>
  );
}
