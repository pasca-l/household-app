import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { cn } from "shadcn-ui";

import { VaultProvider } from "@/features/vaults/contexts/VaultContext";

const TABS = [
  { href: "", label: "Home" },
  { href: "/settings", label: "Settings" },
];

export default function VaultLayout() {
  const { id } = useParams<{ id: string }>();
  const { pathname } = useLocation();
  const base = `/vaults/${id}`;

  return (
    <VaultProvider vault={{ id: id! }}>
      <div className="flex flex-col">
        <nav className="flex border-b">
          {TABS.map((tab) => {
            const href = `${base}${tab.href}`;
            const active = pathname === href;
            return (
              <Link
                key={tab.href}
                to={href}
                className={cn(
                  "px-4 py-2 text-sm font-medium border-b-2",
                  active
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
        <Outlet />
      </div>
    </VaultProvider>
  );
}
