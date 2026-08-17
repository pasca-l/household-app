import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { AUTHENTICATION } from "@/lib/firebase/firebaseConfig";

export const useFirebaseAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(AUTHENTICATION, async (user) => {
      setUser(user ?? null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { user, loading };
};
