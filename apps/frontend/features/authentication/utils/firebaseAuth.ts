import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { AUTHENTICATION } from "@/lib/firebase/firebaseConfig";
import { GOOGLE_PROVIDER } from "@/utils/firebase/providers/authProviders";
import { isEmail, SignIn } from "@/features/authentication/types/signin";

export const signInFirebaseAuth = async ({ ...args }: SignIn) => {
  if (isEmail(args)) {
    return signInWithEmailAndPassword(AUTHENTICATION, args.email, args.password);
  } else {
    switch (args.method) {
      case "google":
        await setPersistence(AUTHENTICATION, browserSessionPersistence);
        await signInWithPopup(AUTHENTICATION, GOOGLE_PROVIDER);
    }
  }
};

export const signOutFirebaseAuth = () => signOut(AUTHENTICATION);
