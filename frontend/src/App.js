import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import Profile from "./components/Profile";
import EventDetails from "./components/EventDetails"; // ✅ Import
import "./App.css";

function App() {
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null); // ✅ Store user info

  return (
    <Router>
      <Routes>
        {/* ✅ Auth */}
        <Route
          path="/"
          element={<Auth setRole={setRole} setUser={setUser} />}
        />

        {/* ✅ User Dashboard */}
        <Route
          path="/user-dashboard"
          element={<UserDashboard user={user} />}
        />

        {/* ✅ Admin Dashboard */}
        <Route
          path="/admin-dashboard"
          element={<AdminDashboard user={user} />}
        />

        {/* ✅ Profile */}
        <Route
          path="/profile"
          element={<Profile user={user} />}
        />

        {/* ✅ Event Details Page */}
        <Route
          path="/event/:id"
          element={<EventDetails />}
        />
      </Routes>
    </Router>
  );
}

export default App;
