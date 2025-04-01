import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";

function UserDashboard({ user }) {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // ✅ Fetch Events from JSON
  useEffect(() => {
    fetch("/events.json")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
      })
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  // ✅ Filtered Events
  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ✅ Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  // ✅ Go to Profile Page
  const goToProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="dashboard-container">
      <div className="navbar">
        <h2>🎉 Upcoming Events</h2>

        {/* ✅ Search Bar */}
        <input
          type="text"
          placeholder="Search for an event..."
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* ✅ Show User Info with Dropdown */}
        <div className="user-info" onClick={() => setShowDropdown(!showDropdown)}>
          {user ? (
            <>
              <span>{user.email}</span> {/* ✅ Show Email */}
              <span className="profile-icon">👤</span>

              {showDropdown && (
                <div className="dropdown">
                  <button onClick={goToProfile}>👀 View Profile</button>
                  <button onClick={handleLogout}>🚪 Logout</button>
                </div>
              )}
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>

      {/* ✅ Event Cards */}
      <div className="event-list">
    {filteredEvents.length > 0 ? (
    filteredEvents.map((event, index) => (
      <div className="event-card" key={index}>
        <h3>{event.name}</h3>
        <p>📍 Venue: {event.venue}</p> {/* Change location to venue */}
        <p>⏰ Date: {event.date}</p>
        <p>💰 Entry Fee: {event.fee}</p>
        <p>👥 Type: {event.type}</p>
        <button
          onClick={() =>
            window.open(event.registerLink, "_blank", "noopener,noreferrer")
          }
        >
          ✅ Register Now
        </button>
      </div>
    ))
  ) : (
    <p>No events found!</p>
  )}
</div>

    </div>
  );
}

export default UserDashboard;
