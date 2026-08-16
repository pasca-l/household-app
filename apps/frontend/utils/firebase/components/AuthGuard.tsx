"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useFirebaseAuth } from "@/utils/firebase/hooks/useFirebaseAuth";

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useFirebaseAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user && pathname !== "/") {
      router.replace("/");
    }
  }, [loading, user, pathname, router]);

  if (loading) return null;
  if (!user && pathname !== "/") return null;
  return <>{children}</>;
}
