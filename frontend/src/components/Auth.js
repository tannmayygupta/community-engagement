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
  const [isSignUp, setIsSignUp] = useState(true);
  const [selectedRole, setSelectedRole] = useState("user");
  const navigate = useNavigate();

  // Handle Email SignUp/Login
  const handleAuth = async () => {
    try {
      const user = isSignUp
        ? await signUpWithEmail(email, password, selectedRole)
        : await loginWithEmail(email, password);

      // Store user info with role after login
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
      alert("Error: " + error.message); // Show error if auth fails
    }
  };

  // Handle Google Sign-In
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

  const GoogleIcon = () => (
    <svg className="google-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );

  return (
    <div className="auth-container">
      <h1>WELCOME</h1>

      {/* Email Input */}
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {/* Password Input */}
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {/* Role Selector - Always visible for signup */}
      {isSignUp && (
        <select 
          className="role-select"
          onChange={(e) => setSelectedRole(e.target.value)} 
          value={selectedRole}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      )}

      {/* Sign up/login button - Added back */}
      <button className="auth-btn" onClick={handleAuth}>
        {isSignUp ? "Sign Up with Email" : "Sign In"}
      </button>

      {/* Google Auth Button */}
      <button className="google-btn" onClick={handleGoogleSignIn}>
        <GoogleIcon /> Continue with Google
      </button>

      {/* Toggle between SignUp and Login */}
      <div className="login-text">
        {isSignUp ? "Already have an account? " : "Don't have an account? "}
        <span className="login-link" onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? "Sign in" : "Sign up"}
        </span>
      </div>
    </div>
  );
}

export default Auth;