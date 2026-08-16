"use client";

import { Card, CardContent, CardHeader, CardTitle } from "shadcn-ui";
import { useFirebaseAuth } from "@/utils/firebase/hooks/useFirebaseAuth";
import AuthenticationForm from "@/features/authentication/components/AuthenticationForm";

export default function AuthenticationPage() {
  const { user } = useFirebaseAuth();

  return (
    <div className="p-4">
      {user ? (
        <div className="flex flex-col gap-2">
          <p>{user.email}</p>
          <p>{user.uid}</p>
        </div>
      ) : (
        <div className="mx-auto flex max-w-sm flex-col gap-4 pt-16">
          <h1 className="text-center text-2xl font-semibold">
            Household App
          </h1>
          <Card>
            <CardHeader>
              <CardTitle>Sign in</CardTitle>
            </CardHeader>
            <CardContent>
              <AuthenticationForm />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
