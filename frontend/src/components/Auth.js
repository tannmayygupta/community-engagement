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

  const handleAuth = async () => {
    try {
      const user = isSignUp
        ? await signUpWithEmail(email, password, selectedRole)
        : await loginWithEmail(email, password);

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
      console.error("Error:", error.message);
      alert("Error: " + error.message);
    }
  };

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
      alert("Google Sign-In Failed! ");
    }
  };

  return (
    <div className="auth-container">
      <div className="login-wrapper">
        <div className="illustration-container">
          <div className="illustration-inner">
            <img
              src="/cep-img.svg"
              alt="Illustration"
              className="illustration-img"
            />
          </div>
        </div>

        <div className="form-container">
          <h2 className="welcome-title">WELCOME</h2>
          <form className="login-form">
            <div className="input-group">
              <input
                className="auth-input"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                className="auth-input"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {isSignUp && (
              <div className="input-group">
                <select
                  className="auth-input"
                  onChange={(e) => setSelectedRole(e.target.value)}
                  value={selectedRole}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            )}

            <button className="auth-button" type="button" onClick={handleAuth}>
              {isSignUp ? "Sign Up with Email" : "Login with Email"}
            </button>

            <div className="or-divider">or</div>

            <button className="google-btn" type="button" onClick={handleGoogleSignIn}>
              <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="20px"
              height="20px"
              style={{ marginRight: "8px" }}
              >
              <path
                fill="#4285F4"
                d="M24 9.5c3.15 0 5.95 1.09 8.18 2.9l6.1-6.1C34.28 2.93 29.46 1 24 1 14.94 1 7.43 6.68 4.75 14.24l7.3 5.67C13.54 14.56 18.35 9.5 24 9.5z"
              />
              <path
                fill="#34A853"
                d="M46.1 24.5c0-1.4-.13-2.75-.38-4H24v7.5h12.4c-.54 2.89-2.15 5.33-4.51 6.99l7.11 5.52c4.16-3.84 6.5-9.52 6.5-16z"
              />
              <path
                fill="#FBBC05"
                d="M11.08 28.91C10.2 26.68 9.7 24.24 9.7 21.7c0-2.54.5-4.98 1.38-7.21l-7.3-5.67C2.48 13.53 1 18.57 1 24s1.48 10.47 4.78 15.18l7.3-5.67z"
              />
              <path
                fill="#EA4335"
                d="M24 47c5.46 0 10.28-1.93 14.07-5.13l-7.11-5.52c-1.95 1.31-4.45 2.1-6.96 2.1-5.65 0-10.46-5.06-12.05-11.41l-7.3 5.67C7.43 41.32 14.94 47 24 47z"
              />
              <path fill="none" d="M1 1h46v46H1z" />
            </svg>
            Sign in with Google
            </button>

            <button
              className="signup-link"
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp
                ? "Already have an account? Login"
                : "Don't have an account? Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Auth;
