// src/components/AdminDashboard.js
import React from "react";
import { logout } from "../services/auth";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div>
      <h1>Welcome to Admin Dashboard 👑</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default AdminDashboard;
