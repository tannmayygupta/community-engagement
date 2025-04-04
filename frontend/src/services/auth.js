import { auth } from "./firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getDoc, getFirestore } from "firebase/firestore";

// Firestore Instance
const db = getFirestore();

// Save User Data to Firestore ✅
const saveUserToFirestore = async (user, role) => {
  try {
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      role: role,
      createdAt: new Date(),
    });
    console.log("User data saved to Firestore!");
  } catch (error) {
    console.error("Error saving user data:", error);
  }
};

// Get Role from Firestore ✅
const getUserRoleFromFirestore = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      return userDoc.data().role;
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
};

// Get Current User Info ✅
export const getCurrentUserInfo = async () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const role = await getUserRoleFromFirestore(user.uid);
        resolve({ ...user, role: role || "user" });
      } else {
        resolve(null);
      }
    });
  });
};

// Signup with Email & Password ✅
export const signUpWithEmail = async (email, password, role) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await saveUserToFirestore(userCredential.user, role);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Login with Email & Password ✅
export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // ✅ Get role after login from Firestore
    const role = await (user.uid);getUserRoleFromFirestore
    user.role = role || "user";
    return user;
  } catch (error) {
    throw error;
  }
};

// Google Sign-In ✅
export const signInWithGoogle = async (role) => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    await saveUserToFirestore(result.user, role);
    return result.user;
  } catch (error) {
    throw error;
  }
};

// Logout ✅
export const logout = async () => {
  try {
    await signOut(auth);
    console.log("User logged out successfully!");
  } catch (error) {
    console.error("Error logging out:", error);
  }
};
