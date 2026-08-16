"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import { Button, Separator } from "shadcn-ui";
import { useFirebaseAuth } from "@/utils/firebase/hooks/useFirebaseAuth";
import { signOutFirebaseAuth } from "@/features/authentication/utils/firebaseAuth";
import AuthenticationServiceList from "@/features/authentication/components/AuthenticationServiceList";
import AuthenticationFormModal from "@/features/authentication/components/AuthenticationFormModal";

export default function AuthenticationPage() {
  const [showForm, setShowForm] = useState(false);
  const { user } = useFirebaseAuth();
  const router = useRouter();

  return (
    <div className="relative flex-1 p-4">
      {user ? (
        <div className="flex flex-col gap-2">
          <p>{user.email}</p>
          <p>{user.uid}</p>
          <Separator />
          <AuthenticationServiceList
            handleSpendingsRoute={(id) => router.push(`/spendings/${id}`)}
            handleVaultRoute={(id) => router.push(`/vaults/${id}`)}
          />
          <Separator />
          <Button variant="outline" onClick={() => signOutFirebaseAuth()}>
            Sign out
          </Button>
        </div>
      ) : (
        <p>Not logged in</p>
      )}
      <Button
        size="icon"
        className="fixed bottom-4 right-4 rounded-full"
        onClick={() => setShowForm(true)}
      >
        <LogIn />
      </Button>
      <AuthenticationFormModal showForm={showForm} setShowForm={setShowForm} />
    </div>
  );
}
