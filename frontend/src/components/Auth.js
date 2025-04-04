import React, { useState } from "react";
import {
  signUpWithEmail,
  loginWithEmail,
  signInWithGoogle,
} from "../services/auth";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Auth({ setRole, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [selectedRole, setSelectedRole] = useState("user");
  const navigate = useNavigate();

  // ✅ Handle Email SignUp/Login
  const handleAuth = async () => {
    try {
      const user = isSignUp
        ? await signUpWithEmail(email, password, selectedRole)
        : await loginWithEmail(email, password);

      // ✅ Store user info with role after login
      const userData = {
        uid: user.uid,
        email: user.email,
        role: selectedRole,
      };

      localStorage.setItem("user", JSON.stringify(userData)); // Store in localStorage
      setUser(userData);
      setRole(selectedRole);

      navigate(selectedRole === "admin" ? "/admin-dashboard" : "/user-dashboard");
    } catch (error) {
      console.error("Error:", error.message);
      alert("Error: " + error.message); // 🛑 Show error if auth fails
    }
  };

  // ✅ Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle(selectedRole);
      
      const userData = {
        uid: user.uid,
        email: user.email,
        role: selectedRole,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      setRole(selectedRole);

      navigate(selectedRole === "admin" ? "/admin-dashboard" : "/user-dashboard");
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
      alert("Google Sign-In Failed! 😔");
    }
  };

  return (
    <div className="auth-container">
      <h2>{isSignUp ? "Sign Up" : "Login"}</h2>

      {/* ✅ Email Input */}
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {/* ✅ Password Input */}
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {/* ✅ Role Selector for SignUp */}
      {isSignUp && (
        <select onChange={(e) => setSelectedRole(e.target.value)} value={selectedRole}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      )}

      {/* ✅ Auth Buttons */}
      <button onClick={handleAuth}>
        {isSignUp ? "Sign Up with Email" : "Login with Email"}
      </button>
      <button onClick={handleGoogleSignIn}>🚀 Sign in with Google</button>

      {/* ✅ Toggle between SignUp and Login */}
      <button
        onClick={() => setIsSignUp(!isSignUp)}
        style={{
          background: "none",
          border: "none",
          color: "blue",
          cursor: "pointer",
          textDecoration: "underline",
          marginTop: "10px",
        }}
      >
        {isSignUp
          ? "Already have an account? Login"
          : "Don't have an account? Sign Up"}
      </button>
    </div>
  );
}

export default Auth;
