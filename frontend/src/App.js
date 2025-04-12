import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import Profile from "./components/Profile";
import EventDetails from "./components/EventDetails";
import "./App.css";

function App() {
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null); // ✅ Store user info

  return (
    <Router>
      <Routes>
        {/* ✅ Passing setUser to Auth to save user details */}
        <Route
          path="/"
          element={<Auth setRole={setRole} setUser={setUser} />}
        />
        {/* ✅ Pass user data to UserDashboard & Profile */}
        <Route
          path="/user-dashboard"
          element={<UserDashboard user={user} />}
        />
        <Route
          path="/admin-dashboard"
          element={<AdminDashboard user={user} />}
        />
        <Route
          path="/profile"
          element={<Profile user={user} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
