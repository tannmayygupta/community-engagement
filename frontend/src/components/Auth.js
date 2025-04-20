import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, User, ChevronRight, LogIn, UserPlus, Search } from "lucide-react";
import {
  signUpWithEmail,
  loginWithEmail,
  signInWithGoogle,
} from "../services/auth";

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
      alert("Google Sign-In Failed!");
    }
  };

  const GoogleIcon = () => (
    <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl flex rounded-2xl overflow-hidden shadow-2xl"
      >
        {/* Left Side - Illustration */}
        <div className="hidden md:flex md:w-1/2 bg-indigo-600 p-8 items-center justify-center relative overflow-hidden">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700"
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 grid grid-cols-12 gap-2">
                {Array.from({ length: 100 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 h-1 rounded-full bg-white"
                    initial={{ opacity: 0.1 }}
                    animate={{ opacity: [0.1, 0.5, 0.1] }}
                    transition={{ duration: 4, delay: i % 10 * 0.1, repeat: Infinity }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
          
          <div className="relative z-10 text-white text-center">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-4xl font-bold mb-4"
            >
              EventHub
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-lg opacity-90"
            >
              Discover amazing events and connect with like-minded people
            </motion.p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="bg-gray-900 w-full md:w-1/2 p-8 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-white">
                {isSignUp ? "Create Account" : "Welcome Back"}
              </h2>
              <div className="text-indigo-500 text-sm font-medium">
                EventHub
              </div>
            </div>

            <form className="space-y-5">
              {/* Email Input */}
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-800 text-white rounded-lg py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-800 text-white rounded-lg py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  required
                />
              </div>

              {/* Role Selector (only visible during SignUp) */}
              {isSignUp && (
                <div className="relative">
                  <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    onChange={(e) => setSelectedRole(e.target.value)}
                    value={selectedRole}
                    className="w-full bg-gray-800 text-white rounded-lg py-3 pl-10 pr-3 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  <ChevronRight size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-400" />
                </div>
              )}

              {/* Email Auth Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleAuth}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg flex items-center justify-center font-medium transition-all"
              >
                {isSignUp ? (
                  <>
                    <UserPlus size={18} className="mr-2" />
                    Sign Up with Email
                  </>
                ) : (
                  <>
                    <LogIn size={18} className="mr-2" />
                    Login with Email
                  </>
                )}
              </motion.button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-900 text-gray-400">or</span>
                </div>
              </div>

              {/* Google Auth Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button" 
                onClick={handleGoogleSignIn}
                className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg flex items-center justify-center font-medium transition-all"
              >
                <GoogleIcon />
                Sign in with Google
              </motion.button>

              {/* Toggle Auth Mode */}
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-indigo-400 hover:text-indigo-300 text-sm transition-colors"
                >
                  {isSignUp
                    ? "Already have an account? Login"
                    : "Don't have an account? Sign Up"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default Auth;