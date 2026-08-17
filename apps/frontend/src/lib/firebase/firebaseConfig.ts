import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBP6AehZPKBg8Ugg4C-3JJHmopGR_sMdwQ",
  authDomain: "household-app-921c0.firebaseapp.com",
  projectId: "household-app-921c0",
  storageBucket: "household-app-921c0.appspot.com",
  messagingSenderId: "443616909343",
  appId: "1:443616909343:web:45b1bf3995b41ab73a5d2a",
};

// Initialize Firebase
const FIREBASE = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const AUTHENTICATION = getAuth(FIREBASE);
// Initialize Cloud Firestore and get a reference to the service
const FIRESTORE = getFirestore(FIREBASE);

export { AUTHENTICATION, FIRESTORE };
