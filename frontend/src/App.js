// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { auth } from "./firebase-config";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import api from "./api";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        localStorage.setItem('token', token);
        try {
          const response = await api.post('/users');
          setUser(response.data);
        } catch (err) {
          console.error(err);
          setUser({ email: firebaseUser.email, role: 'student' });
        }
      } else {
        localStorage.removeItem('token');
        setUser(null);
      }
    });
  }, []);

  const signUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      localStorage.setItem('token', token);
      const response = await api.post('/users');
      setUser(response.data);
      alert("User registered successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  const login = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      localStorage.setItem('token', token);
      const response = await api.post('/users');
      setUser(response.data);
      alert("User logged in!");
    } catch (error) {
      alert(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem('token');
    setUser(null);
    alert("User logged out!");
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Community Engagement Platform</h1>
      {!user ? (
        <>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ margin: "10px", padding: "5px" }}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ margin: "10px", padding: "5px" }}
          />
          <br />
          <button onClick={signUp} style={{ margin: "5px", padding: "5px" }}>
            Sign Up
          </button>
          <button onClick={login} style={{ margin: "5px", padding: "5px" }}>
            Login
          </button>
        </>
      ) : (
        <>
          <p>Welcome, {user.email}! Role: {user.role}</p>
          <button onClick={logout} style={{ margin: "5px", padding: "5px" }}>
            Logout
          </button>
        </>
      )}
    </div>
  );
}

export default App;