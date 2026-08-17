import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import AppProvider from "@/features/shell/components/AppProvider";
import QueryProvider from "@/lib/tanstack/QueryProvider";
import AuthGuard from "@/utils/firebase/components/AuthGuard";

import App from "./App";
import "./globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename="/household-app">
      <QueryProvider>
        <AppProvider>
          <AuthGuard>
            <App />
          </AuthGuard>
        </AppProvider>
      </QueryProvider>
    </BrowserRouter>
  </StrictMode>,
);
