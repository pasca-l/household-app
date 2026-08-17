import { LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  Spinner,
} from "shadcn-ui";
import { useFirebaseAuth } from "@/utils/firebase/hooks/useFirebaseAuth";
import { signOutFirebaseAuth } from "@/features/authentication/utils/firebaseAuth";
import { useSpendingsList } from "@/features/spendings/hooks/useSpendingsList";
import { useVaultList } from "@/features/vaults/hooks/useVaultList";

export default function AppSidebar() {
  const { user } = useFirebaseAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { spendingsList, isLoading: spendingsLoading } = useSpendingsList();
  const { vaultList, isLoading: vaultLoading } = useVaultList();

  if (!user) return null;

  return (
    <Sidebar>
      <SidebarHeader>
        <Link to="/" className="px-2 text-lg font-semibold hover:underline">
          Household App
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Spendings</SidebarGroupLabel>
          {spendingsLoading ? (
            <Spinner />
          ) : (
            <SidebarMenu>
              {spendingsList.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={pathname.startsWith(`/spendings/${item.id}`)}
                    onClick={() => navigate(`/spendings/${item.id}`)}
                  >
                    {item.id}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          )}
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Vaults</SidebarGroupLabel>
          {vaultLoading ? (
            <Spinner />
          ) : (
            <SidebarMenu>
              {vaultList.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={pathname.startsWith(`/vaults/${item.id}`)}
                    onClick={() => navigate(`/vaults/${item.id}`)}
                  >
                    {item.id}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          )}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <p className="truncate px-2 text-xs text-muted-foreground">
              {user.email}
            </p>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => signOutFirebaseAuth()}
              className="text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut />
              Sign out
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
