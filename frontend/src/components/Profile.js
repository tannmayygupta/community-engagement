import React from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile({ user }) {
  const navigate = useNavigate();

  // ✅ Redirect if no user
  if (!user) {
    navigate("/");
    return null;
  }

  return (
    <div className="profile-container">
      <h2>👤 User Profile</h2>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Role:</strong> {user.role}
      </p>
    </div>
  );
}

export default Profile;
