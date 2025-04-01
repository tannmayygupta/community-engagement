import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBcvYNXJKiJhH_RNo206ekh9CcK1H1GIGQ",
  authDomain: "community-engagement-29772.firebaseapp.com",
  projectId: "community-engagement-29772",
  storageBucket: "community-engagement-29772.firebasestorage.app",
  messagingSenderId: "484831922477",
  appId: "1:484831922477:web:ddce2fd1b865f32f20aba4"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // ✅ Firestore Export
