import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useFirebaseAuth } from "@/utils/firebase/hooks/useFirebaseAuth";

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useFirebaseAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user && pathname !== "/") {
      navigate("/", { replace: true });
    }
  }, [loading, user, pathname, navigate]);

  if (loading) return null;
  if (!user && pathname !== "/") return null;
  return <>{children}</>;
}
