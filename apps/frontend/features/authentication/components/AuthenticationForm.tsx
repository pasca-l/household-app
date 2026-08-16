"use client";

import { useState } from "react";
import { Button, Input, Separator } from "shadcn-ui";
import { signInFirebaseAuth } from "@/features/authentication/utils/firebaseAuth";

export default function AuthenticationForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col gap-3">
      <Button
        variant="outline"
        onClick={() => signInFirebaseAuth({ method: "google" })}
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
        onClick={() => signInFirebaseAuth({ method: "email", email, password })}
      >
        Sign in with email and password
      </Button>
    </div>
  );
}
