import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, UserCircle, ShieldCheck, Edit, LogOut } from "lucide-react";

function Profile({ user }) {
  const navigate = useNavigate();

  // Redirect if no user
  if (!user) {
    navigate("/");
    return null;
  }

  const handleLogout = () => {
    // Clear user from localStorage
    localStorage.removeItem("user");
    // Redirect to login page
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">EveCon</h1>
          <div className="flex items-center space-x-2">
            <button 
              className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-white"
              onClick={() => navigate("/user-dashboard")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="bg-indigo-600 w-8 h-8 rounded-full flex items-center justify-center text-white">
              {user.email[0].toUpperCase()}
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 rounded-2xl overflow-hidden shadow-xl"
        >
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-700 px-6 py-12 relative">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 grid grid-cols-12 gap-2">
                {Array.from({ length: 50 }).map((_, i) => (
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
            
            <div className="flex flex-col items-center relative z-10">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-gray-900 p-4 rounded-full mb-4 border-4 border-gray-800"
              >
                <UserCircle size={72} className="text-white" />
              </motion.div>
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-2xl font-bold text-white mb-2"
              >
                {user.email.split('@')[0]}
              </motion.h2>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex items-center text-gray-200 text-sm"
              >
                <ShieldCheck size={16} className="mr-1" />
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Account
              </motion.div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Account Information</h3>
            
            <div className="space-y-6">
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex items-center p-4 bg-gray-700 rounded-lg"
              >
                <div className="mr-4 bg-indigo-600/20 p-3 rounded-full">
                  <Mail size={20} className="text-indigo-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Email</div>
                  <div className="text-white">{user.email}</div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex items-center p-4 bg-gray-700 rounded-lg"
              >
                <div className="mr-4 bg-indigo-600/20 p-3 rounded-full">
                  <ShieldCheck size={20} className="text-indigo-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Role</div>
                  <div className="text-white">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="flex items-center p-4 bg-gray-700 rounded-lg"
              >
                <div className="mr-4 bg-indigo-600/20 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Account ID</div>
                  <div className="text-white">{user.uid ? user.uid.slice(0, 8) + '...' : 'Not available'}</div>
                </div>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg transition-all"
              >
                <Edit size={18} className="mr-2" />
                Edit Profile
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleLogout}
                className="flex items-center justify-center bg-red-500/20 hover:bg-red-500/30 text-red-400 py-3 px-4 rounded-lg transition-all"
              >
                <LogOut size={18} className="mr-2" />
                Logout
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>EveCon © 2025. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;