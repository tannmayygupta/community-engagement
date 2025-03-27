// frontend/src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBcvYNXJKiJhH_RNo206ekh9CcK1H1GIGQ",
  authDomain: "community-engagement-29772.firebaseapp.com",
  projectId: "community-engagement-29772",
  storageBucket: "community-engagement-29772.firebasestorage.app",
  messagingSenderId: "484831922477",
  appId: "1:484831922477:web:ddce2fd1b865f32f20aba4",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };