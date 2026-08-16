"use client";

import { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Separator,
} from "shadcn-ui";
import { signInFirebaseAuth } from "@/features/authentication/utils/firebaseAuth";

export default function AuthenticationFormModal({
  showForm,
  setShowForm,
}: {
  showForm: boolean;
  setShowForm: (show: boolean) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Dialog open={showForm} onOpenChange={setShowForm}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign in</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <Button
            variant="outline"
            onClick={() => {
              signInFirebaseAuth({ method: "google" });
              setShowForm(false);
            }}
          >
            Sign in with Google
          </Button>
          <Separator />
          <Input
            placeholder="email"
            type="email"
            autoCapitalize="none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="outline"
            onClick={() => {
              signInFirebaseAuth({ method: "email", email, password });
              setShowForm(false);
            }}
          >
            Sign in with email and password
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
