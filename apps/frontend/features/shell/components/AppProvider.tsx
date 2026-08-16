"use client";

import { SidebarInset, SidebarProvider, SidebarTrigger } from "shadcn-ui";
import { useFirebaseAuth } from "@/utils/firebase/hooks/useFirebaseAuth";
import AppSidebar from "@/features/shell/components/AppSidebar";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useFirebaseAuth();

  if (!user) return <>{children}</>;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SidebarTrigger className="m-2" />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
